import { Router } from "express";

import {
  authorize,
} from "../../auth/middleware/authorize.js";

import { authenticate } from "../../auth/middleware/authenticate.js";
import {
  createPlanSchema,
  updatePlanSchema,
} from "./plan.validation.js";

import {
  createPlanController,
  getPlansController,
  getPlanByIdController,
  updatePlanController,
  deletePlanController,
} from "./plan.controller.js";
import { authenticateAdmin } from "../../auth/middleware/authenticateAdmin.js";
import { requirePermission } from "../../auth/middleware/requirePermission.js";

const router =
  Router();

router.post(
  "/",
  authenticateAdmin,
  requirePermission("plans.create"),
  createPlanController
);

router.get(
  "/",
  getPlansController
);

router.get(
  "/:id",
  getPlanByIdController
);

router.patch(
  "/:id",
  authenticateAdmin,
  requirePermission("plans.update"),
  updatePlanController
);

router.delete(
  "/:id",
  authenticateAdmin,
  requirePermission("plans.delete"),
  deletePlanController
);

export default router;