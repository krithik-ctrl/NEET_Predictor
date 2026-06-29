import { Router } from "express";

import {
  authenticate,
} from "../../auth/middleware/authenticate.js";

import {
  authorize,
} from "../../auth/middleware/authorize.js";

import {
  getCounsellorDashboardController,
  getStudentsController,
  getStudentByIdController,
} from "./counsellorDashboard.controller.js";

const router =
  Router();

router.get(
  "/",
  authenticate,
  authorize(
    "admin",
    "counsellor"
  ),
  getCounsellorDashboardController
);

router.get(
  "/students",
  authenticate,
  authorize(
    "admin",
    "counsellor"
  ),
  getStudentsController
);

router.get(
  "/student/:id",
  authenticate,
  authorize(
    "admin",
    "counsellor"
  ),
  getStudentByIdController
);

export default router;