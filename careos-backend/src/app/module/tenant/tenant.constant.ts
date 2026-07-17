import type { Prisma } from "../../../generated/prisma/client";

export const tenantSearchableFields = ["name"];

export const tenantFilterableFields = ["isActive", "planId"];

export const tenantIncludeConfig: Prisma.TenantInclude = {
  plan: true,
  branches: true,
  users: true,
};
