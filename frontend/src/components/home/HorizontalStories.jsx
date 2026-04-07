import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

const HorizontalStories = ({ posts = [] }) => {
  const ref = useRef(null);
  const shouldReduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const x = useTransform(scrollYProgress, [0, 1], shouldReduce ? [0, 0] : ['0%', '-26%']);

  return (
    <section ref={ref} className="container-shell py-16 overflow-hidden">
      <h3 className="font-serif text-3xl mb-5">Scrolling Narratives</h3>
      <p className="text-muted mb-8 max-w-xl">A horizontal editorial rail that glides as you continue reading down the page.</p>
      <motion.div style={{ x }} className="flex gap-5 w-max pr-16">
        {posts.map((post) => (
          <Link
            key={post._id}
            to={`/post/${post.slug}`}
            className="w-[300px] md:w-[360px] rounded-2xl bg-white shadow-premium overflow-hidden group"
          >
            <div className="overflow-hidden">
              <img
                src={post.coverImage}
                alt={post.title}
                className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-5">
              <p className="text-[11px] uppercase tracking-[0.18em] text-gold mb-2">Feature</p>
              <h4 className="font-serif text-xl leading-tight">{post.title}</h4>
            </div>
          </Link>
        ))}
      </motion.div>
    </section>
  );
};

export default HorizontalStories;
