import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { BACKEND_URL } from "../utils";

const SuperAdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) =>
    location.pathname === path
      ? "bg-blue-600 text-white font-bold"
      : "hover:bg-blue-100 text-gray-700";

  const handleLogout = async () => {
    try {
      await axios.get(`${BACKEND_URL}/api/users/logout`, {
        withCredentials: true,
      });
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Failed to logout", error);
    }
  };

  return (
    <div className="w-64 h-screen bg-white shadow-md border-r fixed top-0 left-0 flex flex-col">
      <div className="p-6 border-b text-center">
        <h2 className="text-xl font-bold text-blue-600">Super Admin</h2>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <Link to="/superadmin" className={`block px-4 py-2 rounded ${isActive("/superadmin")}`}>
          📊 Dashboard
        </Link>
        <Link to="/superadmin/users" className={`block px-4 py-2 rounded ${isActive("/superadmin/users")}`}>
          👥 Manage Users
        </Link>
        <Link to="/superadmin/posts" className={`block px-4 py-2 rounded ${isActive("/superadmin/posts")}`}>
          📝 Manage Posts
        </Link>
      </nav>

      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white font-semibold"
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
};

export default SuperAdminSidebar;
