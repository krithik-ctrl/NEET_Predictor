import {
  getAdminUsers,
} from "./adminUsers.service.js";


import {
  createAdmin,
  updateAdmin,
  deleteAdmin
} from "./services/adminUserOperation.service.js";



import {
  getUserDetails as getUserDetailsOperation,
} from "./services/get-user-details.service.js";
import {getAdminDetails} from "./services/get-admin-details.service.js";




export const getAdminUsersController =
  async (
    req,
    res,
    next
  ) => {

    try {

      const data =
        await getAdminUsers(
          req.query
        );

      res.status(200).json({

        success: true,

        data,

      });

    } catch (error) {

      next(error);

    }

  };


  export const createAdminController =
  async (
    req,
    res,
    next
  ) => {

    try {

      const admin =
        await createAdmin(

          req.body,

          req.admin._id

        );

      res.status(201).json({

        success: true,

        message:
          "Admin created successfully.",

        data: admin,

      });

    } catch (error) {

      next(error);

    }

  };


  export const updateAdminController =
  async (
    req,
    res,
    next
  ) => {

    try {

      const admin =
        await updateAdmin(

          req.params.adminId,

          req.body

        );

      res.status(200).json({

        success: true,

        message:
          "Admin updated successfully.",

        data: admin,

      });

    } catch (error) {

      next(error);

    }

  };



  export const deleteAdminController =
  async (
    req,
    res,
    next
  ) => {

    try {

      await deleteAdmin(
        req.params.adminId
      );

      res.status(200).json({

        success: true,

        message:
          "Admin deleted successfully.",

      });

    } catch (error) {

      next(error);

    }

  };

  export const getUserDetailsController =
  async (
    req,
    res,
    next
  ) => {

    try {

      const data =
        await getUserDetailsOperation(
          req.params.userId
        );

      res.status(200).json({

        success: true,

        data,

      });

    } catch (error) {

      next(error);

    }

  };

  export const getAdminDetailsController =
  async (
    req,
    res,
    next
  ) => {

    try {
// console.log(req.params.adminId)
      const data =
        await getAdminDetails(
          req.params.adminId
        );

      res.status(200).json({

        success: true,

        data,

      });

    } catch (error) {

      next(error);

    }

  };