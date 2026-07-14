import axios from "axios";

const BASE_URL =
  process.env.MSG91_BASE_URL;

const AUTH_KEY =
  process.env.MSG91_AUTH_KEY;

const TEMPLATE_ID =
  process.env.MSG91_TEMPLATE_ID;

const RETRY_TYPE =
  process.env.MSG91_RETRY_TYPE || "text";

/*
|--------------------------------------------------------------------------
| Send OTP
|--------------------------------------------------------------------------
*/

export const sendOtp = async (
  mobile
) => {

  try {
console.log({
    mobile,
    authkey: AUTH_KEY,
    template_id: TEMPLATE_ID
});
    const { data } =
      await axios.post(

        `${BASE_URL}/otp`,

        {},

        {

          params: {

            mobile,

            authkey:
              AUTH_KEY,

            template_id:
              TEMPLATE_ID,

          },

          headers: {

            "Content-Type":
              "application/json",

          },

        }

      );
console.log("MSG91 Response:", data);
    if (
      data.type !==
      "success"
    ) {

      throw new Error(
        data.message ||
          "Failed to send OTP."
      );

    }

    return data;

  } catch (error) {

    console.log("STATUS:");
  console.log(error.response?.status);

  console.log("DATA:");
  console.log(error.response?.data);

  console.log("URL:");
  console.log(error.config?.url);

  console.log("PARAMS:");
  console.log(error.config?.params);

  throw error;

    if (
      error.response
    ) {

      throw new Error(

        error.response.data?.message ||

        "Failed to send OTP."

      );

    }

    throw new Error(
      "Unable to connect to MSG91."
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

      const { data } =
        await axios.get(

          `${BASE_URL}/otp/verify`,

          {

            params: {

              mobile,

              otp,

            },

            headers: {

              authkey:
                AUTH_KEY,

            },

          }

        );

      if (
        data.type !==
        "success"
      ) {

        throw new Error(
          data.message ||
            "Invalid OTP."
        );

      }

      return data;

    } catch (error) {

      if (
        error.response
      ) {

        throw new Error(

          error.response.data?.message ||

          "Invalid OTP."

        );

      }

      throw new Error(
        "Unable to connect to MSG91."
      );

    }

  };

/*
|--------------------------------------------------------------------------
| Retry OTP
|--------------------------------------------------------------------------
*/

export const retryOtp =
  async (
    mobile
  ) => {

    try {

      const { data } =
        await axios.get(

          `${BASE_URL}/otp/retry`,

          {

            params: {

              mobile,

              authkey:
                AUTH_KEY,

              retrytype:
                RETRY_TYPE,

            },

          }

        );

      if (
        data.type !==
        "success"
      ) {

        throw new Error(
          data.message ||
            "Failed to resend OTP."
        );

      }

      return data;

    } catch (error) {

      if (
        error.response
      ) {

        throw new Error(

          error.response.data?.message ||

          "Failed to resend OTP."

        );

      }

      throw new Error(
        "Unable to connect to MSG91."
      );

    }

  };