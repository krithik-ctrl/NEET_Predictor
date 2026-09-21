import { Router } from "express";

import {
  exportUsersController,
  previewUsersController,
    exportUsersExcelController,
} from "./exportUsers.controller.js";
import { authenticateAdmin } from "../../../../auth/middleware/authenticateAdmin.js";

const router =
  Router();

// NOTE: authorization for these routes is enforced once, at the mount point
// in adminUsers.routes.js (authenticateAdmin + requirePermission("reports.export")).
// These routes only re-run authenticateAdmin (harmless/idempotent) and no
// longer duplicate a role check here, so a sub-admin granted "reports.export"
// isn't blocked by a second, stricter gate.

router.get(
  "/preview",                              // NEW
  authenticateAdmin,
  previewUsersController
);


router.get(
  "/",
  authenticateAdmin,
  exportUsersController
);
router.get(
  "/excel",
  authenticateAdmin,
  exportUsersExcelController
);
export default router;