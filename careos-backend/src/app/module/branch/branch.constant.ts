import type { Prisma } from "../../../generated/prisma/client";

export const branchSearchableFields = ["name", "address"];

export const branchFilterableFields = ["tenantId"];

export const branchIncludeConfig: Prisma.BranchInclude = {
  classrooms: true,
};