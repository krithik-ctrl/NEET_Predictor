import express from "express";

import {
  sendLoginOtpController,
  loginAdminController,
  logoutAdminController,
  getAdminProfileController,
  resendLoginOtpController
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

router.post(
  "/resend-otp",
  resendLoginOtpController
);

export default router;