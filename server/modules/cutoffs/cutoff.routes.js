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
import { bulkDeleteHandler } from "../../common/utils/bulkDelete.js";
import { bulkDeleteCutoffs } from "./cutoff.service.js";

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


// ADMIN_V2 — bulk delete (max 100) — see API_CHANGES_V2.md
router.post(
  "/bulk-delete",
  authenticateAdmin,
  requirePermission("cutoffs.delete"),
  bulkDeleteHandler(bulkDeleteCutoffs, { action: "cutoff_bulk_delete" })
);

export default router;