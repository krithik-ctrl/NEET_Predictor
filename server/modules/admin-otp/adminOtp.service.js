import {
  sendAdminOtp,
  verifyAdminOtp,
  retryAdminOtp,
  normalizeMobile,
  formatMobileForMSG91,
} from "./adminOtp.helper.js";

import { getAdminByMobile } from "../admin-auth/adminAuth.service.js";

/*
|--------------------------------------------------------------------------
| Send OTP
|--------------------------------------------------------------------------
*/

export const sendAdminOtpService = async (mobile) => {

  if (!mobile) {
    throw new Error(
      "Mobile number is required."
    );
  }

  const dbMobile =
    normalizeMobile(mobile);

  const msg91Mobile =
    formatMobileForMSG91(dbMobile);

  const admin =
    await getAdminByMobile(dbMobile);

  if (!admin) {
    throw new Error(
      "Admin not found."
    );
  }

  await sendAdminOtp(msg91Mobile);

  return {
    success: true,
    message: "OTP sent successfully.",
  };
};

/*
|--------------------------------------------------------------------------
| Verify OTP
|--------------------------------------------------------------------------
*/

export const verifyAdminOtpService = async (
  mobile,
  enteredOtp
) => {

  if (!mobile || !enteredOtp) {
    throw new Error(
      "Mobile number and OTP are required."
    );
  }

  const dbMobile =
    normalizeMobile(mobile);

  const msg91Mobile =
    formatMobileForMSG91(dbMobile);

  const admin =
    await getAdminByMobile(dbMobile);

  if (!admin) {
    throw new Error(
      "Admin not found."
    );
  }

  await verifyAdminOtp(
    msg91Mobile,
    enteredOtp
  );

  return {
    success: true,
    message: "OTP verified successfully.",
  };
};

/*
|--------------------------------------------------------------------------
| Resend OTP
|--------------------------------------------------------------------------
*/

export const resendAdminOtpService = async (
  mobile
) => {

  if (!mobile) {
    throw new Error(
      "Mobile number is required."
    );
  }

  const dbMobile =
    normalizeMobile(mobile);

  const msg91Mobile =
    formatMobileForMSG91(dbMobile);

  const admin =
    await getAdminByMobile(dbMobile);

  if (!admin) {
    throw new Error(
      "Admin not found."
    );
  }

  await retryAdminOtp(msg91Mobile);

  return {
    success: true,
    message: "OTP resent successfully.",
  };
};