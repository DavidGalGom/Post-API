import Post from "../../database/models/post";

const getPostsList = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    error.message = "Can't find the posts";
    error.code = 400;
    next(error);
  }
};

export default getPostsList;
