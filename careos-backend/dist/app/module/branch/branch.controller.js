import status from "http-status";
import { catchAsync } from "../../shared/catchAsync.js";
import { sendResponse } from "../../shared/sendResponse.js";
import { BranchService } from "./branch.service.js";
const createBranch = catchAsync(async (req, res) => {
    const payload = req.body;
    // Trust boundary secured: Inject server-side context directly
    payload.tenantId = req.user.tenantId;
    const result = await BranchService.createBranch(payload);
    sendResponse(res, {
        httpStatusCode: status.CREATED,
        success: true,
        message: "Branch created successfully",
        data: result,
    });
});
const getAllBranches = catchAsync(async (req, res) => {
    const tenantId = req.user.tenantId;
    const result = await BranchService.getAllBranches(req.query, tenantId);
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Branches fetched successfully",
        data: result.data,
        meta: result.meta,
    });
});
const getBranchById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const tenantId = req.user.tenantId;
    const result = await BranchService.getBranchById(id, tenantId);
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Branch fetched successfully",
        data: result,
    });
});
const updateBranch = catchAsync(async (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    const tenantId = req.user.tenantId;
    const result = await BranchService.updateBranch(id, payload, tenantId);
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Branch updated successfully",
        data: result,
    });
});
const deleteBranch = catchAsync(async (req, res) => {
    const { id } = req.params;
    const tenantId = req.user.tenantId;
    const result = await BranchService.deleteBranch(id, tenantId);
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Branch deleted successfully",
        data: result,
    });
});
export const BranchController = {
    createBranch,
    getAllBranches,
    getBranchById,
    updateBranch,
    deleteBranch,
};
