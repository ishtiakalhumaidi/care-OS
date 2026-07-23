import { Request, Response } from "express";
import status from "http-status";
import { catchAsync } from "../../shared/catchAsync.js";
import { sendResponse } from "../../shared/sendResponse.js";
import { PlanService } from "./plan.service.js";

const createPlan = catchAsync(async (req: Request, res: Response) => {
  const result = await PlanService.createPlan(req.body);
  sendResponse(res, { httpStatusCode: status.CREATED, success: true, message: "Plan created successfully", data: result });
});

const getAllPlans = catchAsync(async (req: Request, res: Response) => {
  const result = await PlanService.getAllPlans();
  sendResponse(res, { httpStatusCode: status.OK, success: true, message: "Plans fetched successfully", data: result });
});

const updatePlan = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await PlanService.updatePlan(id as string, req.body);
  sendResponse(res, { httpStatusCode: status.OK, success: true, message: "Plan updated successfully", data: result });
});

const deletePlan = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await PlanService.deletePlan(id as string);
  sendResponse(res, { httpStatusCode: status.OK, success: true, message: "Plan deleted successfully", data: null });
});

const seedDefaultPlans = catchAsync(async (req: Request, res: Response) => {
  const result = await PlanService.seedDefaultPlans();
  sendResponse(res, { httpStatusCode: status.CREATED, success: true, message: "Default plans seeded successfully", data: result });
});

export const PlanController = { createPlan, getAllPlans, updatePlan, deletePlan, seedDefaultPlans };