import Post from "../../database/models/post";

export const getPostsList = async (req, res, next) => {
  try {
    const posts = await Post.find().populate({
      path: "owner",
      select: "userName",
    });
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
    const newPost = await Post.create(post);
    res.status(201).json(newPost);
  } catch (error) {
    error.code = 400;
    error.message = "Bad request";
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  const { idPost, idOwner } = req.params;
  const { userId } = req.body;
  try {
    if (userId === idOwner) {
      const deletedPost = await Post.findByIdAndDelete(idPost);
      if (deletedPost) {
        res.json({ id: deletedPost.id });
      } else {
        const error: { message: string; code: number } = {
          message: "Post not found",
          code: 404,
        };
        next(error);
      }
    } else {
      const error: { message: string; code: number } = {
        message: "Can't delete other people posts",
        code: 401,
      };
      next(error);
    }
  } catch (error) {
    error.code = 400;
    error.message = "Bad delete request";
    next(error);
  }
};

export const updatePost = async (req, res, next) => {
  const post = req.body;
  const { idPost, idOwner } = req.params;
  const { owner } = req.body;
  try {
    if (idOwner === owner) {
      const updatedPost = await Post.findByIdAndUpdate(idPost, post, {
        new: true,
      });
      if (updatedPost) {
        res.json(updatedPost);
      } else {
        const error: { message: string; code: number } = {
          message: "Post not found",
          code: 404,
        };
        next(error);
      }
    } else {
      const error: { message: string; code: number } = {
        message: "Can't update other people posts",
        code: 401,
      };
      next(error);
    }
  } catch (error) {
    error.code = 400;
    error.message = "Bad update request";
    next(error);
  }
};

export const adminDeletePost = async (req, res, next) => {
  const { idPost } = req.params;
  try {
    const deletedPost = await Post.findByIdAndDelete(idPost);
    if (deletedPost) {
      res.json({ id: deletedPost.id });
    } else {
      const error: { message: string; code: number } = {
        message: "Post not found",
        code: 404,
      };
      next(error);
    }
  } catch (error) {
    error.code = 400;
    error.message = "Bad request";
    next(error);
  }
};

export const getOrderedList = async (req, res, next) => {
  try {
    const posts = await Post.find().populate({
      path: "owner",
      select: "userName",
    });
    const orderedPosts = posts.sort(
      (date1, date2) => date2.releaseDate - date1.releaseDate
    );
    res.json(orderedPosts);
  } catch (error) {
    error.message = "Can't find the posts";
    error.code = 400;
    next(error);
  }
};
