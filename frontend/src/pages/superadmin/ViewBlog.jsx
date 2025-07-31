// src/pages/superadmin/ViewBlog.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../utils";
import toast from "react-hot-toast";

const ViewBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  const fetchBlog = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/blogs/${id}`, {
        withCredentials: true,
      });
      setBlog(data.blog);
    } catch (error) {
      toast.error("Failed to load blog",error);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  if (!blog) return <p className="p-8">Loading...</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <img
        src={blog.blogImage.url}
        alt="Blog"
        className="w-full max-h-[400px] object-cover rounded mb-4"
      />
      <p className="text-gray-700 whitespace-pre-line">{blog.about}</p>
      <div className="mt-4 text-sm text-gray-500">
        Posted by: <strong>{blog.createdBy?.name || "Unknown"}</strong> |{" "}
        {new Date(blog.createdAt).toLocaleString()}
      </div>
    </div>
  );
};

export default ViewBlog;
