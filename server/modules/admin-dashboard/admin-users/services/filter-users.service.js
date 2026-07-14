const SORT_FIELDS = {
  createdAt: "createdAt",
  lastLogin: "lastLogin",
  predictionCount: "predictionCount",
  name: "firstName",
};

export const filterUsers = (
  users = [],
  query = {}
) => {
console.log(JSON.stringify(users, null, 2));

 
  let results = [...users];

  const {

    search,

    role,

    plan,

    status,

    verified,

    profileCompleted,

    sortBy = "createdAt",

    sortOrder = "desc",

    page = 1,

    limit = 10,

  } = query;
console.log("Incoming Query:", query);
  /*
  |--------------------------------------------------------------------------
  | Search
  |--------------------------------------------------------------------------
  */

  if (search?.trim()) {

    const keyword =
      search.toLowerCase();

    results =
      results.filter(user =>

        user.firstName?.toLowerCase().includes(keyword) ||

        user.lastName?.toLowerCase().includes(keyword) ||

        user.email?.toLowerCase().includes(keyword) ||

        user.mobile?.includes(keyword)

      );

  }

  /*
  |--------------------------------------------------------------------------
  | Role
  |--------------------------------------------------------------------------
  */

  if (role) {

    results =
      results.filter(
        user => user.role === role
      );
 console.log("After Role:", results.length);
  }

  /*
  |--------------------------------------------------------------------------
  | Plan
  |--------------------------------------------------------------------------
  */

  if (plan) {

    results =
      results.filter(
        user => user.plan === plan
      );

  }

  /*
  |--------------------------------------------------------------------------
  | Status
  |--------------------------------------------------------------------------
  */

  if (status) {

    results =
      results.filter(
        user => user.status === status
      );
  console.log("After Status:", results.length);
  }

  /*
  |--------------------------------------------------------------------------
  | Verified
  |--------------------------------------------------------------------------
  */

  if (verified !== undefined) {

    const value =
      verified === "true";

    results =
      results.filter(
        user =>
          user.isVerified === value
      );

  }

  /*
  |--------------------------------------------------------------------------
  | Profile Completed
  |--------------------------------------------------------------------------
  */

  if (
    profileCompleted !== undefined
  ) {

    const value =
      profileCompleted === "true";

    results =
      results.filter(
        user =>
          user.profile?.profileCompleted === value
      );

  }

  /*
  |--------------------------------------------------------------------------
  | Sorting
  |--------------------------------------------------------------------------
  */

  const field =
    SORT_FIELDS[sortBy] ||
    "createdAt";

  results.sort((a, b) => {

    const first =
      a[field] ?? "";

    const second =
      b[field] ?? "";

    if (first < second)
      return sortOrder === "asc"
        ? -1
        : 1;

    if (first > second)
      return sortOrder === "asc"
        ? 1
        : -1;

    return 0;

  });

  /*
  |--------------------------------------------------------------------------
  | Pagination
  |--------------------------------------------------------------------------
  */

  const currentPage =
    Number(page);

  const perPage =
    Number(limit);

  const total =
    results.length;

  const start =
    (currentPage - 1) *
    perPage;

  const paginatedUsers =
    results.slice(
      start,
      start + perPage
    );

  return {

    users:
      paginatedUsers,

    pagination: {

      page:
        currentPage,

      limit:
        perPage,

      total,

      pages:
        Math.ceil(
          total / perPage
        ),

    },

  };

};