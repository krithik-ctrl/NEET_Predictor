import express from "express";

import { adminPredictCollegesController } from "./predictor.admin.controller.js";

import { authenticateAdmin } from "../../auth/middleware/authenticateAdmin.js";
import { requirePermission } from "../../auth/middleware/requirePermission.js";

const router = express.Router();

router.post(
  "/",
  authenticateAdmin,
  requirePermission("predictor.use"),
  adminPredictCollegesController
);

export default router;