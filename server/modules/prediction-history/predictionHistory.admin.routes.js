import { Router } from "express";

import {
  adminGetPredictionHistoryController,
  adminGetPredictionHistoryByIdController,
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

router.get(
  "/:id",
  authenticateAdmin,
  authorizeAdmin("admin", "sub-admin"),
  adminGetPredictionHistoryByIdController
);

export default router;