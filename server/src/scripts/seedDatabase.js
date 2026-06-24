import fs from "fs";
import path from "path";

import mongoose from "mongoose";

import { env } from "../config/env.js";

import { Course } from "../modules/courses/course.model.js";
import { College } from "../modules/colleges/college.model.js";
import { Cutoff } from "../modules/cutoffs/cutoff.model.js";

const seedPath = path.join(
  process.cwd(),
  "src",
  "seed-data"
);

const coursesFile = path.join(
  seedPath,
  "courses.json"
);

const collegesFile = path.join(
  seedPath,
  "colleges.json"
);

const cutoffsFile = path.join(
  seedPath,
  "cutoffs.json"
);


const readJson = (
  filePath
) => {
  const data =
    fs.readFileSync(
      filePath,
      "utf-8"
    );

  return JSON.parse(data);
};



const seedCourses =
  async () => {

    const courses =
      readJson(
        coursesFile
      );

    let added = 0;
    let skipped = 0;

    for (const course of courses) {

      const exists =
        await Course.findOne({
          name: course.name,
        });

      if (exists) {
        skipped++;
        continue;
      }

      await Course.create(
        course
      );

      added++;
    }

    return {
      added,
      skipped,
    };
  };


  const seedColleges =
  async () => {

    const colleges =
      readJson(
        collegesFile
      );

    let added = 0;
    let skipped = 0;

    for (const college of colleges) {

      const exists =
        await College.findOne({
          name: college.name,
        });

      if (exists) {
        skipped++;
        continue;
      }

      const courseIds =
        await Course.find({
          name: {
            $in:
              college.courses,
          },
        }).select("_id");

      await College.create({
        ...college,
        courses:
          courseIds.map(
            (course) =>
              course._id
          ),
      });

      added++;
    }

    return {
      added,
      skipped,
    };
  };

  const seedCutoffs =
  async () => {

    const cutoffs =
      readJson(
        cutoffsFile
      );

    let added = 0;
    let skipped = 0;

    for (const cutoff of cutoffs) {

      const college =
        await College.findOne({
          name:
            cutoff.college,
        });

      const course =
        await Course.findOne({
          name:
            cutoff.course,
        });

      if (
        !college ||
        !course
      ) {
        skipped++;
        continue;
      }

      const exists =
        await Cutoff.findOne({
          collegeId:
            college._id,
          courseId:
            course._id,
          year:
            cutoff.year,
          category:
            cutoff.category,
          quota:
            cutoff.quota,
        });

      if (exists) {
        skipped++;
        continue;
      }

      await Cutoff.create({
        ...cutoff,
        collegeId:
          college._id,
        courseId:
          course._id,
      });

      added++;
    }

    return {
      added,
      skipped,
    };
  };

  const seedDatabase =
  async () => {

    try {

      await mongoose.connect(
        env.MONGODB_URI
      );

      console.log(
        "MongoDB Connected"
      );

      const courses =
        await seedCourses();

      const colleges =
        await seedColleges();

      const cutoffs =
        await seedCutoffs();

      console.log(
        "\n===== SEED REPORT ====="
      );

      console.log(
        `Courses Added: ${courses.added}`
      );

      console.log(
        `Courses Skipped: ${courses.skipped}`
      );

      console.log(
        `Colleges Added: ${colleges.added}`
      );

      console.log(
        `Colleges Skipped: ${colleges.skipped}`
      );

      console.log(
        `Cutoffs Added: ${cutoffs.added}`
      );

      console.log(
        `Cutoffs Skipped: ${cutoffs.skipped}`
      );

      console.log("Seeding completed");

    } catch (error) {

      console.error(
        error.message
      );

     console.error(error);

    } finally {

      await mongoose.disconnect();

    }
  };

seedDatabase();