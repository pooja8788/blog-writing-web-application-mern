// eslint-disable-next-line no-unused-vars
import React, { useRef } from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function Trending() {
  const { blogs } = useAuth();
  const scrollContainerRef = useRef(null);

  const mostCommentedBlogs = blogs
    ? [...blogs].sort((a, b) => (b.comments?.length || 0) - (a.comments?.length || 0))
    : [];

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
    <div className="container mx-auto px-4 relative">
      <h1 className="text-2xl font-semibold mb-4">Trending</h1>

      {/* Left Scroll Button */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-[50%] transform -translate-y-1/2 z-10 bg-white p-2 shadow-lg rounded-full hover:bg-gray-200"
      >
        <FaChevronLeft />
      </button>

      <div
        ref={scrollContainerRef}
        className="flex space-x-4 overflow-x-hidden scroll-smooth snap-x hide-scrollbar"
      >
        {mostCommentedBlogs.length > 0 ? (
          mostCommentedBlogs.slice(0, 10).map((element) => (
            <div
              key={element._id}
              className="min-w-[300px] snap-start p-4 bg-white border border-gray-400 rounded-lg shadow-md"
            >
              <Link to={`/blog/${element._id}`}>
                <div className="relative">
                  <img
                    src={element.blogImage.url}
                    alt="blog"
                    className="w-full h-56 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                    {element.category}
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-b-lg h-36 flex flex-col justify-between">
                  <h1
                    className="text-lg font-bold mb-2 overflow-hidden text-ellipsis"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    {element.title}
                  </h1>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src={element.adminPhoto}
                        alt="author_avatar"
                        className="w-10 h-10 rounded-full"
                      />
                      <p className="ml-3 text-gray-400 text-sm">{element.adminName}</p>
                    </div>
                    <p className="text-sm text-blue-500 font-medium">
                      💬 {element.comments?.length || 0}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div className="flex h-32 items-center justify-center w-full text-gray-600">
            Loading...
          </div>
        )}
      </div>

      {/* Right Scroll Button */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-[50%] transform -translate-y-1/2 z-10 bg-white p-2 shadow-lg rounded-full hover:bg-gray-200"
      >
        <FaChevronRight />
      </button>
    </div>
  );
}

export default Trending;
