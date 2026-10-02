'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';

export default function MacbookMockup() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      animate={
        shouldReduceMotion
          ? undefined
          : {
              y: [0, -12, 0],
              rotate: [0, 0.5, -0.5, 0],
            }
      }
      transition={{
        duration: 4.8,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '560px',
        margin: '0 auto',
        perspective: '1000px',
      }}
    >
      {/* MacBook Display Lid Screen Bezel */}
      <div
        style={{
          position: 'relative',
          backgroundColor: '#0F172A',
          borderRadius: '16px 16px 4px 4px',
          padding: '12px 12px 18px 12px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
          border: '1px solid #334155',
        }}
      >
        {/* Camera Notch Dot */}
        <div
          style={{
            position: 'absolute',
            top: '6px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: '#334155',
          }}
        />

        {/* Display Screen Viewport with Real App Screenshot */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16/10',
            borderRadius: '8px',
            overflow: 'hidden',
            backgroundColor: '#1E293B',
          }}
        >
          <Image
            src="/images/screenshots/screenshot-1.png"
            alt="AppLedger CEO Executive Dashboard"
            fill
            sizes="(max-width: 768px) 100vw, 560px"
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
      </div>

      {/* CURVY MACBOOK LAPTOP BASE WITH SMOOTH ROUNDED BOTTOM CORNERS */}
      <div
        style={{
          position: 'relative',
          width: '108%',
          left: '-4%',
          height: '18px',
          background: 'linear-gradient(180deg, #F1F5F9 0%, #E2E8F0 40%, #CBD5E1 100%)',
          borderRadius: '2px 2px 24px 24px',
          borderTop: '2px solid #CBD5E1',
          borderBottom: '1px solid #94A3B8',
          boxShadow: '0 16px 35px rgba(0, 0, 0, 0.18)',
        }}
      >
        {/* Center Opener Notch Cutout */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '64px',
            height: '6px',
            backgroundColor: '#CBD5E1',
            borderRadius: '0 0 6px 6px',
            borderBottom: '1px solid #94A3B8',
          }}
        />

        {/* Rubber Feet Highlights on Bottom Edge */}
        <div
          style={{
            position: 'absolute',
            bottom: '2px',
            left: '12%',
            width: '30px',
            height: '3px',
            borderRadius: '3px',
            backgroundColor: '#94A3B8',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '2px',
            right: '12%',
            width: '30px',
            height: '3px',
            borderRadius: '3px',
            backgroundColor: '#94A3B8',
          }}
        />
      </div>

      {/* Floating Shadow Reflection Backdrop */}
      <motion.div
        animate={
          shouldReduceMotion
            ? undefined
            : {
                scale: [0.92, 1, 0.92],
                opacity: [0.35, 0.5, 0.35],
              }
        }
        transition={{
          duration: 4.8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          width: '82%',
          height: '18px',
          margin: '14px auto 0 auto',
          borderRadius: '50%',
          backgroundColor: 'rgba(0, 0, 0, 0.25)',
          filter: 'blur(12px)',
        }}
      />
    </motion.div>
  );
}
