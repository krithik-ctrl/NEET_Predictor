import { markNotFound } from "../../../../common/utils/bulkDelete.js";
import { Admin } from "../../../admin/admin.model.js";

export const deleteAdminUser =
  async (adminId, caller = null) => {

    /*
    |--------------------------------------------------------------------------
    | Check Admin
    |--------------------------------------------------------------------------
    */

    if (!/^[0-9a-fA-F]{24}$/.test(String(adminId))) {
      const error = new Error("Invalid admin ID.");
      error.status = 400;
      throw error;
    }

    const admin =
      await Admin.findById(
        adminId
      );

    if (!admin) {
      const error = new Error(
        "Admin not found."
      );
      error.status = 404;
      throw error;
    }

    /*
    |--------------------------------------------------------------------------
    | ADMIN_V2 Guards — same rules as the bulk delete
    |--------------------------------------------------------------------------
    */

    if (
      caller &&
      String(admin._id) === String(caller.adminId)
    ) {
      const error = new Error(
        "You cannot delete your own account."
      );
      error.status = 400;
      throw error;
    }

    if (
      admin.role === "super-admin" &&
      caller?.role !== "super-admin"
    ) {
      const error = new Error(
        "Only a super-admin can delete a super-admin."
      );
      error.status = 403;
      throw error;
    }

    /*
    |--------------------------------------------------------------------------
    | Delete Admin
    |--------------------------------------------------------------------------
    */

    await Admin.findByIdAndDelete(
      adminId
    );

    return admin;

  };
/*
|--------------------------------------------------------------------------
| ADMIN_V2 — Bulk delete admins (hard delete, same as single delete).
| Guards (bulk only): the caller can't delete themselves ("self"), and only
| a super-admin can delete a super-admin ("forbidden").
|--------------------------------------------------------------------------
*/

export const bulkDeleteAdminUsers =
  async (ids, skipped, req) => {

    const callerId =
      String(req.admin?.adminId);

    const callerIsSuper =
      req.admin?.role === "super-admin";

    const admins =
      ids.length
        ? await Admin.find(
            { _id: { $in: ids } },
            { _id: 1, role: 1 }
          ).lean()
        : [];

    markNotFound(
      ids,
      admins.map((admin) => admin._id),
      skipped
    );

    const deletable = [];

    for (const admin of admins) {
      if (String(admin._id) === callerId) {
        skipped.push({ id: String(admin._id), reason: "self" });
      } else if (admin.role === "super-admin" && !callerIsSuper) {
        skipped.push({ id: String(admin._id), reason: "forbidden" });
      } else {
        deletable.push(admin._id);
      }
    }

    if (!deletable.length) {
      return { deletedCount: 0, foundIds: [] };
    }

    const result =
      await Admin.deleteMany({ _id: { $in: deletable } });

    return {
      deletedCount: result.deletedCount,
      foundIds: deletable,
    };

  };
