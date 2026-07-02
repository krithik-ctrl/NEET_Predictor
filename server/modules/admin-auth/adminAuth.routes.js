import express from "express";

import {
  sendLoginOtpController,
  loginAdminController,
  logoutAdminController,
  getAdminProfileController,
} from "./adminAuth.controller.js";

import {
    authenticateAdmin
}from "../../auth/middleware/authenticateAdmin.js"




const router =
  express.Router();

/*
|--------------------------------------------------------------------------
| Authentication
|--------------------------------------------------------------------------
*/

router.post(
  "/send-otp",
  sendLoginOtpController
);

router.post(
  "/login",
  loginAdminController
);

router.post(
  "/logout",
  authenticateAdmin,
  logoutAdminController
);

router.get(
  "/profile",
  authenticateAdmin,
  getAdminProfileController
);

export default router;