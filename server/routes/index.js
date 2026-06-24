import { Router } from "express";
import courseRoutes from "../modules/courses/course.routes.js";
import userRoutes from "../modules/users/user.routes.js";
import studentProfileRoutes from "../modules/student-profile/studentProfile.routes.js";
import collegeRoutes from "../modules/colleges/college.routes.js";
import cutoffRoutes from "../modules/cutoffs/cutoff.routes.js";
import predictorRoutes from "../modules/predictor/predictor.routes.js";
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
export default router;