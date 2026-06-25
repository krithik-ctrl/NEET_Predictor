import mongoose from "mongoose";

import { ChoiceList } from "./choiceList.model.js";
import { ChoiceListItem } from "./choiceListItem.model.js";

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

return {
  choiceList,
  items,
};


};

export const addCollegeToChoiceList =
async (
userId,
listId,
collegeId
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
