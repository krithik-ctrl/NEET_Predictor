import express from "express";
import {
  getDashboardOverview,
} from "./dashboard.controller.js";
import { authenticateAdmin } from "../../../auth/middleware/authenticateAdmin.js";
import { authorizeAdmin } from "../../../auth/middleware/authorizeAdmin.js";

const router = express.Router();

router.get(
  "/",
   authenticateAdmin,
    // authorizeAdmin("admin"),
  getDashboardOverview
);

export default router;