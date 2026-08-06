import { Router }
from "express";

import {

  
  authenticateAdmin,

} from "../../auth/middleware/authenticateAdmin.js";

import {

 
  authorizeAdmin

} from "../../auth/middleware/authorizeAdmin.js";

import {

  getAdminProfileController,

  updateAdminProfileController,

  changeAdminPasswordController,

} from "./adminProfile.controller.js";

const router =
  Router();

router.get(

  "/",

  authenticateAdmin,

  authorizeAdmin(
    "admin", "sub-admin"
  ),

  getAdminProfileController

);

router.patch(

  "/",

  authenticateAdmin,

  authorizeAdmin(
    "admin", "sub-admin"
  ),

  updateAdminProfileController

);

router.patch(

  "/change-password",

  authenticateAdmin,

  authorizeAdmin(
    "admin", "sub-admin"
  ),

  changeAdminPasswordController

);

export default router;