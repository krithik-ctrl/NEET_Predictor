import jwt from "jsonwebtoken";
import { env } from "../../config/env.js";

export const authenticate = (
  req,
  res,
  next
) => {
  try {
    const token =
      req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message:
          "Authentication required",
      });
    }

    const decoded =
      jwt.verify(
        token,
        env.JWT_SECRET
      );

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message:
        "Invalid token",
    });
  }
};