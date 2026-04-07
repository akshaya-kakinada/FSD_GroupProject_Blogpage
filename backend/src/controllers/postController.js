import slugify from 'slugify';
import Post from '../models/Post.js';
import { calculateReadTime } from '../utils/readTime.js';

export const getPosts = async (req, res) => {
  const { category, status = 'published', q = '', sort = '-publishedAt' } = req.query;
  const query = {};

  if (status !== 'all') query.status = status;
  if (category) query.categoryId = category;
  if (q) query.$text = { $search: q };

  const posts = await Post.find(query)
    .populate('categoryId', 'name slug')
    .populate('authorId', 'name')
    .sort(sort)
    .limit(50);

  res.json(posts);
};

export const getPostBySlug = async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug })
    .populate('categoryId', 'name slug')
    .populate('authorId', 'name');

  if (!post) return res.status(404).json({ message: 'Post not found' });

  const related = await Post.find({
    _id: { $ne: post._id },
    categoryId: post.categoryId._id,
    status: 'published'
  })
    .select('title slug coverImage excerpt publishedAt readTime')
    .limit(3);

  res.json({ post, related });
};

export const createPost = async (req, res) => {
  const { title, excerpt, content, coverImage, categoryId, status, tags } = req.body;
  const slug = slugify(title, { lower: true, strict: true });
  const post = await Post.create({
    title,
    slug,
    excerpt,
    content,
    coverImage,
    categoryId,
    status: status || 'draft',
    tags: tags || [],
    readTime: calculateReadTime(content),
    publishedAt: status === 'published' ? new Date() : undefined,
    authorId: req.user._id
  });
  res.status(201).json(post);
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const updates = { ...req.body };

  if (updates.title) {
    updates.slug = slugify(updates.title, { lower: true, strict: true });
  }

  if (updates.content) {
    updates.readTime = calculateReadTime(updates.content);
  }

  if (updates.status === 'published') {
    updates.publishedAt = new Date();
  }

  const post = await Post.findByIdAndUpdate(id, updates, { new: true });
  if (!post) return res.status(404).json({ message: 'Post not found' });
  res.json(post);
};

export const deletePost = async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.id);
  if (!post) return res.status(404).json({ message: 'Post not found' });
  res.json({ message: 'Post deleted' });
};
