export const clearAuthCookie = (
  res
) => {
  res.clearCookie("accessToken");
};