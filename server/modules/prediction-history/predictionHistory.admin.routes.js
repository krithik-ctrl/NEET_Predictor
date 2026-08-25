import { Router } from "express";

// MODIFIED — added adminGetPredictionCollegesController
import {
  adminGetPredictionHistoryController,
  adminGetPredictionHistoryByIdController,
  adminGetPredictionCollegesController,   // NEW
} from "./predictionHistory.admin.controller.js";

import { authenticateAdmin } from "../../auth/middleware/authenticateAdmin.js";
import { authorizeAdmin } from "../../auth/middleware/authorizeAdmin.js";

const router = Router();

router.get(
  "/",
  authenticateAdmin,
  authorizeAdmin("admin", "sub-admin"),
  adminGetPredictionHistoryController
);

// NEW — admin paginated colleges for one prediction.
router.get(
  "/:id/colleges",
  authenticateAdmin,
  authorizeAdmin("admin", "sub-admin"),
  adminGetPredictionCollegesController
);

router.get(
  "/:id",
  authenticateAdmin,
  authorizeAdmin("admin", "sub-admin"),
  adminGetPredictionHistoryByIdController
);

export default router;