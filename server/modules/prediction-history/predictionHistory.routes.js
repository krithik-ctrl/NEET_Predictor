import { Router } from "express";

import { authenticate } from "../../auth/middleware/authenticate.js";

import {
  getPredictionHistoryController,
  getPredictionHistoryByIdController,
  deletePredictionHistoryController,
} from "./predictionHistory.controller.js";

const router = Router();

router.get(
  "/",
  authenticate,
  getPredictionHistoryController
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