import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';

const ScrollProgressBar = () => {
  const shouldReduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: shouldReduce ? 1000 : 140,
    damping: shouldReduce ? 100 : 26,
    mass: 0.25
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[70] bg-gradient-to-r from-gold via-charcoal to-gold"
      style={{ scaleX }}
    />
  );
};

export default ScrollProgressBar;
