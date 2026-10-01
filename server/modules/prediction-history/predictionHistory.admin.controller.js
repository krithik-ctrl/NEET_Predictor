import {
  getPredictionHistory,
  getPredictionHistoryById,
    getPredictionMeta,          // NEW
  getPredictionColleges,
  getPredictionHistoryPaginated,   // ADMIN_V2
  adminDeletePredictionHistory,    // ADMIN_V2
} from "./predictionHistory.service.js";
import { logAdminActivity } from "../admin-activity/adminActivity.service.js";

export const adminGetPredictionHistoryController = async (
  req,
  res,
  next
) => {
  try {
    // ADMIN_V2 — opt-in pagination: ?page/?limit → { data, pagination }.
    // Without them the legacy flat array is returned (unchanged).
    const wantsPage =
      req.query.page !== undefined || req.query.limit !== undefined;

    const history = wantsPage
      ? await getPredictionHistoryPaginated(req.admin.adminId, req.query)
      : await getPredictionHistory(req.admin.adminId);

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

// ADMIN_V2 — DELETE /:id — hard-delete any user's prediction history.
export const adminDeletePredictionHistoryController = async (
  req,
  res,
  next
) => {
  try {
    const data = await adminDeletePredictionHistory(req.params.id);

    logAdminActivity({
      actorId: req.admin.adminId,
      actorRole: req.admin.role,
      action: "prediction_history_delete",
      targetAdminId: null,
      meta: { historyId: req.params.id, userId: data.userId },
      req,
    });

    res.status(200).json({
      success: true,
      message: "Prediction history deleted permanently.",
      data,
    });
  } catch (error) {
    next(error);
  }
};
