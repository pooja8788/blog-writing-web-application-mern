const express = require('express');
const router = express.Router();
const {
  getCategories,
  addCategory,
  deleteCategory
} = require('../controllers/categoryController');


const verifyToken = require('../middleware/verifyToken');
const isSuperAdmin = require('../middleware/isSuperAdmin');

router.get('/', getCategories); // public or optional auth

// Protect these routes
router.post('/', verifyToken, isSuperAdmin, addCategory);
router.delete('/:id', verifyToken, isSuperAdmin, deleteCategory);

module.exports = router;
