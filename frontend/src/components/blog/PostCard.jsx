import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => (
  <motion.article
    whileHover={{ y: -6 }}
    transition={{ duration: 0.35, ease: 'easeOut' }}
    className="group bg-white rounded-2xl overflow-hidden shadow-premium transition duration-300 hover:shadow-2xl"
  >
    <div className="overflow-hidden">
      <img
        src={post.coverImage || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200'}
        alt={post.title}
        className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
      />
    </div>
    <div className="p-6 space-y-3">
      <p className="inline-flex text-xs uppercase tracking-[0.2em] text-gold rounded-full px-2.5 py-1 bg-beige/45 transition-colors group-hover:bg-beige">
        {post.categoryId?.name || 'General'}
      </p>
      <h3 className="font-serif text-2xl leading-tight">{post.title}</h3>
      <p className="text-muted line-clamp-3">{post.excerpt}</p>
      <Link to={`/post/${post.slug}`} className="premium-link text-sm">Read article →</Link>
    </div>
  </motion.article>
);

export default PostCard;
