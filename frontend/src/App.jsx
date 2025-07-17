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

function App() {
  const location = useLocation();
  const hideNavbarFooter = ["/dashboard", "/login", "/register"].includes(
    location.pathname
  );
  const { blogs, isAuthenticated } = useAuth();
  let token = localStorage.getItem("jwt"); // Retrieve the token directly from the localStorage to maininting the routes protect (Go to login.jsx)
  console.log(blogs);
  console.log(isAuthenticated);

  return (
    <div>
      {!hideNavbarFooter && <Navbar />}
      <Routes>
        <Route
          exact
          path="/"
          element={token ? <Home /> : <Navigate to={"/login"} />}
        />
        <Route exact path="/blogs" element={<Blogs />} />
        <Route exact path="/creators" element={<Creators />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/contact" element={<Contact/>} />
        <Route exact path="/favorites" element={<Favorites/>} />
        {/* Single page route */}
        <Route exact path="/blog/:id" element={<Detail />} />

        {/* Update page route */}
        <Route exact path="/blog/update/:id" element={<UpdateBlog />} />

        {/* Universal route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
