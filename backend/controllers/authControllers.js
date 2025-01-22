import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

// @desc    Log user
// @route   POST /api/auth
// @access  Public
export const authUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({
    username,
    password,
  });

  if (!user) {
    res.status(400);
    throw new Error("راجع, راك غالط في حاجة يا زميل");
  }

  const token = jwt.sign({ username }, process.env.JWT_SECRET);
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "None",
    maxAge: null,
  });

  res.json({ message: "Login successfully" });
});

// @desc    auth Check
// @route   GET /api/auth/check
// @access  Public
export const authCheck = asyncHandler(async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json({ valid: false });
  }
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    res.json({ valid: true });
  } catch (err) {
    res.status(401).json({ valid: false });
  }
});
