import slugify from 'slugify';
import Category from '../models/Category.js';

export const getCategories = async (_req, res) => {
  const categories = await Category.find().sort({ createdAt: -1 });
  res.json(categories);
};

export const createCategory = async (req, res) => {
  const { name, description, coverImage } = req.body;
  const slug = slugify(name, { lower: true, strict: true });
  const category = await Category.create({ name, slug, description, coverImage });
  res.status(201).json(category);
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description, coverImage } = req.body;
  const slug = name ? slugify(name, { lower: true, strict: true }) : undefined;

  const category = await Category.findByIdAndUpdate(
    id,
    { ...(name && { name }), ...(slug && { slug }), description, coverImage },
    { new: true }
  );

  if (!category) return res.status(404).json({ message: 'Category not found' });
  res.json(category);
};

export const deleteCategory = async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) return res.status(404).json({ message: 'Category not found' });
  res.json({ message: 'Category deleted' });
};
