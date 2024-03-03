import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  allRsvps,
  getProfile,
} from "../controllers/userControllers.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/rsvps").get(protect, allRsvps);
router.route("/profile").get(getProfile);

export default router;
