import { Request, Response } from "express";
import status from "http-status";
import { catchAsync } from "../../shared/catchAsync.js";
import { sendResponse } from "../../shared/sendResponse.js";
import { AuthService } from "./auth.service.js";
import type { IQuery } from "../../interfaces/query.interface.js";

const registerTenantOwner = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.registerTenantOwner(req.body);

  sendResponse(res, {
    httpStatusCode: status.CREATED,
    success: true,
    message: "Tenant Owner registered successfully",
    data: result,
  });
});

const resolvePasswordChange = catchAsync(
  async (req: Request, res: Response) => {
    // Assuming you have a standard checkAuth middleware that injects req.user
    const userId = (req as any).user.id;

    await AuthService.resolvePasswordChange(userId, req.body);

    sendResponse(res, {
      httpStatusCode: status.OK,
      success: true,
      message: "Password updated successfully. You can now access the system.",
      data: null,
    });
  },
);
const forgetPassword = catchAsync(async (req: Request, res: Response) => {
  await AuthService.forgetPassword(req.body);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Verification code sent to email",
  });
});

const resetPassword = catchAsync(async (req: Request, res: Response) => {
  await AuthService.resetPassword(req.body);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Password reset successfully",
  });
});

const inviteUser = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  payload.tenantId = req.user!.tenantId;

  const result = await AuthService.inviteUser(
    payload,
    req.user!.role,
    req.user!.branchId as string,
  );

  sendResponse(res, {
    httpStatusCode: status.CREATED,
    success: true,
    message: "Invitation sent successfully",
    data: result,
  });
});

const acceptInvite = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.acceptInvite(req.body);
  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Invite accepted successfully",
    data: result,
  });
});
const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.loginUser(req.body);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Logged in successfully",
    data: result,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  const result = await AuthService.refreshAccessToken(refreshToken);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Token refreshed successfully",
    data: result,
  });
});

const getAllInvitations = catchAsync(async (req: Request, res: Response) => {
  const tenantId = req.user!.tenantId as string;
  const branchId =
    req.user!.role === "CENTER_ADMIN" ? (req.user!.branchId as string) : undefined;

  const result = await AuthService.getAllInvitations(req.query as IQuery, tenantId, branchId);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Invitations fetched successfully",
    data: result.data,
    meta: result.meta,
  });
});

const revokeInvitation = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const tenantId = req.user!.tenantId as string;
  await AuthService.revokeInvitation(id as string, tenantId);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Invitation revoked successfully",
    data: null,
  });
});
export const AuthController = {
  registerTenantOwner,
  login,
  refreshToken,
  resolvePasswordChange,
  forgetPassword,
  resetPassword,
  inviteUser,
  acceptInvite,
  getAllInvitations,
  revokeInvitation,
};
