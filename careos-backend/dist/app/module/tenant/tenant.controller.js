import status from "http-status";
import { catchAsync } from "../../shared/catchAsync.js";
import { sendResponse } from "../../shared/sendResponse.js";
import { TenantService } from "./tenant.service.js";
const createTenant = catchAsync(async (req, res) => {
    const payload = req.body;
    const result = await TenantService.createTenant(payload);
    sendResponse(res, {
        httpStatusCode: status.CREATED,
        success: true,
        message: "Tenant created successfully",
        data: result,
    });
});
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
    const result = await TenantService.getTenantById(id);
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Tenant fetched successfully",
        data: result,
    });
});
const updateTenant = catchAsync(async (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    const result = await TenantService.updateTenant(id, payload);
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Tenant updated successfully",
        data: result,
    });
});
const deleteTenant = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await TenantService.deleteTenant(id);
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Tenant deleted successfully",
        data: result,
    });
});
export const TenantController = {
    createTenant,
    getAllTenants,
    getTenantById,
    updateTenant,
    deleteTenant,
};
