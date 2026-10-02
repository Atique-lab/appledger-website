'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, GitPullRequest, LayoutDashboard, Eye, Columns, FileCheck, Maximize2 } from 'lucide-react';

export interface GalleryItem {
  id: number;
  title: string;
  category: string;
  src: string;
  desc: string;
  icon: React.ReactNode;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    title: '5-Tier Role & Permission Matrix',
    category: 'Admin Console',
    src: '/images/screenshots/screenshot-1.png',
    desc: 'Granular organization roster enforcing CEO, Admin, Manager, Lead, Member, and Guest access permissions.',
    icon: <ShieldCheck style={{ width: 18, height: 18 }} />,
  },
  {
    id: 2,
    title: '"Request to Action" Escalation Inbox',
    category: 'Escalation Engine',
    src: '/images/screenshots/screenshot-2.png',
    desc: 'Incoming priority reroute alerts auto-directed to supervisors with resolution sign-off triggers.',
    icon: <GitPullRequest style={{ width: 18, height: 18 }} />,
  },
  {
    id: 3,
    title: 'CEO Executive Dashboard',
    category: 'Executive Oversight',
    src: '/images/screenshots/screenshot-3.png',
    desc: '30-day completion trend, per-team performance breakdown, and per-person open task workload distribution.',
    icon: <LayoutDashboard style={{ width: 18, height: 18 }} />,
  },
  {
    id: 4,
    title: 'Guest Client Access Grant Screen',
    category: 'Guest Collaboration',
    src: '/images/screenshots/screenshot-4.png',
    desc: 'Task-level guest provisioning with isolated read-only scope enforced by PostgreSQL Row-Level Security.',
    icon: <Eye style={{ width: 18, height: 18 }} />,
  },
  {
    id: 5,
    title: 'Per-Team Workflow Templates',
    category: 'Pipeline Management',
    src: '/images/screenshots/screenshot-5.png',
    desc: 'Configurable stage pipelines for Tech Release, Sales Lead Funnel, and Operations Audit chains.',
    icon: <Columns style={{ width: 18, height: 18 }} />,
  },
  {
    id: 6,
    title: 'Task Resolution & Immutable Audit Log Trail',
    category: 'Audit & Compliance',
    src: '/images/screenshots/screenshot-6.png',
    desc: 'Cryptographically sealed transaction logs tracking task creation, due date changes, and supervisor sign-offs.',
    icon: <FileCheck style={{ width: 18, height: 18 }} />,
  },
];

