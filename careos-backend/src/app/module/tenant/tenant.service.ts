import status from "http-status";
import AppError from "../../errorHelpers/AppError.js";
import { prisma } from "../../lib/prisma.js";
import {
  tenantFilterableFields,
  tenantIncludeConfig,
  tenantSearchableFields,
} from "./tenant.constant.js";
import {
  ICreateTenantPayload,
  IUpdateTenantPayload,
} from "./tenant.interface.js";
import type { Prisma, Tenant } from "../../../generated/prisma/client.js";
import type { IQuery } from "../../interfaces/query.interface.js";
import { QueryBuilder } from "../../builder/QueryBuilder.js";

const createTenant = async (payload: ICreateTenantPayload) => {
  const tenant = await prisma.tenant.create({
    data: payload,
  });
  return tenant;
};

const getAllTenants = async (query: IQuery) => {
  const queryBuilder = new QueryBuilder<
    Tenant,
    Prisma.TenantWhereInput,
    Prisma.TenantInclude
  >(prisma.tenant, query, {
    searchableFields: tenantSearchableFields,
    filterableFields: tenantFilterableFields,
  });

  const result = await queryBuilder
    .search()
    .filter()
    .paginate()
    // Explicitly cast it here to bypass the union type mismatch
    .dynamicInclude(tenantIncludeConfig as Prisma.TenantInclude)
    .sort()
    .fields()
    .execute();

  return result;
};
const getTenantById = async (id: string) => {
  const tenant = await prisma.tenant.findUnique({
    where: { id },
    include: tenantIncludeConfig as Prisma.TenantInclude,
  });

  if (!tenant) {
    throw new AppError(status.NOT_FOUND, "Tenant not found");
  }

  return tenant;
};

const updateTenant = async (id: string, payload: IUpdateTenantPayload) => {
  const isTenantExist = await prisma.tenant.findUnique({
    where: { id },
  });

  if (!isTenantExist) {
    throw new AppError(status.NOT_FOUND, "Tenant not found");
  }

  const updatedTenant = await prisma.tenant.update({
    where: { id },
    data: payload,
  });

  return updatedTenant;
};

const deleteTenant = async (id: string) => {
  const isTenantExist = await prisma.tenant.findUnique({ where: { id } });
  if (!isTenantExist) {
    throw new AppError(status.NOT_FOUND, "Tenant not found");
  }

  await prisma.tenant.update({
    where: { id },
    data: { isActive: false },
  });

  return { message: "Tenant deactivated successfully" };
};

export const TenantService = {
  createTenant,
  getAllTenants,
  getTenantById,
  updateTenant,
  deleteTenant,
};
