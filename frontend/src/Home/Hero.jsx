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


/* eslint-disable no-unused-vars */
import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

function Hero() {
  const { blogs, toggleFavorite, isFavorite } = useAuth();

  return (
    <div className="container mx-auto my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {blogs && blogs.length > 0 ? (
        blogs.slice(0, 4).map((element) => {
          const isFav = isFavorite(element._id);

          return (
            <div
              key={element._id}
              className="relative bg-white rounded-lg hover:shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
            >
              <Link to={`/blog/${element._id}`}>
                <div className="group relative">
                  <img
                    src={element.blogImage?.url || "/placeholder.jpg"}
                    alt={element.title}
                    className="w-full h-56 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-75 group-hover:opacity-100 transition duration-300"></div>
                  <h1 className="absolute bottom-4 left-4 text-white text-xl font-bold group-hover:text-yellow-400 transition-colors duration-300">
                    {element.title}
                  </h1>
                </div>
              </Link>

              <div className="p-6 flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={element.adminPhoto || "/user.png"}
                    alt={element.adminName}
                    className="w-12 h-12 rounded-full border-2 border-yellow-400"
                  />
                  <div className="ml-4">
                    <p className="text-lg font-semibold text-gray-800">
                      {element.adminName}
                    </p>
                    <p className="text-xs text-gray-400">New</p>
                  </div>
                </div>

                <button
                  className={`text-2xl ml-2 transition-transform duration-200 hover:scale-125 ${
                    isFav ? "text-red-500" : "text-gray-400"
                  }`}
                  onClick={() => toggleFavorite(element._id)}
                  title={isFav ? "Remove from Favorites" : "Add to Favorites"}
                >
                  {isFav ? "❤" : "🤍"}
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <div className="col-span-full flex justify-center items-center h-64 text-xl font-medium text-gray-600">
          Loading...
        </div>
      )}
    </div>
  );
}

export default Hero;
