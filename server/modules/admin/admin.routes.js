import express from "express";

import {
  createAdminController,
  getAdminsController,
  getAdminByIdController,
  updateAdminController,
  deleteAdminController,
} from "./admin.controller.js";


import {
    authenticateAdmin
}from "../../auth/middleware/authenticateAdmin.js"


import {
authorizeAdmin
}from "../../auth/middleware/authorizeAdmin.js"
const router =
  express.Router();

/*
|--------------------------------------------------------------------------
| Admin CRUD
|--------------------------------------------------------------------------
*/

router.post(
  "/",
  authenticateAdmin,
  authorizeAdmin("admin"),
  createAdminController
);

router.get(
  "/",
  authenticateAdmin,
  authorizeAdmin("admin"),
  getAdminsController
);

router.get(
  "/:id",
  authenticateAdmin,
  authorizeAdmin("admin"),
  getAdminByIdController
);

router.patch(
  "/:id",
  authenticateAdmin,
  authorizeAdmin("admin"),
  updateAdminController
);

router.delete(
  "/:id",
  authenticateAdmin,
  authorizeAdmin("admin"),
  deleteAdminController
);

export default router;