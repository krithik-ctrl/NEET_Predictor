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
import {
  deleteStudent,
  bulkDeleteStudents,
} from "./services/delete-student.service.js";
import { logAdminActivity } from "../../admin-activity/adminActivity.service.js";




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

          req.admin._id,

          req.admin.role

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

          req.body,

          req.admin.role

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
        req.params.adminId,
        req.admin
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

  // Kept the old export name so the existing route wiring is unchanged —
  // this is now a PERMANENT delete with cascade (ADMIN_V2 Phase 1).
  export const deactivateStudentController =
  async (
    req,
    res,
    next
  ) => {

    try {

      const data =
        await deleteStudent(
          req.params.id
        );

      logAdminActivity({
        actorId: req.admin.adminId,
        actorRole: req.admin.role,
        action: "student_delete",
        targetAdminId: null,
        meta: {
          userId: req.params.id,
          cascade: data.cascade,
        },
        req,
      });

      res.status(200).json({

        success: true,

        message:
          "Student deleted permanently.",

        data,

      });

    } catch (error) {

      next(error);

    }

  };

  export const bulkDeleteStudentsController =
  async (
    req,
    res,
    next
  ) => {

    try {

      const {
        deletedCount,
        requested,
        skipped,
        cascade,
        deletedIds = [],
      } = await bulkDeleteStudents(
        req.body
      );

      if (deletedCount > 0) {
        logAdminActivity({
          actorId: req.admin.adminId,
          actorRole: req.admin.role,
          action: "student_bulk_delete",
          targetAdminId: null,
          meta: {
            userIds: deletedIds,
            cascade,
          },
          req,
        });
      }

      res.status(200).json({

        success: true,

        deletedCount,

        requested,

        skipped,

        cascade,

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


