import express from 'express';
import { approveComment, createComment, getCommentsByPost } from '../controllers/commentController.js';
import { permit, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/post/:postId', getCommentsByPost);
router.post('/post/:postId', createComment);
router.patch('/:id/approve', protect, permit('admin', 'author'), approveComment);

export default router;
