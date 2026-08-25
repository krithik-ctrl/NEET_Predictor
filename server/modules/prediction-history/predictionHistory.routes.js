import { Router } from "express";

import { authenticate } from "../../auth/middleware/authenticate.js";

// MODIFIED — added getPredictionCollegesController
import {
  getPredictionHistoryController,
  getPredictionHistoryByIdController,
  getPredictionCollegesController,   // NEW
  deletePredictionHistoryController,
} from "./predictionHistory.controller.js";

const router = Router();

router.get(
  "/",
  authenticate,
  getPredictionHistoryController
);

// NEW — paginated colleges for one prediction.
// MUST be registered BEFORE "/:id" is not required here (different path), but
// keep it above "/:id" for clarity. "/:id/colleges" and "/:id" don't collide.
router.get(
  "/:id/colleges",
  authenticate,
  getPredictionCollegesController
);

router.get(
  "/:id",
  authenticate,
  getPredictionHistoryByIdController
);

router.delete(
  "/:id",
  authenticate,
  deletePredictionHistoryController
);

export default router;