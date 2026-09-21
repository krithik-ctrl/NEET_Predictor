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
  deactivateStudentController
} from "./adminUsers.controller.js";

import {authenticateAdmin} from "../../../auth/middleware/authenticateAdmin.js";

import {requirePermission} from "../../../auth/middleware/requirePermission.js";
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
| Deactivate Student (soft delete)
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