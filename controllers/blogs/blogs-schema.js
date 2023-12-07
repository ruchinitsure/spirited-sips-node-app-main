import mongoose from "mongoose";

const blogsSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: Object,
      required: true,
      ref: "UserModel",
    },
    blog: {
      type: String,
      required: true,
    },
    time: {
      type: Date,
      required: true,
      default: Date.now(),
    },
  },
  { collection: "blogs" }
);

export default blogsSchema;
