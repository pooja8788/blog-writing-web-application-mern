import express from 'express';
import { getCategories, addCategory, deleteCategory } from '../controller/categoryController.js';
import verifyToken from '../middleware/verifyToken.js';
import { isSuperAdmin } from '../middleware/isSuperAdmin.js';

const router = express.Router();

router.get('/', getCategories);
router.post('/', verifyToken, isSuperAdmin, addCategory);
router.delete('/:id', verifyToken, isSuperAdmin, deleteCategory);

export default router;
