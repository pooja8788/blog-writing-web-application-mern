// src/pages/ManageUsers.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../utils";
import toast from "react-hot-toast";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/superadmin/users`, {
        withCredentials: true,
      });
      setUsers(data.users);
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Failed to fetch users");
    }
  };

  const updateRole = async (userId, role) => {
    try {
      await axios.patch(
        `${BACKEND_URL}/api/superadmin/users/${userId}/role`,
        { role },
        { withCredentials: true }
      );
      toast.success("Role updated");
      fetchUsers();
    } catch (error) {
      toast.error("Failed to update role", error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/superadmin/users/${userId}`, {
        withCredentials: true,
      });
      toast.success("User deleted");
      fetchUsers();
    } catch (error) {
      toast.error("Failed to delete user", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Manage Users</h2>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td className="border p-2">{u.name}</td>
              <td className="border p-2">{u.email}</td>
              <td className="border p-2">{u.role}</td>
              <td className="border p-2 space-x-2">
                <button
                  className="bg-yellow-400 px-3 py-1 rounded"
                  onClick={() =>
                    updateRole(u._id, u.role === "admin" ? "user" : "admin")
                  }
                >
                  Make {u.role === "admin" ? "User" : "Creator"}
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => deleteUser(u._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
