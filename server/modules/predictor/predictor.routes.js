import express from "express";

import {
  predictCollegesController,getCategoriesController,getSeatTypesController,collegeTypeAvailabilityController,getStatesController

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
  "/states",
  getStatesController
);

router.post(
  "/categories",
  getCategoriesController
);
router.post("/college-type-availability", collegeTypeAvailabilityController);


router.post(
  "/",
  authenticate,
  predictCollegesController
);

export default router;