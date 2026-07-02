import {
  getUserById,
  createGoogleUser,
  createPendingUser,
} from "./user.service.js";
import { setAuthCookie } from "../../auth/utils/setAuthCookie.js";
import {
  registerUserSchema,
  loginUserSchema,
} from "./user.validation.js";

import { verifyGoogleToken } from "../../auth/strategies/google.strategy.js";

import { generateToken } from "../../auth/utils/generateToken.js";

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

      const user =
        await createPendingUser(
          req.body
        );

      res.status(201).json({

        success: true,

        message:
          "User created successfully.",

        data: {

          id: user._id,

          mobile:
            user.mobile,

        },

      });

    } catch (error) {

      next(error);

    }

  };