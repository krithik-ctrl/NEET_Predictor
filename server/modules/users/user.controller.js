import {
  createUser,
  getUserByEmail,
  getUserById,
} from "./user.service.js";
import { setAuthCookie } from "../../auth/utils/setAuthCookie.js";
import {
  registerUserSchema,
  loginUserSchema,
} from "./user.validation.js";

import { comparePassword } from "../../auth/utils/comparePassword.js";
import { generateToken } from "../../auth/utils/generateToken.js";

export const registerUserController =
  async (req, res, next) => {
    try {
      const validatedData =
        registerUserSchema.parse(req.body);

      const user = await createUser(
        validatedData
      );

      res.status(201).json({
        success: true,
        message:
          "User registered successfully",
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      next(error);
    }
  };

export const loginUserController =
  async (req, res, next) => {
    try {
      const validatedData =
        loginUserSchema.parse(req.body);

      const user =
        await getUserByEmail(
          validatedData.email
        );

      if (!user) {
        throw new Error(
          "Invalid credentials"
        );
      }

      const isPasswordValid =
        await comparePassword(
          validatedData.password,
          user.password
        );

      if (!isPasswordValid) {
        throw new Error(
          "Invalid credentials"
        );
      }

      user.lastLogin =
        new Date();

      await user.save();

      const token =
        generateToken(user);

      setAuthCookie(
        res,
        token
      );

      res.status(200).json({
        success: true,
        message:
          "Login successful",
        data: {
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        },
      });
    } catch (error) {
      next(error);
    }
  };
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