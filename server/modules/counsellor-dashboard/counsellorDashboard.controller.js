import {
  getCounsellorDashboard,
  getStudents,
  getStudentById,
} from "./counsellorDashboard.service.js";

export const getCounsellorDashboardController =
  async (req, res, next) => {
    try {

      const dashboard =
        await getCounsellorDashboard();

      res.status(200).json({
        success: true,
        data: dashboard,
      });

    } catch (error) {
      next(error);
    }
  };

export const getStudentsController =
  async (req, res, next) => {
    try {

      const students =
        await getStudents();

      res.status(200).json({
        success: true,
        data: students,
      });

    } catch (error) {
      next(error);
    }
  };

export const getStudentByIdController =
  async (req, res, next) => {
    try {

      const student =
        await getStudentById(
          req.params.id
        );

      res.status(200).json({
        success: true,
        data: student,
      });

    } catch (error) {
      next(error);
    }
  };