import type { Role } from "../../generated/prisma/enums";

export interface IRequestUser {
  id: string;
  role: Role;
  tenantId: string | null;
  branchId: string | null;
  classroomId: string | null;
}
