import { Router } from "express";

import { authenticateAdmin } from "../../auth/middleware/authenticateAdmin.js";
import { requireSuperAdmin } from "../../auth/middleware/requireSuperAdmin.js";

import {
  getAdminsController,
  getAdminByIdController,
  updateAdminRoleController,
  updateAdminStatusController,
  getAdminActivityController,
  getPermissionCatalogController,
  getAdminPermissionsController,
  updateAdminPermissionsController,
} from "./adminManagement.controller.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Permission Catalog
|--------------------------------------------------------------------------
*/

router.get(
  "/permissions/catalog",
  authenticateAdmin,
  requireSuperAdmin,
  getPermissionCatalogController
);

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

router.get(
  "/admins/:id/permissions",
  authenticateAdmin,
  requireSuperAdmin,
  getAdminPermissionsController
);

router.patch(
  "/admins/:id/permissions",
  authenticateAdmin,
  requireSuperAdmin,
  updateAdminPermissionsController
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
