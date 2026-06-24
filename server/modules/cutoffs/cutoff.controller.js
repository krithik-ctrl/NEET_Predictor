import {
  createCutoff,
  getCutoffs,
  getCutoffById,
  updateCutoff,
  deleteCutoff,
} from "./cutoff.service.js";

import {
  createCutoffSchema,
} from "./cutoff.validation.js";

export const createCutoffController =
  async (req, res, next) => {
    try {
      const validatedData =
        createCutoffSchema.parse(
          req.body
        );

      const cutoff =
        await createCutoff(
          validatedData
        );

      res.status(201).json({
        success: true,
        message:
          "Cutoff created successfully",
        data: cutoff,
      });
    } catch (error) {
      next(error);
    }
  };

export const getCutoffsController =
  async (req, res, next) => {
    try {
      const cutoffs =
        await getCutoffs();

      res.status(200).json({
        success: true,
        data: cutoffs,
      });
    } catch (error) {
      next(error);
    }
  };

export const getCutoffByIdController =
  async (req, res, next) => {
    try {
      const cutoff =
        await getCutoffById(
          req.params.id
        );

      res.status(200).json({
        success: true,
        data: cutoff,
      });
    } catch (error) {
      next(error);
    }
  };

export const updateCutoffController =
  async (req, res, next) => {
    try {
      const cutoff =
        await updateCutoff(
          req.params.id,
          req.body
        );

      res.status(200).json({
        success: true,
        message:
          "Cutoff updated successfully",
        data: cutoff,
      });
    } catch (error) {
      next(error);
    }
  };

export const deleteCutoffController =
  async (req, res, next) => {
    try {
      const cutoff =
        await deleteCutoff(
          req.params.id
        );

      res.status(200).json({
        success: true,
        message:
          "Cutoff deleted successfully",
        data: cutoff,
      });
    } catch (error) {
      next(error);
    }
  };