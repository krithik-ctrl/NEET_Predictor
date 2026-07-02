import { Router } from "express";

import {
  getMeController,
  logoutController,
  googleLoginController,
    createPendingUserController
} from "./user.controller.js";

import {
  sendOtpController,
  verifyOtpController,
} from "../otp/otp.controller.js";

import { authenticate } from "../../auth/middleware/authenticate.js";

const router = Router();

//OTP Authentication

router.post(
  "/send-otp",
  sendOtpController
);

router.post(
  "/verify-otp",
  verifyOtpController
);

 //Google Authentication

 router.post(
  "/google-login",
  googleLoginController
);


//user


router.post(
  "/logout",
  logoutController
);

router.get(
  "/me",
  authenticate,
  getMeController
);

router.post(
  "/create-user",
  createPendingUserController
);

export default router;