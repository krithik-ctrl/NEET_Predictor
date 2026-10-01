import express from "express";

import {
  getPredictionUsageController,
} from "./predictor.controller.js";

import {
  authenticate,
} from "../../auth/middleware/authenticate.js";

const router =
  express.Router();

// GET /predictions/usage — today's prediction usage vs the free daily limit.
router.get(
  "/usage",
  authenticate,
  getPredictionUsageController
);

export default router;
