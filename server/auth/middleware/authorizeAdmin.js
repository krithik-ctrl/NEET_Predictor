export const authorizeAdmin =
  (...roles) =>
  (req, res, next) => {

    if (req.admin?.role === "super-admin") {
      return next();
    }

    if (
      !roles.includes(
        req.admin.role
      )
    ) {
      return res.status(403).json({
        success: false,
        message:
          "Access denied.",
      });
    }

    next();

  };