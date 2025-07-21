import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  user: {
    type: String, // or ObjectId if using users
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});


const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  blogImage: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  category: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
    minlength: [200, "Should contain atleast 200 characters!"],
  },
  adminName: {
    type: String,
  },
  adminPhoto: {
    type: String,
  },
  views: {
    type: Number,
    default: 0,
  },
  comments: [commentSchema],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
});
export const Blog = mongoose.model("Blog", blogSchema);
