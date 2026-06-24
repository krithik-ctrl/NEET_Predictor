import { predictColleges } from "./predictor.service.js";

export const predictCollegesController =
  async (req, res, next) => {
    try {

      const predictions =
        await predictColleges(
          req.user.userId
        );

      res.status(200).json({
        success: true,
        data: predictions,
      });

    } catch (error) {
      next(error);
    }
  };