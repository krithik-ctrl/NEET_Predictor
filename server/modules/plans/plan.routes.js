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
import { authorizeAdmin } from "../../auth/middleware/authorizeAdmin.js";

const router =
  Router();

router.post(
  "/",
  authenticateAdmin,
  authorizeAdmin("admin"),
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
  authorizeAdmin("admin"),
  updatePlanController
);

router.delete(
  "/:id",
  authenticateAdmin,
  authorizeAdmin("admin"),
  deletePlanController
);

export default router;