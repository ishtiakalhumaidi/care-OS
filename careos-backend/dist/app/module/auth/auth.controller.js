import status from "http-status";
import { catchAsync } from "../../shared/catchAsync.js";
import { sendResponse } from "../../shared/sendResponse.js";
import { AuthService } from "./auth.service.js";
const registerTenantOwner = catchAsync(async (req, res) => {
    const result = await AuthService.registerTenantOwner(req.body);
    sendResponse(res, {
        httpStatusCode: status.CREATED,
        success: true,
        message: "Tenant Owner registered successfully",
        data: result,
    });
});
const resolvePasswordChange = catchAsync(async (req, res) => {
    // Assuming you have a standard checkAuth middleware that injects req.user
    const userId = req.user.id;
    await AuthService.resolvePasswordChange(userId, req.body);
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Password updated successfully. You can now access the system.",
        data: null,
    });
});
const forgetPassword = catchAsync(async (req, res) => {
    await AuthService.forgetPassword(req.body);
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Verification code sent to email",
    });
});
const resetPassword = catchAsync(async (req, res) => {
    await AuthService.resetPassword(req.body);
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Password reset successfully",
    });
});
const inviteUser = catchAsync(async (req, res) => {
    const payload = req.body;
    payload.tenantId = req.user.tenantId;
    const result = await AuthService.inviteUser(payload, req.user.role, req.user.branchId);
    sendResponse(res, {
        httpStatusCode: status.CREATED,
        success: true,
        message: "Invitation sent successfully",
        data: result,
    });
});
const acceptInvite = catchAsync(async (req, res) => {
    const result = await AuthService.acceptInvite(req.body);
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Invite accepted successfully",
        data: result,
    });
});
const login = catchAsync(async (req, res) => {
    const result = await AuthService.loginUser(req.body);
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Logged in successfully",
        data: result,
    });
});
const refreshToken = catchAsync(async (req, res) => {
    const { refreshToken } = req.body;
    const result = await AuthService.refreshAccessToken(refreshToken);
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Token refreshed successfully",
        data: result,
    });
});
const getAllInvitations = catchAsync(async (req, res) => {
    const tenantId = req.user.tenantId;
    const branchId = req.user.role === "CENTER_ADMIN" ? req.user.branchId : undefined;
    const result = await AuthService.getAllInvitations(req.query, tenantId, branchId);
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Invitations fetched successfully",
        data: result.data,
        meta: result.meta,
    });
});
const revokeInvitation = catchAsync(async (req, res) => {
    const { id } = req.params;
    const tenantId = req.user.tenantId;
    await AuthService.revokeInvitation(id, tenantId);
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
