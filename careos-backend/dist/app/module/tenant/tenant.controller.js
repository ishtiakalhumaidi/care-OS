import status from "http-status";
import { catchAsync } from "../../shared/catchAsync.js";
import { sendResponse } from "../../shared/sendResponse.js";
import { TenantService } from "./tenant.service.js";
import AppError from "../../errorHelpers/AppError.js";
const getAllTenants = catchAsync(async (req, res) => {
    const query = req.query;
    const result = await TenantService.getAllTenants(query);
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Tenants fetched successfully",
        data: result.data,
        meta: result.meta,
    });
});
const getTenantById = catchAsync(async (req, res) => {
    const { id } = req.params;
    if (req.user.role === "TENANT_OWNER" && req.user.tenantId !== id) {
        throw new AppError(status.FORBIDDEN, "You do not have access to this tenant");
    }
    const result = await TenantService.getTenantById(id);
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Tenant retrieved successfully",
        data: result,
    });
});
const updateTenant = catchAsync(async (req, res) => {
    const { id } = req.params;
    if (req.user.role === "TENANT_OWNER" && req.user.tenantId !== id) {
        throw new AppError(status.FORBIDDEN, "You do not have access to this tenant");
    }
    const result = await TenantService.updateTenant(id, req.body);
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Tenant updated successfully",
        data: result,
    });
});
const suspendTenant = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await TenantService.suspendTenant(id, req.body);
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Tenant suspended successfully",
        data: result,
    });
});
const activateTenant = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await TenantService.activateTenant(id);
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Tenant activated successfully",
        data: result,
    });
});
const getTenantAnalytics = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await TenantService.getTenantAnalytics(id);
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Tenant analytics fetched successfully",
        data: result,
    });
});
export const TenantController = {
    getAllTenants,
    getTenantById,
    updateTenant,
    suspendTenant,
    activateTenant,
    getTenantAnalytics,
};
