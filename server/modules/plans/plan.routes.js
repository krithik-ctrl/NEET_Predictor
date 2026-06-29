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

const router =
  Router();

router.post(
  "/",
  authenticate,
  authorize("admin"),
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
  authenticate,
  authorize("admin"),
  updatePlanController
);

router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  deletePlanController
);

export default router;