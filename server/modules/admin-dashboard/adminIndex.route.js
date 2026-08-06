import { Router } from "express";

// import adminDashboardRoutes
//   from "../admin-dashboard/adminDashboard.routes.js";
import {authenticateAdmin} from "../../auth/middleware/authenticateAdmin.js";

import {authorizeAdmin} from "../../auth/middleware/authorizeAdmin.js";

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