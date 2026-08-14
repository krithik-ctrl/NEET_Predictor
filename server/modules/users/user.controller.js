import {
  getUserById,
  createGoogleUser,
  createPendingUser,
  checkEmailExists
} from "./user.service.js";
import { setAuthCookie } from "../../auth/utils/setAuthCookie.js";
import {
  registerUserSchema,
  loginUserSchema,
} from "./user.validation.js";

import { verifyGoogleToken } from "../../auth/strategies/google.strategy.js";

import { generateToken } from "../../auth/utils/generateToken.js";

import { generateRefreshToken, verifyRefreshToken } from "../../auth/utils/generateRefreshToken.js";
import { setRefreshCookie, clearRefreshCookie, REFRESH_COOKIE } from "../../auth/utils/refreshCookie.js";


export const getMeController =
  async (req, res, next) => {
    try {
      const user =
        await getUserById(
          req.user.userId
        );

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };
  import { clearAuthCookie } from "../../auth/utils/clearAuthCookie.js";

export const logoutController = (
  req,
  res
) => {
  clearAuthCookie(res);
clearRefreshCookie(res);
  res.status(200).json({
    success: true,
    message:
      "Logout successful",
  });
};

export const googleLoginController =
  async (req, res, next) => {
    try {
      const { token } = req.body;

      if (!token) {
        throw new Error(
          "Google token is required"
        );
      }

      const googleUser =
        await verifyGoogleToken(
          token
        );

      const user =
        await createGoogleUser(
          googleUser
        );

      user.lastLogin =
        new Date();

      await user.save();

      const jwtToken =
        generateToken(user);

      setAuthCookie(
        res,
        jwtToken
      );

      res.status(200).json({
        success: true,
        message:
          "Google login successful",
        data: {
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            provider:
              user.provider,
          },
        },
      });
    } catch (error) {
      next(error);
    }
  };

  
export const createPendingUserController =
  async (req, res, next) => {

    try {

      const {
        user,
        isNewUser,
      } =
        await createPendingUser(
          req.body
        );

      res.status(200).json({

        success: true,

        message:
          isNewUser
            ? "User created successfully."
            : "Existing user found.",

        data: {

          id:
            user._id,

          mobile:
            user.mobile,

          isNewUser,

        },

      });

    } catch (error) {

      next(error);

    }

  };
export const refreshUserController = async (req, res) => {
  try {
    const token = req.cookies?.[REFRESH_COOKIE];
    if (!token) return res.status(401).json({ success: false, message: "Session expired" });

    const decoded = verifyRefreshToken(token);           // throws on invalid/expired
    if (!decoded.userId) return res.status(401).json({ success: false, message: "Invalid session" });

    const user = await getUserById(decoded.userId);
    if (!user || user.isActive === false) {
      clearRefreshCookie(res);
      return res.status(401).json({ success: false, message: "Session expired" });
    }

    // Re-issue access + rotate refresh.
    setAuthCookie(res, generateToken(user));
    setRefreshCookie(res, generateRefreshToken({ userId: user._id, role: user.role }));

    return res.status(200).json({ success: true });
  } catch {
    clearRefreshCookie(res);
    return res.status(401).json({ success: false, message: "Session expired" });
  }
};

  export const checkEmailController = async (req, res, next) => { try { const email = req.query.email; if (!email) { throw new Error("Email is required"); } const exists = await checkEmailExists(email); res.status(200).json({ success: true, data: { exists }, }); } catch (error) { next(error); } };