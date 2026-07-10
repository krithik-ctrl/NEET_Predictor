import PDFDocument from "pdfkit";



export const generateUsersPdf =
  async (pdfData) => {

const {

  metadata,

  users,
    statistics,

} = pdfData;


const doc =
  new PDFDocument({

    size: "A4",

    margin: 40,

  });


  const buffers = [];

doc.on(
  "data",
  (chunk) =>
    buffers.push(chunk)
);


const pdfPromise =
  new Promise((resolve) => {

    doc.on(
      "end",
      () => {

        resolve(
          Buffer.concat(
            buffers
          )
        );

      }
    );

  });


/*
|--------------------------------------------------------------------------
| Report Title
|--------------------------------------------------------------------------
*/

doc
  .fontSize(22)
  .font("Helvetica-Bold")
  .text(
    "NEET College Predictor",
    {
      align: "center",
    }
  );

doc.moveDown(0.5);

doc
  .fontSize(16)
  .font("Helvetica")
  .text(
    "Users Export Report",
    {
      align: "center",
    }
  );

doc.moveDown(2);


/*
|--------------------------------------------------------------------------
| Report Information
|--------------------------------------------------------------------------
*/

doc
  .fontSize(10)
  .font("Helvetica");

doc.text(
  `Generated On : ${metadata.generatedAt.toLocaleString()}`
);

doc.text(
  `Total Records : ${metadata.totalRecords}`
);

doc.moveDown();


/*
|--------------------------------------------------------------------------
| Applied Filters
|--------------------------------------------------------------------------
*/

doc
  .fontSize(12)
  .font("Helvetica-Bold")
  .text("Applied Filters");

doc.moveDown(0.5);

doc
  .fontSize(10)
  .font("Helvetica");


  Object.entries(
  metadata.appliedFilters
).forEach(([key, value]) => {

  if (
    value !== undefined &&
    value !== null &&
    value !== ""
  ) {

    doc.text(
      `${key} : ${value}`
    );

  }

});

doc.moveDown(2);





/*
|--------------------------------------------------------------------------
| Statistics
|--------------------------------------------------------------------------
*/

doc
  .fontSize(12)
  .font("Helvetica-Bold")
  .text("Statistics");

doc.moveDown(0.5);

doc
  .fontSize(10)
  .font("Helvetica");




  doc.text(
  `Total Users : ${statistics.totalUsers}`
);

doc.text(
  `Students : ${statistics.students}`
);

doc.text(
  `Super Admins : ${statistics.superAdmins}`
);

doc.text(
  `Sub Admins : ${statistics.subAdmins}`
);

doc.text(
  `Premium Users : ${statistics.premiumUsers}`
);

doc.text(
  `Free Users : ${statistics.freeUsers}`
);

doc.text(
  `Verified Users : ${statistics.verifiedUsers}`
);

doc.text(
  `Active Users : ${statistics.activeUsers}`
);

doc.text(
  `Inactive Users : ${statistics.inactiveUsers}`
);

doc.moveDown(2);


/*
|--------------------------------------------------------------------------
| Users
|--------------------------------------------------------------------------
*/

doc
  .fontSize(14)
  .font("Helvetica-Bold")
  .text("Users");

doc.moveDown();



users.forEach((user, index) => {

doc
  .fontSize(12)
  .font("Helvetica-Bold")
  .text(
    `${index + 1}. ${user.firstName} ${user.lastName}`
  );

doc.moveDown(0.3);

doc
  .fontSize(10)
  .font("Helvetica");

doc.text(
  `Email : ${user.email || "-"}`
);

doc.text(
  `Mobile : ${user.mobile || "-"}`
);

doc.text(
  `Role : ${user.role}`
);

doc.text(
  `Status : ${
    user.isActive
      ? "Active"
      : "Inactive"
  }`
);

doc.text(
  `Verified : ${
    user.isVerified
      ? "Yes"
      : "No"
  }`
);

doc.text(
  `Joined : ${
    user.joinedDate
      ? new Date(
          user.joinedDate
        ).toLocaleDateString()
      : "-"
  }`
);

doc.text(
  `Last Login : ${
    user.lastLogin
      ? new Date(
          user.lastLogin
        ).toLocaleString()
      : "-"
  }`
);

doc.moveDown();



/*
|--------------------------------------------------------------------------
| Student Information
|--------------------------------------------------------------------------
*/

if (user.role === "student") {

  doc
    .font("Helvetica-Bold")
    .text("Student Profile");

  doc
    .font("Helvetica");

  doc.text(
    `Gender : ${user.gender || "-"}`
  );

  doc.text(
    `State : ${user.state || "-"}`
  );

  doc.text(
    `City : ${user.city || "-"}`
  );

  doc.text(
    `Budget : ${user.budget || "-"}`
  );

  doc.text(
    `Preferred Course : ${user.preferredCourse || "-"}`
  );

  doc.text(
    `Profile Completed : ${
      user.profileCompleted
        ? "Yes"
        : "No"
    }`
  );

  doc.moveDown();

}


if (user.role === "student") {

  doc
    .font("Helvetica-Bold")
    .text("Subscription");

  doc
    .font("Helvetica");

  doc.text(
    `Plan : ${user.plan || "-"}`
  );

  doc.text(
    `Status : ${user.subscriptionStatus || "-"}`
  );

  doc.text(
    `Start Date : ${
      user.subscriptionStartDate || "-"
    }`
  );

  doc.text(
    `End Date : ${
      user.subscriptionEndDate || "-"
    }`
  );

  doc.moveDown();

}


if (user.role === "student") {

  doc
    .font("Helvetica-Bold")
    .text("Usage");

  doc
    .font("Helvetica");

  doc.text(
    `Predictions : ${user.predictions}`
  );

  doc.text(
    `Saved Colleges : ${user.savedColleges}`
  );

  doc.text(
    `Choice Lists : ${user.choiceLists}`
  );

  doc.moveDown();

}


if (
  user.role === "admin" ||
  user.role === "sub-admin"
) {

  doc
    .font("Helvetica-Bold")
    .text("Administrator");

  doc
    .font("Helvetica");

  doc.text(
    "Student information is not applicable."
  );

  doc.moveDown();

}


/*
|--------------------------------------------------------------------------
| Prediction History
|--------------------------------------------------------------------------
*/

doc
  .font("Helvetica-Bold")
  .text("Prediction History");

doc
  .font("Helvetica");

if (
  user.predictionHistory?.length
) {

  user.predictionHistory.forEach(
    (history) => {

      doc.text(
        `• ${history.course || "-"} | ${history.counsellingType}`
      );

      doc.text(
        `  ${history.predictorState} | ${history.seatType} | ${history.category}`
      );

      doc.text(
        `  Safe:${history.safeCount}  Moderate:${history.moderateCount}  Risky:${history.riskyCount}`
      );

      doc.moveDown(0.3);

    }
  );

} else {

  doc.text(
    "No prediction history."
  );

}

doc.moveDown();



/*
|--------------------------------------------------------------------------
| Saved Colleges
|--------------------------------------------------------------------------
*/

doc
  .font("Helvetica-Bold")
  .text("Saved Colleges");

doc
  .font("Helvetica");

if (
  user.savedColleges?.length
) {

  user.savedColleges.forEach(
    (college) => {

      doc.text(
        `• ${college.name}`
      );

      doc.text(
        `  ${college.city || "-"}, ${college.state || "-"}`
      );

      doc.text(
        `  ${college.ownership || "-"}`
      );

      doc.moveDown(0.3);

    }
  );

} else {

  doc.text(
    "No saved colleges."
  );

}

doc.moveDown();


/*
|--------------------------------------------------------------------------
| Choice Lists
|--------------------------------------------------------------------------
*/

doc
  .font("Helvetica-Bold")
  .text("Choice Lists");

doc
  .font("Helvetica");

if (
  user.choiceLists?.length
) {

  user.choiceLists.forEach(
    (choice) => {

      doc.text(
        `• ${choice.name}`
      );

      doc.text(
        `  Status : ${choice.status}`
      );

      doc.text(
        `  Created : ${new Date(
          choice.createdAt
        ).toLocaleDateString()}`
      );

      doc.moveDown(0.3);

    }
  );

} else {

  doc.text(
    "No choice lists."
  );

}

doc.moveDown();



/*
|--------------------------------------------------------------------------
| Page Break
|--------------------------------------------------------------------------
*/

if (doc.y > 700) {

  doc.addPage();

}



doc
  .moveTo(
    doc.x,
    doc.y
  )
  .lineTo(
    550,
    doc.y
  )
  .stroke();

doc.moveDown();

});


/*
|--------------------------------------------------------------------------
| Finish PDF
|--------------------------------------------------------------------------
*/

doc.end();

return pdfPromise;

  };