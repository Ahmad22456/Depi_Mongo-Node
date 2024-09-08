const mongoose = require("mongoose");
const { type } = require("os");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: ["true", "Please add title to your post"],
    },
    body: {
      type: String,
      required: ["true", "Please add body to your post"],
    },
    tags: {
      type: Array,
      default: [],
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const post = mongoose.model("post", postSchema);

module.exports = post;
