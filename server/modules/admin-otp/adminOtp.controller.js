import {
  sendAdminOtp,
  verifyAdminOtp,
  resendAdminOtp,
} from "./adminOtp.service.js";

/*
|--------------------------------------------------------------------------
| Send OTP
|--------------------------------------------------------------------------
*/

export const sendAdminOtpController =
  async (req, res, next) => {
    try {

      const response =
        await sendAdminOtp(
          req.body
        );

      res.status(200).json({
        success: true,
        ...response,
      });

    } catch (error) {
      next(error);
    }
  };

/*
|--------------------------------------------------------------------------
| Verify OTP
|--------------------------------------------------------------------------
*/

export const verifyAdminOtpController =
  async (req, res, next) => {
    try {

      const response =
        await verifyAdminOtp(
          req.body
        );

      res.status(200).json({
        success: true,
        ...response,
      });

    } catch (error) {
      next(error);
    }
  };

/*
|--------------------------------------------------------------------------
| Resend OTP
|--------------------------------------------------------------------------
*/

export const resendAdminOtpController =
  async (req, res, next) => {
    try {

      const response =
        await resendAdminOtp(
          req.body
        );

      res.status(200).json({
        success: true,
        ...response,
      });

    } catch (error) {
      next(error);
    }
  };