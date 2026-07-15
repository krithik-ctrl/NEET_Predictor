import {
  sendLoginOtp,
  loginAdmin,
  logoutAdmin,
  getAdminProfile,
  resendLoginOtp
} from "./adminAuth.service.js";
import {setAuthCookie} from "../../auth/utils/setAuthCookie.js";
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