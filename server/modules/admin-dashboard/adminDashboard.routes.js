import { Router }
from "express";

import {
authenticate,
}
from "../../auth/middleware/authenticate.js";

import {
authorize,
}
from "../../auth/middleware/authorize.js";

import {
getAdminDashboardController,
}
from "./adminDashboard.controller.js";

const router =
Router();

router.get(
"/",
authenticate,
authorize(
"admin"
),
getAdminDashboardController
);

export default router;