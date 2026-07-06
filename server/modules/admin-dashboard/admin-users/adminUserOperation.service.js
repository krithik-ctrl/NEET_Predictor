import {
  createAdminUser,
} from "./services/create-admin-user.service.js";

import {
  updateAdminUser,
} from "./services/update-admin-user.service.js";




import {
  getUserDetails,
} from "./services/get-user-details.service.js";

import {
  getAdminDetails,
} from "./services/get-admin-details.service.js";
/*
|--------------------------------------------------------------------------
| Create Admin / Sub Admin
|--------------------------------------------------------------------------
*/

export const createAdminOperation =
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

export const updateAdminOperation =
  async (
    adminId,
    payload
  ) => {

    return await updateAdminUser(

      adminId,

      payload

    );

  };

  /*
|--------------------------------------------------------------------------
| Get Student Details
|--------------------------------------------------------------------------
*/

export const getUserDetailsOperation =
  async (userId) => {

    return await getUserDetails(
      userId
    );

  };

/*
|--------------------------------------------------------------------------
| Get Admin Details
|--------------------------------------------------------------------------
*/

export const getAdminDetailsOperation =
  async (adminId) => {

    return await getAdminDetails(
      adminId
    );

  };