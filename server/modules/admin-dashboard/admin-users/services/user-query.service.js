// user-query.service.js


import { User } from "../../../users/user.model.js";
import { StudentProfile } from "../../../student-profile/studentProfile.model.js";
import { Subscription } from "../../../subscription/subscription.model.js";
import { Plan } from "../../../plans/plan.model.js";
import { PredictionHistory } from "../../../prediction-history/predictionHistory.model.js";



const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

const DEFAULT_SORT = {
  createdAt: -1,
};


export const buildSearchQuery = (search) => {
  if (!search) {
    return {};
  }

  return {
    $or: [
      {
        firstName: {
          $regex: search,
          $options: "i",
        },
      },
      {
        lastName: {
          $regex: search,
          $options: "i",
        },
      },
      {
        email: {
          $regex: search,
          $options: "i",
        },
      },
      {
        mobile: {
          $regex: search,
          $options: "i",
        },
      },
    ],
  };
};


export const buildFilters = ({
  role,
  status,
  verified,
  profileCompleted,
}) => {

  const userFilter = {};

  /*
  |--------------------------------------------------------------------------
  | Role
  |--------------------------------------------------------------------------
  */

  if (role) {

    userFilter.role = role;

  }

  /*
  |--------------------------------------------------------------------------
  | Active / Inactive
  |--------------------------------------------------------------------------
  */

  if (status) {

    userFilter.isActive =
      status === "active";

  }

  /*
  |--------------------------------------------------------------------------
  | Verified
  |--------------------------------------------------------------------------
  */

  if (
    verified !== undefined
  ) {

    userFilter.isVerified =
      verified === "true";

  }

  /*
  |--------------------------------------------------------------------------
  | Student Profile
  |--------------------------------------------------------------------------
  */

  const studentProfileFilter =
    {};

  if (
    profileCompleted !==
    undefined
  ) {

    studentProfileFilter.profileCompleted =
      profileCompleted ===
      "true";

  }

  return {

    userFilter,

    studentProfileFilter,

  };

};



export const buildUserQuery = ({
  search,
  status,
  verified,
  role,
}) => {
      const query = {};
        if (search?.trim()) {
    query.$or = [
      {
        firstName: {
          $regex: search,
          $options: "i",
        },
      },
      {
        lastName: {
          $regex: search,
          $options: "i",
        },
      },
      {
        email: {
          $regex: search,
          $options: "i",
        },
      },
      {
        mobile: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

    if (status) {
    query.isActive =
      status === "active";
  }

    if (verified) {
    query.isVerified =
      verified === "true";
  }

    if (role) {
    query.role = role;
  }

    return query;
};