import { UserRole } from "@/lib/authUtils";

export interface UserInfo {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    tenantId?: string | null;
    branchId?: string | null;
    classroomId?: string | null;
    needPasswordChange?: boolean;
    emailVerified?: boolean;
}