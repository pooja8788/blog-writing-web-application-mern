
// // src/pages/superadmin/SuperAdminDashboard.jsx
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthProvider";
// import toast from "react-hot-toast";

// const SuperAdminDashboard = () => {
//   const navigate = useNavigate();
//   const { setIsAuthenticated, setProfile } = useAuth();

//   const handleLogout = () => {
//     // Clear auth context and cookies
//     setIsAuthenticated(false);
//     setProfile(null);
//     localStorage.removeItem("jwt");
//     toast.success("Logged out successfully");
//     navigate("/login");
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-10 px-6">
//       <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-800">
//             👑 SuperAdmin Dashboard
//           </h1>
//           <button
//             onClick={handleLogout}
//             className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow"
//           >
//             Logout
//           </button>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//           <Link
//             to="/superadmin/users"
//             className="bg-blue-100 hover:bg-blue-200 transition p-6 rounded-lg shadow-md flex items-center justify-between"
//           >
//             <div>
//               <h2 className="text-xl font-semibold text-blue-700">Manage Users</h2>
//               <p className="text-gray-600 text-sm">View, search & delete users</p>
//             </div>
//             <span className="text-3xl">👥</span>
//           </Link>

//           <Link
//             to="/superadmin/posts"
//             className="bg-green-100 hover:bg-green-200 transition p-6 rounded-lg shadow-md flex items-center justify-between"
//           >
//             <div>
//               <h2 className="text-xl font-semibold text-green-700">Manage Posts</h2>
//               <p className="text-gray-600 text-sm">View, filter & delete blogs</p>
//             </div>
//             <span className="text-3xl">📝</span>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SuperAdminDashboard;

// src/pages/superadmin/SuperAdminDashboard.jsx
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import toast from "react-hot-toast";

const SuperAdminDashboard = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated, setProfile } = useAuth();

  const handleLogout = () => {
    // Clear auth context and cookies
    setIsAuthenticated(false);
    setProfile(null);
    localStorage.removeItem("jwt");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            👑 SuperAdmin Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Manage Users */}
          <Link
            to="/superadmin/users"
            className="bg-blue-100 hover:bg-blue-200 transition p-6 rounded-lg shadow-md flex items-center justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold text-blue-700">Manage Users</h2>
              <p className="text-gray-600 text-sm">View, search & delete users</p>
            </div>
            <span className="text-3xl">👥</span>
          </Link>

          {/* Manage Posts */}
          <Link
            to="/superadmin/posts"
            className="bg-green-100 hover:bg-green-200 transition p-6 rounded-lg shadow-md flex items-center justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold text-green-700">Manage Posts</h2>
              <p className="text-gray-600 text-sm">View, filter & delete blogs</p>
            </div>
            <span className="text-3xl">📝</span>
          </Link>

          {/* Manage Categories - New Feature */}
          <Link
            to="/superadmin/categories"
            className="bg-yellow-100 hover:bg-yellow-200 transition p-6 rounded-lg shadow-md flex items-center justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold text-yellow-700">Manage Categories</h2>
              <p className="text-gray-600 text-sm">Add or delete blog categories</p>
            </div>
            <span className="text-3xl">📂</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
