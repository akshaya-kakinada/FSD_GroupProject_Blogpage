import { motion, useReducedMotion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.04
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0 }
};

export const StaggerItem = ({ children }) => (
  <motion.div variants={item} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
    {children}
  </motion.div>
);

const StaggerGroup = ({ children, className = '' }) => {
  const shouldReduce = useReducedMotion();
  if (shouldReduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </motion.div>
  );
};

export default StaggerGroup;
