import express from "express";

import { adminPredictCollegesController } from "./predictor.admin.controller.js";

import { authenticateAdmin } from "../../auth/middleware/authenticateAdmin.js";
import { authorizeAdmin } from "../../auth/middleware/authorizeAdmin.js";

const router = express.Router();

router.post(
  "/",
  authenticateAdmin,
  authorizeAdmin("admin", "sub-admin"),
  adminPredictCollegesController
);

export default router;