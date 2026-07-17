import status from "http-status";
import AppError from "../../errorHelpers/AppError.js";
import { prisma } from "../../lib/prisma.js";
import { branchFilterableFields, branchIncludeConfig, branchSearchableFields, } from "./branch.constant.js";
import { QueryBuilder } from "../../builder/QueryBuilder.js";
const createBranch = async (payload) => {
    const isTenantExist = await prisma.tenant.findUnique({
        where: { id: payload.tenantId },
    });
    if (!isTenantExist) {
        throw new AppError(status.NOT_FOUND, "Tenant not found");
    }
    // Enforce the subscription's branch cap so an owner can't silently outgrow their plan
    if (isTenantExist.planId) {
        const plan = await prisma.subscriptionPlan.findUnique({
            where: { id: isTenantExist.planId },
        });
        if (plan) {
            const branchCount = await prisma.branch.count({
                where: { tenantId: payload.tenantId },
            });
            if (branchCount >= plan.maxBranches) {
                throw new AppError(status.FORBIDDEN, `Your plan allows a maximum of ${plan.maxBranches} branch(es). Upgrade to add more.`);
            }
        }
    }
    const branch = await prisma.branch.create({
        data: payload,
    });
    return branch;
};
const getAllBranches = async (query, tenantId) => {
    const scopedQuery = tenantId ? { ...query, tenantId } : query;
    const queryBuilder = new QueryBuilder(prisma.branch, scopedQuery, {
        searchableFields: branchSearchableFields,
        filterableFields: branchFilterableFields,
    });
    const result = await queryBuilder
        .search()
        .filter()
        .paginate()
        .dynamicInclude(branchIncludeConfig)
        .sort()
        .fields()
        .execute();
    return result;
};
const getBranchById = async (id, tenantId) => {
    const branch = await prisma.branch.findUnique({
        where: { id },
        include: branchIncludeConfig,
    });
    if (!branch) {
        throw new AppError(status.NOT_FOUND, "Branch not found");
    }
    if (tenantId && branch.tenantId !== tenantId) {
        throw new AppError(status.FORBIDDEN, "You do not have access to this branch");
    }
    return branch;
};
const updateBranch = async (id, payload, tenantId) => {
    const isBranchExist = await prisma.branch.findUnique({ where: { id } });
    if (!isBranchExist) {
        throw new AppError(status.NOT_FOUND, "Branch not found");
    }
    if (tenantId && isBranchExist.tenantId !== tenantId) {
        throw new AppError(status.FORBIDDEN, "You do not have access to this branch");
    }
    const updatedBranch = await prisma.branch.update({
        where: { id },
        data: payload,
    });
    return updatedBranch;
};
const deleteBranch = async (id, tenantId) => {
    const isBranchExist = await prisma.branch.findUnique({ where: { id } });
    if (!isBranchExist) {
        throw new AppError(status.NOT_FOUND, "Branch not found");
    }
    if (tenantId && isBranchExist.tenantId !== tenantId) {
        throw new AppError(status.FORBIDDEN, "You do not have access to this branch");
    }
    await prisma.branch.delete({ where: { id } });
    return { message: "Branch deleted successfully" };
};
export const BranchService = {
    createBranch,
    getAllBranches,
    getBranchById,
    updateBranch,
    deleteBranch,
};
