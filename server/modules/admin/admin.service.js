import bcrypt from "bcryptjs";

import { Admin } from "./admin.model.js";


/*
|--------------------------------------------------------------------------
| Create Admin
|--------------------------------------------------------------------------
*/

export const createAdmin = async ({
  firstName,
  lastName,
  email,
  mobile,
  password,
}) => {

  const existingMobile =
    await Admin.findOne({
      mobile,
    });

  if (existingMobile) {
    throw new Error(
      "Mobile number already exists."
    );
  }

  if (email) {

    const existingEmail =
      await Admin.findOne({
        email,
      });

    if (existingEmail) {
      throw new Error(
        "Email already exists."
      );
    }

  }

  const hashedPassword =
    await bcrypt.hash(
      password,
      10
    );

  const admin =
    await Admin.create({

      firstName,

      lastName,

      email:
        email || undefined,

      mobile,

      password:
        hashedPassword,

      role: "admin",

      isVerified: false,

      isActive: true,

    });

  return admin;

};

/*
|--------------------------------------------------------------------------
| Get All Admins
|--------------------------------------------------------------------------
*/

export const getAdmins =
  async () => {

    return await Admin.find({
      isActive: true,
    })
      .select("-password")
      .sort({
        createdAt: -1,
      });

  };

/*
|--------------------------------------------------------------------------
| Get Admin By ID
|--------------------------------------------------------------------------
*/

export const getAdminById =
  async (adminId) => {

    const admin =
      await Admin.findById(
        adminId
      ).select("-password");

    if (!admin) {
      throw new Error(
        "Admin not found."
      );
    }

    return admin;

  };

/*
|--------------------------------------------------------------------------
| Update Admin
|--------------------------------------------------------------------------
*/

export const updateAdmin =
  async (
    adminId,
    payload
  ) => {

    const admin =
      await Admin.findById(
        adminId
      );

    if (!admin) {
      throw new Error(
        "Admin not found."
      );
    }

    if (
      payload.mobile &&
      payload.mobile !==
        admin.mobile
    ) {

      const existingMobile =
        await Admin.findOne({
          mobile:
            payload.mobile,
          _id: {
            $ne: adminId,
          },
        });

      if (
        existingMobile
      ) {
        throw new Error(
          "Mobile number already exists."
        );
      }

    }

    if (
      payload.email &&
      payload.email !==
        admin.email
    ) {

      const existingEmail =
        await Admin.findOne({
          email:
            payload.email,
          _id: {
            $ne: adminId,
          },
        });

      if (
        existingEmail
      ) {
        throw new Error(
          "Email already exists."
        );
      }

    }

    Object.assign(
      admin,
      payload
    );

    await admin.save();

    return await Admin.findById(
      adminId
    ).select("-password");

  };

/*
|--------------------------------------------------------------------------
| Delete Admin (Soft Delete)
|--------------------------------------------------------------------------
*/

export const deleteAdmin =
  async (adminId) => {

    const admin =
      await Admin.findById(
        adminId
      );

    if (!admin) {
      throw new Error(
        "Admin not found."
      );
    }

    admin.isActive =
      false;

    await admin.save();

    return;

  };