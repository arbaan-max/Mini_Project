import { Router } from "express";
import auth from "../middleware/auth.middleware.js";
import upload from "../middleware/multer.middleware.js";
import { createPost, getImages, getMyPost } from "../controllers/posts.controller.js";

const postRouter = Router();
postRouter.use(auth);
postRouter.route("/createPost").post(upload.single("image"), createPost);
postRouter.route("/myPosts").get(getMyPost);
postRouter.route("/deletePost").delete();
postRouter.route("/getimages").get( getImages);

export default postRouter;
