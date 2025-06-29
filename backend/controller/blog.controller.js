import mongoose, { mongo } from "mongoose";
import { Blog } from "../models/blog.model.js";
import { v2 as cloudinary } from "cloudinary";

// Post Comments
export const addComment = async (req, res) => {
  const { id } = req.params;
  const { user, text } = req.body;
  if (!user || !text) {
    return res.status(400).json({ message: "User and text are required." });
  }

  try {
    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    blog.comments.push({ user, text });
    await blog.save();

    res
      .status(201)
      .json({ message: "Comment added successfully", comments: blog.comments });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

//Get comments
export const getComments = async (req, res) => {
  try {
    const id = req.params.id;

    const blog = await Blog.findById(id).populate("comments");

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(blog.comments);
  } catch (error) {
    console.error("Fetch comments error:", error.message);
    res.status(500).json({ message: "Error fetching comments" });
  }
};

//Create blog
export const createBlog = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: "Blog Image is required" });
    }
    const { blogImage } = req.files;
    const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedFormats.includes(blogImage.mimetype)) {
      return res.status(400).json({
        message: "Invalid photo format. Only jpg and png are allowed",
      });
    }
    const { title, category, about } = req.body;
    if (!title || !category || !about) {
      return res
        .status(400)
        .json({ message: "title, category & about are required fields" });
    }
    const adminName = req?.user?.name;
    const adminPhoto = req?.user?.photo?.url;
    const createdBy = req?.user?._id;

    const cloudinaryResponse = await cloudinary.uploader.upload(
      blogImage.tempFilePath
    );
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.log(cloudinaryResponse.error);
    }
    const blogData = {
      title,
      about,
      category,
      adminName,
      adminPhoto,
      createdBy,
      blogImage: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      },
    };
    const blog = await Blog.create(blogData);
    console.log(cloudinaryResponse);


    res.status(201).json({
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

//delete blog
export const deleteBlog = async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);
  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }
  await blog.deleteOne();
  res.status(200).json({ message: "Blog deleted successfully" });
};

export const getAllBlogs = async (req, res) => {
  const allBlogs = await Blog.find();
  res.status(200).json(allBlogs);
};

export const getSingleBlogs = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Blog id" });
  }
  const blog = await Blog.findById(id);
  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }
  res.status(200).json(blog);
};

//get my blog
export const getMyBlogs = async (req, res) => {
  const createdBy = req.user._id;
  const myBlogs = await Blog.find({ createdBy });
  res.status(200).json(myBlogs);
};

//Search
export const searchBlogs = async (req, res) => {
  const query = req.query.q;
  console.log("Search query:", query);

  if (!query) {
    return res.status(400).json({ message: "Search query is required" });
  }

  try {
    const blogs = await Blog.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { about: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ],
    })
      .select("title about category adminName adminPhoto blogImage createdAt") // Only include necessary fields
      .sort({ createdAt: -1 }); // Most recent first

    res.status(200).json(blogs);
  } catch (error) {
    console.error("Search error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// export const updateBlog = async (req, res) => {
//   const { id } = req.params;
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).json({ message: "Invalid Blog id" });
//   }
//   const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
//   if (!updatedBlog) {
//     return res.status(404).json({ message: "Blog not found" });
//   }
//   res.status(200).json(updatedBlog);
// };


// Update blog

export const updateBlog = async (req, res) => {
  const { id } = req.params;

  // Validate blog ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Blog ID" });
  }

  try {
    const { title, category, about } = req.body;
    const updateFields = { title, category, about };

    // If an image file is uploaded
    if (req.files && req.files.blogImage) {
      const blogImage = req.files.blogImage;
      const allowedFormats = ["image/jpeg", "image/png", "image/webp"];

      if (!allowedFormats.includes(blogImage.mimetype)) {
        return res.status(400).json({
          message: "Invalid image format. Only JPG, PNG, WEBP allowed.",
        });
      }

      // Upload new image to Cloudinary
      const cloudinaryResponse = await cloudinary.uploader.upload(blogImage.tempFilePath);

      updateFields.blogImage = {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url, 
      };
    }

    // Update the blog with new fields
    const updatedBlog = await Blog.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({
      message: "Blog updated successfully",
      blog: updatedBlog,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
