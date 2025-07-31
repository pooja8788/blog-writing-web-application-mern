// // eslint-disable-next-line no-unused-vars
// import React from "react";
// import Navbar from "../src/components/Navbar";
// import Home from "../src/components/Home";
// import { Navigate, Route, Routes, useLocation } from "react-router-dom";
// import Blogs from "../src/pages/Blogs";
// import Login from "../src/pages/Login";
// import Register from "../src/pages/Register";
// import Creators from "./pages/Creators";
// import Dashboard from "../src/pages/Dashboard";
// import Contact from "../src/pages/Contact";
// import Favorites from "../src/pages/Favorites";
// import { useAuth } from "./context/AuthProvider";
// import { Toaster } from "react-hot-toast";
// import UpdateBlog from "./dashboard/UpdateBlog.jsx";
// import Detail from "./pages/Detail.jsx";
// import NotFound from "./pages/NotFound.jsx";
// import Footer from "./components/Footer.jsx";
// import ForgotPassword from "./pages/ForgotPassword.jsx"
// import VerifyOtp from "./pages/VerifyOtp.jsx";

// function App() {
//   const location = useLocation();
//   const hideNavbarFooter = ["/dashboard", "/login", "/register"].includes(
//     location.pathname
//   );
//   const { blogs, isAuthenticated } = useAuth();
//   let token = localStorage.getItem("jwt"); // Retrieve the token directly from the localStorage to maininting the routes protect (Go to login.jsx)
//   console.log(blogs);
//   console.log(isAuthenticated);

//   return (
//     <div>
//       {!hideNavbarFooter && <Navbar />}
//       <Routes>
//         <Route
//           exact
//           path="/"
//           element={token ? <Home /> : <Navigate to={"/login"} />}
//         />
//         <Route exact path="/blogs" element={<Blogs />} />
//         <Route exact path="/creators" element={<Creators />} />
//         <Route exact path="/login" element={<Login />} />
//         <Route exact path="/register" element={<Register />} />
//         <Route exact path="/dashboard" element={<Dashboard />} />
//         <Route exact path="/contact" element={<Contact/>} />
//         <Route exact path="/favorites" element={<Favorites/>} />
//         <Route exact path="/blog/:id" element={<Detail />} />
//         <Route exact path="/blog/update/:id" element={<UpdateBlog />} />
//         <Route path="*" element={<NotFound />} />
//         <Route path="/ForgotPassword" element={<ForgotPassword />} />
//         <Route path="/verify-otp" element={<VerifyOtp />} />

//       </Routes>
//       <Toaster />
//       {!hideNavbarFooter && <Footer />}
//     </div>
//   );
// }

// export default App;

// eslint-disable-next-line no-unused-vars
import React from "react";
import Navbar from "../src/components/Navbar";
import Home from "../src/components/Home";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Blogs from "../src/pages/Blogs";
import Login from "../src/pages/Login";
import Register from "../src/pages/Register";
import Creators from "./pages/Creators";
import Dashboard from "../src/pages/Dashboard";
import Contact from "../src/pages/Contact";
import Favorites from "../src/pages/Favorites";
import { useAuth } from "./context/AuthProvider";
import { Toaster } from "react-hot-toast";
import UpdateBlog from "./dashboard/UpdateBlog.jsx";
import Detail from "./pages/Detail.jsx";
import NotFound from "./pages/NotFound.jsx";
import Footer from "./components/Footer.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import VerifyOtp from "./pages/VerifyOtp.jsx";
import SuperAdminDashboard from "./pages/superadmin/SuperAdminDashboard";
import AllUsers from "./pages/superadmin/AllUsers";
import AllPosts from "./pages/superadmin/AllPosts";
import ViewBlog from "./pages/superadmin/ViewBlog";

function App() {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const hideNavbarFooter = ["/dashboard", "/login", "/register", "/superadmin", "/superadmin/users","/superadmin/posts","/superadmin/view-blog/:id"].includes(
    location.pathname
  );

  return (
    <div>
      {!hideNavbarFooter && <Navbar />}

      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
        />
        

        {/* Public Routes */}
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/creators" element={<Creators />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/blog/:id" element={<Detail />} />
        <Route path="/blog/update/:id" element={<UpdateBlog />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/superadmin" element={<SuperAdminDashboard />} />
        <Route path="/superadmin/users" element={<AllUsers />} />
        <Route path="/superadmin/posts" element={<AllPosts />} />
        <Route path="/superadmin/view-blog/:id" element={<ViewBlog />} />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Toaster />
      {!hideNavbarFooter && <Footer />}
    </div>
  );
}

export default App;
