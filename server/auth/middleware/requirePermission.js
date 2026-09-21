export const requirePermission =
  (key) =>
  (req, res, next) => {

    if (req.admin?.role === "super-admin") {
      return next();
    }

    if (req.admin?.permissions?.includes(key)) {
      return next();
    }

    return res.status(403).json({
      success: false,
      message:
        "You don't have permission to perform this action.",
    });

  };
