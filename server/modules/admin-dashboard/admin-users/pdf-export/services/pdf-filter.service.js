const SORT_FIELDS = {

  joinedDate: "joinedDate",

  lastLogin: "lastLogin",

  predictionCount: "predictionCount",

  firstName: "firstName",

};

export const pdfFilterUsers = (
 users,
 query
) => {




  let results = [...users];
console.log("Start:", results.length);
  const {

    search,

    role,

    plan,

    status,

    verified,

    profileCompleted,

    sortBy = "joinedDate",

    sortOrder = "desc",

  } = query;

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

        user.firstName
          ?.toLowerCase()
          .includes(keyword) ||

        user.lastName
          ?.toLowerCase()
          .includes(keyword) ||

        user.email
          ?.toLowerCase()
          .includes(keyword) ||

        user.mobile
          ?.includes(keyword)

      );
console.log("After Search:", results.length);
  }

  /*
  |--------------------------------------------------------------------------
  | Role
  |--------------------------------------------------------------------------
  */

  if (role) {

    results =
      results.filter(
        user =>
          user.role === role
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
        user =>
          user.plan === plan
      );
console.log("After Plan:", results.length);
  }

  /*
  |--------------------------------------------------------------------------
  | Status
  |--------------------------------------------------------------------------
  */

  if (status) {

    results =
      results.filter(
        user =>
          user.status === status
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
console.log("After Verified:", results.length);
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
          user.profileCompleted === value
      );
console.log("After Profile:", results.length);
  }

  /*
|--------------------------------------------------------------------------
| Sorting
|--------------------------------------------------------------------------
*/

const field =
  SORT_FIELDS[sortBy] ||
  "joinedDate";

results.sort((a, b) => {

  const first =
    a[field] ?? "";

  const second =
    b[field] ?? "";

  if (first < second) {
    return sortOrder === "asc"
      ? -1
      : 1;
  }

  if (first > second) {
    return sortOrder === "asc"
      ? 1
      : -1;
  }

  return 0;

});


/*
|--------------------------------------------------------------------------
| Return
|--------------------------------------------------------------------------
*/

return {

  users: results,

  totalRecords:
    results.length,

}
}