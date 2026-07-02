// otp.service.js

import bcrypt from "bcryptjs";

import { OTP } from "./otp.model.js";

import {
  getUserByMobile,
} from "../users/user.service.js";

import {
  generateToken,
} from "../../auth/utils/generateToken.js";

import {
  setAuthCookie,
} from "../../auth/utils/setAuthCookie.js";

const OTP_EXPIRY_MINUTES = 5;

const generateOtp = () => {
  return Math.floor(
    100000 + Math.random() * 900000
  ).toString();
};

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

    await OTP.deleteMany({
      mobile,
    });

    const otp =
      generateOtp();

    const hashedOtp =
      await bcrypt.hash(
        otp,
        10
      );

    const expiresAt =
      new Date(
        Date.now() +
          OTP_EXPIRY_MINUTES *
            60 *
            1000
      );

    await OTP.create({
      mobile,
      otp: hashedOtp,
      expiresAt,
    });

    // Temporary Bypass
    console.log(
      `OTP for ${mobile} : ${otp}`
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

    const otpRecord =
      await OTP.findOne({
        mobile,
      });

    if (!otpRecord) {
      throw new Error(
        "OTP not found."
      );
    }

    if (
      otpRecord.expiresAt <
      new Date()
    ) {

      await OTP.deleteOne({
        _id: otpRecord._id,
      });

      throw new Error(
        "OTP has expired."
      );

    }

    const isValid =
      await bcrypt.compare(
        enteredOtp,
        otpRecord.otp
      );

    if (!isValid) {
      throw new Error(
        "Invalid OTP."
      );
    }

    await OTP.deleteOne({
      _id: otpRecord._id,
    });

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
user.isVerified = true;

user.lastLogin = new Date();

await user.save();
    await user.save();

    const token =
      generateToken(user);

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