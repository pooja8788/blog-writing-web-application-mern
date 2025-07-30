// // src/pages/superadmin/AllPosts.jsx
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { BACKEND_URL } from "../../utils";
// import toast from "react-hot-toast";

// const AllPosts = () => {
//   const [posts, setPosts] = useState([]);

//   const fetchPosts = async () => {
//     const res = await axios.get(`${BACKEND_URL}/api/superadmin/posts`, { withCredentials: true });
//     setPosts(res.data.posts);
//   };

//   const handleDelete = async (id) => {
//     await axios.delete(`${BACKEND_URL}/api/superadmin/posts/${id}`, { withCredentials: true });
//     toast.success("Post deleted");
//     fetchPosts();
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   return (
//     <div className="p-8">
//       <h2 className="text-xl font-semibold mb-4">All Blog Posts</h2>
//       <ul className="space-y-4">
//         {posts.map((post) => (
//           <li key={post._id} className="p-4 border rounded">
//             <h3 className="font-bold">{post.title}</h3>
//             <p>By: {post.createdBy?.name || "Unknown"}</p>
//             <button
//               onClick={() => handleDelete(post._id)}
//               className="text-red-600 underline mt-2"
//             >
//               Delete Post
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default AllPosts;


// src/pages/superadmin/AllPosts.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../utils";
import toast from "react-hot-toast";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/superadmin/posts`, {
        withCredentials: true,
      });
      setPosts(res.data.posts);
    } catch (error) {
      toast.error("Failed to fetch posts");
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/superadmin/posts/${id}`, {
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
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">📝 All Blog Posts</h2>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div key={post._id} className="border rounded-md shadow-md p-4 bg-white">
            <img
              src={post.blogImage.url}
              alt={post.title}
              className="w-full h-40 object-cover rounded mb-2"
            />
            <h3 className="text-lg font-semibold">{post.title}</h3>
            <p className="text-sm text-gray-600 mb-1">
              {post.about.slice(0, 80)}...
            </p>

            <div className="flex items-center space-x-2 mt-2">
              {post.createdBy?.photo?.url && (
                <img
                  src={post.createdBy.photo.url}
                  alt="creator"
                  className="w-8 h-8 rounded-full"
                />
              )}
              <span className="text-sm text-gray-700 font-medium">
                {post.createdBy?.name || "Unknown"}
              </span>
            </div>

            <p className="text-xs text-gray-500 mt-1">
              {new Date(post.createdAt).toLocaleString()}
            </p>
            <p className="text-xs text-gray-500">👁 {post.views} views</p>

            <button
              onClick={() => handleDelete(post._id)}
              className="mt-3 bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded text-sm"
            >
              Delete Post
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPosts;
