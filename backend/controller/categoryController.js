import Category from '../models/Category.js';

// @desc Get all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch categories' });
  }
};

// @desc Add new category
export const addCategory = async (req, res) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: 'Category name is required' });

  try {
    const exists = await Category.findOne({ name: name.trim() });
    if (exists) return res.status(400).json({ message: 'Category already exists' });

    const newCategory = new Category({ name: name.trim() });
    await newCategory.save();

    res.status(201).json(newCategory);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add category' });
  }
};

// @desc Delete category
export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    await Category.findByIdAndDelete(id);
    res.json({ message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete category' });
  }
};
