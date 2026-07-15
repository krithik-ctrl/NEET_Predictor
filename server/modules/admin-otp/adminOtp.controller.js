import {
  sendAdminOtpService,
  resendAdminOtpService,
  verifyAdminOtpService
} from "./adminOtp.service.js";

/*
|--------------------------------------------------------------------------
| Send OTP
|--------------------------------------------------------------------------
*/

export const sendOtpController =
  async (req, res, next) => {

    try {

      const { mobile } =
        req.body;

      const response =
        await sendAdminOtpService(
          mobile
        );

      res.status(200).json(
        response
      );

    } catch (error) {

      next(error);

    }

  };

/*
|--------------------------------------------------------------------------
| Verify OTP
|--------------------------------------------------------------------------
*/

export const verifyOtpController =
  async (req, res, next) => {

    try {

      const {
        mobile,
        otp,
      } = req.body;

      const { user } =
        await verifyAdminOtpService(
          mobile,
          otp,
          res
        );

      res.status(200).json({

        success: true,

        message:
          "Login successful.",

        data: {
          user,
        },

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

export const resendOtpController =
  async (req, res, next) => {

    try {

      const { mobile } =
        req.body;

      const response =
        await resendAdminOtpService(
          mobile
        );

      res.status(200).json(
        response
      );

    } catch (error) {

      next(error);

    }

  };