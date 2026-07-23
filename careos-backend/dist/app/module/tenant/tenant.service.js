import status from "http-status";
import AppError from "../../errorHelpers/AppError.js";
import { prisma } from "../../lib/prisma.js";
import { tenantFilterableFields, tenantIncludeConfig, tenantSearchableFields, } from "./tenant.constant.js";
import { QueryBuilder } from "../../builder/QueryBuilder.js";
const getAllTenants = async (query) => {
    const queryBuilder = new QueryBuilder(prisma.tenant, query, {
        searchableFields: tenantSearchableFields,
        filterableFields: tenantFilterableFields,
    });
    const result = await queryBuilder
        .search()
        .filter()
        .paginate()
        .dynamicInclude(tenantIncludeConfig)
        .sort()
        .fields()
        .execute();
    return result;
};
const getTenantById = async (id) => {
    const tenant = await prisma.tenant.findUnique({
        where: { id },
        include: tenantIncludeConfig,
    });
    if (!tenant) {
        throw new AppError(status.NOT_FOUND, "Tenant not found");
    }
    return tenant;
};
const updateTenant = async (id, payload) => {
    const isTenantExist = await prisma.tenant.findUnique({ where: { id } });
    if (!isTenantExist) {
        throw new AppError(status.NOT_FOUND, "Tenant not found");
    }
    if (payload.slug) {
        const slugTaken = await prisma.tenant.findFirst({
            where: { slug: payload.slug, id: { not: id } },
        });
        if (slugTaken) {
            throw new AppError(status.CONFLICT, "This slug is already taken");
        }
    }
    if (payload.planId) {
        const plan = await prisma.subscriptionPlan.findUnique({
            where: { id: payload.planId },
        });
        if (!plan) {
            throw new AppError(status.BAD_REQUEST, "Invalid plan selected");
        }
        const branchCount = await prisma.branch.count({ where: { tenantId: id } });
        if (branchCount > plan.maxBranches) {
            throw new AppError(status.CONFLICT, `This plan allows ${plan.maxBranches} branch(es); you currently have ${branchCount}. Remove branches first.`);
        }
        const enrolledCount = await prisma.child.count({
            where: { tenantId: id, status: "ENROLLED" },
        });
        if (enrolledCount > plan.maxStudents) {
            throw new AppError(status.CONFLICT, `This plan allows ${plan.maxStudents} student(s); you currently have ${enrolledCount} enrolled.`);
        }
    }
    return prisma.tenant.update({
        where: { id },
        data: payload,
        include: tenantIncludeConfig,
    });
};
const suspendTenant = async (id, payload) => {
    const isTenantExist = await prisma.tenant.findUnique({ where: { id } });
    if (!isTenantExist) {
        throw new AppError(status.NOT_FOUND, "Tenant not found");
    }
    if (!isTenantExist.isActive) {
        throw new AppError(status.CONFLICT, "Tenant is already suspended");
    }
    const tenant = await prisma.tenant.update({
        where: { id },
        data: {
            isActive: false,
            suspendedAt: new Date(),
            suspensionReason: payload.reason,
        },
    });
    return tenant;
};
const activateTenant = async (id) => {
    const isTenantExist = await prisma.tenant.findUnique({ where: { id } });
    if (!isTenantExist) {
        throw new AppError(status.NOT_FOUND, "Tenant not found");
    }
    if (isTenantExist.isActive) {
        throw new AppError(status.CONFLICT, "Tenant is already active");
    }
    const tenant = await prisma.tenant.update({
        where: { id },
        data: {
            isActive: true,
            suspendedAt: null,
            suspensionReason: null,
        },
    });
    return tenant;
};
const getTenantAnalytics = async (id) => {
    const tenant = await prisma.tenant.findUnique({ where: { id } });
    if (!tenant) {
        throw new AppError(status.NOT_FOUND, "Tenant not found");
    }
    const [membersByRole, invitationsByStatus] = await Promise.all([
        prisma.user.groupBy({
            by: ["role"],
            where: { tenantId: id },
            _count: { _all: true },
        }),
        prisma.invitation.groupBy({
            by: ["status"],
            where: { tenantId: id },
            _count: { _all: true },
        }),
    ]);
    return {
        tenant,
        membersByRole: membersByRole.map((m) => ({
            role: m.role,
            count: m._count._all,
        })),
        invitationsByStatus: invitationsByStatus.map((i) => ({
            status: i.status,
            count: i._count._all,
        })),
    };
};
export const TenantService = {
    getAllTenants,
    getTenantById,
    updateTenant,
    suspendTenant,
    activateTenant,
    getTenantAnalytics,
};
