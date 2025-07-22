// import { useState } from "react";
// import { useAuth } from "../context/AuthProvider";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { CiMenuBurger } from "react-icons/ci";
// import { BiSolidLeftArrowAlt } from "react-icons/bi";
// import toast from "react-hot-toast";
// import { BACKEND_URL } from "../utils";


// // eslint-disable-next-line react/prop-types
// function Sidebar({ setComponent }) {
//   const { profile, setIsAuthenticated } = useAuth();
//   // console.log(profile?.user);
//   const navigateTo = useNavigate();

//   const [show, setShow] = useState(false);

//   const handleComponents = (value) => {
//     setComponent(value);
//   };
//   const gotoHome = () => {
//     navigateTo("/");
//   };

//   const handleLogout = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.get(
//         `${BACKEND_URL}/api/users/logout`,
//         { withCredentials: true }
//       );
//       toast.success(data.message);
//        localStorage.removeItem("jwt"); // deleting token in localStorage so that if user logged out it will goes to login page
//       setIsAuthenticated(false);
//       navigateTo("/login");
//     } catch (error) {
//       console.log(error);
//       toast.error(error.data.message || "Failed to logout");
//     }
//   };

//   return (
//     <>
//       <div
//         className="sm:hidden fixed top-4 left-4 z-50"
//         onClick={() => setShow(!show)}
//       >
//         <CiMenuBurger className="text-2xl" />
//       </div>
//       <div
//         className={`w-64 h-full shadow-lg fixed top-0 left-0 bg-gray-50 transition-transform duration-300 transform sm:translate-x-0 ${
//           show ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         <div
//           className="sm:hidden absolute top-4 right-4 text-xl cursor-pointer"
//           onClick={() => setShow(!show)}
//         >
//           <BiSolidLeftArrowAlt className="text-2xl" />
//         </div>
//         <div className="text-center">
//           <img
//             className="w-24 h-24 rounded-full mx-auto mb-2"
//             src={profile?.user?.photo?.url}
//             alt=""
//           />
//           <p className="text-lg font-semibold">{profile?.user?.name}</p>
//         </div>
//         <ul className="space-y-6 mx-4">
//           <button
//             onClick={() => handleComponents("My Blogs")}
//             className="w-full px-4 py-2 bg-green-500 rounded-lg hover:bg-green-700 transition duration-300"
//           >
//             MY BLOGS
//           </button>
//           <button
//             onClick={() => handleComponents("Create Blog")}
//             className="w-full px-4 py-2 bg-blue-400 rounded-lg hover:bg-blue-700 transition duration-300"
//           >
//             CREATE BLOG
//           </button>
//           <button
//             onClick={() => handleComponents("My Profile")}
//             className="w-full px-4 py-2 bg-pink-500 rounded-lg hover:bg-pink-700 transition duration-300"
//           >
//             MY PROFILE
//           </button>
          
//           <button
//             onClick={gotoHome}
//             className="w-full px-4 py-2 bg-red-500 rounded-lg hover:bg-red-700 transition duration-300"
//           >
//             HOME
//           </button>
//           <button
//             onClick={handleLogout}
//             className="w-full px-4 py-2 bg-yellow-500 rounded-lg hover:bg-yellow-700 transition duration-300"
//           >
//             LOGOUT
//           </button>
//         </ul>
//       </div>
//     </>
//   );
// }

// export default Sidebar;


import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CiMenuBurger } from "react-icons/ci";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
import { BACKEND_URL } from "../utils";

Sidebar.propTypes = {
  setComponent: PropTypes.func.isRequired,
};

function Sidebar({ setComponent }) {
  const { profile, setIsAuthenticated } = useAuth();
  const navigateTo = useNavigate();
  const [minimized, setMinimized] = useState(false);

  const handleComponents = (value) => {
    setComponent(value);
  };
  const gotoHome = () => {
    navigateTo("/");
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${BACKEND_URL}/api/users/logout`,
        { withCredentials: true }
      );
      toast.success(data.message);
      localStorage.removeItem("jwt");
      setIsAuthenticated(false);
      navigateTo("/login");
    } catch (error) {
      console.log(error);
      toast.error(error.data.message || "Failed to logout");
    }
  };

  return (
    <>
      <div
        className="fixed top-4 left-4 z-50"
        onClick={() => setMinimized((prev) => !prev)}
      >
        <CiMenuBurger className="text-2xl cursor-pointer" />
      </div>
      {/* Sidebar */}
      <div
        className={`h-full shadow-lg fixed top-0 left-0 bg-gray-50 transition-all duration-300
        ${minimized ? "w-16" : "w-64"}`}
        style={{ zIndex: 40 }}
      >
       
        {/* Profile Section */}
        <div className="text-center my-6">
          {!minimized && (
            <>
              <img
                className="w-24 h-24 rounded-full mx-auto mb-2"
                src={profile?.avatar?.url?.replace("http://", "https://") ||
  "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                alt=""
              />
              <p className="text-lg font-semibold">{profile?.user?.name}</p>
            </>
          )}
          {minimized && (
            <img
              className="w-10 h-10 rounded-full mx-auto mb-2"
              src={profile?.user?.photo?.url}
              alt=""
            />
          )}
        </div>
        {/* Menu Buttons */}
        <ul className="space-y-4 mx-2">
          <button
            onClick={() => handleComponents("My Blogs")}
            className="w-full px-2 py-2 bg-green-500 rounded-lg hover:bg-green-700 transition duration-300 flex items-center justify-center"
            title="My Blogs"
          >
            {!minimized ? "MY BLOGS" : "📝"}
          </button>
          <button
            onClick={() => handleComponents("Create Blog")}
            className="w-full px-2 py-2 bg-blue-400 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center"
            title="Create Blog"
          >
            {!minimized ? "CREATE BLOG" : "➕"}
          </button>
          <button
            onClick={() => handleComponents("My Profile")}
            className="w-full px-2 py-2 bg-pink-500 rounded-lg hover:bg-pink-700 transition duration-300 flex items-center justify-center"
            title="My Profile"
          >
            {!minimized ? "MY PROFILE" : "👤"}
          </button>
          <button
            onClick={gotoHome}
            className="w-full px-2 py-2 bg-red-500 rounded-lg hover:bg-red-700 transition duration-300 flex items-center justify-center"
            title="Home"
          >
            {!minimized ? "HOME" : "🏠"}
          </button>
          <button
            onClick={handleLogout}
            className="w-full px-2 py-2 bg-yellow-500 rounded-lg hover:bg-yellow-700 transition duration-300 flex items-center justify-center"
            title="Logout"
          >
            {!minimized ? "LOGOUT" : "🚪"}
          </button>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
