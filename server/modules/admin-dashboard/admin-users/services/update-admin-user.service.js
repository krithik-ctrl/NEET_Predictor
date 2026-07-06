import { Admin } from "../../../admin/admin.model.js";

export const updateAdminUser =
  async (
    adminId,
    payload
  ) => {

    /*
    |--------------------------------------------------------------------------
    | Check Admin
    |--------------------------------------------------------------------------
    */

    const admin =
      await Admin.findById(
        adminId
      );

    if (!admin) {
      throw new Error(
        "Admin not found."
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Mobile Validation
    |--------------------------------------------------------------------------
    */

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

    /*
    |--------------------------------------------------------------------------
    | Email Validation
    |--------------------------------------------------------------------------
    */

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

    /*
    |--------------------------------------------------------------------------
    | Update Fields
    |--------------------------------------------------------------------------
    */

    if (
      payload.firstName !==
      undefined
    ) {
      admin.firstName =
        payload.firstName;
    }

    if (
      payload.lastName !==
      undefined
    ) {
      admin.lastName =
        payload.lastName;
    }

    if (
      payload.email !==
      undefined
    ) {
      admin.email =
        payload.email ||
        null;
    }

    if (
      payload.mobile !==
      undefined
    ) {
      admin.mobile =
        payload.mobile;
    }

    if (
      payload.role !==
      undefined
    ) {
      admin.role =
        payload.role;
    }

    if (
      payload.isActive !==
      undefined
    ) {
      admin.isActive =
        payload.isActive;
    }

    await admin.save();

    return admin;

  };