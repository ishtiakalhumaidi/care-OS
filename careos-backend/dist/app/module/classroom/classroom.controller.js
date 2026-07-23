import status from "http-status";
import { catchAsync } from "../../shared/catchAsync.js";
import { sendResponse } from "../../shared/sendResponse.js";
import { ClassroomService } from "./classroom.service.js";
const createClassroom = catchAsync(async (req, res) => {
    const tenantId = req.user.tenantId;
    const result = await ClassroomService.createClassroom(req.body, tenantId);
    sendResponse(res, {
        httpStatusCode: status.CREATED,
        success: true,
        message: "Classroom created successfully",
        data: result,
    });
});
const getAllClassrooms = catchAsync(async (req, res) => {
    const tenantId = req.user.tenantId;
    const result = await ClassroomService.getAllClassrooms(req.query, tenantId);
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Classrooms fetched successfully",
        data: result.data,
        meta: result.meta,
    });
});
const getClassroomById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const tenantId = req.user.tenantId;
    const result = await ClassroomService.getClassroomById(id, tenantId);
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Classroom retrieved successfully",
        data: result,
    });
});
const updateClassroom = catchAsync(async (req, res) => {
    const { id } = req.params;
    const tenantId = req.user.tenantId;
    const result = await ClassroomService.updateClassroom(id, req.body, tenantId);
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Classroom updated successfully",
        data: result,
    });
});
const deleteClassroom = catchAsync(async (req, res) => {
    const { id } = req.params;
    const tenantId = req.user.tenantId;
    const result = await ClassroomService.deleteClassroom(id, tenantId);
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Classroom deleted successfully",
        data: result,
    });
});
const assignTeacher = catchAsync(async (req, res) => {
    const { id } = req.params;
    const tenantId = req.user.tenantId;
    const staffBranchId = req.user.role === "TENANT_OWNER" ? undefined : req.user.branchId;
    const result = await ClassroomService.assignTeacher(id, req.body, tenantId, staffBranchId);
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Teacher assigned successfully",
        data: result,
    });
});
const unassignTeacher = catchAsync(async (req, res) => {
    const { id, userId } = req.params;
    const tenantId = req.user.tenantId;
    const staffBranchId = req.user.role === "TENANT_OWNER" ? undefined : req.user.branchId;
    await ClassroomService.unassignTeacher(id, userId, tenantId, staffBranchId);
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Teacher unassigned successfully",
        data: null,
    });
});
export const ClassroomController = {
    createClassroom,
    getAllClassrooms,
    getClassroomById,
    updateClassroom,
    deleteClassroom,
    assignTeacher,
    unassignTeacher,
};
