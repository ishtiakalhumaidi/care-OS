import status from "http-status";
import AppError from "../../errorHelpers/AppError.js";
import { prisma } from "../../lib/prisma.js";
import { meIncludeConfig, userFilterableFields, userSearchableFields } from "./user.constant.js";
import type { IUpdateMePayload } from "./user.interface.js";
import type { Prisma, User } from "../../../generated/prisma/client.js";
import { QueryBuilder } from "../../builder/QueryBuilder.js";
import type { IQuery } from "../../interfaces/query.interface.js";

const getAllUsers = async (query: IQuery, tenantId: string) => {
  const scopedQuery = { ...query, tenantId, isActive: true, isDeleted: false };

  const queryBuilder = new QueryBuilder<
    User,
    Prisma.UserWhereInput,
    Prisma.UserInclude
  >(prisma.user, scopedQuery, {
    searchableFields: userSearchableFields,
    filterableFields: userFilterableFields,
  });

  const result = await queryBuilder
    .search()
    .filter()
    .paginate()
    .sort()
    .execute();

  result.data = result.data.map((u: any) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    branchId: u.branchId,
  }));

  return result;
};
const getMe = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: meIncludeConfig as Prisma.UserInclude,
  });

  if (!user) {
    throw new AppError(status.NOT_FOUND, "User not found");
  }

  return user;
};

const updateMe = async (userId: string, payload: IUpdateMePayload) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    throw new AppError(status.NOT_FOUND, "User not found");
  }

  const updated = await prisma.user.update({
    where: { id: userId },
    data: payload,
    include: meIncludeConfig as Prisma.UserInclude,
  });

  return updated;
};

export const UserService = {
  getMe,
  updateMe,
  getAllUsers,
};
