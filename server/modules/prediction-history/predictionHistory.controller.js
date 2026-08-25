import {
  getPredictionHistory,
  getPredictionHistoryById,
  deletePredictionHistory,
   getPredictionMeta,          // NEW
  getPredictionColleges,
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

// MODIFIED — /:id now returns metadata + filter options + chance counts
// (lightweight), NOT the full predictedColleges array.
export const getPredictionHistoryByIdController =
  async (
    req,
    res,
    next
  ) => {
    try {

      const history =
        await getPredictionMeta(          // was: getPredictionHistoryById
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


  // NEW — GET /:id/colleges — paginated, filtered, sorted college rows.
// Query params: page, limit, course, branch, state, type, chance, sortBy.
export const getPredictionCollegesController =
  async (
    req,
    res,
    next
  ) => {
    try {

      const result =
        await getPredictionColleges(
          req.user.userId,
          req.params.id,
          req.query
        );

      res.status(200).json({
        success: true,
        data: result,
      });

    } catch (error) {
      next(error);
    }
  };