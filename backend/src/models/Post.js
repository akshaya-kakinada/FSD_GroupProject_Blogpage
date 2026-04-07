import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    coverImage: { type: String, default: '' },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    readTime: { type: Number, default: 1 },
    tags: [{ type: String }],
    publishedAt: { type: Date }
  },
  { timestamps: true }
);

postSchema.index({ title: 'text', excerpt: 'text', content: 'text' });

export default mongoose.model('Post', postSchema);
