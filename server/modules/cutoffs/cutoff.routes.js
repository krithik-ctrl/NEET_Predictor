import express from "express";

import {
  createCutoffController,
  getCutoffsController,
  getCutoffByIdController,
  updateCutoffController,
  deleteCutoffController,
  getCutoffTrendsController,
  getCutoffExplorerController
} from "./cutoff.controller.js";

import {

  authenticateAdmin,
} from "../../auth/middleware/authenticateAdmin.js";

import { requirePermission } from "../../auth/middleware/requirePermission.js";

import { authenticate } from "../../auth/middleware/authenticate.js";

const router =
  express.Router();
router.get("/trends", getCutoffTrendsController);
router.get("/explorer", getCutoffExplorerController);
router.post(
  "/",
  authenticateAdmin,
  requirePermission("cutoffs.create"),
  createCutoffController
);

router.get(
  "/",

  getCutoffsController
);

router.get(
  "/:id",
  
  getCutoffByIdController
);

router.patch(
  "/:id",
  authenticateAdmin,
  requirePermission("cutoffs.update"),
  updateCutoffController
);

router.delete(
  "/:id",
  authenticateAdmin,
  requirePermission("cutoffs.delete"),
  deleteCutoffController
);


export default router;