import mongoose from "mongoose";

const choiceListSchema =
new mongoose.Schema(
{
userId: {
type: mongoose.Schema.Types.ObjectId,
ref: "User",
required: true,
},


  name: {
    type: String,
    required: true,
    trim: true,
  },

  status: {
    type: String,
    enum: [
      "active",
      "archived",
    ],
    default: "active",
  },
},
{
  timestamps: true,
}


);

export const ChoiceList =
mongoose.model(
"ChoiceList",
choiceListSchema
);
