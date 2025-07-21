// /* eslint-disable no-unused-vars */
// import React from "react";
// import { useAuth } from "../context/AuthProvider";
// import { Link } from "react-router-dom";

// function Hero() {
//   const { blogs } = useAuth();
//   console.log(blogs);
//   return (
//     <div className=" container mx-auto my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
//       {blogs && blogs.length > 0 ? (
//         blogs.slice(0, 4).map((element) => {
//           return (
//             <Link
//               to={`/blog/${element._id}`}
//               key={element._id}
//               className="bg-white rounded-lg hover:shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
//             >
//               <div className="group relative">
//                 <img
//                   src={element.blogImage.url}
//                   alt=""
//                   className="w-full h-56 object-cover"
//                 />
//                 <div className=" absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-75 group-hover:opacity-100 transition-transform duration-300"></div>
//                 <h1 className=" absolute bottom-4 left-4 text-white text-xl font-bold group-hover:text-yellow-500 transition-colors duration-300">
//                   {element.title}
//                 </h1>
//               </div>
//               <div className="p-6 flex items-center">
//                 <img
//                   src={element.adminPhoto}
//                   alt=""
//                   className="w-12 h-12 rounded-full border-2 border-yellow-400"
//                 />
//                 <div className="ml-4">
//                   <p className="text-lg font-semibold text-gray-800">
//                     {element.adminName}
//                   </p>
//                   <p className="text-xs text-gray-400">New</p>
//                 </div>
//               </div>
//             </Link>
//           );
//         })
//       ) : (
//         <div className=" flex h-screen items-center justify-center">
//           Loading....
//         </div>
//       )}
//     </div>
//   );
// }

// export default Hero;


import { useRef } from "react";
import { useAuth } from "../context/AuthProvider";
import BlogCard from "./BlogCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function Hero() {
  const { blogs } = useAuth();
  const scrollRef = useRef(null);

  const scroll = (offset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <div className="relative my-10 px-6">
      {/* Scroll Buttons */}
      <button
        onClick={() => scroll(-300)}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white border rounded-full shadow-md hover:bg-gray-100"
      >
        <FaArrowLeft />
      </button>

      <button
        onClick={() => scroll(300)}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white border rounded-full shadow-md hover:bg-gray-100"
      >
        <FaArrowRight />
      </button>

      {/* Scrollable Blog List */}
      <div>
        {blogs && blogs.length > 0 ? (
          blogs.slice(0, 10).map((blog) => (
            <div key={blog._id} className="min-w-[280px] flex-shrink-0">
              <BlogCard blog={blog} />
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center h-64 w-full text-xl font-medium text-gray-600">
            Loading...
          </div>
        )}
      </div>
    </div>
  );
}

export default Hero;


