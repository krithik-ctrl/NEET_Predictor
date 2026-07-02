export const authorizeAdmin =
  (...roles) =>
  (req, res, next) => {

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