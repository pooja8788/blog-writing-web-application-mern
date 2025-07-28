import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { isSuperAdmin } from "../middlewares/isSuperAdmin.js";
import {
  getAllUsers,
  updateUserRole,
  deleteUser,
  getAllPosts,
  deletePost
} from "../controllers/superAdmin.controller.js";

const router = express.Router();

// Protect all routes
router.use(isAuthenticated);
router.use(isSuperAdmin);

// User Management
router.get("/users", getAllUsers);
router.patch("/users/:id/role", updateUserRole);
router.delete("/users/:id", deleteUser);

// Post Management
router.get("/posts", getAllPosts);
router.delete("/posts/:id", deletePost);

export default router;
