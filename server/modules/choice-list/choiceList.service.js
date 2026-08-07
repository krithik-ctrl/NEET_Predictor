import mongoose from "mongoose";

import { ChoiceList } from "./choiceList.model.js";
import { ChoiceListItem } from "./choiceListItem.model.js";
import {
  checkSubscription,
} from "../subscription/subscription.helper.js";

import { College } from "../colleges/college.model.js";

export const createChoiceList =
async (
userId,
payload
) => {


if (!userId) {
  throw new Error(
    "User ID is required"
  );
}

const subscription =
  await checkSubscription(
    userId
  );

if (
  subscription.isFree
) {

  const totalLists =
    await ChoiceList.countDocuments({
      userId,
    });

  if (
    totalLists >= 1
  ) {
    throw new Error(
      "Free plan allows only one Choice List. Upgrade to Premium for unlimited Choice Lists."
    );
  }

}

return await ChoiceList.create({
  userId,
  ...payload,
});


};

export const getChoiceLists =
async (userId) => {


if (!userId) {
  throw new Error(
    "User ID is required"
  );
}

return await ChoiceList.find({
  userId,
}).sort({
  createdAt: -1,
});


};

export const getChoiceListById =
async (
userId,
listId
) => {


if (
  !mongoose.Types.ObjectId.isValid(
    listId
  )
) {
  throw new Error(
    "Invalid choice list ID"
  );
}

const choiceList =
  await ChoiceList.findOne({
    _id: listId,
    userId,
  });

if (!choiceList) {
  throw new Error(
    "Choice list not found"
  );
}

const items =
  await ChoiceListItem.find({
    choiceListId: listId,
  })
    .populate(
      "collegeId"
    )
    .sort({
      priority: 1,
    });
 const enrichedItems = await attachChance(userId, items);

return {
  choiceList,
  items: enrichedItems,
};


};

export const addCollegeToChoiceList =
async (
userId,
listId,
collegeId,
fees,
seats
) => {


if (
  !mongoose.Types.ObjectId.isValid(
    listId
  )
) {
  throw new Error(
    "Invalid choice list ID"
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

const subscription =
  await checkSubscription(
    userId
  );

if (
  subscription.isFree
) {

  const totalColleges =
    await ChoiceListItem.countDocuments({
      choiceListId: listId,
    });

  if (
    totalColleges >= 15
  ) {
    throw new Error(
      "Free plan allows only 15 colleges in a Choice List. Upgrade to Premium for unlimited colleges."
    );
  }

}

const choiceList =
  await ChoiceList.findOne({
    _id: listId,
    userId,
  });

if (!choiceList) {
  throw new Error(
    "Choice list not found"
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

const existing =
  await ChoiceListItem.findOne({
    choiceListId: listId,
    collegeId,
  });

if (existing) {
  throw new Error(
    "College already added"
  );
}

const count =
  await ChoiceListItem.countDocuments(
    {
      choiceListId:
        listId,
    }
  );

return await ChoiceListItem.create(
  {
    choiceListId:
      listId,
    collegeId,
    priority:
      count + 1,
      fees: fees ?? null,
  seats: seats ?? null,
  }
);


};

export const updatePriority =
async (
userId,
listId,
itemId,
priority
) => {


const choiceList =
  await ChoiceList.findOne({
    _id: listId,
    userId,
  });

if (!choiceList) {
  throw new Error(
    "Choice list not found"
  );
}

const item =
  await ChoiceListItem.findById(
    itemId
  );

if (!item) {
  throw new Error(
    "Choice item not found"
  );
}

item.priority =
  priority;

await item.save();

return item;


};

export const removeCollegeFromChoiceList =
async (
userId,
listId,
itemId
) => {


const choiceList =
  await ChoiceList.findOne({
    _id: listId,
    userId,
  });

if (!choiceList) {
  throw new Error(
    "Choice list not found"
  );
}

const item =
  await ChoiceListItem.findByIdAndDelete(
    itemId
  );

if (!item) {
  throw new Error(
    "Choice item not found"
  );
}

return item;


};


export const deleteChoiceList =
async (
  userId,
  listId
) => {

  if (
    !mongoose.Types.ObjectId.isValid(
      listId
    )
  ) {
    throw new Error(
      "Invalid choice list ID"
    );
  }

  const choiceList =
    await ChoiceList.findOne({
      _id: listId,
      userId,
    });

  if (!choiceList) {
    throw new Error(
      "Choice list not found"
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Delete all colleges/items belonging to this choice list
  |--------------------------------------------------------------------------
  */

  await ChoiceListItem.deleteMany({
    choiceListId: listId,
  });

  /*
  |--------------------------------------------------------------------------
  | Delete the choice list itself
  |--------------------------------------------------------------------------
  */

  await ChoiceList.findByIdAndDelete(
    listId
  );

  return {
    success: true,
    message:
      "Choice list deleted successfully.",
  };
};



export const getChoiceListForExport = async (userId, listId) => {
  const { choiceList, items } = await getChoiceListById(userId, listId);

  // Student AIR from the profile (optional — falls back to null/NA).
  let studentAIR = null;
  try {
    const StudentProfile = mongoose.model("StudentProfile"); // already registered at startup
    const profile = await StudentProfile.findOne({ userId }).select("rank");
    studentAIR = profile?.rank ?? null;
  } catch {
    studentAIR = null;
  }

  return { choiceList, items, studentAIR };
};


// Populate SAFE/MODERATE/RISKY onto each item from the user's most recent
// prediction that contains that college. No prediction → chance stays null.
export const attachChance = async (userId, items = []) => {
  if (!items.length) return items;

  const toPlain = (it) => (typeof it?.toObject === "function" ? it.toObject() : it);
  const idOf = (it) => (it?.collegeId?._id ?? it?.collegeId)?.toString();

  try {
    const PredictionHistory = mongoose.model("PredictionHistory");
    const collegeIds = items.map(idOf).filter(Boolean);

    const histories = await PredictionHistory.find({
      userId,
      "predictedColleges.collegeId": { $in: collegeIds },
    })
      .sort({ generatedAt: -1 })
      .select("predictedColleges generatedAt")
      .lean();

    // First occurrence wins = most recent (histories sorted desc).
    const map = new Map();
    for (const h of histories) {
      for (const pc of h.predictedColleges ?? []) {
        const cid = pc?.collegeId?.toString();
        if (cid && !map.has(cid) && pc.predictionType) map.set(cid, pc.predictionType);
      }
    }

    return items.map((it) => ({ ...toPlain(it), chance: map.get(idOf(it)) ?? null }));
  } catch {
    return items.map((it) => ({ ...toPlain(it), chance: null }));
  }
};