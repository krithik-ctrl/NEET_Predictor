import {
  getPredictionHistory,
  getPredictionHistoryById,
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

export const adminGetPredictionHistoryByIdController = async (
  req,
  res,
  next
) => {
  try {
    const history = await getPredictionHistoryById(
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