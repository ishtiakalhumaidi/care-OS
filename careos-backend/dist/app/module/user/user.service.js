import status from "http-status";
import AppError from "../../errorHelpers/AppError.js";
import { prisma } from "../../lib/prisma.js";
import { meIncludeConfig, userFilterableFields, userSearchableFields } from "./user.constant.js";
import { QueryBuilder } from "../../builder/QueryBuilder.js";
const getAllUsers = async (query, tenantId) => {
    const scopedQuery = { ...query, tenantId, isActive: true, isDeleted: false };
    const queryBuilder = new QueryBuilder(prisma.user, scopedQuery, {
        searchableFields: userSearchableFields,
        filterableFields: userFilterableFields,
    });
    const result = await queryBuilder
        .search()
        .filter()
        .paginate()
        .sort()
        .execute();
    result.data = result.data.map((u) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        role: u.role,
        branchId: u.branchId,
    }));
    return result;
};
const getMe = async (userId) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: meIncludeConfig,
    });
    if (!user) {
        throw new AppError(status.NOT_FOUND, "User not found");
    }
    return user;
};
const updateMe = async (userId, payload) => {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
        throw new AppError(status.NOT_FOUND, "User not found");
    }
    const updated = await prisma.user.update({
        where: { id: userId },
        data: payload,
        include: meIncludeConfig,
    });
    return updated;
};
export const UserService = {
    getMe,
    updateMe,
    getAllUsers,
};
