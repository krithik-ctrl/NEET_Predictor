import { Router } from "express";

import { authenticateAdmin } from "../../auth/middleware/authenticateAdmin.js";
import { requireSuperAdmin } from "../../auth/middleware/requireSuperAdmin.js";

import {
  getAdminsController,
  getAdminByIdController,
  updateAdminRoleController,
  updateAdminStatusController,
  getAdminActivityController,
} from "./adminManagement.controller.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Admins
|--------------------------------------------------------------------------
*/

router.get(
  "/admins",
  authenticateAdmin,
  requireSuperAdmin,
  getAdminsController
);

router.get(
  "/admins/:id",
  authenticateAdmin,
  requireSuperAdmin,
  getAdminByIdController
);

router.patch(
  "/admins/:id/role",
  authenticateAdmin,
  requireSuperAdmin,
  updateAdminRoleController
);

router.patch(
  "/admins/:id/status",
  authenticateAdmin,
  requireSuperAdmin,
  updateAdminStatusController
);

/*
|--------------------------------------------------------------------------
| Activity
|--------------------------------------------------------------------------
*/

router.get(
  "/activity",
  authenticateAdmin,
  requireSuperAdmin,
  getAdminActivityController
);

export default router;
