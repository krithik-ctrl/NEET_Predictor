import { Admin } from "../../../admin/admin.model.js";

export const deleteAdminUser =
  async (adminId) => {

    /*
    |--------------------------------------------------------------------------
    | Check Admin
    |--------------------------------------------------------------------------
    */

    const admin =
      await Admin.findById(
        adminId
      );

    if (!admin) {
      throw new Error(
        "Admin not found."
      );
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