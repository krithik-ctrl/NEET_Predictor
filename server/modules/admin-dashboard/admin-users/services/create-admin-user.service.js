import bcrypt from "bcryptjs";

import {Admin} from "../../../admin/admin.model.js";


export const createAdminUser =
  async ({
    firstName,
    lastName,
    email,
    mobile,
    password,
    role,
    createdBy,
  }) => {

    /*
    |--------------------------------------------------------------------------
    | Mobile Validation
    |--------------------------------------------------------------------------
    */

    const existingMobile =
      await Admin.findOne({
        mobile,
      });

    if (existingMobile) {
      throw new Error(
        "Mobile number already exists."
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Email Validation
    |--------------------------------------------------------------------------
    */

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

    /*
    |--------------------------------------------------------------------------
    | Password Hashing
    |--------------------------------------------------------------------------
    */

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    /*
    |--------------------------------------------------------------------------
    | Create Admin
    |--------------------------------------------------------------------------
    */

    const admin =
      await Admin.create({

        firstName,

        lastName,

        email:
          email || undefined,

        mobile,

        password:
          hashedPassword,

        role,

        createdBy,

      });

    /*
    |--------------------------------------------------------------------------
    | TODO
    |--------------------------------------------------------------------------
    |
    | Send Welcome Email
    | Send SMS with Login Credentials
    | Force Password Change on First Login (Future)
    |
    */

    return admin;

  };