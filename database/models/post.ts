import { Schema, model, Types } from "mongoose";

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  owner: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  releaseDate: {
    type: Date,
    default: new Date(),
  },
});

const Post = model("Post", postSchema, "Posts");

export default Post;
