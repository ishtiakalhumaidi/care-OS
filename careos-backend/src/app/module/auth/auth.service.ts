import status from "http-status";
import AppError from "../../errorHelpers/AppError.js";
import { prisma } from "../../lib/prisma.js";
import { auth } from "../../lib/auth.js";
import {
  IChangePasswordPayload,
  IRegisterTenantOwnerPayload,
  type IAcceptInvitePayload,
  type IForgetPasswordPayload,
  type IInviteUserPayload,
  type IResetPasswordPayload,
} from "./auth.interface.js";
import { ENUM_USER_ROLE } from "./auth.constant.js";
import { envVars } from "../../config/env.js";
import { randomBytes } from "crypto";
import { sendTemplatedEmail } from "../../utils/emailSender.js";

const registerTenantOwner = async (payload: IRegisterTenantOwnerPayload) => {
  // 1. Check if the tenant exists
  const isTenantExist = await prisma.tenant.findUnique({
    where: { id: payload.tenantId },
  });

  if (!isTenantExist) {
    throw new AppError(status.NOT_FOUND, "Tenant not found");
  }

  // 2. Check if user already exists
  const isUserExist = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (isUserExist) {
    throw new AppError(status.CONFLICT, "User with this email already exists");
  }

  // 3. Create the user using BetterAuth's admin API to ensure passwords and accounts are synced.
  // We assign a default secure password that they must change on first login.
  const tempPassword = Math.random().toString(36).slice(-10) + "A1!";

  // Programmatically create the user in BetterAuth (this populates the User and Account tables)
  const newAuthUser = await auth.api.signUpEmail({
    body: {
      email: payload.email,
      password: tempPassword,
      name: payload.name,
    },
  });

  // 4. Update the created user with our custom CareOS schema fields
  const updatedUser = await prisma.user.update({
    where: { email: payload.email },
    data: {
      role: ENUM_USER_ROLE.TENANT_OWNER as any, // Cast to Prisma enum
      tenantId: payload.tenantId,
      needPasswordChange: true, // Force them to change the temp password
    },
  });

  await sendTemplatedEmail(
    payload.email,
    "Welcome to CareOS — Your Login Details",
    "temp-password",
    {
      name: payload.name,
      email: payload.email,
      tempPassword,
    },
  );

  return { user: updatedUser };
};

const resolvePasswordChange = async (
  userId: string,
  payload: IChangePasswordPayload,
) => {
  const user = await prisma.user.findUnique({
    where: { id: userId, isDeleted: false },
  });

  if (!user) {
    throw new AppError(status.NOT_FOUND, "User not found");
  }

  // Use BetterAuth's programmatic API to change the password
  // BetterAuth automatically verifies the old password and hashes the new one
  await auth.api.changePassword({
    body: {
      newPassword: payload.newPassword,
      currentPassword: payload.oldPassword || "",
    },
    headers: new Headers({
      "x-user-id": userId,
    }),
  });

  // Update the custom flag in our database
  await prisma.user.update({
    where: { id: userId },
    data: {
      needPasswordChange: false,
    },
  });

  return null;
};
const forgetPassword = async (payload: IForgetPasswordPayload) => {
  const response = await auth.api.sendVerificationOTP({
    body: {
      email: payload.email,
      type: "forget-password",
    },
  });
  return response;
};

const resetPassword = async (payload: IResetPasswordPayload) => {
  const response = await auth.api.resetPasswordEmailOTP({
    body: {
      email: payload.email,
      otp: payload.otp,
      password: payload.newPassword,
    },
  });
  return response;
};

const inviteUser = async (payload: IInviteUserPayload) => {
  const isTenantExist = await prisma.tenant.findUnique({
    where: { id: payload.tenantId },
  });

  if (!isTenantExist) {
    throw new AppError(status.NOT_FOUND, "Tenant not found");
  }

  const isUserExist = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (isUserExist) {
    throw new AppError(status.CONFLICT, "User already exists in the system");
  }

  const existingInvite = await prisma.invitation.findFirst({
    where: {
      email: payload.email,
      tenantId: payload.tenantId,
      status: "PENDING",
    },
  });
  if (existingInvite) {
    throw new AppError(
      status.CONFLICT,
      "An invitation is already pending for this email",
    );
  }

  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const invitation = await prisma.invitation.create({
    data: {
      email: payload.email,
      role: payload.role,
      token,
      expiresAt,
      tenantId: payload.tenantId,
      branchId: payload.branchId,
      classroomId: payload.classroomId,
    },
  });

  const inviteLink = `${envVars.FRONTEND_URL}/accept-invite?token=${token}`;
  console.log(`[INVITE MOCK] To: ${payload.email} | Link: ${inviteLink}`);

  return invitation;
};

const acceptInvite = async (payload: IAcceptInvitePayload) => {
  const invitation = await prisma.invitation.findUnique({
    where: { token: payload.token },
  });

  if (!invitation) {
    throw new AppError(status.NOT_FOUND, "Invalid invitation link");
  }

  if (invitation.status === "ACCEPTED") {
    throw new AppError(status.CONFLICT, "This invitation has already been used");
  }

  if (invitation.status === "EXPIRED" || invitation.expiresAt < new Date()) {
    if (invitation.status !== "EXPIRED") {
      await prisma.invitation.update({
        where: { id: invitation.id },
        data: { status: "EXPIRED" },
      });
    }
    throw new AppError(
      status.GONE,
      "This invitation has expired. Ask your admin to resend it.",
    );
  }

  const isUserExist = await prisma.user.findUnique({
    where: { email: invitation.email },
  });

  if (isUserExist) {
    throw new AppError(status.CONFLICT, "An account with this email already exists");
  }
  await auth.api.signUpEmail({
    body: {
      email: invitation.email,
      password: payload.password,
      name: payload.name,
    },
  });
  const updatedUser = await prisma.user.update({
    where: { email: invitation.email },
    data: {
      role: invitation.role,
      tenantId: invitation.tenantId,
      emailVerified: true,
    },
  });

  const acceptedInvitation = await prisma.invitation.update({
    where: { id: invitation.id },
    data: {
      status: "ACCEPTED",
      acceptedUserId: updatedUser.id,
    },
  });

  return { user: updatedUser, invitation: acceptedInvitation };
};
export const AuthService = {
  registerTenantOwner,
  resolvePasswordChange,
  forgetPassword,
  resetPassword,
  inviteUser,
    acceptInvite,
};
