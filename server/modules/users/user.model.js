import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
firstName: {
  type: String,
  required: true,
  trim: true,
},

lastName: {
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
role:{
  type: String,
  default: "student",
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
    isPremium: {
  type: Boolean,
  default: false,
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