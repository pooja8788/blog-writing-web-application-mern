// src/pages/superadmin/AllUsers.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../utils";
import toast from "react-hot-toast";

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await axios.get(`${BACKEND_URL}/api/superadmin/users`, { withCredentials: true });
    setUsers(res.data.users);
  };

  const handleRoleChange = async (id, newRole) => {
    await axios.patch(
      `${BACKEND_URL}/api/superadmin/users/${id}/role`,
      { role: newRole },
      { withCredentials: true }
    );
    toast.success("Role updated!");
    fetchUsers();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${BACKEND_URL}/api/superadmin/users/${id}`, { withCredentials: true });
    toast.success("User deleted");
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-xl font-semibold mb-4">All Users</h2>
      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td className="p-2 border">{u.name}</td>
              <td className="p-2 border">{u.email}</td>
              <td className="p-2 border">{u.role}</td>
              <td className="p-2 border space-x-2">
                {u.role !== "superadmin" && (
                  <button
                    className="text-blue-600 underline"
                    onClick={() => handleRoleChange(u._id, u.role === "admin" ? "user" : "admin")}
                  >
                    {u.role === "admin" ? "Demote" : "Promote"}
                  </button>
                )}
                {u.role !== "superadmin" && (
                  <button
                    className="text-red-600 underline"
                    onClick={() => handleDelete(u._id)}
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
