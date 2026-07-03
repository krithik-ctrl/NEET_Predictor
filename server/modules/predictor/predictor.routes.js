import express from "express";

import {
  predictCollegesController,getCategoriesController,getSeatTypesController

} from "./predictor.controller.js";

import {
  authenticate,
} from "../../auth/middleware/authenticate.js";

const router =
  express.Router();

router.post(
  "/seat-types",
  
  getSeatTypesController
);

router.post(
  "/categories",
  getCategoriesController
);



router.post(
  "/",
  authenticate,
  predictCollegesController
);

export default router;