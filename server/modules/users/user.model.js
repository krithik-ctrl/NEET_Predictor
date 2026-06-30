import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

   email: {
  type: String,
  lowercase: true,
  trim: true,
  unique: true,
  sparse: true,
},
  

    provider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },

  

    avatar: {
      type: String,
      default: "",
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    lastLogin: {
      type: Date,
      default: null,
    },
    mobile: {
  type: String,
  default: "",
  required: true,
  unique: true,
  match: [
    /^[6-9]\d{9}$/,
    "Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9.",
  ],
},

isVerified: {
  type: Boolean,
  default: false,
},
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model(
  "User",
  userSchema
);