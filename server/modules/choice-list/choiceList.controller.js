import {
  createChoiceList,
  getChoiceLists,
  getChoiceListById,
  addCollegeToChoiceList,
  updatePriority,
  removeCollegeFromChoiceList,
} from "./choiceList.service.js";

export const createChoiceListController =
  async (req, res, next) => {
    try {
      const choiceList =
        await createChoiceList(
          req.user.userId,
          req.body
        );

      res.status(201).json({
        success: true,
        message:
          "Choice list created successfully",
        data: choiceList,
      });
    } catch (error) {
      next(error);
    }
  };

export const getChoiceListsController =
  async (req, res, next) => {
    try {
      const choiceLists =
        await getChoiceLists(
          req.user.userId
        );

      res.status(200).json({
        success: true,
        data: choiceLists,
      });
    } catch (error) {
      next(error);
    }
  };

export const getChoiceListByIdController =
  async (req, res, next) => {
    try {
      const data =
        await getChoiceListById(
          req.user.userId,
          req.params.listId
        );

      res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  };

export const addCollegeToChoiceListController =
  async (req, res, next) => {
    try {
      const item =
        await addCollegeToChoiceList(
          req.user.userId,
          req.params.listId,
          req.body.collegeId
        );

      res.status(201).json({
        success: true,
        message:
          "College added successfully",
        data: item,
      });
    } catch (error) {
      next(error);
    }
  };

export const updatePriorityController =
  async (req, res, next) => {
    try {
      const item =
        await updatePriority(
          req.user.userId,
          req.params.listId,
          req.params.itemId,
          req.body.priority
        );

      res.status(200).json({
        success: true,
        message:
          "Priority updated successfully",
        data: item,
      });
    } catch (error) {
      next(error);
    }
  };

export const removeCollegeFromChoiceListController =
  async (req, res, next) => {
    try {
      await removeCollegeFromChoiceList(
        req.user.userId,
        req.params.listId,
        req.params.itemId
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