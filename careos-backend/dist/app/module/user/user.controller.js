import status from "http-status";
import { catchAsync } from "../../shared/catchAsync.js";
import { sendResponse } from "../../shared/sendResponse.js";
import { UserService } from "./user.service.js";
import { uploadToCloudinary } from "../../config/cloudinary.config.js";
const getAllUsers = catchAsync(async (req, res) => {
    const tenantId = req.user.tenantId;
    const result = await UserService.getAllUsers(req.query, tenantId);
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Users fetched successfully",
        data: result.data,
        meta: result.meta,
    });
});
const getMe = catchAsync(async (req, res) => {
    const result = await UserService.getMe(req.user.id);
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Profile fetched successfully",
        data: result,
    });
});
const updateMe = catchAsync(async (req, res) => {
    const payload = req.body;
    if (req.file) {
        const result = await uploadToCloudinary(req.file.buffer, `users/${req.user.id}/avatar`);
        payload.image = result.secure_url;
    }
    const result = await UserService.updateMe(req.user.id, payload);
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Profile updated successfully",
        data: result,
    });
});
export const UserController = {
    getMe,
    updateMe,
    getAllUsers,
};
