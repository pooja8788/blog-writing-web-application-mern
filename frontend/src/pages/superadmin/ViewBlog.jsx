// // src/pages/superadmin/ViewBlog.jsx
// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { BACKEND_URL } from "../../utils";
// import toast from "react-hot-toast";

// const ViewBlog = () => {
//   const { id } = useParams();
//   const [blog, setBlog] = useState(null);

//   const fetchBlog = async () => {
//     try {
//       const { data } = await axios.get(`${BACKEND_URL}/api/superadmin/single-blog/${id}`, {
//         withCredentials: true,
//       });
//       setBlog(data.blog);
//     } catch (error) {
//       toast.error("Failed to load blog",error);
//     }
//   };

//   useEffect(() => {
//     fetchBlog();
//   }, [id]);

//   if (!blog) return <p className="p-8">Loading...</p>;

//   return (
//     <div className="p-8">
//       <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
//       <img
//         src={blog.blogImage.url}
//         alt="Blog"
//         className="w-full max-h-[400px] object-cover rounded mb-4"
//       />
//       <p className="text-gray-700 whitespace-pre-line">{blog.about}</p>
//       <div className="mt-4 text-sm text-gray-500">
//         Posted by: <strong>{blog.createdBy?.name || "Unknown"}</strong> |{" "}
//         {new Date(blog.createdAt).toLocaleString()}
//       </div>
//     </div>
//   );
// };

// export default ViewBlog;


// src/pages/superadmin/ViewBlog.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../utils";
import toast from "react-hot-toast";

const ViewBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBlog = async () => {
    try {
      const { data } = await axios.get(
        `${BACKEND_URL}/api/superadmin/single-blog/${id}`,
        { withCredentials: true }
      );
      setBlog(data);
    } catch (error) {
      console.error("Error fetching blog:", error);
      toast.error("Failed to load blog");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  if (loading) return <p className="p-8">Loading...</p>;
  if (!blog) return <p className="p-8 text-red-500">Blog not found.</p>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>

      {blog.blogImage?.url && (
        <img
          src={blog.blogImage.url}
          alt="Blog"
          className="w-full max-h-[400px] object-cover rounded mb-4"
        />
      )}

      <div className="text-gray-500 text-sm mb-4">
        Posted by <strong>{blog.createdBy?.name || "Unknown"}</strong> on{" "}
        {new Date(blog.createdAt).toLocaleString()} | Category:{" "}
        <span className="italic">{blog.category || "Uncategorized"}</span>
      </div>

      <p className="text-gray-700 whitespace-pre-line">{blog.about}</p>
    </div>
  );
};

export default ViewBlog;
