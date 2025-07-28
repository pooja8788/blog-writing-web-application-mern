// src/pages/ManagePosts.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../utils";
import toast from "react-hot-toast";

const ManagePosts = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/superadmin/posts`, {
        withCredentials: true,
      });
      setPosts(data.posts);
    } catch (error) {
      toast.error("Failed to fetch posts" , error);
    }
  };

  const deletePost = async (postId) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/superadmin/posts/${postId}`, {
        withCredentials: true,
      });
      toast.success("Post deleted");
      fetchPosts();
    } catch (error) {
      toast.error("Failed to delete post", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Manage Blog Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post._id}
            className="border p-4 rounded shadow bg-white space-y-2"
          >
            <img
              src={post.blogImage?.url}
              alt={post.title}
              className="w-full h-40 object-cover rounded"
            />
            <h3 className="text-lg font-semibold">{post.title}</h3>
            <p className="text-sm text-gray-500">
              By: {post.admin?.name || "Unknown"}
            </p>
            <button
              className="bg-red-500 text-white px-4 py-1 rounded"
              onClick={() => deletePost(post._id)}
            >
              Delete Post
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagePosts;
