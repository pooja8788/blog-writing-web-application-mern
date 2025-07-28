// src/pages/superadmin/SuperAdminDashboard.jsx
import { Link } from "react-router-dom";

const SuperAdminDashboard = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">SuperAdmin Panel</h1>
      <div className="space-y-4">
        <Link to="/superadmin/users" className="block text-blue-600 hover:underline">👥 Manage Users</Link>
        <Link to="/superadmin/posts" className="block text-blue-600 hover:underline">📝 Manage Posts</Link>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
