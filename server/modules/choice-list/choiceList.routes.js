import { Router } from "express";

import { authenticate } from "../../auth/middleware/authenticate.js";

import {
  createChoiceListController,
  getChoiceListsController,
  getChoiceListByIdController,
  addCollegeToChoiceListController,
  updatePriorityController,
  removeCollegeFromChoiceListController,
  deleteChoiceListController,
   exportChoiceListExcelController,
  exportChoiceListPdfController,

} from "./choiceList.controller.js";

const router = Router();

router.post(
  "/",
  authenticate,
  createChoiceListController
);

router.get(
  "/",
  authenticate,
  getChoiceListsController
);

router.get(
  "/:listId",
  authenticate,
  getChoiceListByIdController
);
router.get("/:listId/export/excel", authenticate, exportChoiceListExcelController);
router.get("/:listId/export/pdf", authenticate, exportChoiceListPdfController);

router.post(
  "/:listId/items",
  authenticate,
  addCollegeToChoiceListController
);

router.patch(
  "/:listId/items/:itemId",
  authenticate,
  updatePriorityController
);

router.delete(
  "/:listId/items/:itemId",
  authenticate,
  removeCollegeFromChoiceListController
);


router.delete(
  "/:listId",
  authenticate,
  deleteChoiceListController
);


export default router;