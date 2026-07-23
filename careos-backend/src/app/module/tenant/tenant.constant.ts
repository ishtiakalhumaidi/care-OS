import type { Prisma } from "../../../generated/prisma/client";

export const tenantSearchableFields = ["name"];

export const tenantFilterableFields = ["isActive", "planId"];

export const tenantIncludeConfig: Prisma.TenantInclude = {
  plan: true,
  branches: true,
  _count: {
    select: {
      branches: true,
      users: true,
      invitations: true,
      children: { where: { status: "ENROLLED" } },
    },
  },
};