import {
  createAdminUser,
} from "../services/create-admin-user.service.js";

import {
  updateAdminUser,
} from "../services/update-admin-user.service.js";

/*
|--------------------------------------------------------------------------
| Create Admin / Sub Admin
|--------------------------------------------------------------------------
*/

export const createAdmin =
  async (
    payload,
    createdBy
  ) => {

    return await createAdminUser({

      ...payload,

      createdBy,

    });

  };

/*
|--------------------------------------------------------------------------
| Update Admin / Sub Admin
|--------------------------------------------------------------------------
*/

export const updateAdmin =
  async (
    adminId,
    payload
  ) => {

    return await updateAdminUser(

      adminId,

      payload

    );

  };