import jwt from "jsonwebtoken";

const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET;
const REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || "30d";

// payload: { userId, role } for users, { adminId, role } for admins.
// type:"refresh" so an access token can never be replayed at /refresh.
export const generateRefreshToken = (payload) =>
  jwt.sign({ ...payload, type: "refresh" }, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES_IN });

export const verifyRefreshToken = (token) => {
  const decoded = jwt.verify(token, REFRESH_SECRET);
  if (decoded.type !== "refresh") throw new Error("Invalid refresh token");
  return decoded;
};