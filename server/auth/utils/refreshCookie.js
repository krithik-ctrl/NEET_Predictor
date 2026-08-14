const isProd = process.env.NODE_ENV === "production";
export const REFRESH_COOKIE = "refreshToken";
const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

const baseOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: "lax",
  path: "/",
};

export const setRefreshCookie = (res, token) =>
  res.cookie(REFRESH_COOKIE, token, { ...baseOptions, maxAge: THIRTY_DAYS });

export const clearRefreshCookie = (res) =>
  res.clearCookie(REFRESH_COOKIE, baseOptions);