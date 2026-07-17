import status from "http-status";
import AppError from "../../errorHelpers/AppError.js";
import { prisma } from "../../lib/prisma.js";
import { tenantFilterableFields, tenantIncludeConfig, tenantSearchableFields, } from "./tenant.constant.js";
import { QueryBuilder } from "../../builder/QueryBuilder.js";
const createTenant = async (payload) => {
    const tenant = await prisma.tenant.create({
        data: payload,
    });
    return tenant;
};
const getAllTenants = async (query) => {
    const queryBuilder = new QueryBuilder(prisma.tenant, query, {
        searchableFields: tenantSearchableFields,
        filterableFields: tenantFilterableFields,
    });
    const result = await queryBuilder
        .search()
        .filter()
        .paginate()
        // Explicitly cast it here to bypass the union type mismatch
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
const deleteTenant = async (id) => {
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
