// /* eslint-disable no-unused-vars */
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { useParams } from "react-router-dom";
// import { BACKEND_URL } from "../utils";

// function Detail() {
//   const { id } = useParams();
//   const [blogs, setBlogs] = useState({});
//   const [comment, setComment] = useState("");
//   const [comments, setComments] = useState([]);
//   const [userName, setUserName] = useState("Guest");
//   useEffect(() => {
//   if (blogs?.adminName) {
//     setUserName(blogs.adminName);
//   }
// }, [blogs]);

//   // Fetch blog detail
//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         const { data } = await axios.get(
//           `${BACKEND_URL}/api/blogs/single-blog/${id}`,
//           {
//             withCredentials: true,
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         setBlogs(data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchBlogs();
//   }, [id]);

//   // Fetch comments
//   const fetchComments = async () => {
//     try {
//       const { data } = await axios.get(
//         `${BACKEND_URL}/api/blogs/${id}/comments`
//       );
//       setComments(data);
//     } catch (err) {
//       console.error("Failed to load comments", err);
//     }
//   };

//   useEffect(() => {
//     fetchComments();
//   }, [id]);

//   // Add comment
//   const handleAddComment = async () => {
//     if (!comment.trim()) return toast.error("Comment cannot be empty");
//     try {
//       await axios.post(`${BACKEND_URL}/api/blogs/${id}/comment`, {
//         user: userName,
//         text: comment,
//       });
//       toast.success("Comment added");
//       setComment("");
//       fetchComments();
//     } catch (err) {
//       toast.error("Failed to add comment");
//     }
//   };

//   return (
//     <div>
//       <div>
//         {blogs && (
//           <section className="container mx-auto p-4">
//             <div className="text-blue-500 uppercase text-xs font-bold mb-4">
//               {blogs?.category}
//             </div>
//             <h1 className="text-4xl font-bold mb-6">{blogs?.title}</h1>
//             <div className="flex items-center mb-6">
//               <img
//                 src={blogs?.adminPhoto}
//                 alt="author_avatar"
//                 className="w-12 h-12 rounded-full mr-4"
//               />
//               <p className="text-lg font-semibold">{blogs?.adminName}</p>
//             </div>

//             <div className="flex flex-col md:flex-row">
//               {blogs?.blogImage && (
//                 <img
//                   src={blogs?.blogImage?.url}
//                   alt="mainblogsImg"
//                   className="md:w-1/2 w-full h-[500px] mb-6 rounded-lg shadow-lg cursor-pointer border"
//                 />
//               )}
//               <div className="md:w-1/2 w-full md:pl-6">
//                 <p className="text-lg mb-6">{blogs?.about}</p>
//               </div>
//             </div>

//             <div className="mt-10 border-t pt-6">
//               <h2 className="text-2xl font-semibold mb-4">Comments</h2>

//               <textarea
//                 className="w-full p-2 border rounded mb-2"
//                 placeholder="Write a comment..."
//                 value={comment}
//                 onChange={(e) => setComment(e.target.value)}
//               />
//               <button
//                 className="bg-blue-500 text-white px-4 py-2 rounded"
//                 onClick={handleAddComment}
//               >
//                 Post Comment
//               </button>

//               <div className="mt-6 space-y-4">
//                 {comments.length === 0 ? (
//                   <p className="text-gray-500">No comments yet.</p>
//                 ) : (
//                   comments.map((c, index) => (
//                     <div key={index} className="bg-gray-100 p-3 rounded">
//                       <p className="text-gray-800">{c.text}</p>
//                       <small className="text-gray-600">
//                         – {c.user}, {new Date(c.date).toLocaleString()}
//                       </small>
//                     </div>
//                   ))
//                 )}
//               </div>
//             </div>
//           </section>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Detail;

/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../utils";
import { useAuth } from "../context/AuthProvider"; // ✅ for like functionality

function Detail() {
  const { id } = useParams();
  const [blogs, setBlogs] = useState({});
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [userName, setUserName] = useState("Guest");

  const { toggleLike, isBlogLikedByUser } = useAuth(); // ✅ Like logic from context

  useEffect(() => {
    if (blogs?.adminName) {
      setUserName(blogs.adminName);
    }
  }, [blogs]);

  // Fetch blog detail
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get(
          `${BACKEND_URL}/api/blogs/single-blog/${id}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setBlogs(data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load blog");
      }
    };
    fetchBlogs();
  }, [id]);

  // Fetch comments
  const fetchComments = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/blogs/${id}/comments`);
      setComments(data);
    } catch (err) {
      console.error("Failed to load comments", err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [id]);

  // Add comment
  const handleAddComment = async () => {
    if (!comment.trim()) return toast.error("Comment cannot be empty");
    try {
      await axios.post(`${BACKEND_URL}/api/blogs/${id}/comment`, {
        user: userName,
        text: comment,
      });
      toast.success("Comment added");
      setComment("");
      fetchComments();
    } catch (err) {
      toast.error("Failed to add comment");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      {blogs && (
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          {/* 🖼️ Blog Cover Image */}
          {blogs?.blogImage?.url && (
            <div className="w-full max-h-[600px] overflow-hidden flex justify-center items-center bg-black">
              <img
                src={blogs.blogImage.url}
                alt="Blog Banner"
                className="w-full h-auto object-contain"
              />
            </div>
          )}

          {/* 📄 Blog Details */}
          <div className="p-6">
            {/* Category */}
            <p className="text-blue-500 uppercase text-xs font-bold mb-2">
              {blogs?.category}
            </p>

            {/* Title & Like Button */}
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                {blogs?.title}
              </h1>

              <button
                className={`text-2xl ml-2 transition-transform duration-200 hover:scale-125 ${
                  isBlogLikedByUser(blogs._id) ? "text-red-500" : "text-gray-400"
                }`}
                onClick={() => toggleLike(blogs._id)}
                title={isBlogLikedByUser(blogs._id) ? "Unlike" : "Like"}
              >
                {isBlogLikedByUser(blogs._id) ? "❤️" : "🤍"}
              </button>
            </div>

            {/* Author Info */}
            <div className="flex items-center gap-4 mb-6">
              <img
                src={blogs?.adminPhoto || "/user.png"}
                alt="Author"
                className="w-12 h-12 rounded-full object-cover border"
              />
              <p className="text-lg font-semibold text-gray-700">
                {blogs?.adminName}
              </p>
            </div>

            {/* Blog Content */}
            <p className="text-lg text-gray-800 leading-7 whitespace-pre-line">
              {blogs?.about}
            </p>
          </div>

          {/* 💬 Comments Section (unchanged) */}
          <div className="px-6 pb-10">
            <div className="mt-10 border-t pt-6">
              <h2 className="text-2xl font-semibold mb-4">Comments</h2>

              <textarea
                className="w-full p-2 border rounded mb-2"
                placeholder="Write a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleAddComment}
              >
                Post Comment
              </button>

              <div className="mt-6 space-y-4">
                {comments.length === 0 ? (
                  <p className="text-gray-500">No comments yet.</p>
                ) : (
                  comments.map((c, index) => (
                    <div key={index} className="bg-gray-100 p-3 rounded">
                      <p className="text-gray-800">{c.text}</p>
                      <small className="text-gray-600">
                        – {c.user}, {new Date(c.date).toLocaleString()}
                      </small>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Detail;
