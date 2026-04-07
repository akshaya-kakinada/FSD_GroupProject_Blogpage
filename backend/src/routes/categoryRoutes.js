import express from 'express';
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory
} from '../controllers/categoryController.js';
import { permit, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getCategories);
router.post('/', protect, permit('admin', 'author'), createCategory);
router.put('/:id', protect, permit('admin', 'author'), updateCategory);
router.delete('/:id', protect, permit('admin'), deleteCategory);

export default router;
