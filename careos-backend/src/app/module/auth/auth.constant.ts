export const ENUM_USER_ROLE = {
  SUPER_ADMIN: "SUPER_ADMIN",
  TENANT_OWNER: "TENANT_OWNER",
  CENTER_ADMIN: "CENTER_ADMIN",
  TEACHER: "TEACHER",
  GUARDIAN: "GUARDIAN",
} as const;

export const invitationSearchableFields = ["email"];
export const invitationFilterableFields = [
  "tenantId",
  "branchId",
  "role",
  "status",
];
