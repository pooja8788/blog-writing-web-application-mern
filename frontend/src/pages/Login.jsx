// /* eslint-disable no-unused-vars */
// import axios from "axios";
// import React, { useState } from "react";
// import toast from "react-hot-toast";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthProvider";
// import { BACKEND_URL } from "../utils";
// import ForgotPassword from "./ForgotPassword";

// function Login() {
//   const { isAuthenticated, setIsAuthenticated, setProfile } = useAuth();

//   const navigateTo = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const { data } = await axios.post(
//         `${BACKEND_URL}/api/users/login`,
//         { email, password, role },
//         {
//           withCredentials: true,
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       console.log(data);
//       localStorage.setItem("jwt", data.token); // storing token in localStorage so that if user refreshed the page it will not redirect again in login
//       toast.success(data.message || "User Logined successfully", {
//         duration: 3000,
//       });
//       setProfile(data.user);
//       setIsAuthenticated(true);
//       setEmail("");
//       setPassword("");
//       setRole("");
//       navigateTo("/");
//     } catch (error) {
//       console.log(error);
//       toast.error(
//         error.response.data.message || "Please fill the required fields",
//         {
//           duration: 3000,
//         }
//       );
//     }
//   };

//   return (
//     <div>
//       <div className="min-h-screen flex items-center justify-center bg-gray-100">
//         <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
//           <form onSubmit={handleLogin}>
//             <div className="font-semibold text-xl items-center text-center">
//               Swar<span className="text-blue-500">Lekhan</span>
//             </div>
//             <h1 className="text-xl font-semibold mb-6">Login</h1>
//             <select
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//               className="w-full p-2 mb-4 border rounded-md"
//             >
//               <option value="">Select Role</option>
//               <option value="user">user</option>
//               <option value="admin">creator</option>
//             </select>

//             <div className="mb-4">
//               <input
//                 type="email"
//                 placeholder="Your Email Address"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full p-2  border rounded-md"
//               />
//             </div>

//             <div className="mb-4">
//               <input
//                 type="password"
//                 placeholder="Your Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full p-2  border rounded-md"
//               />
//             </div>

//             <div className="text-center mb-4">
//               <p>
//                 New User?{" "}
//                 <Link to="/register" className="text-blue-600">
//                   Register Now
//                 </Link>
//               </p>
//               <p>
//                 <Link to="/ForgotPassword" className="text-blue-600">
//                   Forgot Password?
//                 </Link>
//               </p>
//             </div>
//             <button
//               type="submit"
//               className="w-full p-2 bg-blue-500 hover:bg-blue-800 duration-300 rounded-md text-white"
//             >
//               Login
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;

/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { BACKEND_URL } from "../utils";

function Login() {
  const { isAuthenticated, setIsAuthenticated, setProfile } = useAuth();

  const navigateTo = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${BACKEND_URL}/api/users/login`,
        { email, password, role },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(data);
      localStorage.setItem("jwt", data.token);
      toast.success(data.message || "User Logined successfully", {
        duration: 3000,
      });
      setProfile(data.user);
      setIsAuthenticated(true);
      setEmail("");
      setPassword("");
      setRole("");
      navigateTo("/");
    } catch (error) {
      console.log(error);
      toast.error(
        error.response.data.message || "Please fill the required fields",
        {
          duration: 3000,
        }
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <form onSubmit={handleLogin}>
          <div className="font-semibold text-xl text-center mb-2">
            Swar<span className="text-blue-500">Lekhan</span>
          </div>
          <h1 className="text-xl font-semibold mb-6 text-center">Login</h1>

          {/* Radio Buttons for Role */}
          <div className="mb-4">
            <p className="mb-2 font-medium text-gray-700">Select Role:</p>
            <div className="flex gap-6">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={role === "user"}
                  onChange={(e) => setRole(e.target.value)}
                  className="accent-blue-500 w-4 h-4"
                />
                <span className="text-gray-700">User</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={role === "admin"}
                  onChange={(e) => setRole(e.target.value)}
                  className="accent-blue-500 w-4 h-4"
                />
                <span className="text-gray-700">Creator</span>
              </label>
            </div>
          </div>

          <div className="mb-4">
            <input
              type="email"
              placeholder="Your Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              placeholder="Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div className="text-center mb-4 text-sm">
            <p>
              New User?{" "}
              <Link to="/register" className="text-blue-600">
                Register Now
              </Link>
            </p>
            <p>
              <Link to="/ForgotPassword" className="text-blue-600">
                Forgot Password?
              </Link>
            </p>
          </div>

          <button
            type="submit"
            className="w-full p-2 bg-blue-500 hover:bg-blue-700 duration-300 rounded-md text-white"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
