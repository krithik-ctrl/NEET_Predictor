import {
  sendOtpService,
  verifyOtpService,
} from "./otp.service.js";

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
        await sendOtpService(
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
        await verifyOtpService(
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