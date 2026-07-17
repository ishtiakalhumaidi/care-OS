import type { Role } from "../../generated/prisma/enums";


export interface IRequestUser {
    id: string;
    email: string;
    role: Role;
    tenantId?: string | null;
}