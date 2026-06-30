import { Router }
from "express";

import {

  authenticate,

} from "../../auth/middleware/authenticate.js";

import {

  authorize,

} from "../../auth/middleware/authorize.js";

import {

  getAdminProfileController,

  updateAdminProfileController,

  changeAdminPasswordController,

} from "./adminProfile.controller.js";

const router =
  Router();

router.get(

  "/",

  authenticate,

  authorize(
    "admin"
  ),

  getAdminProfileController

);

router.patch(

  "/",

  authenticate,

  authorize(
    "admin"
  ),

  updateAdminProfileController

);

router.patch(

  "/change-password",

  authenticate,

  authorize(
    "admin"
  ),

  changeAdminPasswordController

);

export default router;