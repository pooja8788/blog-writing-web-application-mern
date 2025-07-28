// src/pages/SuperAdminDashboard.jsx
import { Link } from "react-router-dom";

const SuperAdminDashboard = () => {
  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Super Admin Panel</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/superadmin/users"
          className="bg-blue-500 text-white p-6 rounded shadow hover:bg-blue-600"
        >
          Manage Users
        </Link>
        <Link
          to="/superadmin/posts"
          className="bg-green-500 text-white p-6 rounded shadow hover:bg-green-600"
        >
          Manage Blog Posts
        </Link>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
