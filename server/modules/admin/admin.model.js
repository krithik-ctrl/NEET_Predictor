import mongoose from "mongoose";

const adminSchema =
  new mongoose.Schema(
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
        trim: true,
        lowercase: true,
        unique: true,
        sparse: true,
        default: null,
      },

      mobile: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },

      password: {
        type: String,
        required: true,
      },

      role: {
        type: String,
        enum: [
          "admin",
          "sub-admin",
        ],
        default: "admin",
      },

      isVerified: {
        type: Boolean,
        default: false,
      },

      isActive: {
        type: Boolean,
        default: true,
      },

      lastLogin: {
        type: Date,
        default: null,
      },

      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
        default: null,
      },
    },
    {
      timestamps: true,
    }
  );

/*
|--------------------------------------------------------------------------
| Unique Indexes
|--------------------------------------------------------------------------
*/

adminSchema.index({
  mobile: 1,
});

adminSchema.index(
  {
    email: 1,
  },
  {
    unique: true,
    sparse: true,
  }
);

/*
|--------------------------------------------------------------------------
| Search Index
|--------------------------------------------------------------------------
*/

adminSchema.index({
  firstName: "text",
  lastName: "text",
  mobile: "text",
  email: "text",
});

export const Admin =
  mongoose.model(
    "Admin",
    adminSchema
  );