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
import { bulkDeleteHandler } from "../../common/utils/bulkDelete.js";
import { bulkDeletePlans } from "./plan.service.js";

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

// ADMIN_V2 — bulk delete (max 100) — see API_CHANGES_V2.md
router.post(
  "/bulk-delete",
  authenticateAdmin,
  requirePermission("plans.delete"),
  bulkDeleteHandler(bulkDeletePlans, { action: "plan_bulk_delete" })
);

export default router;