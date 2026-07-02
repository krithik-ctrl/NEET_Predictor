import jwt from "jsonwebtoken";

import { Admin } from "../../modules/admin/admin.model.js";

export const authenticateAdmin =
  async (req, res, next) => {
    try {

let token =
  req.cookies?.accessToken;

if (!token) {

  const authHeader =
    req.headers.authorization;

  if (
    authHeader &&
    authHeader.startsWith(
      "Bearer "
    )
  ) {
    token =
      authHeader.split(" ")[1];
  }

}

if (!token) {
  return res.status(401).json({
    success: false,
    message:
      "Authentication required.",
  });
}

      const decoded =
        jwt.verify(
          token,
          process.env.JWT_SECRET
        );

      const admin =
        await Admin.findById(
          decoded.adminId
        ).select("-password");

      if (
        !admin ||
        !admin.isActive
      ) {
        return res.status(401).json({
          success: false,
          message:
            "Admin not found.",
        });
      }

      req.admin = {

        adminId:
          admin._id,

        role:
          admin.role,

      };

      next();

    } catch (error) {

      return res.status(401).json({
        success: false,
        message:
          "Invalid or expired token.",
      });

    }
  };