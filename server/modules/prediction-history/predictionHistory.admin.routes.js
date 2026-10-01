import { Router } from "express";

// MODIFIED — added adminGetPredictionCollegesController
import {
  adminGetPredictionHistoryController,
  adminGetPredictionHistoryByIdController,
  adminGetPredictionCollegesController,   // NEW
  adminDeletePredictionHistoryController, // ADMIN_V2
} from "./predictionHistory.admin.controller.js";

import { authenticateAdmin } from "../../auth/middleware/authenticateAdmin.js";
import { requirePermission } from "../../auth/middleware/requirePermission.js";
import { bulkDeleteHandler } from "../../common/utils/bulkDelete.js";
import { adminBulkDeletePredictionHistories } from "./predictionHistory.service.js";

const router = Router();

router.get(
  "/",
  authenticateAdmin,
  requirePermission("prediction_history.read"),
  adminGetPredictionHistoryController
);

// NEW — admin paginated colleges for one prediction.
router.get(
  "/:id/colleges",
  authenticateAdmin,
  requirePermission("prediction_history.read"),
  adminGetPredictionCollegesController
);

router.get(
  "/:id",
  authenticateAdmin,
  requirePermission("prediction_history.read"),
  adminGetPredictionHistoryByIdController
);

// ADMIN_V2 — delete any prediction history (hard)
router.delete(
  "/:id",
  authenticateAdmin,
  requirePermission("prediction_history.delete"),
  adminDeletePredictionHistoryController
);

// ADMIN_V2 — bulk delete (max 100) — see API_CHANGES_V2.md
router.post(
  "/bulk-delete",
  authenticateAdmin,
  requirePermission("prediction_history.delete"),
  bulkDeleteHandler(adminBulkDeletePredictionHistories, { action: "prediction_history_bulk_delete" })
);

export default router;