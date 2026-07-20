import { Course } from "../../../courses/course.model.js";

export const getCourseOverview =
  async () => {
    const [
      totalCourses,
      activeCourses,
      inactiveCourses,
      ugCourses,
      pgCourses,
    ] = await Promise.all([
      Course.countDocuments(),

      Course.countDocuments({
        status: "active",
      }),

      Course.countDocuments({
        status: "inactive",
      }),

      Course.countDocuments({
        level: "UG",
      }),

      Course.countDocuments({
        level: "PG",
      }),
    ]);

    return {
      courses: {
        total: totalCourses,
        active: activeCourses,
        inactive: inactiveCourses,
        ug: ugCourses,
        pg: pgCourses,
      },
    };
  };