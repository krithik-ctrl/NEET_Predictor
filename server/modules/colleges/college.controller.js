import {
  createCollege,
  getColleges,
  getCollegeById,
  updateCollege,
  deleteCollege,
} from "./college.service.js";

import {
  createCollegeSchema,
} from "./college.validation.js";

export const createCollegeController =
  async (req, res, next) => {
    try {
      const validatedData =
        createCollegeSchema.parse(
          req.body
        );

      const college =
        await createCollege(
          validatedData
        );

      res.status(201).json({
        success: true,
        message:
          "College created successfully",
        data: college,
      });
    } catch (error) {
      next(error);
    }
  };

export const getCollegesController =
  async (req, res, next) => {
    try {
      const colleges =
        await getColleges();

      res.status(200).json({
        success: true,
        data: colleges,
      });
    } catch (error) {
      next(error);
    }
  };

export const getCollegeByIdController =
  async (req, res, next) => {
    try {
      const college =
        await getCollegeById(
          req.params.id
        );

      res.status(200).json({
        success: true,
        data: college,
      });
    } catch (error) {
      next(error);
    }
  };

  export const updateCollegeController =
  async (req, res, next) => {
    try {

      const college =
        await updateCollege(
          req.params.id,
          req.body
        );

      res.status(200).json({
        success: true,
        message:
          "College updated successfully",
        data: college,
      });

    } catch (error) {
      next(error);
    }
  };

  export const deleteCollegeController =
  async (req, res, next) => {
    try {

      const college =
        await deleteCollege(
          req.params.id
        );

      res.status(200).json({
        success: true,
        message:
          "College deleted successfully",
        data: college,
      });

    } catch (error) {
      next(error);
    }
  };