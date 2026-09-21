import { Router } from "express";

// MODIFIED — added adminGetPredictionCollegesController
import {
  adminGetPredictionHistoryController,
  adminGetPredictionHistoryByIdController,
  adminGetPredictionCollegesController,   // NEW
} from "./predictionHistory.admin.controller.js";

import { authenticateAdmin } from "../../auth/middleware/authenticateAdmin.js";
import { requirePermission } from "../../auth/middleware/requirePermission.js";

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

export default router;