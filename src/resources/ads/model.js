const mongoose = require("mongoose");

const adsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: ["true", "Please add title"],
    },
    content: {
      type: String,
      required: ["true", "Please add content"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const ads = mongoose.model("Ads", adsSchema);

module.exports = ads;
