import { Router } from "express";
import courseRoutes from "../modules/courses/course.routes.js";
import userRoutes from "../modules/users/user.routes.js";
import studentProfileRoutes from "../modules/student-profile/studentProfile.routes.js";
import collegeRoutes from "../modules/colleges/college.routes.js";
import cutoffRoutes from "../modules/cutoffs/cutoff.routes.js";
import predictorRoutes from "../modules/predictor/predictor.routes.js";
import savedCollegeRoutes
from "../modules/saved-colleges/savedCollege.routes.js";
import choiceListRoutes from "../modules/choice-list/choiceList.routes.js";
import predictionHistoryRoutes
from "../modules/prediction-history/predictionHistory.routes.js";
import dashboardRoutes
from "../modules/dashboard/dashboard.routes.js";
import planRoutes
from "../modules/plans/plan.routes.js";
import subscriptionRoutes
from "../modules/subscription/subscription.routes.js";
import paymentRoutes
from "../modules/payment/payment.routes.js";
import adminDashboardRoutes
from "../modules/admin-dashboard/adminDashboard.routes.js";
import counsellorDashboardRoutes
from "../modules/counsellor-dashboard/counsellorDashboard.routes.js";



const router = Router();

router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server Running",
  });
});

router.use("/courses", courseRoutes);
router.use("/users", userRoutes);

router.use(
  "/student-profile",
  studentProfileRoutes
);
router.use(
  "/colleges",
  collegeRoutes
);
router.use(
  "/cutoffs",
  cutoffRoutes
);
router.use(
  "/predictor",
  predictorRoutes
);
router.use(
  "/saved-colleges",
  savedCollegeRoutes
);

router.use(
  "/choice-lists",
  choiceListRoutes
);

router.use(
  "/prediction-history",
  predictionHistoryRoutes
);
router.use(
  "/dashboard",
  dashboardRoutes
);
router.use(
  "/plans",
  planRoutes
);

router.use(
  "/subscriptions",
  subscriptionRoutes
);

router.use(
  "/payments",
  paymentRoutes
);

router.use(
"/admin-dashboard",
adminDashboardRoutes
);
router.use(
  "/counsellor-dashboard",
  counsellorDashboardRoutes
);
export default router;