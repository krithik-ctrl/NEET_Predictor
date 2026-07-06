export const buildUserResponse = (query = {}) => {

  const {
    search,
    role,
    plan,
    status,
    verified,
    profileCompleted,
    page = 1,
    limit = 10,
    sortBy = "joinedDate",
    sortOrder = "desc",
  } = query;

  const userFilter = {};

  /*
  |--------------------------------------------------------------------------
  | Search
  |--------------------------------------------------------------------------
  */

  if (search?.trim()) {

    const regex = new RegExp(
      search.trim(),
      "i"
    );

    userFilter.$or = [

      {
        firstName: regex,
      },

      {
        lastName: regex,
      },

      {
        email: regex,
      },

      {
        mobile: regex,
      },

    ];

  }

  /*
  |--------------------------------------------------------------------------
  | User Filters
  |--------------------------------------------------------------------------
  */

  if (role) {

    userFilter.role = role;

  }

  if (status !== undefined) {

    userFilter.isActive =
      status === "active";

  }

  if (verified !== undefined) {

    userFilter.isVerified =
      verified === "true";

  }

  /*
  |--------------------------------------------------------------------------
  | Student Profile Filters
  |--------------------------------------------------------------------------
  */

  const profileFilter = {};

  if (
    profileCompleted !== undefined
  ) {

    profileFilter.profileCompleted =
      profileCompleted === "true";

  }

  /*
  |--------------------------------------------------------------------------
  | Subscription Filters
  |--------------------------------------------------------------------------
  */

  const subscriptionFilter = {};

  if (plan) {

    subscriptionFilter.planName =
      plan;

  }

  /*
  |--------------------------------------------------------------------------
  | Sorting
  |--------------------------------------------------------------------------
  */

  const sortOptions = {

    joinedDate: "createdAt",

    lastLogin: "lastLogin",

    name: "firstName",

  };

  const sortField =
    sortOptions[sortBy] ||
    "createdAt";

  const sort = {

    [sortField]:
      sortOrder === "asc"
        ? 1
        : -1,

  };

  /*
  |--------------------------------------------------------------------------
  | Pagination
  |--------------------------------------------------------------------------
  */

  const currentPage =
    Math.max(
      parseInt(page) || 1,
      1
    );

  const perPage =
    Math.max(
      parseInt(limit) || 10,
      1
    );

  return {

    userFilter,

    profileFilter,

    subscriptionFilter,

    pagination: {

      page:
        currentPage,

      limit:
        perPage,

      skip:
        (currentPage - 1) *
        perPage,

    },

    sort,

  };

};