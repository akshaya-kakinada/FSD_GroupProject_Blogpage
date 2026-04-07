import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    content: { type: String, required: true },
    approved: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model('Comment', commentSchema);
