import {
  exportUsers,
} from "./exportUsers.service.js";

export const exportUsersController =
  async (
    req,
    res,
    next
  ) => {

    try {

      const pdf =
        await exportUsers(
          req.query
        );

      res.setHeader(
        "Content-Type",
        "application/pdf"
      );

      res.setHeader(
        "Content-Disposition",
        'attachment; filename="users-report.pdf"'
      );

      res.send(pdf);

    } catch (error) {

      next(error);

    }

  };