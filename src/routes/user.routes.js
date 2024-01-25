import { Router } from "express";
import {
  getAllUsers,
  loginUser,
  registerUser,
} from "../controllers/user.controllers.js";
import auth from "../middleware/auth.middleware.js";

const userRoutes = Router();

// Routes without JWT token verification
/// only [registerUser,loginUser] is without jwt
userRoutes.post("/registerUser", registerUser);
userRoutes.post("/login", loginUser);
/// With MiddleWare of JWT token verification
userRoutes.route("/getUsers").get(auth, getAllUsers);

export default userRoutes;
