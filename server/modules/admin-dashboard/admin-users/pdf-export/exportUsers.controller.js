
import { preparePdfData } from "./services/pdf-data.service.js";
import {
  exportUsers,
  exportUsersExcel,
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
          req.query,req.admin?.adminId
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


  export const exportUsersExcelController = async (req, res, next) => {
  try {
    const buffer = await exportUsersExcel(req.query, req.admin?.adminId);

    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="user-export-data-${today}.xlsx"`
    );

    res.send(buffer);
  } catch (error) {
    next(error);
  }
};