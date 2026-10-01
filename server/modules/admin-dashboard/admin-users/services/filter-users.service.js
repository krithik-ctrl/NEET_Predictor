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
// console.log(JSON.stringify(users, null, 2));

 
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
// console.log("Incoming Query:", query);
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
 //console.log("After Role:", results.length);
  }

  /*
  |--------------------------------------------------------------------------
  | Plan
  |--------------------------------------------------------------------------
  */
// console.log(
//   results.map(user => ({
//     name: user.firstName,
//     role: user.role,
//     plan: user.plan
//   }))
// );
if (plan) {

  results = results.filter((user) => {

    if (!user.plan) return false;

    // "Free"/"Premium" are tiers, decided by price (plans get renamed).
    if (plan === "Free") {
      return Number(user.plan.price) === 0;
    }

    if (plan === "Premium") {
      return Number(user.plan.price) > 0;
    }

    return user.plan.name === plan;

  });

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

  // ADMIN_V2 — only "true"/"false" filter (anything else, e.g. an empty
  // "All" value, is ignored). Students only: admin rows have no profile.
  // A student without a StudentProfile document counts as NOT completed
  // (previously such students were dropped from ?profileCompleted=false).
  const profileFlag =
    String(profileCompleted ?? "").trim().toLowerCase();

  if (
    profileFlag === "true" ||
    profileFlag === "false"
  ) {

    const value =
      profileFlag === "true";

    results =
      results.filter(
        user =>
          user.accountType !== "admin" &&
          (user.profile?.profileCompleted === true) === value
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