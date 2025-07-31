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
// controller/superadmin.controller.js
export const getAllPosts = async (req, res) => {
  const { search = "", category = "", sort = "desc", limit = 10, page = 1 } = req.query;

  const query = {};

  if (search) {
    query.title = { $regex: search, $options: "i" };
  }

  if (category) {
    query.category = category;
  }

  const skip = (page - 1) * limit;

  const posts = await Blog.find(query)
    .populate("createdBy", "name photo")
    .sort({ createdAt: sort === "asc" ? 1 : -1 })
    .skip(skip)
    .limit(Number(limit));

  const total = await Blog.countDocuments(query);

  res.status(200).json({
    posts,
    total,
    currentPage: Number(page),
    totalPages: Math.ceil(total / limit),
  });
};

// 5. Delete a post
export const deletePost = async (req, res) => {
  const { id } = req.params;

  const post = await Blog.findByIdAndDelete(id);
  if (!post) return res.status(404).json({ error: "Post not found" });

  res.status(200).json({ message: "Post deleted" });
};

// Get single blogs
export const getSingleBlog = async (req, res) => {
  try {
    const blogId = req.params.id;

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(blog);
  } catch (error) {
    console.error("Error fetching blog:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
