import { Router } from "express";

// import adminDashboardRoutes
//   from "../admin-dashboard/adminDashboard.routes.js";

import adminUsersRoutes
  from "./admin-users/adminUsers.routes.js";

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
| Users
|--------------------------------------------------------------------------
*/

router.use(
  "/users",
  adminUsersRoutes
);

export default router;