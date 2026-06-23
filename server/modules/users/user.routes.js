import { Router } from "express";

import {
  registerUserController,
  loginUserController,
  logoutController,
  getMeController,
} from "./user.controller.js";

import { authenticate } from "../../auth/middleware/authenticate.js";
import { authorize } from "../../auth/middleware/authorize.js";
const router = Router();

router.post(
  "/register",
  registerUserController
);

router.post(
  "/login",
  loginUserController
);

router.post(
  "/logout",
  logoutController
);

router.get(
  "/me",
  authenticate,
  getMeController
);

router.get(
  "/admin-test",
  authenticate,
  authorize("admin"),
  (req, res) => {
    res.json({
      success: true,
      message: "Admin Access Granted",
    });
  }
);
export default router;