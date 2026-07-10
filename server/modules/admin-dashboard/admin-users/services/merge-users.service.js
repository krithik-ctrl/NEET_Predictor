export const mergeUsers =
  ({
    students = [],
    admins = [],
    counsellors = [],
  }) => {

    return [

      ...students,

      ...admins,

      ...counsellors,

    ];

  };