// src/pages/superadmin/AllPosts.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../utils";
import toast from "react-hot-toast";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const res = await axios.get(`${BACKEND_URL}/api/superadmin/posts`, { withCredentials: true });
    setPosts(res.data.posts);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${BACKEND_URL}/api/superadmin/posts/${id}`, { withCredentials: true });
    toast.success("Post deleted");
    fetchPosts();
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-xl font-semibold mb-4">All Blog Posts</h2>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post._id} className="p-4 border rounded">
            <h3 className="font-bold">{post.title}</h3>
            <p>By: {post.admin?.name || "Unknown"}</p>
            <button
              onClick={() => handleDelete(post._id)}
              className="text-red-600 underline mt-2"
            >
              Delete Post
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllPosts;
