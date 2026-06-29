import mongoose from "mongoose";

const planSchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
      },

      description: {
        type: String,
        required: true,
        trim: true,
      },

      price: {
        type: Number,
        required: true,
        min: 0,
      },

      duration: {
        type: Number,
        required: true,
        default: 0,
      },

      features: [
        {
          type: String,
          trim: true,
        },
      ],

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

export const Plan =
  mongoose.model(
    "Plan",
    planSchema
  );