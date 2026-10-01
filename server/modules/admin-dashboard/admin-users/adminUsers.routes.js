import { Router } from "express";

// import adminDashboardRoutes
//   from "../admin-dashboard/adminDashboard.routes.js";

import adminUsersRoutes
  from "../admin-users/adminUsers.routes.js";

import exportUsersRoutes
  from "./pdf-export/exportUsers.routes.js";

import {
  getAdminUsersController,
  createAdminController,
  updateAdminController,
    getUserDetailsController,
  getAdminDetailsController,
  deleteAdminController,
  deactivateStudentController,
  bulkDeleteStudentsController
} from "./adminUsers.controller.js";

import {authenticateAdmin} from "../../../auth/middleware/authenticateAdmin.js";

import {requirePermission} from "../../../auth/middleware/requirePermission.js";
import { bulkDeleteHandler } from "../../../common/utils/bulkDelete.js";
import { bulkDeleteAdminUsers } from "./services/delete-admin-user.service.js";
const router =
  Router();

/*
|--------------------------------------------------------------------------
| Dashboard
|--------------------------------------------------------------------------
*/

// router.use(
//   "/dashboard",
//   adminDashboardRoutes
// );

/*
|--------------------------------------------------------------------------
| Export Users
|--------------------------------------------------------------------------
*/


router.use(
  "/export",
    authenticateAdmin,
  requirePermission("reports.export"),
  exportUsersRoutes
);



/*
|--------------------------------------------------------------------------
| Users
|--------------------------------------------------------------------------
*/



/*
|--------------------------------------------------------------------------
| Get Users
|--------------------------------------------------------------------------
*/

router.get(
  "/",
  authenticateAdmin,
  requirePermission("users.read"),
  getAdminUsersController
);

/*
|--------------------------------------------------------------------------
| Create Admin
|--------------------------------------------------------------------------
*/

router.post(
  "/",
  authenticateAdmin,
  requirePermission("admin_users.create"),
  createAdminController
);

/*
|--------------------------------------------------------------------------
| Bulk Delete Students (permanent, cascade, max 100)
|--------------------------------------------------------------------------
*/

router.post(
  "/bulk-delete",
  authenticateAdmin,
  requirePermission("students.delete"),
  bulkDeleteStudentsController
);

/*
|--------------------------------------------------------------------------
| Bulk Delete Admins (ADMIN_V2, max 100)
|--------------------------------------------------------------------------
*/

router.post(
  "/admins/bulk-delete",
  authenticateAdmin,
  requirePermission("admin_users.delete"),
  bulkDeleteHandler(bulkDeleteAdminUsers, { action: "admin_bulk_delete" })
);

/*
|--------------------------------------------------------------------------
| Update Admin
|--------------------------------------------------------------------------
*/

router.patch(
  "/:adminId",
  authenticateAdmin,
  requirePermission("admin_users.update"),
  updateAdminController
);



/*
|--------------------------------------------------------------------------
| Delete Admin
|--------------------------------------------------------------------------
*/

router.delete(
  "/:adminId",
  authenticateAdmin,
  requirePermission("admin_users.delete"),
  deleteAdminController
);



/*
|--------------------------------------------------------------------------
| Student Details
|--------------------------------------------------------------------------
*/

router.get(
  "/student/:userId",
  authenticateAdmin,
  requirePermission("students.read"),
  getUserDetailsController
);

/*
|--------------------------------------------------------------------------
| Delete Student (permanent, cascade — was soft delete before ADMIN_V2)
|--------------------------------------------------------------------------
*/

router.delete(
  "/student/:id",
  authenticateAdmin,
  requirePermission("students.delete"),
  deactivateStudentController
);

/*
|--------------------------------------------------------------------------
| Admin Details
|--------------------------------------------------------------------------
*/

router.get(
  "/:adminId",
  authenticateAdmin,
  requirePermission("admin_users.read"),
  getAdminDetailsController
);





export default router;