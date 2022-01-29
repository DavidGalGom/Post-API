import Post from "../../database/models/post";

export const getPostsList = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    error.message = "Can't find the posts";
    error.code = 400;
    next(error);
  }
};

export const addPost = async (req, res, next) => {
  try {
    const post = req.body;
    const newPost = await Post.create({ post });
    res.status(201).json(newPost);
  } catch (error) {
    error.code = 400;
    error.message = "Bad request";
    next(error);
  }
};
