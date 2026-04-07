import Comment from '../models/Comment.js';

export const getCommentsByPost = async (req, res) => {
  const comments = await Comment.find({ postId: req.params.postId, approved: true }).sort({ createdAt: -1 });
  res.json(comments);
};

export const createComment = async (req, res) => {
  const comment = await Comment.create({ ...req.body, postId: req.params.postId, approved: false });
  res.status(201).json({ message: 'Comment submitted for review', comment });
};

export const approveComment = async (req, res) => {
  const comment = await Comment.findByIdAndUpdate(req.params.id, { approved: true }, { new: true });
  if (!comment) return res.status(404).json({ message: 'Comment not found' });
  res.json(comment);
};
