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
  deleteAdminController
} from "./adminUsers.controller.js";

import {authenticateAdmin} from "../../../auth/middleware/authenticateAdmin.js";

import {authorizeAdmin} from "../../../auth/middleware/authorizeAdmin.js";
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
  authorizeAdmin("admin"),
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
  authorizeAdmin("admin"),
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
  authorizeAdmin("admin"),
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
  authorizeAdmin("admin"),
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
  authorizeAdmin("admin"),
  getUserDetailsController
);

/*
|--------------------------------------------------------------------------
| Admin Details
|--------------------------------------------------------------------------
*/

router.get(
  "/:adminId",
  authenticateAdmin,
  authorizeAdmin("admin"),
  getAdminDetailsController
);





export default router;