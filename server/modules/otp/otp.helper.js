import axios from "axios";

const BASE_URL =
  process.env.MSG91_BASE_URL;

const AUTH_KEY =
  process.env.MSG91_AUTH_KEY;

const TEMPLATE_ID =
  process.env.MSG91_TEMPLATE_ID;

const RETRY_TYPE =
  process.env.MSG91_RETRY_TYPE || "text";




const handleMSG91Error = (error) => {
  // Axios/network error
  if (error.response) {
    const message =
      error.response.data?.message ||
      "Unknown error";

    switch (message) {
      case "Invalid authkey":
        throw new Error("MSG91 authentication failed.");

      case "Mobile no. empty or not numeric":
        throw new Error("Invalid mobile number.");

      case "Template ID is invalid":
      case "Template ID in your API request is missing, incorrect, or the template has been archived on MSG91.":
        throw new Error("OTP template is not configured correctly.");

      default:
        throw new Error(message);
    }
  }

  // Already parsed/custom errors
  switch (error.message) {
    case "OTP expired":
      throw new Error("OTP has expired.");

    case "OTP not match":
    case "Invalid OTP.":
      throw new Error("Invalid OTP.");

    case "Mobile no. already verified":
      throw new Error(
        "OTP has already been verified. Please request a new OTP."
      );

    case "Maximum retry limit reached":
      throw new Error(
        "Maximum OTP retry limit reached."
      );

    case "Unable to connect to MSG91.":
      throw error;

    default:
      throw new Error(error.message || "Something went wrong.");
  }
};

/*
|--------------------------------------------------------------------------
| Send OTP
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| Send OTP
|--------------------------------------------------------------------------
*/

export const sendOtp = async (
  mobile
) => {

  try {

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

    handleMSG91Error(error);

  }

};

/*
|--------------------------------------------------------------------------
| Verify OTP
|--------------------------------------------------------------------------
*/

export const verifyOtp = async (
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
      data.type !== "success"
    ) {

      throw new Error(
        data.message ||
        "OTP verification failed."
      );

    }

    return data;

  } catch (error) {

  handleMSG91Error(error);

   
  }

};

/*
|--------------------------------------------------------------------------
| Retry OTP
|--------------------------------------------------------------------------
*/

export const retryOtp = async (
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
      data.type !== "success"
    ) {

      throw new Error(
        data.message ||
        "Failed to resend OTP."
      );

    }

    return data;

  } catch (error) {
handleMSG91Error(error);

  }

};


export const normalizeMobile = (mobile) => {

  const number =
    String(mobile)
      .replace(/\D/g, "");

  if (
    number.length === 13 &&
    number.startsWith("091")
  ) {
    return number.slice(3);
  }

  if (
    number.length === 12 &&
    number.startsWith("91")
  ) {
    return number.slice(2);
  }

  return number;

};

export const formatMobileForMSG91 = (mobile) => {
  return mobile.startsWith("91")
    ? mobile
    : `91${mobile}`;
};