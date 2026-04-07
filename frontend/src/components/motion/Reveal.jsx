import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';

const Reveal = ({ children, className = '', delay = 0, y = 24, once = true }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: '-10% 0px' });
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={shouldReduce ? { opacity: 1 } : { opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : shouldReduce ? { opacity: 1 } : { opacity: 0, y }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
