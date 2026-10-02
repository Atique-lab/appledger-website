'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useMotionValue, useSpring, useInView, animate } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  formatter?: (val: number) => string;
}

export default function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
  formatter,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const count = useMotionValue(0);
  const rounded = useSpring(count, { stiffness: 100, damping: 20 });
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, {
        duration: 1.2,
        ease: 'easeOut',
      });
      return controls.stop;
    }
  }, [isInView, value, count]);

  useEffect(() => {
    return rounded.on('change', (latest) => {
      const current = Math.round(latest);
      if (formatter) {
        setDisplayValue(formatter(current));
      } else {
        setDisplayValue(current.toLocaleString('en-IN'));
      }
    });
  }, [rounded, formatter]);

  return (
    <span ref={ref}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}
