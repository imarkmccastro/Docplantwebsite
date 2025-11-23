import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
}

export function GlassCard({ children, className = '', hover = true, delay = 0 }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : {}}
      className={`backdrop-blur-xl bg-white/70 border border-white/40 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}
      style={{
        boxShadow: '0 8px 32px 0 rgba(16, 185, 129, 0.1)',
      }}
    >
      {children}
    </motion.div>
  );
}
