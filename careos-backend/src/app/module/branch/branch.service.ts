import status from "http-status";
import AppError from "../../errorHelpers/AppError.js";
import { prisma } from "../../lib/prisma.js";
import {
  branchFilterableFields,
  branchIncludeConfig,
  branchSearchableFields,
} from "./branch.constant.js";
import {
  ICreateBranchPayload,
  IUpdateBranchPayload,
} from "./branch.interface.js";
import type { Branch, Prisma } from "../../../generated/prisma/client.js";
import type { IQuery } from "../../interfaces/query.interface.js";
import { QueryBuilder } from "../../builder/QueryBuilder.js";

const createBranch = async (payload: ICreateBranchPayload) => {
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
        throw new AppError(
          status.FORBIDDEN,
          `Your plan allows a maximum of ${plan.maxBranches} branch(es). Upgrade to add more.`,
        );
      }
    }
  }

  const branch = await prisma.branch.create({
    data: payload,
  });

  return branch;
};

const getAllBranches = async (query: IQuery, tenantId?: string) => {
  const scopedQuery = tenantId ? { ...query, tenantId } : query;

  const queryBuilder = new QueryBuilder<
    Branch,
    Prisma.BranchWhereInput,
    Prisma.BranchInclude
  >(prisma.branch, scopedQuery, {
    searchableFields: branchSearchableFields,
    filterableFields: branchFilterableFields,
  });

  const result = await queryBuilder
    .search()
    .filter()
    .paginate()
    .dynamicInclude(branchIncludeConfig as Prisma.BranchInclude)
    .sort()
    .fields()
    .execute();

  return result;
};

const getBranchById = async (id: string, tenantId?: string) => {
  const branch = await prisma.branch.findUnique({
    where: { id },
    include: branchIncludeConfig as Prisma.BranchInclude,
  });

  if (!branch) {
    throw new AppError(status.NOT_FOUND, "Branch not found");
  }

  if (tenantId && branch.tenantId !== tenantId) {
    throw new AppError(
      status.FORBIDDEN,
      "You do not have access to this branch",
    );
  }

  return branch;
};

const updateBranch = async (
  id: string,
  payload: IUpdateBranchPayload,
  tenantId?: string,
) => {
  const isBranchExist = await prisma.branch.findUnique({ where: { id } });

  if (!isBranchExist) {
    throw new AppError(status.NOT_FOUND, "Branch not found");
  }

  if (tenantId && isBranchExist.tenantId !== tenantId) {
    throw new AppError(
      status.FORBIDDEN,
      "You do not have access to this branch",
    );
  }

  const updatedBranch = await prisma.branch.update({
    where: { id },
    data: payload,
  });

  return updatedBranch;
};

const deleteBranch = async (id: string, tenantId?: string) => {
  const isBranchExist = await prisma.branch.findUnique({ where: { id } });

  if (!isBranchExist) {
    throw new AppError(status.NOT_FOUND, "Branch not found");
  }

  if (tenantId && isBranchExist.tenantId !== tenantId) {
    throw new AppError(
      status.FORBIDDEN,
      "You do not have access to this branch",
    );
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
