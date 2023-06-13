const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    forumsProject: {
      type: Boolean,
      required: true,
      default: true,
    },
    userPoints: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { collection: "users", timestamps: true }
);

const userPermissionSet = mongoose.Schema(
  {
    permissions: {
      type: Array,
      required: true,
      unique: true,
    },
  },
  { collection: "userPermissionSets", timestamps: true }
);

const User = mongoose.model("User", userSchema);

const UserPermissionSet = mongoose.model(
  "UserPermissionSet",
  userPermissionSet
);

module.exports = { User, UserPermissionSet };
