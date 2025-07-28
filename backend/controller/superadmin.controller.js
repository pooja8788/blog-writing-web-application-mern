import { User } from "../models/user.model.js";
import { Blog } from "../models/blog.model.js";

// 1. Get all users
export const getAllUsers = async (req, res) => {
  const users = await User.find({}, "-password"); // exclude password
  res.status(200).json({ users });
};

// 2. Update user role (promote/demote)
export const updateUserRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!["user", "admin"].includes(role)) {
    return res.status(400).json({ error: "Invalid role" });
  }

  const user = await User.findByIdAndUpdate(id, { role }, { new: true });
  if (!user) return res.status(404).json({ error: "User not found" });

  res.status(200).json({ message: "User role updated", user });
};

// 3. Delete a user
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findByIdAndDelete(id);
  if (!user) return res.status(404).json({ error: "User not found" });

  res.status(200).json({ message: "User deleted" });
};

// 4. Get all posts
export const getAllPosts = async (req, res) => {
  const posts = await Blog.find().populate("admin", "name email");
  res.status(200).json({ posts });
};

// 5. Delete a post
export const deletePost = async (req, res) => {
  const { id } = req.params;

  const post = await Blog.findByIdAndDelete(id);
  if (!post) return res.status(404).json({ error: "Post not found" });

  res.status(200).json({ message: "Post deleted" });
};
