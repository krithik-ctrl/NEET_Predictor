import { predictColleges } from "./predictor.service.js";

export const adminPredictCollegesController = async (
  req,
  res,
  next
) => {
  try {
    const predictions = await predictColleges(
      req.admin.adminId,
      req.body,
      req.admin.role
    );

    res.status(200).json({
      success: true,
      data: predictions,
    });
  } catch (error) {
    next(error);
  }
};