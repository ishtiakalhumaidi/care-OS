import { Request, Response } from "express";
import status from "http-status";
import { catchAsync } from "../../shared/catchAsync.js";
import { sendResponse } from "../../shared/sendResponse.js";
import { AuthService } from "./auth.service.js";

const registerTenantOwner = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthService.registerTenantOwner(req.body);
    
    sendResponse(res, {
        httpStatusCode: status.CREATED,
        success: true,
        message: "Tenant Owner registered successfully",
        data: result,
    });
});

const resolvePasswordChange = catchAsync(async (req: Request, res: Response) => {
    // Assuming you have a standard checkAuth middleware that injects req.user
    const userId = (req as any).user.id; 
    
    await AuthService.resolvePasswordChange(userId, req.body);
    
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Password updated successfully. You can now access the system.",
        data: null,
    });
});
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
    const result = await AuthService.inviteUser(req.body);
    
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
export const AuthController = {
    registerTenantOwner,
    resolvePasswordChange,
    forgetPassword,
    resetPassword,
    inviteUser,
    acceptInvite,
};