'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none' | 'fade-scale' | 'scale';
  delay?: number;
  duration?: number;
  staggerChildren?: number;
}

export default function ScrollReveal({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  duration = 0.5,
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  const getVariants = () => {
    switch (direction) {
      case 'up':
        return { initial: { opacity: 0, y: 35, x: 0 }, animate: { opacity: 1, y: 0, x: 0 } };
      case 'down':
        return { initial: { opacity: 0, y: -35, x: 0 }, animate: { opacity: 1, y: 0, x: 0 } };
      case 'left':
        return { initial: { opacity: 0, x: 35, y: 0 }, animate: { opacity: 1, x: 0, y: 0 } };
      case 'right':
        return { initial: { opacity: 0, x: -35, y: 0 }, animate: { opacity: 1, x: 0, y: 0 } };
      case 'fade-scale':
      case 'scale':
        return { initial: { opacity: 0, scale: 0.92 }, animate: { opacity: 1, scale: 1 } };
      case 'none':
      default:
        return { initial: { opacity: 0 }, animate: { opacity: 1 } };
    }
  };

  const variants = getVariants();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={variants.initial}
      whileInView={variants.animate}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
