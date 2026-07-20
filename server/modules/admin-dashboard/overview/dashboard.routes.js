import express from "express";
import {
  getDashboardOverview,
} from "./dashboard.controller.js";

const router = express.Router();

router.get(
  "/",
  getDashboardOverview
);

export default router;