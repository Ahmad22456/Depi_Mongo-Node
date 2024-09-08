const express = require("express");
const router = express.Router();
const { checkAuth } = require("../users/middleware");
const {
  getAllPosts,
  getPostById,
  createNewPost,
  updatePostById,
  deletePostById,
} = require("./controller");

router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.post("/", checkAuth, createNewPost);
router.put("/:id", updatePostById);
router.delete("/:id", checkAuth, deletePostById);

module.exports = router;
