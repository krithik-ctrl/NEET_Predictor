import {
  saveCollege,
  removeSavedCollege,
  getSavedColleges,
} from "./savedCollege.service.js";

export const saveCollegeController =
  async (
    req,
    res,
    next
  ) => {
    try {

      const savedCollege =
        await saveCollege(
          req.user.userId,
          req.params.collegeId
        );

      res.status(201).json({
        success: true,
        message:
          "College saved successfully",
        data: savedCollege,
      });

    } catch (error) {
      next(error);
    }
  };

export const removeSavedCollegeController =
  async (
    req,
    res,
    next
  ) => {
    try {

      await removeSavedCollege(
        req.user.userId,
        req.params.collegeId
      );

      res.status(200).json({
        success: true,
        message:
          "College removed successfully",
      });

    } catch (error) {
      next(error);
    }
  };

export const getSavedCollegesController =
  async (
    req,
    res,
    next
  ) => {
    try {

      const savedColleges =
        await getSavedColleges(
          req.user.userId
        );

      res.status(200).json({
        success: true,
        data: savedColleges,
      });

    } catch (error) {
      next(error);
    }
  };