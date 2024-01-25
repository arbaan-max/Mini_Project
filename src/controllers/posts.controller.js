import asyncHandler from "../middleware/async_jandler.middleware.js";
import { Post } from "../model/posts.model.js";
import cloudinary from "../utils/cloudinary.utils.js";

const createPost = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user;
  if (!title || !description) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  const result = await cloudinary.uploader.upload(
    req.file.path,
    {
      folder: 'miniProject/',
      use_filename: true
    },
    (err, resu) => {
      if (err) {
        res.status(500);
        throw new Error(`Error : ${err}`);
      }
      console.log(`UpLoaded`);
    }
  );
  const resultImage = result.secure_url;
  await Post.create({ userId, title, description, resultImage });
  res.status(201).json({ message: `post : ${userId}` });
});

const getMyPost = asyncHandler(async (req, res) => {
  const userId = req.user;
  if (!userId) {
    res.status(400);
    throw new Error("User Id Not Defined");
  }
  const posts = await Post.find({ userId }).populate("userId");
  res.status(200).json(posts);
});

export { createPost, getMyPost };
