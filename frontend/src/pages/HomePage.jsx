import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import client from '../api/client';
import PostCard from '../components/blog/PostCard';
import Loader from '../components/common/Loader';
import HorizontalStories from '../components/home/HorizontalStories';
import Reveal from '../components/motion/Reveal';
import SplitRevealText from '../components/motion/SplitRevealText';
import StaggerGroup, { StaggerItem } from '../components/motion/StaggerGroup';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const heroRef = useRef(null);
  const shouldReduce = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroImageY = useTransform(scrollYProgress, [0, 1], shouldReduce ? [0, 0] : [0, 80]);
  const heroScale = useTransform(scrollYProgress, [0, 1], shouldReduce ? [1, 1] : [1, 1.06]);

  useEffect(() => {
    Promise.all([client.get('/posts'), client.get('/categories')])
      .then(([postsRes, categoriesRes]) => {
        setPosts(postsRes.data);
        setCategories(categoriesRes.data);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  const hero = posts[0];
  const stacked = posts.slice(0, 3);

  return (
    <div className="space-y-4 md:space-y-8 pb-8">
      {hero && (
        <section ref={heroRef} className="container-shell pt-8 md:pt-12 grid md:grid-cols-2 gap-8 items-center min-h-[72vh]">
          <motion.div style={{ y: heroImageY, scale: heroScale }} className="rounded-2xl overflow-hidden shadow-premium">
            <img className="h-[420px] md:h-[520px] w-full object-cover" src={hero.coverImage} alt={hero.title} />
          </motion.div>

          <div className="space-y-4 md:space-y-6">
            <motion.p
              className="text-gold uppercase tracking-[0.2em] text-xs"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Featured Story
            </motion.p>
            <SplitRevealText text={hero.title} className="font-serif text-4xl md:text-6xl leading-tight" />
            <motion.p
              className="text-muted text-lg"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {hero.excerpt}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              viewport={{ once: true }}
            >
              <Link
                to={`/post/${hero.slug}`}
                className="inline-block bg-charcoal text-ivory px-6 py-3 rounded-full hover:bg-gold hover:scale-[1.02] active:scale-[0.99] transition"
              >
                Enter the story
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      <div className="h-px bg-gradient-to-r from-transparent via-beige to-transparent" />

      <Reveal className="container-shell py-10" y={20}>
        <h2 className="font-serif text-3xl mb-6">Featured Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.slice(0, 4).map((cat) => (
            <Link
              key={cat._id}
              to={`/category/${cat.slug}`}
              className="bg-white rounded-xl border border-beige p-5 hover:border-gold hover:bg-beige/40 transition"
            >
              <h3 className="font-serif text-xl">{cat.name}</h3>
              <p className="text-muted text-sm mt-2">{cat.description || 'Curated editorial collection.'}</p>
            </Link>
          ))}
        </div>
      </Reveal>

      <section className="bg-beige/35 py-12">
        <div className="container-shell">
          <Reveal><h2 className="font-serif text-3xl mb-6">Latest Articles</h2></Reveal>
          <StaggerGroup className="grid md:grid-cols-3 gap-6">
            {posts.slice(0, 6).map((p) => (
              <StaggerItem key={p._id}>
                <PostCard post={p} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="container-shell py-14">
        <Reveal>
          <h3 className="font-serif text-3xl mb-6">Editor Stacks</h3>
        </Reveal>
        <div className="space-y-[-60px] md:space-y-[-84px]">
          {stacked.map((post, index) => (
            <motion.div
              key={post._id}
              className="sticky top-24"
              initial={shouldReduce ? { opacity: 1 } : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
            >
              <PostCard post={post} />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-white/80">
        <HorizontalStories posts={posts.slice(0, 7)} />
      </section>

      <section className="container-shell bg-charcoal text-ivory rounded-3xl p-10 text-center space-y-3 my-8">
        <Reveal>
          <h3 className="font-serif text-3xl">Join the Editorial Newsletter</h3>
          <p className="text-ivory/80">Weekly perspectives, timeless essays, and carefully selected reads.</p>
        </Reveal>
      </section>
    </div>
  );
};

export default HomePage;
