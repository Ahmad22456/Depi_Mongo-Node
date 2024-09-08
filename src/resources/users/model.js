const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: ["true", "Please enter your name"],
    },
    email: {
      type: String,
      unique: true,
      required: ["true", "Please enter your email"],
      lowercase: true,
      validata: function (val) {
        return validator.isEmail(val);
      },
    },
    password: {
      type: String,
      required: ["true", "Please enter your password"],
      select: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
