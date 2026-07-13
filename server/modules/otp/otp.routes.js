import { Router } from "express";

import {
  sendOtpController,
  verifyOtpController,
  resendOtpController,
} from "./otp.controller.js";
const router =
  Router();

router.post(
  "/send-otp",
  sendOtpController
);

router.post(
  "/verify-otp",
  verifyOtpController
);

router.post(
  "/resend-otp",
  resendOtpController
);

export default router;