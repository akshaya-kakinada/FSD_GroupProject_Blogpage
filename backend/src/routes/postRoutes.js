import express from 'express';
import {
  createPost,
  deletePost,
  getPostBySlug,
  getPosts,
  updatePost
} from '../controllers/postController.js';
import { permit, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getPosts);
router.get('/:slug', getPostBySlug);
router.post('/', protect, permit('admin', 'author'), createPost);
router.put('/:id', protect, permit('admin', 'author'), updatePost);
router.delete('/:id', protect, permit('admin', 'author'), deletePost);

export default router;
