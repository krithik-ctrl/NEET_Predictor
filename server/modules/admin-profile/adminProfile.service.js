import bcrypt from "bcryptjs";

import { User } from "../users/user.model.js";

export const getAdminProfile = async (
  userId
) => {

  if (!userId) {
    throw new Error(
      "User ID is required"
    );
  }

  const admin =
    await User.findById(userId)
      .select(
        "name email phone role designation isActive lastLogin twoFactorEnabled createdAt"
      );

  if (!admin) {
    throw new Error(
      "Admin not found"
    );
  }

  const designation =
    admin.designation ||
    (admin.role === "admin"
      ? "Platform Administrator"
      : admin.role === "counsellor"
      ? "Counsellor"
      : "Student");

  return {

    account: {

      name:
        admin.name,

      email:
        admin.email,

      phone:
        admin.phone || "",

      role:
        admin.role,

      designation,

    },

    activity: {

      lastLogin:
        admin.lastLogin,

      accountStatus:
        admin.isActive
          ? "Active"
          : "Inactive",

      twoFactorEnabled:
        admin.twoFactorEnabled,

      memberSince:
        admin.createdAt,

    },

  };

};

export const updateAdminProfile =
  async (
    userId,
    payload
  ) => {

    if (!userId) {
      throw new Error(
        "User ID is required"
      );
    }

    const admin =
      await User.findById(
        userId
      );

    if (!admin) {
      throw new Error(
        "Admin not found"
      );
    }

    const {

      name,

      phone,

      designation,

    } = payload;

    if (
      name === undefined &&
      phone === undefined &&
      designation === undefined
    ) {
      throw new Error(
        "No valid fields provided for update"
      );
    }

    if (
      name !== undefined
    ) {
      admin.name = name;
    }

    if (
      phone !== undefined
    ) {
      admin.phone = phone;
    }

    if (
      designation !== undefined
    ) {
      admin.designation =
        designation;
    }

    await admin.save();

    return await getAdminProfile(
      userId
    );

  };

export const changeAdminPassword =
  async (
    userId,
    payload
  ) => {

    if (!userId) {
      throw new Error(
        "User ID is required"
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
      await User.findById(
        userId
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