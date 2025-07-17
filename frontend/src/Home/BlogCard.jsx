// BlogCard.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import PropTypes from "prop-types"; // ✅ import it

const BlogCard = ({ blog }) => {
  const { toggleLike, isBlogLikedByUser } = useAuth();
  const isLiked = isBlogLikedByUser(blog);

  return (
    <div className="relative bg-white rounded-lg hover:shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
      <Link to={`/blog/${blog._id}`}>
        <div className="group relative">
          <img
            src={blog.blogImage?.url || "/placeholder.jpg"}
            alt={blog.title}
            className="w-full h-56 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-75 group-hover:opacity-100 transition duration-300"></div>
          <h1 className="absolute bottom-4 left-4 text-white text-xl font-bold group-hover:text-yellow-400 transition-colors duration-300">
            {blog.title}
          </h1>
        </div>
      </Link>

      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center">
          <img
            src={blog.adminPhoto || "/user.png"}
            alt={blog.adminName}
            className="w-12 h-12 rounded-full border-2 border-yellow-400"
          />
          <div className="ml-4">
            <p className="text-lg font-semibold text-gray-800">
              {blog.adminName}
            </p>
            <p className="text-xs text-gray-400">New</p>
          </div>
        </div>

        <button
          className={`text-2xl ml-2 transition-transform duration-200 hover:scale-125 ${
            isLiked ? "text-red-500" : "text-gray-400"
          }`}
          onClick={() => toggleLike(blog._id)}
          title={isLiked ? "Unlike" : "Like"}
        >
          {isLiked ? "❤️" : "🤍"}
        </button>
      </div>
    </div>
  );
};

//  Add PropTypes validation
BlogCard.propTypes = {
  blog: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    blogImage: PropTypes.shape({
      url: PropTypes.string,
    }),
    adminPhoto: PropTypes.string,
    adminName: PropTypes.string,
    likes: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default BlogCard;
