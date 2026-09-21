export const requireSuperAdmin = (req, res, next) => {
  if (req.admin?.role !== "super-admin") {
    return res.status(403).json({
      success: false,
      message: "Super-admin access required.",
    });
  }

  next();
};
