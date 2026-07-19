import { Router } from "express";

import {
  exportUsersController,
  previewUsersController,
} from "./exportUsers.controller.js";
import { authenticateAdmin } from "../../../../auth/middleware/authenticateAdmin.js";
import { authorizeAdmin } from "../../../../auth/middleware/authorizeAdmin.js";

const router =
  Router();

router.get(
  "/preview",                              // NEW
  authenticateAdmin,
  authorizeAdmin("admin","sub-admin"),
  previewUsersController
);


router.get(
  "/",
  authenticateAdmin,
  authorizeAdmin("admin","sub-admin"),
  exportUsersController
);

export default router;