import mongoose from "mongoose";

import { SavedCollege } from "./savedCollege.model.js";
import { College } from "../colleges/college.model.js";
import {
  checkSubscription,
} from "../subscription/subscription.helper.js";

export const saveCollege =
async (
userId,
collegeId
) => {

if (!userId) {
  throw new Error(
    "User ID is required"
  );
}

if (
  !mongoose.Types.ObjectId.isValid(
    collegeId
  )
) {
  throw new Error(
    "Invalid college ID"
  );
}

const college =
  await College.findById(
    collegeId
  );

if (!college) {
  throw new Error(
    "College not found"
  );
}
const subscription =
  await checkSubscription(
    userId
  );

if (
  subscription.isFree
) {

  const savedCount =
    await SavedCollege.countDocuments({
      userId,
    });

  if (
    savedCount >= 20
  ) {
    throw new Error(
      "Free plan allows saving up to 20 colleges. Upgrade to Premium for unlimited saved colleges."
    );
  }

}
const existing =
  await SavedCollege.findOne({
    userId,
    collegeId,
  });

if (existing) {
  throw new Error(
    "College already saved"
  );
}

return await SavedCollege.create({
  userId,
  collegeId,
});


};

export const removeSavedCollege =
async (
userId,
collegeId
) => {


if (!userId) {
  throw new Error(
    "User ID is required"
  );
}

if (
  !mongoose.Types.ObjectId.isValid(
    collegeId
  )
) {
  throw new Error(
    "Invalid college ID"
  );
}

const savedCollege =
  await SavedCollege.findOneAndDelete(
    {
      userId,
      collegeId,
    }
  );

if (!savedCollege) {
  throw new Error(
    "Saved college not found"
  );
}

return savedCollege;


};

export const getSavedColleges =
async (userId) => {


if (!userId) {
  throw new Error(
    "User ID is required"
  );
}

return await SavedCollege.find({
  userId,
})
  .populate("collegeId")
  .sort({
    createdAt: -1,
  });


};
