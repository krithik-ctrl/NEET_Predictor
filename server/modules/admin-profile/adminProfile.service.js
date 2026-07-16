import bcrypt from "bcryptjs";


import { Admin } from "../admin/admin.model.js";

export const getAdminProfile = async (
  adminId
) => {

  if (!adminId) {
    throw new Error(
      "Admin ID is required"
    );
  }

  const admin =
    await Admin.findById(adminId)
      .select(
        "firstName lastName email mobile role isVerified isActive lastLogin createdAt"
      );

  if (!admin) {
    throw new Error(
      "Admin not found"
    );
  }

  return {

    account: {

      firstName:
        admin.firstName,

      lastName:
        admin.lastName,

      fullName:
        `${admin.firstName} ${admin.lastName}`,

      email:
        admin.email,

      mobile:
        admin.mobile,

      role:
        admin.role,

      isVerified:
        admin.isVerified,

    },

    activity: {

      lastLogin:
        admin.lastLogin,

      accountStatus:
        admin.isActive
          ? "Active"
          : "Inactive",

      memberSince:
        admin.createdAt,

    },

  };

};

export const updateAdminProfile =
  async (
    adminId,
    payload
  ) => {

    if (!adminId) {
      throw new Error(
        "Admin ID is required"
      );
    }

    const admin =
      await Admin.findById(
        adminId
      );

    if (!admin) {
      throw new Error(
        "Admin not found"
      );
    }

    const {

      firstName,

      lastName,

      email,

      mobile,

    } = payload;

    if (

      firstName === undefined &&

      lastName === undefined &&

      email === undefined &&

      mobile === undefined

    ) {

      throw new Error(
        "No valid fields provided for update"
      );

    }

    if (
      firstName !== undefined
    ) {

      admin.firstName =
        firstName;

    }

    if (
      lastName !== undefined
    ) {

      admin.lastName =
        lastName;

    }

    if (
      email !== undefined
    ) {

      admin.email =
        email;

    }

    if (
      mobile !== undefined
    ) {

      admin.mobile =
        mobile;

    }

    await admin.save();

    return await getAdminProfile(
      adminId
    );

  };



export const changeAdminPassword =
  async (
    adminId,
    payload
  ) => {

    if (!adminId) {
      throw new Error(
        "Admin ID is required"
      );
    }

    const {

      currentPassword,

      newPassword,

    } = payload;

    if (
      !currentPassword ||
      !newPassword
    ) {
      throw new Error(
        "Current password and new password are required"
      );
    }

    const admin =
      await Admin.findById(
        adminId
      ).select(
        "+password"
      );

    if (!admin) {
      throw new Error(
        "Admin not found"
      );
    }

    const isMatch =
      await bcrypt.compare(
        currentPassword,
        admin.password
      );

    if (!isMatch) {
      throw new Error(
        "Current password is incorrect"
      );
    }

    if (
      currentPassword ===
      newPassword
    ) {
      throw new Error(
        "New password must be different from current password"
      );
    }

    admin.password =
      await bcrypt.hash(
        newPassword,
        10
      );

    await admin.save();

    return {

      message:
        "Password updated successfully",

    };

  };