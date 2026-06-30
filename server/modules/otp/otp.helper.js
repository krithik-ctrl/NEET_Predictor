import axios from "axios";

const BASE_URL =
  process.env.MSG91_BASE_URL;

const AUTH_KEY =
  process.env.MSG91_AUTH_KEY;

const TEMPLATE_ID =
  process.env.MSG91_TEMPLATE_ID;

const SENDER_ID =
  process.env.MSG91_SENDER_ID;

/*
|--------------------------------------------------------------------------
| Send OTP
|--------------------------------------------------------------------------
*/

export const sendOtp = async (
  mobile
) => {

  try {

    const response =
      await axios.post(

        `${BASE_URL}/otp`,

        {

          mobile,

          template_id:
            TEMPLATE_ID,

          sender:
            SENDER_ID,

        },

        {

          headers: {

            authkey:
              AUTH_KEY,

            "Content-Type":
              "application/json",

          },

        }

      );

    return response.data;

  } catch (error) {

    if (
      error.response
    ) {

      throw new Error(

        error.response.data?.message ||

        "Failed to send OTP"

      );

    }

    throw new Error(
      "Unable to connect to OTP service"
    );

  }

};

/*
|--------------------------------------------------------------------------
| Verify OTP
|--------------------------------------------------------------------------
*/

export const verifyOtp =
  async (
    mobile,
    otp
  ) => {

    try {

      const response =
        await axios.post(

          `${BASE_URL}/otp/verify`,

          {

            mobile,

            otp,

          },

          {

            headers: {

              authkey:
                AUTH_KEY,

              "Content-Type":
                "application/json",

            },

          }

        );

      return response.data;

    } catch (error) {

      if (
        error.response
      ) {

        throw new Error(

          error.response.data?.message ||

          "Invalid OTP"

        );

      }

      throw new Error(
        "Unable to connect to OTP service"
      );

    }

  };