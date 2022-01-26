import { Schema, model, Types } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  posts: {
    type: [Types.ObjectId],
    ref: "Post",
    required: true,
  },
});

const User = model("User", userSchema, "Users");

export default User;
