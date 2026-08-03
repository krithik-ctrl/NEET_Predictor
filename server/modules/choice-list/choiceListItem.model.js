import mongoose from "mongoose";

const choiceListItemSchema =
new mongoose.Schema(
{
choiceListId: {
type: mongoose.Schema.Types.ObjectId,
ref: "ChoiceList",
required: true,
},

  collegeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "College",
    required: true,
  },

  priority: {
    type: Number,
    required: true,
    min: 1,
  },
   fees:  { type: Number, default: null },
  seats: { type: Number, default: null },
},
{
  timestamps: true,
}


);

choiceListItemSchema.index(
{
choiceListId: 1,
collegeId: 1,
},
{
unique: true,
}
);

export const ChoiceListItem =
mongoose.model(
"ChoiceListItem",
choiceListItemSchema
);
