import crypto from "crypto";

import { Admin } from "../admin/admin.model.js";
import { AdminOtp } from "./adminOtp.model.js";

/*
|--------------------------------------------------------------------------
| Generate OTP
|--------------------------------------------------------------------------
*/

const generateAdminOtp = () => {

  return crypto
    .randomInt(100000, 999999)
    .toString();

};

/*
|--------------------------------------------------------------------------
| Send OTP
|--------------------------------------------------------------------------
*/

export const sendAdminOtp = async ({
  mobile,
}) => {

  if (!mobile) {
    throw new Error(
      "Mobile number is required."
    );
  }

  const admin =
    await Admin.findOne({
      mobile,
      isActive: true,
    });

  if (!admin) {
    throw new Error(
      "Admin not found."
    );
  }

  await AdminOtp.deleteMany({
    mobile,
  });

  const otp =
    generateAdminOtp();

  const expiresAt =
    new Date(
      Date.now() +
      5 * 60 * 1000
    );

  await AdminOtp.create({

    mobile,

    otp,

    expiresAt,

  });

  /*
  |--------------------------------------------------------------------------
  | TODO
  | Integrate SMS Provider
  |--------------------------------------------------------------------------
  */

  console.log(
    `Admin OTP for ${mobile}: ${otp}`
  );

  return {
    message:
      "OTP sent successfully.",
  };

};

/*
|--------------------------------------------------------------------------
| Verify OTP
|--------------------------------------------------------------------------
*/

export const verifyAdminOtp = async ({
  mobile,
  otp,
}) => {

  if (!mobile || !otp) {
    throw new Error(
      "Mobile and OTP are required."
    );
  }

  const otpRecord =
    await AdminOtp.findOne({

      mobile,

      otp,

      verified: false,

    });

  if (!otpRecord) {
    throw new Error(
      "Invalid OTP."
    );
  }

  if (
    otpRecord.expiresAt <
    new Date()
  ) {

    await otpRecord.deleteOne();

    throw new Error(
      "OTP has expired."
    );

  }

  otpRecord.verified =
    true;

  await otpRecord.save();

  return {
    message:
      "OTP verified successfully.",
  };

};

/*
|--------------------------------------------------------------------------
| Resend OTP
|--------------------------------------------------------------------------
*/

export const resendAdminOtp =
  async ({
    mobile,
  }) => {

    return await sendAdminOtp({
      mobile,
    });

  };