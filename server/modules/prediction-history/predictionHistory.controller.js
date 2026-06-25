import {
  getPredictionHistory,
  getPredictionHistoryById,
  deletePredictionHistory,
} from "./predictionHistory.service.js";

export const getPredictionHistoryController =
  async (
    req,
    res,
    next
  ) => {
    try {

      const history =
        await getPredictionHistory(
          req.user.userId
        );

      res.status(200).json({
        success: true,
        data: history,
      });

    } catch (error) {
      next(error);
    }
  };

export const getPredictionHistoryByIdController =
  async (
    req,
    res,
    next
  ) => {
    try {

      const history =
        await getPredictionHistoryById(
          req.user.userId,
          req.params.id
        );

      res.status(200).json({
        success: true,
        data: history,
      });

    } catch (error) {
      next(error);
    }
  };

export const deletePredictionHistoryController =
  async (
    req,
    res,
    next
  ) => {
    try {

      await deletePredictionHistory(
        req.user.userId,
        req.params.id
      );

      res.status(200).json({
        success: true,
        message:
          "Prediction history deleted successfully",
      });

    } catch (error) {
      next(error);
    }
  };