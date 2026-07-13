import {
  sendOtp,
  verifyOtp,
  retryOtp,
} from "./otp.helper.js";

import {
  getUserByMobile,
} from "../users/user.service.js";

import {
  generateToken,
} from "../../auth/utils/generateToken.js";

import {
  setAuthCookie,
} from "../../auth/utils/setAuthCookie.js";

/*
|--------------------------------------------------------------------------
| Send OTP
|--------------------------------------------------------------------------
*/

export const sendOtpService =
  async (mobile) => {

    if (!mobile) {
      throw new Error(
        "Mobile number is required."
      );
    }

    const user =
      await getUserByMobile(
        mobile
      );

    if (!user) {
      throw new Error(
        "Mobile number is not registered."
      );
    }

    await sendOtp(
      mobile
    );

    return {
      success: true,
      message:
        "OTP sent successfully.",
    };

  };

/*
|--------------------------------------------------------------------------
| Verify OTP
|--------------------------------------------------------------------------
*/

export const verifyOtpService =
  async (
    mobile,
    enteredOtp,
    res
  ) => {

    if (
      !mobile ||
      !enteredOtp
    ) {

      throw new Error(
        "Mobile number and OTP are required."
      );

    }

    await verifyOtp(
      mobile,
      enteredOtp
    );

    const user =
      await getUserByMobile(
        mobile
      );

    if (!user) {

      throw new Error(
        "User not found."
      );

    }

    user.lastLogin =
      new Date();

    await user.save();

    const token =
      generateToken(
        user
      );

    setAuthCookie(
      res,
      token
    );

    return {
  user: {
    id: user._id,

    firstName:
      user.firstName,

    lastName:
      user.lastName,

    mobile:
      user.mobile,

    email:
      user.email,

    avatar:
      user.avatar,

    provider:
      user.provider,
  },
};      

  };

/*
|--------------------------------------------------------------------------
| Resend OTP
|--------------------------------------------------------------------------
*/

export const resendOtpService =
  async (
    mobile
  ) => {

    if (!mobile) {

      throw new Error(
        "Mobile number is required."
      );

    }

    const user =
      await getUserByMobile(
        mobile
      );

    if (!user) {

      throw new Error(
        "Mobile number is not registered."
      );

    }

    await retryOtp(
      mobile
    );

    return {

      success: true,

      message:
        "OTP resent successfully.",

    };

  };