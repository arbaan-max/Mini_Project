import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is Required"],
    },
    resultImage: {
      type: String,
      required: [true, "Post Image Is Required"],
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { versionKey: false },
  { timestamps: true }
);

export const Post = mongoose.model("Post", postSchema);
