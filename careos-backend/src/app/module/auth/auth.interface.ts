export interface IRegisterTenantOwnerPayload {
  name: string;
  email: string;
  password: string;
  tenantName: string;
  planId?: string;
}

export interface ILoginPayload {
  email: string;
  password: string;
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
  branchId: string;
  classroomId?: string;
  childId?: string;
  relationship?: string;
}
export interface IAcceptInvitePayload {
  token: string;
  name: string;
  password: string;
}
