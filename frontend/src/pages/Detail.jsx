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
import { useAuth } from "../context/AuthProvider";

function Detail() {
  const { id } = useParams();
  const [blogs, setBlogs] = useState({});
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [userName, setUserName] = useState("Guest");

  const { toggleLike, isBlogLikedByUser, profile } = useAuth();
  const isLiked = blogs?.likes?.includes(profile?._id);

  // Optimistic Like Handler
  const handleToggleLike = async () => {
    try {
      await toggleLike(blogs._id);
      const alreadyLiked = blogs.likes?.includes(profile?._id);

      setBlogs((prev) => ({
        ...prev,
        likes: alreadyLiked
          ? prev.likes.filter((id) => id !== profile._id)
          : [...(prev.likes || []), profile._id],
      }));
    } catch (err) {
      console.error("Like failed", err);
    }
  };

  useEffect(() => {
    if (blogs?.adminName) {
      setUserName(blogs.adminName);
    }
  }, [blogs]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get(
          `${BACKEND_URL}/api/blogs/single-blog/${id}`,
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );
        setBlogs(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlogs();
  }, [id]);

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
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      {blogs && (
        <section className="container mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Blog Image */}
          {blogs?.blogImage?.url && (
            <div className="w-full h-[350px] md:h-[450px] overflow-hidden">
              <img
                src={blogs.blogImage.url}
                alt="Blog"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-6">
            {/* Category */}
            <p className="text-blue-600 uppercase text-sm font-semibold mb-1">
              {blogs?.category}
            </p>

            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900 mb-3">{blogs?.title}</h1>

            {/* Author Info and Like */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <img
                  src={blogs?.adminPhoto || "/user.png"}
                  alt={blogs?.adminName}
                  className="w-12 h-12 rounded-full border-2 border-yellow-400"
                />
                <div className="ml-4">
                  <p className="text-lg font-semibold text-gray-800">
                    {blogs?.adminName}
                  </p>
                  <p className="text-xs text-gray-500">Posted</p>
                </div>
              </div>

              {/* ❤️ Like Button */}
              <button
                className={`text-2xl transition-transform duration-200 hover:scale-125 ${
                  isLiked ? "text-red-500" : "text-gray-400"
                }`}
                onClick={handleToggleLike}
                title={isLiked ? "Unlike" : "Like"}
              >
                {isLiked ? "❤️" : "🤍"}
              </button>
            </div>

            {/* Description */}
            <p className="text-lg text-gray-700 leading-8">{blogs?.about}</p>

            {/* Comments */}
            <div className="mt-10 border-t pt-6">
              <h2 className="text-2xl font-semibold mb-4">Comments</h2>

              <textarea
                className="w-full p-3 border rounded mb-2"
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
        </section>
      )}
    </div>
  );
}

export default Detail;
