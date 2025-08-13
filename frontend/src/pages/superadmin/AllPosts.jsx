// // // // src/pages/superadmin/AllPosts.jsx
// // // import { useEffect, useState } from "react";
// // // import axios from "axios";
// // // import { BACKEND_URL } from "../../utils";
// // // import toast from "react-hot-toast";

// // // const AllPosts = () => {
// // //   const [posts, setPosts] = useState([]);

// // //   const fetchPosts = async () => {
// // //     const res = await axios.get(`${BACKEND_URL}/api/superadmin/posts`, { withCredentials: true });
// // //     setPosts(res.data.posts);
// // //   };

// // //   const handleDelete = async (id) => {
// // //     await axios.delete(`${BACKEND_URL}/api/superadmin/posts/${id}`, { withCredentials: true });
// // //     toast.success("Post deleted");
// // //     fetchPosts();
// // //   };

// // //   useEffect(() => {
// // //     fetchPosts();
// // //   }, []);

// // //   return (
// // //     <div className="p-8">
// // //       <h2 className="text-xl font-semibold mb-4">All Blog Posts</h2>
// // //       <ul className="space-y-4">
// // //         {posts.map((post) => (
// // //           <li key={post._id} className="p-4 border rounded">
// // //             <h3 className="font-bold">{post.title}</h3>
// // //             <p>By: {post.createdBy?.name || "Unknown"}</p>
// // //             <button
// // //               onClick={() => handleDelete(post._id)}
// // //               className="text-red-600 underline mt-2"
// // //             >
// // //               Delete Post
// // //             </button>
// // //           </li>
// // //         ))}
// // //       </ul>
// // //     </div>
// // //   );
// // // };

// // // export default AllPosts;

// // // src/pages/superadmin/AllPosts.jsx
// // import { useEffect, useState } from "react";
// // import axios from "axios";
// // import { BACKEND_URL } from "../../utils";
// // import toast from "react-hot-toast";

// // const AllPosts = () => {
// //   const [posts, setPosts] = useState([]);

// //   const fetchPosts = async () => {
// //     try {
// //       const res = await axios.get(`${BACKEND_URL}/api/superadmin/posts`, {
// //         withCredentials: true,
// //       });
// //       setPosts(res.data.posts);
// //     } catch (error) {
// //       toast.error("Failed to fetch posts");
// //       console.log(error);
// //     }
// //   };

// //   const handleDelete = async (id) => {
// //     try {
// //       await axios.delete(`${BACKEND_URL}/api/superadmin/posts/${id}`, {
// //         withCredentials: true,
// //       });
// //       toast.success("Post deleted");
// //       fetchPosts();
// //     } catch (error) {
// //       toast.error("Failed to delete post", error);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchPosts();
// //   }, []);

// //   return (
// //     <div className="p-8">
// //       <h2 className="text-2xl font-bold mb-6">📝 All Blog Posts</h2>
// //       <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
// //         {posts.map((post) => (
// //           <div key={post._id} className="border rounded-md shadow-md p-4 bg-white">
// //             <img
// //               src={post.blogImage.url}
// //               alt={post.title}
// //               className="w-full h-40 object-cover rounded mb-2"
// //             />
// //             <h3 className="text-lg font-semibold">{post.title}</h3>
// //             <p className="text-sm text-gray-600 mb-1">
// //               {post.about.slice(0, 80)}...
// //             </p>

// //             <div className="flex items-center space-x-2 mt-2">
// //               {post.createdBy?.photo?.url && (
// //                 <img
// //                   src={post.createdBy.photo.url}
// //                   alt="creator"
// //                   className="w-8 h-8 rounded-full"
// //                 />
// //               )}
// //               <span className="text-sm text-gray-700 font-medium">
// //                 {post.createdBy?.name || "Unknown"}
// //               </span>
// //             </div>

// //             <p className="text-xs text-gray-500 mt-1">
// //               {new Date(post.createdAt).toLocaleString()}
// //             </p>
// //             <p className="text-xs text-gray-500">👁 {post.views} views</p>

// //             <button
// //               onClick={() => handleDelete(post._id)}
// //               className="mt-3 bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded text-sm"
// //             >
// //               Delete Post
// //             </button>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default AllPosts;

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { BACKEND_URL } from "../../utils";
// import toast from "react-hot-toast";

// const AllPosts = () => {
//   const [posts, setPosts] = useState([]);
//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("");
//   const [sort, setSort] = useState("desc");
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   const fetchPosts = async () => {
//     try {
//       const res = await axios.get(
//         `${BACKEND_URL}/api/superadmin/posts?search=${search}&category=${category}&sort=${sort}&page=${page}&limit=6`,
//         { withCredentials: true }
//       );

//       setPosts(res.data.posts);
//       setTotalPages(res.data.totalPages);
//     } catch (error) {
//       toast.error("Failed to fetch posts");
//       console.log(error);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`${BACKEND_URL}/api/superadmin/posts/${id}`, {
//         withCredentials: true,
//       });
//       toast.success("Post deleted");
//       fetchPosts();
//     } catch (error) {
//       toast.error("Failed to delete post", error);
//     }
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, [search, category, sort, page]);

