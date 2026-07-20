import * as dashboardService from "./dashboard.service.js";

export const getDashboardOverview = async (
  req,
  res,
  next
) => {
  try {
    const data =
      await dashboardService.getDashboardOverview();

    return res.status(200).json({
      success: true,
      message:
        "Dashboard overview fetched successfully.",
      data,
    });
  } catch (error) {
    next(error);
  }
};