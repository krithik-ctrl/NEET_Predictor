import { Router } from "express";

import { authenticate } from "../../auth/middleware/authenticate.js";

import { getDashboardController } from "./dashboard.controller.js";

const router = Router();

router.get(
  "/",
  authenticate,
  getDashboardController
);

export default router;