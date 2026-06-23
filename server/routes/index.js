import { Router } from "express";
import courseRoutes from "../modules/courses/course.routes.js";
import userRoutes from "../modules/users/user.routes.js";
const router = Router();

router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server Running",
  });
});

router.use("/courses", courseRoutes);
router.use("/users", userRoutes);
export default router;