import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest.js";
import { checkAuth } from "../../middleware/checkAuth.js";
import { PlanController } from "./plan.controller.js";
import { PlanValidation } from "./plan.validation.js";
import { Role } from "../../../generated/prisma/enums.js";

const router = Router();

router.post(
  "/seed",
  checkAuth(Role.SUPER_ADMIN),
  PlanController.seedDefaultPlans,
);
router.get("/", PlanController.getAllPlans);
router.post(
  "/",
  checkAuth(Role.SUPER_ADMIN),
  validateRequest(PlanValidation.createPlanZodSchema),
  PlanController.createPlan,
);
router.patch(
  "/:id",
  checkAuth(Role.SUPER_ADMIN),
  validateRequest(PlanValidation.updatePlanZodSchema),
  PlanController.updatePlan,
);
router.delete("/:id", checkAuth(Role.SUPER_ADMIN), PlanController.deletePlan);

export const PlanRoutes = router;
