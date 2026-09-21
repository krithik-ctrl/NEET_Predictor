import {
  createAdminUser,
} from "../services/create-admin-user.service.js";

import {
  updateAdminUser,
} from "../services/update-admin-user.service.js";
import { deleteAdminUser } from "./delete-admin-user.service.js";

import { createFreeSubscription } from "../../../subscription/subscription.helper.js";

/*
|--------------------------------------------------------------------------
| Create Admin / Sub Admin
|--------------------------------------------------------------------------
*/

export const createAdmin =
  async (
    payload,
    createdBy,
    callerRole = null
  ) => {

    const admin =
      await createAdminUser({

        ...payload,

        createdBy,

        callerRole,

      });

    // small change: create free subscription for the new admin
    await createFreeSubscription(admin._id);

    return admin;

  };

/*
|--------------------------------------------------------------------------
| Update Admin / Sub Admin
|--------------------------------------------------------------------------
*/

export const updateAdmin =
  async (
    adminId,
    payload,
    callerRole = null
  ) => {

    return await updateAdminUser(

      adminId,

      payload,

      callerRole

    );

  };



  export const deleteAdmin =
  async (adminId) => {

    return await deleteAdminUser(
      adminId
    );

  };