export default function GalleryLightbox() {
  const [activeItem, setActiveItem] = useState<GalleryItem>(GALLERY_ITEMS[0]);
  const [fullscreenModal, setFullscreenModal] = useState<boolean>(false);

  return (
    <div style={{ width: '100%' }}>
      {/* 6 CATEGORY SELECTOR CARDS */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: '0.75rem',
          marginBottom: '2.5rem',
        }}
      >
        {GALLERY_ITEMS.map((item) => {
          const isActive = item.id === activeItem.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveItem(item)}
              style={{
                backgroundColor: isActive ? 'var(--accent-forest)' : 'var(--bg-card)',
                color: isActive ? '#FFFFFF' : 'var(--text-primary)',
                border: isActive ? '2px solid var(--accent-forest)' : '1px solid var(--border-paper)',
                borderRadius: '12px',
                padding: '0.85rem 0.6rem',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
                boxShadow: isActive ? '0 6px 18px rgba(45, 90, 39, 0.3)' : 'none',
              }}
            >
              <div style={{ opacity: isActive ? 1 : 0.7 }}>{item.icon}</div>
              <span style={{ fontSize: '0.78rem', fontWeight: isActive ? 700 : 500, lineHeight: 1.25 }}>
                {item.category}
              </span>
            </button>
          );
        })}
      </div>

      {/* FLOATING 3D MACBOOK MOCKUP VIEWPORT WITH CROSSFADE TRANSITION */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          maxWidth: '960px',
          margin: '0 auto 2.5rem auto',
          position: 'relative',
        }}
      >
        {/* Laptop Outer Display Shell */}
        <div
          style={{
            backgroundColor: '#1E293B',
            borderRadius: '20px 20px 0 0',
            padding: '16px 16px 0 16px',
            border: '2px solid #334155',
            boxShadow: '0 25px 60px -15px rgba(0,0,0,0.4)',
            position: 'relative',
          }}
        >
          {/* Camera Notch */}
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: '#0F172A',
              margin: '0 auto 12px auto',
              border: '1px solid #475569',
            }}
          />

          {/* Screen Inner Viewport */}
          <div
            onClick={() => setFullscreenModal(true)}
            style={{
              position: 'relative',
              width: '100%',
              height: '480px',
              backgroundColor: '#090D16',
              borderRadius: '8px 8px 0 0',
              overflow: 'hidden',
              cursor: 'pointer',
              border: '1px solid #1E293B',
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                style={{ position: 'relative', width: '100%', height: '100%' }}
              >
                <Image
                  src={activeItem.src}
                  alt={activeItem.title}
                  fill
                  priority
                  sizes="(max-width: 1200px) 100vw, 960px"
                  style={{ objectFit: 'contain' }}
                />
              </motion.div>
            </AnimatePresence>

            {/* Click to Zoom Overlay */}
            <div
              style={{
                position: 'absolute',
                bottom: '1rem',
                right: '1rem',
                backgroundColor: 'rgba(15, 23, 42, 0.85)',
                color: '#FFFFFF',
                padding: '6px 14px',
                borderRadius: '9999px',
                fontSize: '0.78rem',
                fontWeight: 600,
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.15)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Maximize2 style={{ width: 14, height: 14 }} /> Click for Fullscreen Zoom
            </div>
          </div>
        </div>

        {/* Laptop Bottom Curved Base Body */}
        <div
          style={{
            height: 18,
            backgroundColor: '#0F172A',
            borderRadius: '0 0 24px 24px',
            border: '2px solid #334155',
            borderTop: 'none',
            position: 'relative',
            boxShadow: '0 12px 28px rgba(0,0,0,0.3)',
          }}
        >
          {/* Thumb Notch */}
          <div
            style={{
              width: 70,
              height: 5,
              backgroundColor: '#334155',
              borderRadius: '0 0 4px 4px',
              margin: '0 auto',
            }}
          />
        </div>
      </motion.div>

      {/* ACTIVE CATEGORY CAPTION CARD */}
      <div
        className="card-box shadow-md text-center"
        style={{
          maxWidth: '720px',
          margin: '0 auto',
          padding: '1.5rem 2rem',
          backgroundColor: 'var(--bg-card)',
          borderRadius: '14px',
          border: '1px solid var(--border-paper)',
        }}
      >
        <span className="badge badge-accent" style={{ marginBottom: '0.4rem' }}>
          {activeItem.category}
        </span>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.4rem' }}>{activeItem.title}</h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.55 }}>
          {activeItem.desc}
        </p>
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {fullscreenModal && (
          <div className="lightbox-modal active" style={{ display: 'flex', zIndex: 1000 }}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lightbox-overlay"
              onClick={() => setFullscreenModal(false)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="lightbox-content"
              style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '14px', border: '1px solid var(--border-paper)' }}
            >
              <button
                className="lightbox-close"
                onClick={() => setFullscreenModal(false)}
                aria-label="Close image preview"
              >
                &times;
              </button>
              <div style={{ position: 'relative', width: '85vw', height: '70vh', maxWidth: '1100px', margin: '0 auto' }}>
                <Image
                  src={activeItem.src}
                  alt={activeItem.title}
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <div className="lightbox-caption" style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                <strong>{activeItem.title}</strong> &mdash; {activeItem.desc}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
