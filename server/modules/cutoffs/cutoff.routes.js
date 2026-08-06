import express from "express";

import {
  createCutoffController,
  getCutoffsController,
  getCutoffByIdController,
  updateCutoffController,
  deleteCutoffController,
  getCutoffTrendsController,
  getCutoffExplorerController
} from "./cutoff.controller.js";

import {

  authenticateAdmin,
} from "../../auth/middleware/authenticateAdmin.js";

import {
  
  authorizeAdmin,
} from "../../auth/middleware/authorizeAdmin.js";


import { authenticate } from "../../auth/middleware/authenticate.js";

const router =
  express.Router();
router.get("/trends", getCutoffTrendsController);
router.get("/explorer", getCutoffExplorerController);
router.post(
  "/",
  authenticateAdmin,
  authorizeAdmin("admin"),
  createCutoffController
);

router.get(
  "/",

  getCutoffsController
);

router.get(
  "/:id",
  
  getCutoffByIdController
);

router.patch(
  "/:id",
  authenticateAdmin,
  authorizeAdmin("admin"),
  updateCutoffController
);

router.delete(
  "/:id",
  authenticateAdmin,
  authorizeAdmin("admin"),
  deleteCutoffController
);


export default router;