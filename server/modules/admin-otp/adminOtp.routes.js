import express from "express";

import {
  sendAdminOtpController,
  verifyAdminOtpController,
  resendAdminOtpController,
} from "./adminOtp.controller.js";

const router =
  express.Router();

/*
|--------------------------------------------------------------------------
| Admin OTP
|--------------------------------------------------------------------------
*/

router.post(
  "/send-otp",
  sendAdminOtpController
);

router.post(
  "/verify-otp",
  verifyAdminOtpController
);

router.post(
  "/resend-otp",
  resendAdminOtpController
);

export default router;