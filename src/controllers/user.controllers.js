import asyncHandler from "../middleware/async_jandler.middleware.js";
import { User } from "../model/user.model.js";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error("User already exists");
  }
  const hashPassword = bcrypt.hashSync(password, salt);
  const register = await User({
    name: name,
    email: email,
    password: hashPassword,
  });
  const registerUser = await register.save();
  const responseUser = registerUser.toObject();
  delete responseUser.__v;
  res.status(200).json(responseUser);
});

const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find().select("-__v");
    res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("Please add all fields");
    }
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400);
      throw new Error("User not found");
    }
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      res.status(400);
      throw new Error("Invalid credentials");
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      token: token,
    };
    res.status(200).json(userResponse);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

export { registerUser, getAllUsers, loginUser};
