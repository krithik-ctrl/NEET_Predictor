import {
  sendLoginOtp,
  loginAdmin,
  logoutAdmin,
  getAdminProfile,
  resendLoginOtp
} from "./adminAuth.service.js";
import {setAuthCookie} from "../../auth/utils/setAuthCookie.js";
import jwt from "jsonwebtoken";
import { Admin } from "../admin/admin.model.js";

import { generateRefreshToken, verifyRefreshToken } from "../../auth/utils/generateRefreshToken.js";
import { setRefreshCookie, clearRefreshCookie, REFRESH_COOKIE } from "../../auth/utils/refreshCookie.js";

/*
|--------------------------------------------------------------------------
| Send Login OTP
|--------------------------------------------------------------------------
*/

export const sendLoginOtpController =
  async (req, res, next) => {
    try {

      const response =
        await sendLoginOtp(
          req.body
        );

      res.status(200).json({
        success: true,
        ...response,
      });

    } catch (error) {
      next(error);
    }
  };

/*
|--------------------------------------------------------------------------
| Login Admin
|--------------------------------------------------------------------------
*/

export const loginAdminController =
  async (req, res, next) => {
    try {

      const {
        token,
        admin,
      } =
        await loginAdmin(
          req.body
        );

      setAuthCookie(
        res,
        token
      );
setRefreshCookie(res, generateRefreshToken({ adminId: admin._id, role: admin.role }));
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
| Logout Admin
|--------------------------------------------------------------------------
*/

import {
  clearAuthCookie,
} from "../../auth/utils/clearAuthCookie.js";

export const logoutAdminController =
  async (req, res, next) => {
    try {

      clearAuthCookie(
        res
      );
clearRefreshCookie(res);
      const response =
        await logoutAdmin();

      res.status(200).json({
        success: true,
        ...response,
      });

    } catch (error) {
      next(error);
    }
  };

/*
|--------------------------------------------------------------------------
| Get Admin Profile
|--------------------------------------------------------------------------
*/

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

  export const resendLoginOtpController =
  async (req, res, next) => {
    try {
      const response =
        await resendLoginOtp(req.body);

      res.status(200).json({
        success: true,
        ...response,
      });

    } catch (error) {
      next(error);
    }
  };


  export const refreshAdminController = async (req, res) => {
  try {
    const token = req.cookies?.[REFRESH_COOKIE];
    if (!token) return res.status(401).json({ success: false, message: "Session expired" });

    const decoded = verifyRefreshToken(token);
    if (!decoded.adminId) return res.status(401).json({ success: false, message: "Invalid session" });

    const admin = await Admin.findOne({ _id: decoded.adminId, isActive: true });
    if (!admin) {
      clearRefreshCookie(res);
      return res.status(401).json({ success: false, message: "Session expired" });
    }

    // Same access-token shape as loginAdmin.
    const accessToken = jwt.sign({ adminId: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
    setAuthCookie(res, accessToken);
    setRefreshCookie(res, generateRefreshToken({ adminId: admin._id, role: admin.role }));

    return res.status(200).json({ success: true });
  } catch {
    clearRefreshCookie(res);
    return res.status(401).json({ success: false, message: "Session expired" });
  }
};