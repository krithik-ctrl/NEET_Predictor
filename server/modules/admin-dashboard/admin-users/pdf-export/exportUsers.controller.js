import {
  exportUsers,
} from "./exportUsers.service.js";
import { preparePdfData } from "./services/pdf-data.service.js";

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


  export const previewUsersController =
  async (
    req,
    res,
    next
  ) => {

    try {

      const data =
        await preparePdfData(
          req.query
        );

      res.status(200).json({
        success: true,
        metadata: data.metadata,
        statistics: data.statistics,
        users: data.users,
      });

    } catch (error) {

      next(error);

    }

  };