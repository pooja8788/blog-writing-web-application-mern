// // eslint-disable-next-line no-unused-vars
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { AiOutlineMenu } from "react-icons/ai";
// import { IoCloseSharp } from "react-icons/io5";
// import { useAuth } from "../context/AuthProvider";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { BACKEND_URL } from "../utils";


// function Navbar() {
//   const [show, setShow] = useState(false);

//   const { profile, isAuthenticated, setIsAuthenticated } = useAuth();
//   console.log(profile?.user);
//   const navigateTo = useNavigate();

//   const handleLogout = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.get(
//         `${BACKEND_URL}/api/users/logout`,
//         { withCredentials: true }
//       );
//       console.log(data);
//       localStorage.removeItem("jwt"); // deleting token in localStorage so that if user logged out it will goes to login page
//       toast.success(data.message);
//       setIsAuthenticated(false);
//       navigateTo("/login");
//     } catch (error) {
//       console.log(error);
//       toast.error("Failed to logout");
//     }
//   };

//   return (
//     <>
//       <nav className=" shadow-lg px-4 py-2">
//         <div className="flex items-center justify-between container mx-auto">
//           <div className="font-semibold text-xl">
//             Swar<span className="text-blue-500">Lekhan</span>
//           </div>
//           {/* Desktop */}
//           <div className=" mx-6">
//             <ul className="hidden md:flex space-x-6">
//               <Link to="/" className="hover:text-blue-500">
//                 HOME
//               </Link>
//               <Link to="/blogs" className="hover:text-blue-500">
//                 BLOGS
//               </Link>
//               <Link to="/creators" className="hover:text-blue-500">
//                 CREATORS
//               </Link>
//               <Link to="/contact" className="hover:text-blue-500">
//                 CONTACT
//               </Link>
//               <Link to="/favorites" className="hover:text-blue-500">
//                 FAVORITES{" "}
//               </Link>
//             </ul>
//             <div className="md:hidden" onClick={() => setShow(!show)}>
//               {show ? <IoCloseSharp size={24} /> : <AiOutlineMenu size={24} />}
//             </div>
//           </div>
//           <div className="hidden md:flex space-x-2">
//             {isAuthenticated && profile?.user?.role === "admin" ? (
//               <Link
//                 to="/dashboard"
//                 className="bg-blue-600 text-white font-semibold hover:bg-blue-800 duration-300 px-4 py-2 rounded"
//               >
//                 DASHBOARD
//               </Link>
//             ) : (
//               ""
//             )}

//             {!isAuthenticated ? (
//               <Link
//                 to="/Login"
//                 className="bg-red-600 text-white font-semibold hover:bg-red-800 duration-300 px-4 py-2 rounded"
//               >
//                 LOGIN
//               </Link>
//             ) : (
//               <div>
//                 <button
//                   onClick={handleLogout}
//                   className="bg-red-600 text-white font-semibold hover:bg-red-800 duration-300 px-4 py-2 rounded"
//                 >
//                   LOGOUT
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//         {/* mobile navbar */}
//         {show && (
//           <div className="bg-white">
//             <ul className="flex flex-col h-screen items-center justify-center space-y-3 md:hidden text-xl">
//               <Link
//                 to="/"
//                 onClick={() => setShow(!show)}
//                 smooth="true"
//                 duration={500}
//                 offset={-70}
//                 activeClass="active"
//                 className="hover:text-blue-500"
//               >
//                 HOME
//               </Link>
//               <Link
//                 to="/blogs"
//                 onClick={() => setShow(!show)}
//                 smooth="true"
//                 duration={500}
//                 offset={-70}
//                 activeClass="active"
//                 className="hover:text-blue-500"
//               >
//                 BLOGS
//               </Link>
//               <Link
//                 to="/creators"
//                 onClick={() => setShow(!show)}
//                 smooth="true"
//                 duration={500}
//                 offset={-70}
//                 activeClass="active"
//                 className="hover:text-blue-500"
//               >
//                 CREATORS
//               </Link>
              
