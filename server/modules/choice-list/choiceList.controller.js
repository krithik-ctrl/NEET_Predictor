import {
  createChoiceList,
  getChoiceLists,
  getChoiceListById,
  addCollegeToChoiceList,
  updatePriority,
  removeCollegeFromChoiceList,
  deleteChoiceList,
} from "./choiceList.service.js";


import { getChoiceListForExport } from "./choiceList.service.js";
import { buildChoiceListExcel } from "./exports/excel.export.js";
import { buildChoiceListPdf } from "./exports/pdf.export.js";

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
          req.body.collegeId,
          req.body.fees,
          req.body.seats
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



  export const deleteChoiceListController =
async (
  req,
  res,
  next
) => {

  try {

    const userId =
      req.user.userId;

    const {
      listId,
    } = req.params;

    const result =
      await deleteChoiceList(
        userId,
        listId
      );

    return res.status(200).json(
      result
    );

  } catch (error) {

    next(error);

  }

};



const safeFileName = (s) =>
  (s || "choice-list").toString().trim().replace(/[^a-z0-9\-_]+/gi, "_").slice(0, 60) || "choice-list";

export const exportChoiceListExcelController = async (req, res, next) => {
  try {
    const data = await getChoiceListForExport(req.user.userId, req.params.listId);
    const workbook = await buildChoiceListExcel(data);

    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.setHeader("Content-Disposition", `attachment; filename="${safeFileName(data.choiceList?.name)}.xlsx"`);

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    next(error);
  }
};

export const exportChoiceListPdfController = async (req, res, next) => {
  try {
    const data = await getChoiceListForExport(req.user.userId, req.params.listId);
    const doc = await buildChoiceListPdf(data);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${safeFileName(data.choiceList?.name)}.pdf"`);

    doc.pipe(res);
    doc.end();
  } catch (error) {
    next(error);
  }
};