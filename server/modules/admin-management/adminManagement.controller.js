import {
  listAdmins,
  getAdminWithActivity,
  changeAdminRole,
  changeAdminStatus,
  listAdminActivity,
  getPermissionCatalog,
  getAdminPermissions,
  setAdminPermissions,
} from "./adminManagement.service.js";

/*
|--------------------------------------------------------------------------
| List Admins
|--------------------------------------------------------------------------
*/

export const getAdminsController =
  async (req, res, next) => {
    try {

      const data =
        await listAdmins(req.query);

      res.status(200).json({
        success: true,
        data,
      });

    } catch (error) {
      next(error);
    }
  };

/*
|--------------------------------------------------------------------------
| Get Admin By Id + Activity
|--------------------------------------------------------------------------
*/

export const getAdminByIdController =
  async (req, res, next) => {
    try {

      const data =
        await getAdminWithActivity(
          req.params.id
        );

      res.status(200).json({
        success: true,
        data,
      });

    } catch (error) {
      next(error);
    }
  };

/*
|--------------------------------------------------------------------------
| Update Admin Role (Promote / Demote)
|--------------------------------------------------------------------------
*/

export const updateAdminRoleController =
  async (req, res, next) => {
    try {

      const { role } = req.body;

      if (!role) {
        const error = new Error(
          "role is required."
        );
        error.status = 400;
        throw error;
      }

      const data =
        await changeAdminRole(
          req.params.id,
          role,
          req.admin,
          req
        );

      res.status(200).json({
        success: true,
        message:
          "Admin role updated successfully.",
        data,
      });

    } catch (error) {
      next(error);
    }
  };

/*
|--------------------------------------------------------------------------
| Update Admin Status (Activate / Deactivate)
|--------------------------------------------------------------------------
*/

export const updateAdminStatusController =
  async (req, res, next) => {
    try {

      const { isActive } = req.body;

      if (isActive === undefined) {
        const error = new Error(
          "isActive is required."
        );
        error.status = 400;
        throw error;
      }

      const data =
        await changeAdminStatus(
          req.params.id,
          isActive,
          req.admin,
          req
        );

      res.status(200).json({
        success: true,
        message:
          "Admin status updated successfully.",
        data,
      });

    } catch (error) {
      next(error);
    }
  };

/*
|--------------------------------------------------------------------------
| Activity Feed
|--------------------------------------------------------------------------
*/

export const getAdminActivityController =
  async (req, res, next) => {
    try {

      const data =
        await listAdminActivity(
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

/*
|--------------------------------------------------------------------------
| Permission Catalog
|--------------------------------------------------------------------------
*/

export const getPermissionCatalogController =
  async (req, res, next) => {
    try {

      const data =
        getPermissionCatalog();

      res.status(200).json({
        success: true,
        data,
      });

    } catch (error) {
      next(error);
    }
  };

/*
|--------------------------------------------------------------------------
| Get One Admin's Permissions
|--------------------------------------------------------------------------
*/

export const getAdminPermissionsController =
  async (req, res, next) => {
    try {

      const data =
        await getAdminPermissions(
          req.params.id
        );

      res.status(200).json({
        success: true,
        data,
      });

    } catch (error) {
      next(error);
    }
  };

/*
|--------------------------------------------------------------------------
| Update One Admin's Permissions
|--------------------------------------------------------------------------
*/

export const updateAdminPermissionsController =
  async (req, res, next) => {
    try {

      const { permissions } = req.body;

      if (!Array.isArray(permissions)) {
        const error = new Error(
          "permissions is required and must be an array."
        );
        error.status = 400;
        throw error;
      }

      const data =
        await setAdminPermissions(
          req.params.id,
          permissions,
          req.admin,
          req
        );

      res.status(200).json({
        success: true,
        message:
          "Admin permissions updated successfully.",
        data,
      });

    } catch (error) {
      next(error);
    }
  };