//               <Link
//                 to="/contact"
//                 onClick={() => setShow(!show)}
//                 smooth="true"
//                 duration={500}
//                 offset={-70}
//                 activeClass="active"
//                 className="hover:text-blue-500"
//               >
//                 CONTACT
//               </Link>
//               <Link
//                 to="/favorites"
//                 onClick={() => setShow(!show)}
//                 className="hover:text-blue-500"
//               >
//                 FAVORITES ❤
//               </Link>
//             </ul>
//           </div>
//         )}
//       </nav>
//     </>
//   );
// }

// export default Navbar;


import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../utils";

function Navbar() {
  const [show, setShow] = useState(false);
  const { profile, isAuthenticated, setIsAuthenticated, loading } = useAuth();
  const navigateTo = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
       `${BACKEND_URL}/api/users/logout`,
        { withCredentials: true }
      );
      localStorage.removeItem("jwt");
      toast.success(data.message);
      setIsAuthenticated(false);
      navigateTo("/login");
    } catch (error) {
      console.log(error);
      toast.error("Failed to logout");
    }
  };

  if (loading) return null;

  return (
    <>
      <nav className="shadow-lg px-4 py-2">
        <div className="flex items-center justify-between container mx-auto">
          <div className="font-semibold text-xl">
            Swar<span className="text-blue-500">Lekhan</span>
          </div>

          {/* Desktop */}
          <div className="mx-6">
            <ul className="hidden md:flex space-x-6">
              <Link to="/" className="hover:text-blue-500">HOME</Link>
              <Link to="/blogs" className="hover:text-blue-500">BLOGS</Link>
              <Link to="/creators" className="hover:text-blue-500">CREATORS</Link>
              <Link to="/about" className="hover:text-blue-500">ABOUT</Link>
              <Link to="/contact" className="hover:text-blue-500">CONTACT</Link>
              <Link to="/favorites" className="hover:text-blue-500">FAVORITES</Link>
            </ul>
            <div className="md:hidden" onClick={() => setShow(!show)}>
              {show ? <IoCloseSharp size={24} /> : <AiOutlineMenu size={24} />}
            </div>
          </div>

          {/* Right side (buttons) */}
          <div className="hidden md:flex space-x-2">
            {isAuthenticated && profile?.role === "admin" && (
              <Link
                to="/dashboard"
                className="bg-blue-600 text-white font-semibold hover:bg-blue-800 duration-300 px-4 py-2 rounded"
              >
                DASHBOARD
              </Link>
            )}

            {!isAuthenticated ? (
              <Link
                to="/Login"
                className="bg-red-600 text-white font-semibold hover:bg-red-800 duration-300 px-4 py-2 rounded"
              >
                LOGIN
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white font-semibold hover:bg-red-800 duration-300 px-4 py-2 rounded"
              >
                LOGOUT
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {show && (
          <div className="bg-white">
            <ul className="flex flex-col h-screen items-center justify-center space-y-3 md:hidden text-xl">
              <Link to="/" onClick={() => setShow(false)} className="hover:text-blue-500">HOME</Link>
              <Link to="/blogs" onClick={() => setShow(false)} className="hover:text-blue-500">BLOGS</Link>
              <Link to="/creators" onClick={() => setShow(false)} className="hover:text-blue-500">CREATORS</Link>
              <Link to="/contact" onClick={() => setShow(false)} className="hover:text-blue-500">CONTACT</Link>
              <Link to="/favorites" onClick={() => setShow(false)} className="hover:text-blue-500">FAVORITES ❤</Link>
              {isAuthenticated && profile?.role === "admin" && (
                <Link to="/dashboard" onClick={() => setShow(false)} className="hover:text-blue-500">
                  DASHBOARD
                </Link>
              )}
              {!isAuthenticated ? (
                <Link to="/login" onClick={() => setShow(false)} className="hover:text-red-600">
                  LOGIN
                </Link>
              ) : (
                <button
                  onClick={(e) => {
                    setShow(false);
                    handleLogout(e);
                  }}
                  className="text-red-600 hover:text-red-800"
                >
                  LOGOUT
                </button>
              )}
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;