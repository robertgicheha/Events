import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";
import asyncHandler from "express-async-handler";

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (req.cookies && req.cookies.token) {
    try {
      token = req.cookies.token;
      //decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await UserModel.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }
  //if no token found in cookies
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export default protect;
