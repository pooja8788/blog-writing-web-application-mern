import express from "express";
import {
  getAdmins,
  getMyProfile,
  login,
  logout,
  register,
  toggleFavorite,
  getFavorites,
} from "../controller/user.controller.js";
import { isAuthenticated } from "../middleware/authUser.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/my-profile", isAuthenticated, getMyProfile);
router.get("/admins", getAdmins);
router.get("/favorites", isAuthenticated, getFavorites);
router.post("/toggle-favorite/:blogId", isAuthenticated, toggleFavorite);

export default router;
