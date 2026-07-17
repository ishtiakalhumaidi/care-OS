export interface IRegisterTenantOwnerPayload {
    name: string;
    email: string;
    tenantId: string;
}

export interface IChangePasswordPayload {
    oldPassword?: string;
    newPassword: string;
}
export interface IForgetPasswordPayload {
    email: string;
}

export interface IResetPasswordPayload {
    email: string;
    otp: string;
    newPassword: string;
}

export interface IInviteUserPayload {
    email: string;
    role: "CENTER_ADMIN" | "TEACHER" | "GUARDIAN";
    tenantId: string;
    branchId?: string;
    classroomId?: string;
}
export interface IAcceptInvitePayload {
  token: string;
  name: string;
  password: string;
}