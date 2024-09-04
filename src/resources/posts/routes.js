const express = require("express");
const router = express.Router();
const {
  getAllPosts,
  getPostById,
  createNewPost,
  updatePostById,
  deletePostById,
} = require("./controller");

router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.post("/", createNewPost);
router.put("/:id", updatePostById);
router.delete("/:id", deletePostById);

module.exports = router;
