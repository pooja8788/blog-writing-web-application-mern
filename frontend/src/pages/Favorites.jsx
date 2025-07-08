// // src/pages/Favorites.jsx
// import { useAuth } from "../context/AuthProvider";
// import { Link } from "react-router-dom";

// function Favorites() {
//   const { favorites } = useAuth();

//   return (
//     <div className="container mx-auto my-10 p-6">
//       <h2 className="text-2xl font-bold mb-6 text-center">Favorite Blogs</h2>

//       {favorites.length === 0 ? (
//         <p className="text-center text-gray-500">No favorites added yet.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//           {favorites.map(( element) => (
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
//                 <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-75 group-hover:opacity-100 transition duration-300"></div>
//                 <h1 className="absolute bottom-4 left-4 text-white text-xl font-bold group-hover:text-yellow-500 transition-colors duration-300">
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
//                   <p className="text-xs text-gray-400">Favorite</p>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Favorites;


// // src/pages/Favorites.jsx
// import { useAuth } from "../context/AuthProvider";
// import { Link } from "react-router-dom";

// function Favorites() {
//   const { favorites } = useAuth();

//   return (
//     <div className="container mx-auto my-10 p-6">
//       <h2 className="text-2xl font-bold mb-6 text-center">Favorite Blogs</h2>

//       {favorites.length === 0 ? (
//         <p className="text-center text-gray-500">No favorites added yet.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//           {favorites.map((element) => (
//             <Link
//               to={`/blog/${element._id}`}
//               key={element._id}
//               className="bg-white rounded-lg hover:shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
//             >
//               <div className="group relative">
//                 <img
//                   src={element.blogImage?.url || "/placeholder.jpg"}
//                   alt={element.title}
//                   className="w-full h-56 object-cover"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-75 group-hover:opacity-100 transition duration-300"></div>
//                 <h1 className="absolute bottom-4 left-4 text-white text-xl font-bold group-hover:text-yellow-500 transition-colors duration-300">
//                   {element.title}
//                 </h1>
//               </div>
//               <div className="p-6 flex items-center">
//                 <img
//                   src={element.adminPhoto || "/user.png"}
//                   alt={element.adminName}
//                   className="w-12 h-12 rounded-full border-2 border-yellow-400"
//                 />
//                 <div className="ml-4">
//                   <p className="text-lg font-semibold text-gray-800">
//                     {element.adminName}
//                   </p>
//                   <p className="text-xs text-gray-400">Favorite</p>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Favorites;



// src/pages/Favorites.jsx
import { useRef } from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function Favorites() {
  const { favorites } = useAuth();
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollContainerRef;
    if (current) {
      const scrollAmount = 320;
      current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="container mx-auto my-10 p-6 relative">
      <h2 className="text-2xl font-bold mb-6 text-center">Favorite Blogs</h2>

      {favorites.length === 0 ? (
        <p className="text-center text-gray-500">No favorites added yet.</p>
      ) : (
        <>
          {/* Left Scroll Button */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-[55%] transform -translate-y-1/2 z-10 bg-white p-2 shadow-lg rounded-full hover:bg-gray-200"
          >
            <FaChevronLeft />
          </button>

          {/* Scrollable Favorites Container */}
          <div
            ref={scrollContainerRef}
            className="flex space-x-4 overflow-x-hidden scroll-smooth hide-scrollbar"
          >
            {favorites.map((element) => (
              <Link
                to={`/blog/${element._id}`}
                key={element._id}
                className="min-w-[300px] bg-white rounded-lg hover:shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
              >
                <div className="group relative">
                  <img
                    src={element.blogImage?.url || "/placeholder.jpg"}
                    alt={element.title}
                    className="w-full h-56 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-75 group-hover:opacity-100 transition duration-300"></div>
                  <h1 className="absolute bottom-4 left-4 text-white text-xl font-bold group-hover:text-yellow-500 transition-colors duration-300">
                    {element.title}
                  </h1>
                </div>
                <div className="p-6 flex items-center">
                  <img
                    src={element.adminPhoto || "/user.png"}
                    alt={element.adminName}
                    className="w-12 h-12 rounded-full border-2 border-yellow-400"
                  />
                  <div className="ml-4">
                    <p className="text-lg font-semibold text-gray-800">
                      {element.adminName}
                    </p>
                    <p className="text-xs text-gray-400">Favorite</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Right Scroll Button */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-[55%] transform -translate-y-1/2 z-10 bg-white p-2 shadow-lg rounded-full hover:bg-gray-200"
          >
            <FaChevronRight />
          </button>
        </>
      )}
    </div>
  );
}

export default Favorites;
