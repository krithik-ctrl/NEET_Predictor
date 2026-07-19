export const mergePdfUsers = ({
  students = [],
  admins = [],
  counsellors = [],
}) => {

  /*
  |--------------------------------------------------------------------------
  | Normalize Students
  |--------------------------------------------------------------------------
  */

  const mergedStudents =
    students.map((student) => ({

      id:
        student._id,

      firstName:
        student.firstName ||
        student.name ||
        "-",

      lastName:
        student.lastName || "",

      email:
        student.email,

      mobile:
        student.mobile || null,

      role:
        student.role,

      status:
        student.isActive
          ? "active"
          : "inactive",

      isActive:
        student.isActive,

      isVerified:
        student.isVerified,

      joinedDate:
        student.createdAt,

      lastLogin:
        student.lastLogin,

      gender:
        student.profile?.gender || null,

      state:
        student.profile?.state || null,

      city:
        student.profile?.city || null,

      budget:
        student.profile?.budget || null,

      profileCompleted:
        student.profile?.profileCompleted || false,

      plan:
        student.plan?.name || "-",

          preferredCourse:
        student.preferredCourse || null,        // now an ID

      preferredCourseName:                       // NEW
        student.preferredCourseName || null,

      predictionCount:
        student.predictionCount || 0,

      profile:
        student.profile || null,

      predictionHistory:
        student.predictionHistory || [],

      savedColleges:
        student.savedColleges || [],

      choiceLists:
        student.choiceLists || [],

    }));


  /*
  |--------------------------------------------------------------------------
  | Normalize Admins
  |--------------------------------------------------------------------------
  */

  const mergedAdmins =
    admins.map((admin) => ({

      id:
        admin.id,

      firstName:
        admin.firstName,

      lastName:
        admin.lastName,

      email:
        admin.email,

      mobile:
        admin.mobile,

      role:
        admin.role,

      status:
        admin.status,

      isActive:
        admin.status === "active",

      isVerified:
        admin.isVerified,

      joinedDate:
        admin.joinedDate,

      lastLogin:
        admin.lastLogin,

      gender:
        null,

      state:
        null,

      city:
        null,

      budget:
        null,

      profileCompleted:
        false,

      plan:
        "-",

      preferredCourse:            // NEW
        null,
           preferredCourseName:                        // NEW
        null,

      predictionCount:
        0,

      profile:
        null,

      predictionHistory:
        [],

      savedColleges:
        [],

      choiceLists:
        [],

    }));


  /*
  |--------------------------------------------------------------------------
  | Return
  |--------------------------------------------------------------------------
  */

  return {

    users: [

      ...mergedStudents,

      ...mergedAdmins,

      ...counsellors,

    ],

  };

};