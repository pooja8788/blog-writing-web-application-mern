import { useState, useEffect } from 'react';
import axios from 'axios';

const SuperAdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    try {
      const res = await axios.get('/api/categories',
        { withCredentials: true }
      );
      setCategories(res.data);
    } catch (err) {
      console.error('Failed to fetch categories', err);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;

    try {
      setLoading(true);
      await axios.post(
        '/api/categories',
        { name: newCategory },
        { withCredentials: true } ,
      );
      setNewCategory('');
      fetchCategories(); // refresh list
    } catch (err) {
      alert(err?.response?.data?.message || 'Failed to add category');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;

    try {
      await axios.delete(`/api/categories/${id}`, {
        withCredentials: true,
      });
      fetchCategories();
    } catch (err) {
      alert(err?.response?.data?.message || 'Failed to delete category');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Blog Categories</h1>

      <div className="flex items-center gap-4 mb-6">
        <input
          type="text"
          className="flex-grow p-2 border rounded"
          placeholder="New category name"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button
          onClick={handleAddCategory}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add'}
        </button>
      </div>

      <ul className="space-y-2">
        {categories.map((cat) => (
          <li
            key={cat._id}
            className="flex justify-between items-center p-3 border rounded bg-white shadow-sm"
          >
            <span className="text-lg">{cat.name}</span>
            <button
              onClick={() => handleDeleteCategory(cat._id)}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SuperAdminCategories;
