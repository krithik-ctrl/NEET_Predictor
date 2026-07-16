import {

  getAdminProfile,

  updateAdminProfile,

  changeAdminPassword,

} from "./adminProfile.service.js";

export const getAdminProfileController =
  async (req, res, next) => {

    try {

      const profile =
        await getAdminProfile(
          req.admin.adminId
        );

      res.status(200).json({

        success: true,

        data: profile,

      });

    } catch (error) {

      next(error);

    }

  };

export const updateAdminProfileController =
  async (req, res, next) => {

    try {

      const profile =
        await updateAdminProfile(

          req.admin.adminId,

          req.body

        );

      res.status(200).json({

        success: true,

        message:
          "Profile updated successfully",

        data: profile,

      });

    } catch (error) {

      next(error);

    }

  };

export const changeAdminPasswordController =
  async (req, res, next) => {

    try {

      const result =
        await changeAdminPassword(

          req.admin.adminId,

          req.body

        );

      res.status(200).json({

        success: true,

        ...result,

      });

    } catch (error) {

      next(error);

    }

  };