import { Router } from "express";

// import adminDashboardRoutes
//   from "../admin-dashboard/adminDashboard.routes.js";

import adminUsersRoutes
  from "./admin-users/adminUsers.routes.js";


  import overviewRoutes from './overview/dashboard.routes.js'
const router =
  Router();

/*
|--------------------------------------------------------------------------
| Dashboard
|--------------------------------------------------------------------------
*/

router.use(
  "/overview",
  overviewRoutes

  
);

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