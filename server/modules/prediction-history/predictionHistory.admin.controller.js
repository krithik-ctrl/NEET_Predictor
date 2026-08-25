import {
  getPredictionHistory,
  getPredictionHistoryById,
    getPredictionMeta,          // NEW
  getPredictionColleges,
} from "./predictionHistory.service.js";

export const adminGetPredictionHistoryController = async (
  req,
  res,
  next
) => {
  try {
    const history = await getPredictionHistory(
      req.admin.adminId
    );

    res.status(200).json({
      success: true,
      data: history,
    });
  } catch (error) {
    next(error);
  }
};

// MODIFIED — admin /:id now returns metadata + filter options + counts.
export const adminGetPredictionHistoryByIdController = async (
  req,
  res,
  next
) => {
  try {
    const history = await getPredictionMeta(    // was: getPredictionHistoryById
      req.admin.adminId,
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


// NEW — admin GET /:id/colleges — paginated, filtered, sorted college rows.
export const adminGetPredictionCollegesController = async (
  req,
  res,
  next
) => {
  try {
    const result = await getPredictionColleges(
      req.admin.adminId,
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