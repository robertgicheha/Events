import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import UserModel from "../models/userModel.js";
import generateToken from "../config/generateToken.js";
import jwt from "jsonwebtoken";

const bcryptSalt = bcrypt.genSaltSync(10);

//@description     Register new user
//@route           POST /api/users/register
//@access          Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Fields");
  }
  const userExists = await UserModel.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await UserModel.create({
    name,
    email,
    password: bcrypt.hashSync(password, bcryptSalt),
  });
  if (user) {
    const token = generateToken(user._id);
    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      })
      .status(201)
      .json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
  } else {
    res.status(400);
    throw new Error("Failed to create user");
  }
});

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  //todo:if no user found
  if (user) {
    const passOk = bcrypt.compareSync(password, user.password);
    if (passOk) {
      const token = generateToken(user._id);
      res
        .cookie("token", token, {
          httpOnly: true,
          sameSite: "None",
          secure: true,
        })
        .status(201)
        .json({
          _id: user._id,
          name: user.name,
          email: user.email,
        });
    } else {
      res.status(401);
      throw new Error("Invalid Credentials");
    }
  } else {
    res.status(401);
    throw new Error("Invalid Credentials");
  }
});

//@description     Logout user
//@route           POST /api/users/logout
//@access          Public
const logoutUser = asyncHandler(async (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    })
    .status(200)
    .json({ success: true });
});

//@description     Find user rsvps
//@route           GET /api/users/rsvps
//@access          Protected
const allRsvps = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.user._id).populate("rsvps");
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  const participatedEvents = user.rsvps;
  res.json(participatedEvents);
});

//@description     Get user info
//@route           GET /api/users/profile
//@access          Public
const getProfile = asyncHandler(async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded.id);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.json(null);
  }
});

export { registerUser, loginUser, logoutUser, allRsvps, getProfile };
