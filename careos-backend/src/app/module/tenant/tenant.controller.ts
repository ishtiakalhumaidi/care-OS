import { Request, Response } from "express";
import status from "http-status";
import { catchAsync } from "../../shared/catchAsync.js";
import { sendResponse } from "../../shared/sendResponse.js";
import { TenantService } from "./tenant.service.js";
import { IQuery } from "../../interfaces/query.interface.js";

const createTenant = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const result = await TenantService.createTenant(payload);
    
    sendResponse(res, {
        httpStatusCode: status.CREATED,
        success: true,
        message: "Tenant created successfully",
        data: result,
    });
});

const getAllTenants = catchAsync(async (req: Request, res: Response) => {
    const query = req.query;
    const result = await TenantService.getAllTenants(query as IQuery);
    
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Tenants fetched successfully",
        data: result.data,
        meta: result.meta,
    });
});

const getTenantById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await TenantService.getTenantById(id as string);
    
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Tenant fetched successfully",
        data: result,
    });
});

const updateTenant = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;
    const result = await TenantService.updateTenant(id as string, payload);
    
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Tenant updated successfully",
        data: result,
    });
});

const deleteTenant = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await TenantService.deleteTenant(id as string);
    
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