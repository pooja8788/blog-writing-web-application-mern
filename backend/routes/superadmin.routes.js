import express from "express";
import { isAuthenticated } from "../middleware/authUser.js"; // ✅ use existing file
import { isSuperAdmin } from "../middleware/isSuperAdmin.js";
import {
  getAllUsers,
  deleteUser,
  getAllPosts,
  deletePost,
  updateUserRole,
  getSingleBlog,
} from "../controller/superadmin.controller.js";

const router = express.Router();

router.use(isAuthenticated, isSuperAdmin);

router.get("/users", isAuthenticated, isSuperAdmin, getAllUsers);
router.delete("/users/:id", isAuthenticated, isSuperAdmin, deleteUser);
router.get("/posts", isAuthenticated, isSuperAdmin, getAllPosts);
router.delete("/posts/:id", isAuthenticated, isSuperAdmin, deletePost);
router.patch("/users/:id/role", isAuthenticated, isSuperAdmin, updateUserRole);
router.get("/single-blog/:id", isAuthenticated, getSingleBlog);


export default router;
