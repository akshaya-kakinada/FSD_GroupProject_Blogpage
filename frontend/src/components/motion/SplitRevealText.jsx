import { motion, useReducedMotion } from 'framer-motion';

const SplitRevealText = ({ text, className = '' }) => {
  const shouldReduce = useReducedMotion();
  const letters = text.split('');

  if (shouldReduce) return <h1 className={className}>{text}</h1>;

  return (
    <h1 className={className} aria-label={text}>
      {letters.map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          className="inline-block"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.45, delay: i * 0.015, ease: 'easeOut' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </h1>
  );
};

export default SplitRevealText;
