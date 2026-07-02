import {
  createAdmin,
  getAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
} from "./admin.service.js";

/*
|--------------------------------------------------------------------------
| Create Admin
|--------------------------------------------------------------------------
*/

export const createAdminController =
  async (req, res, next) => {
    try {

      const admin =
        await createAdmin(
          req.body
        );

      res.status(201).json({
        success: true,
        data: admin,
      });

    } catch (error) {
      next(error);
    }
  };

/*
|--------------------------------------------------------------------------
| Get All Admins
|--------------------------------------------------------------------------
*/

export const getAdminsController =
  async (req, res, next) => {
    try {

      const admins =
        await getAdmins();

      res.status(200).json({
        success: true,
        data: admins,
      });

    } catch (error) {
      next(error);
    }
  };

/*
|--------------------------------------------------------------------------
| Get Admin By ID
|--------------------------------------------------------------------------
*/

export const getAdminByIdController =
  async (req, res, next) => {
    try {

      const admin =
        await getAdminById(
          req.params.id
        );

      res.status(200).json({
        success: true,
        data: admin,
      });

    } catch (error) {
      next(error);
    }
  };

/*
|--------------------------------------------------------------------------
| Update Admin
|--------------------------------------------------------------------------
*/

export const updateAdminController =
  async (req, res, next) => {
    try {

      const admin =
        await updateAdmin(
          req.params.id,
          req.body
        );

      res.status(200).json({
        success: true,
        data: admin,
      });

    } catch (error) {
      next(error);
    }
  };

/*
|--------------------------------------------------------------------------
| Delete Admin
|--------------------------------------------------------------------------
*/

export const deleteAdminController =
  async (req, res, next) => {
    try {

      await deleteAdmin(
        req.params.id
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