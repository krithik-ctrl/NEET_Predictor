import mongoose from "mongoose";

const collegeSchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
      },
      shortName: {
  type: String,
  trim: true,
  default: "",
},

      state: {
        type: String,
        required: true,
        trim: true,
      },

      city: {
        type: String,
        required: true,
        trim: true,
      },

      ownership: {
        type: String,
        enum: [
          "Government",
          "Private",
          "Deemed",
        ],
        required: true,
      },

 

      courses: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Course",
        },
      ],

      website: {
        type: String,
        default: "",
      },
      //level

      status: {
        type: String,
        enum: [
          "active",
          "inactive",
        ],
        default: "active",
      },
    },
    {
      timestamps: true,
    }
  );


collegeSchema.index({
  state: 1,
});

collegeSchema.index({
  collegeType: 1,
});

collegeSchema.index({
  ownership: 1,
});

collegeSchema.index({
  courses: 1,
});

collegeSchema.index({
  level: 1,
});

export const College =
  mongoose.model(
    "College",
    collegeSchema
  );