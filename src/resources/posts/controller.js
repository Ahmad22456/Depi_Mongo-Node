const Post = require("./model");

exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().populate({
      path: "user_id",
      select: "name",
    });
    res.status(200).json({
      data: posts,
    });
  } catch (error) {
    next(error);
  }
};

exports.getPostById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const post = await Post.findById(id);
    res.status(200).json({
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

exports.createNewPost = async (req, res, next) => {
  const { title, body, tags } = req.body;
  try {
    const newPost = await Post.create({
      title,
      body,
      tags,
      user_id: req.user_id,
    });
    res.status(201).json({
      data: newPost,
    });
  } catch (error) {
    next(error);
  }
};

exports.updatePostById = async (req, res, next) => {
  const id = req.params.id;
  const { title, body, tags } = req.body;
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      {
        title,
        body,
        tags,
      },
      { new: true }
    );
    res.status(201).json({
      data: updatedPost,
    });
  } catch (error) {
    next(error);
  }
};

exports.deletePostById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const post = await Post.findById(id);
    if (req.user_id !== post.user_id)
      res.status(401).json({ message: "Can't do this action" });
    const deletedPost = await Post.findByIdAndDelete(id);
    res.status(201).json({
      message: "Post deleted successfully",
      data: deletedPost,
    });
  } catch (error) {
    next(error);
  }
};
