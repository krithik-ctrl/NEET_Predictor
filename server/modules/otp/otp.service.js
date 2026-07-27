import {
  sendOtp,
  verifyOtp,
  retryOtp,
  normalizeMobile,
  formatMobileForMSG91
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

/*
|--------------------------------------------------------------------------
| Send OTP
|--------------------------------------------------------------------------
*/

// export const sendOtpService = async (mobile) => {

//   if (!mobile) {
//     throw new Error("Mobile number is required.");
//   }

//   const dbMobile = normalizeMobile(mobile);

//   const msg91Mobile =
//     formatMobileForMSG91(dbMobile);





//   /*
//   |--------------------------------------------------------------------------
//   | Retry User Lookup
//   |--------------------------------------------------------------------------
//   */

//   let user = null;

//   const MAX_RETRIES = 5;

//   const RETRY_DELAY = 300; // milliseconds

//   for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {


//     user = await getUserByMobile(dbMobile);



    
//     if (user) {
//       break;
//     }

//     console.log(
//       `User not found. Retry ${attempt}/${MAX_RETRIES}`
//     );

//     await new Promise(resolve =>
//       setTimeout(resolve, RETRY_DELAY)
//     );

//   }

//   if (!user) {

//     throw new Error(
//       "Mobile number is not registered."
//     );

//   }

//   /*
//   |--------------------------------------------------------------------------
//   | Send OTP
//   |--------------------------------------------------------------------------
//   */


  

//   await sendOtp(msg91Mobile);

//   return {

//     success: true,

//     message: "OTP sent successfully.",

//   };

// };



/*
|--------------------------------------------------------------------------
| Send OTP
|--------------------------------------------------------------------------
*/

export const sendOtpService = async (mobile) => {

  if (!mobile) {
    throw new Error("Mobile number is required.");
  }

  const dbMobile = normalizeMobile(mobile);

  const msg91Mobile =
    formatMobileForMSG91(dbMobile);

  console.log("DB Mobile:", dbMobile);
  console.log("MSG91 Mobile:", msg91Mobile);

  /*
  |--------------------------------------------------------------------------
  | OTP Bypass (Development Only)
  |--------------------------------------------------------------------------
  */

  if (process.env.OTP_BYPASS === "true") {

    const user =
      await getUserByMobile(dbMobile);

    if (!user) {

      throw new Error(
        "Mobile number is not registered."
      );

    }

    console.log(
      "⚠️ OTP BYPASS ENABLED"
    );

    console.log(
      `Use OTP: ${process.env.OTP_BYPASS_CODE || "0000"}`
    );

    return {

      success: true,

      message:
        "OTP sent successfully.",

    };

  }

  /*
  |--------------------------------------------------------------------------
  | Retry User Lookup
  |--------------------------------------------------------------------------
  */

  let user = null;

  const MAX_RETRIES = 5;

  const RETRY_DELAY = 300;

  for (
    let attempt = 1;
    attempt <= MAX_RETRIES;
    attempt++
  ) {

    user =
      await getUserByMobile(
        dbMobile
      );

    if (user) {
      break;
    }

    console.log(
      `User not found. Retry ${attempt}/${MAX_RETRIES}`
    );

    await new Promise(resolve =>
      setTimeout(
        resolve,
        RETRY_DELAY
      )
    );

  }

  if (!user) {

    throw new Error(
      "Mobile number is not registered."
    );

  }

  /*
  |--------------------------------------------------------------------------
  | Send OTP
  |--------------------------------------------------------------------------
  */

  await sendOtp(msg91Mobile);

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

// export const verifyOtpService =
//   async (
//     mobile,
//     enteredOtp,
//     res
//   ) => {

//     const dbMobile =
//       normalizeMobile(
//         mobile
//       );

//     const msg91Mobile =
//       formatMobileForMSG91(
//         dbMobile
//       );

//     if (
//       !mobile ||
//       !enteredOtp
//     ) {

//       throw new Error(
//         "Mobile number and OTP are required."
//       );

//     }

//     await verifyOtp(
//       msg91Mobile,
//       enteredOtp
//     );

//     const user =
//       await getUserByMobile(
//         dbMobile
//       );

//     if (!user) {

//       throw new Error(
//         "User not found."
//       );

//     }

//     user.lastLogin =
//       new Date();
//     user.isVerified=true;
//     await user.save();

//     const token =
//       generateToken(
//         user
//       );

//     setAuthCookie(
//       res,
//       token
//     );

//     return {

//       user: {

//         id:
//           user._id,

//         firstName:
//           user.firstName,

//         lastName:
//           user.lastName,

//         mobile:
//           user.mobile,

//         email:
//           user.email,

//         avatar:
//           user.avatar,

//         provider:
//           user.provider,

//       },

//     };

//   };

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

    const dbMobile =
      normalizeMobile(
        mobile
      );

    const msg91Mobile =
      formatMobileForMSG91(
        dbMobile
      );

    if (
      !mobile ||
      !enteredOtp
    ) {

      throw new Error(
        "Mobile number and OTP are required."
      );

    }

    /*
    |--------------------------------------------------------------------------
    | OTP Bypass (Development Only)
    |--------------------------------------------------------------------------
    */

    if (
      process.env.OTP_BYPASS === "true"
    ) {

      if (
        enteredOtp !==
        (process.env.OTP_BYPASS_CODE || "0000")
      ) {

        throw new Error(
          "Invalid OTP."
        );

      }

      console.log(
        "⚠️ OTP BYPASS VERIFIED"
      );

    } else {

      /*
      |--------------------------------------------------------------------------
      | Verify with MSG91
      |--------------------------------------------------------------------------
      */

      await verifyOtp(
        msg91Mobile,
        enteredOtp
      );

    }

    /*
    |--------------------------------------------------------------------------
    | Get User
    |--------------------------------------------------------------------------
    */

    const user =
      await getUserByMobile(
        dbMobile
      );

    if (!user) {

      throw new Error(
        "User not found."
      );

    }

    /*
    |--------------------------------------------------------------------------
    | Update Login
    |--------------------------------------------------------------------------
    */

    user.lastLogin =
      new Date();

    user.isVerified =
      true;

    await user.save();

    /*
    |--------------------------------------------------------------------------
    | Generate Token
    |--------------------------------------------------------------------------
    */

    const token =
      generateToken(
        user
      );

    setAuthCookie(
      res,
      token
    );

    /*
    |--------------------------------------------------------------------------
    | Response
    |--------------------------------------------------------------------------
    */

    return {

      user: {

        id:
          user._id,

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

    const dbMobile =
      normalizeMobile(
        mobile
      );

    const msg91Mobile =
      formatMobileForMSG91(
        dbMobile
      );

    if (!mobile) {

      throw new Error(
        "Mobile number is required."
      );

    }

    const user =
      await getUserByMobile(
        dbMobile
      );

    if (!user) {

      throw new Error(
        "Mobile number is not registered."
      );

    }

    await retryOtp(
      msg91Mobile
    );

    return {

      success: true,

      message:
        "OTP resent successfully.",

    };

  };