//   return (
//     <div className="p-8">
//       <h2 className="text-2xl font-bold mb-4">📝 All Blog Posts</h2>

//       {/* Filters */}
//       <div className="mb-4 flex flex-wrap gap-4 items-center">
//         <input
//           type="text"
//           placeholder="Search by title..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="border px-3 py-1 rounded"
//         />
//         <select
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           className="border px-2 py-1 rounded"
//         >
//           <option value="">All Categories</option>
//           <option value="Health">Health</option>
//           <option value="Coding">Coding</option>
//           <option value="Business">Business</option>
//           <option value="Devotional">Devotional</option>
//         </select>
//         <select
//           value={sort}
//           onChange={(e) => setSort(e.target.value)}
//           className="border px-2 py-1 rounded"
//         >
//           <option value="desc">Newest First</option>
//           <option value="asc">Oldest First</option>
//         </select>
//       </div>

//       {/* Posts List */}
//       <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//         {posts.map((post) => (
//           <div key={post._id} className="border p-4 rounded shadow bg-white">
//             <img
//               src={post.blogImage.url}
//               alt={post.title}
//               className="w-full h-40 object-cover rounded mb-2"
//             />
//             <h3 className="text-lg font-semibold">{post.title}</h3>
//             <p className="text-sm text-gray-600">
//               {post.about.slice(0, 80)}...
//             </p>
//             <div className="flex items-center mt-2 space-x-2">
//               {post.createdBy?.photo?.url && (
//                 <img
//                   src={post.createdBy.photo.url}
//                   alt="author"
//                   className="w-7 h-7 rounded-full"
//                 />
//               )}
//               <span className="text-sm">
//                 {post.createdBy?.name || "Unknown"}
//               </span>
//             </div>
//             <p className="text-xs text-gray-400 mt-1">
//               {new Date(post.createdAt).toLocaleDateString()} | 👁 {post.views}
//             </p>
//             <div className="flex gap-2 mt-2">
//               <a
//                 href={`/superadmin/view-blog/${post._id}`}
//                 className="bg-blue-500 text-white px-3 py-1 text-sm rounded"
//               >
//                 View
//               </a>
//               <button
//                 onClick={() => handleDelete(post._id)}
//                 className="bg-red-500 text-white px-3 py-1 text-sm rounded"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-center mt-6 gap-4">
//         <button
//           onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
//           disabled={page === 1}
//           className="px-3 py-1 border rounded"
//         >
//           Prev
//         </button>
//         <span className="text-sm">
//           Page {page} of {totalPages}
//         </span>
//         <button
//           onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
//           disabled={page === totalPages}
//           className="px-3 py-1 border rounded"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AllPosts;


import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../utils";
import toast from "react-hot-toast";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]); // ✅ new state
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("desc");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch blog posts
  const fetchPosts = async () => {
    try {
      const res = await axios.get(
        `${BACKEND_URL}/api/superadmin/posts?search=${search}&category=${category}&sort=${sort}&page=${page}&limit=6`,
        { withCredentials: true }
      );
      setPosts(res.data.posts);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      toast.error("Failed to fetch posts");
      console.log(error);
    }
  };

  // ✅ Fetch blog categories dynamically
  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/categories`, {
        withCredentials: true,
      });
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories", error);
      toast.error("Unable to load categories");
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

  // Fetch posts + categories on load and when filters change
  useEffect(() => {
    fetchPosts();
  }, [search, category, sort, page]);

  useEffect(() => {
    fetchCategories(); // ✅ load categories on mount
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">📝 All Blog Posts</h2>

      {/* Filters */}
      <div className="mb-4 flex flex-wrap gap-4 items-center">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-1 rounded"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>
      </div>

      {/* Posts List */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div key={post._id} className="border p-4 rounded shadow bg-white">
            <img
              src={post.blogImage.url}
              alt={post.title}
              className="w-full h-40 object-cover rounded mb-2"
            />
            <h3 className="text-lg font-semibold">{post.title}</h3>
            <p className="text-sm text-gray-600">
              {post.about.slice(0, 80)}...
            </p>
            <div className="flex items-center mt-2 space-x-2">
              {post.createdBy?.photo?.url && (
                <img
                  src={post.createdBy.photo.url}
                  alt="author"
                  className="w-7 h-7 rounded-full"
                />
              )}
              <span className="text-sm">
                {post.createdBy?.name || "Unknown"}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              {new Date(post.createdAt).toLocaleDateString()} | 👁 {post.views}
            </p>
            <div className="flex gap-2 mt-2">
              <a
                href={`/superadmin/view-blog/${post._id}`}
                className="bg-blue-500 text-white px-3 py-1 text-sm rounded"
              >
                View
              </a>
              <button
                onClick={() => handleDelete(post._id)}
                className="bg-red-500 text-white px-3 py-1 text-sm rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 border rounded"
        >
          Prev
        </button>
        <span className="text-sm">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-3 py-1 border rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllPosts;
