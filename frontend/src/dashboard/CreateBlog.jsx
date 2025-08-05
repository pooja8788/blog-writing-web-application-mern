// import axios from "axios";
// // eslint-disable-next-line no-unused-vars
// import React, { useState } from "react";
// import toast from "react-hot-toast";
// import {BACKEND_URL} from "../utils";

// function CreateBlog() {
//   const [loading, setLoading] = useState(false);
//   const [title, setTitle] = useState("");
//   const [category, setCategory] = useState("");
//   const [about, setAbout] = useState("");

//   const [blogImage, setBlogImage] = useState("");
//   const [blogImagePreview, setBlogImagePreview] = useState("");

//   const changePhotoHandler = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => {
//       setBlogImagePreview(reader.result);
//       setBlogImage(file);
//     };
//   };

//   const handleCreateBlog = async (e) => {
//     e.preventDefault();
//      if (loading) return; 
//     setLoading(true);
//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("category", category);
//     formData.append("about", about);
//     formData.append("blogImage", blogImage);
//     try {
//       const { data } = await axios.post(
//         `${BACKEND_URL}/api/blogs/create`,
//         formData,
//         {
//           withCredentials: true,
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       toast.success(data.message || "Blog created successfully");
//       setTitle("");
//       setCategory("");
//       setAbout("");
//       setBlogImage("");
//       setBlogImagePreview("");
//     } catch (error) {
//       toast.error(error.message || "Please fill the required fields");
//     }finally {
//       setLoading(false); // Re-enable the button
//     }
//   };
//   return (
//     <div>
//       <div className="min-h-screen  py-10">
//         <div className="max-w-4xl mx-auto p-6 border  rounded-lg shadow-lg">
//           <h3 className="text-2xl font-semibold mb-8">Create Blog</h3>
//           <form onSubmit={handleCreateBlog} className="space-y-6">
//             <div className="space-y-2">
//               <label className="block text-lg">Category</label>
//               <select
//                 value={category}
//                 onChange={(e) => setCategory(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
//               >
//                 <option value="">Select Category</option>
//                 <option value="Travel">Travel</option>
//                 <option value="Sports">Sports</option>
//                 <option value="Health">Health</option>
//                 <option value="Entertainment">Entertainment</option>
//                 <option value="Business">Business</option>
//               </select>
//             </div>

//             <div className="space-y-2">
//               <label className="block text-lg">Title</label>
//               <input
//                 type="text"
//                 placeholder="Enter your blog title"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-400   rounded-md outline-none"
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="block text-lg">Blog Image</label>
//               <div className="flex items-center justify-center">
//                 <img
//                   src={blogImagePreview ? `${blogImagePreview}` : "/imgPL.webp"}
//                   alt="Image"
//                   className="w-full max-w-sm h-auto rounded-md object-cover"
//                 />
//               </div>
//               <input
//                 type="file"
//                 onChange={changePhotoHandler}
//                 className="w-full px-3 py-2 border border-gray-400   rounded-md outline-none"
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="block text-lg">About</label>
//               <textarea
//                 rows="5"
//                 placeholder="Write something about your blog"
//                 value={about}
//                 onChange={(e) => setAbout(e.target.value)}
//                 className="w-full px-3 py-2  border border-gray-400  rounded-md outline-none"
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200"
//             >
//               Post Blog
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CreateBlog;

import axios from "axios";
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../utils";

function CreateBlog() {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [about, setAbout] = useState("");

  const [blogImage, setBlogImage] = useState("");
  const [blogImagePreview, setBlogImagePreview] = useState("");

  const [categories, setCategories] = useState([]); // 🔹 new state to store categories

  // 🔹 fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/api/categories`, {
          withCredentials: true,
        });
        setCategories(data); // ✅ update state
      } catch (error) {
        console.error("Failed to fetch categories", error);
        toast.error("Unable to load categories");
      }
    };

    fetchCategories();
  }, []);

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBlogImagePreview(reader.result);
      setBlogImage(file);
    };
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("about", about);
    formData.append("blogImage", blogImage);

    try {
      const { data } = await axios.post(
        `${BACKEND_URL}/api/blogs/create`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(data.message || "Blog created successfully");
      // Reset fields
      setTitle("");
      setCategory("");
      setAbout("");
      setBlogImage("");
      setBlogImagePreview("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Blog creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-4xl mx-auto p-6 border rounded-lg shadow-lg bg-white">
        <h3 className="text-2xl font-semibold mb-8">Create Blog</h3>
        <form onSubmit={handleCreateBlog} className="space-y-6">
          {/* Category Dropdown */}
          <div className="space-y-2">
            <label className="block text-lg">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <label className="block text-lg">Title</label>
            <input
              type="text"
              placeholder="Enter your blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
              required
            />
          </div>

          {/* Blog Image */}
          <div className="space-y-2">
            <label className="block text-lg">Blog Image</label>
            <div className="flex items-center justify-center">
              <img
                src={blogImagePreview ? blogImagePreview : "/imgPL.webp"}
                alt="Preview"
                className="w-full max-w-sm h-auto rounded-md object-cover"
              />
            </div>
            <input
              type="file"
              onChange={changePhotoHandler}
              className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
              accept="image/*"
              required
            />
          </div>

          {/* About */}
          <div className="space-y-2">
            <label className="block text-lg">About</label>
            <textarea
              rows="5"
              placeholder="Write something about your blog"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200"
          >
            {loading ? "Posting..." : "Post Blog"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateBlog;
