import express from "express";

import {upload} from "../utils/multer.js";
import {isAuthenticated} from "../middlewares/isAuthenticated.js";

import {
  register,
  login,
  logout,
  resetPassword,
  forgotPassword,
  verifyEmail,
  resendOTP,
  getUserProfile,
  updateProfile,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

router.post("/verify-otp", verifyEmail);
router.post("/resend-otp", resendOTP);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

router.get("/profile", isAuthenticated, getUserProfile);
router.put(
  "/profile/update",
  isAuthenticated,
  upload.single("profilePhoto"),
  updateProfile
);

export default router;
