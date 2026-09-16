import { Router } from "express";

import {
  exportUsersController,
  previewUsersController,
    exportUsersExcelController,
} from "./exportUsers.controller.js";
import { authenticateAdmin } from "../../../../auth/middleware/authenticateAdmin.js";
import { authorizeAdmin } from "../../../../auth/middleware/authorizeAdmin.js";

const router =
  Router();

router.get(
  "/preview",                              // NEW
  authenticateAdmin,
  authorizeAdmin("admin",),
  previewUsersController
);


router.get(
  "/",
  authenticateAdmin,
  authorizeAdmin("admin",),
  exportUsersController
);
router.get(
  "/excel",
  authenticateAdmin,
  authorizeAdmin("admin"),
  exportUsersExcelController
);
export default router;