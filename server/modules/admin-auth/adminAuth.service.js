import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { Admin } from "../admin/admin.model.js";

import {
  sendAdminOtpService,
  verifyAdminOtpService,
  resendAdminOtpService
} from "../admin-otp/adminOtp.service.js";




/*
|--------------------------------------------------------------------------
| Send Login OTP
|--------------------------------------------------------------------------
*/

export const sendLoginOtp = async ({
  mobile,
  password,
}) => {

  if (!mobile || !password) {
    throw new Error(
      "Mobile number and password are required."
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

  const passwordMatched =
    await bcrypt.compare(
      password,
      admin.password
    );

  if (!passwordMatched) {
    throw new Error(
      "Invalid password."
    );
  }

 await sendAdminOtpService(
  mobile
);

  return {
    message:
      "OTP sent successfully.",
  };

};

/*
|--------------------------------------------------------------------------
| Login Admin
|--------------------------------------------------------------------------
*/

export const loginAdmin = async ({
  mobile,
  otp,
}) => {

  if (!mobile || !otp) {
    throw new Error(
      "Mobile number and OTP are required."
    );
  }

await verifyAdminOtpService(
  mobile,
  otp
);

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

  admin.lastLogin =
    new Date();

  admin.isVerified =
    true;

  await admin.save();

  const token =
    jwt.sign(
      {
        adminId: admin._id,
        role: admin.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

  return {

    token,

    admin: {

      _id: admin._id,

      firstName:
        admin.firstName,

      lastName:
        admin.lastName,

      mobile:
        admin.mobile,

      email:
        admin.email,

      role:
        admin.role,

    },

  };

};

/*
|--------------------------------------------------------------------------
| Logout
|--------------------------------------------------------------------------
*/

export const logoutAdmin =
  async () => {

    return {
      message:
        "Logged out successfully.",
    };

  };

/*
|--------------------------------------------------------------------------
| Profile
|--------------------------------------------------------------------------
*/

export const getAdminProfile =
  async (
    adminId
  ) => {

    const admin =
      await Admin.findById(
        adminId
      ).select(
        "-password"
      );

    if (!admin) {
      throw new Error(
        "Admin not found."
      );
    }

    return admin;

  };


  /*
|--------------------------------------------------------------------------
| Get Admin By Mobile
|--------------------------------------------------------------------------
*/

export const getAdminByMobile = async (mobile) => {
  return await Admin.findOne({
    mobile,
    isActive: true,
  });
};



export const resendLoginOtp = async ({ mobile }) => {
  return await resendAdminOtpService(mobile);
};