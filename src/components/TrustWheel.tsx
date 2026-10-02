'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

export interface TrustPillar {
  key: string;
  label: string;
  color: string;
  bgTint: string;
  title: string;
  desc: string;
  linkText: string;
  href: string;
  iconSvg: React.ReactNode;
  pos: { top: number; left: number };
}

export const TRUST_PILLARS: TrustPillar[] = [
  {
    key: 'accountable',
    label: 'Accountable',
    color: '#2D5A27', // Forest
    bgTint: 'var(--accent-forest-light)',
    title: 'Accountable Governance',
    desc: 'Every task status modification and escalation trigger is logged with immutable audit trails to ensure full organizational accountability.',
    linkText: 'Explore Governance Architecture',
    href: '/features#roles',
    pos: { top: 50, left: 220 },
    iconSvg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      </svg>
    ),
  },
  {
    key: 'human-centered',
    label: 'Human-Centered',
    color: '#C05C3B', // Rust
    bgTint: 'var(--accent-rust-light)',
    title: 'Human-Centered Workflows',
    desc: 'Empowers team leaders and members with intuitive controls, eliminating clutter so teams focus on high-value execution.',
    linkText: 'Explore Governance Architecture',
    href: '/features#roles',
    pos: { top: 135, left: 367 },
    iconSvg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
      </svg>
    ),
  },
  {
    key: 'reliable',
    label: 'Reliable',
    color: '#2B6CB0', // Blue
    bgTint: 'rgba(43, 108, 176, 0.1)',
    title: 'Reliable & Robust Performance',
    desc: 'Built for enterprise stability with instant real-time synchronization, zero lag, and dependable operational uptime.',
    linkText: 'Explore Governance Architecture',
    href: '/features#roles',
    pos: { top: 305, left: 367 },
    iconSvg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
    ),
  },
  {
    key: 'fair',
    label: 'Fair & Unbiased',
    color: '#6B46C1', // Purple
    bgTint: 'rgba(107, 70, 193, 0.1)',
    title: 'Fair & Unbiased Access',
    desc: '5-tier role-based authorization matrix guarantees equitable permission enforcement without administrative bias.',
    linkText: 'Explore Governance Architecture',
    href: '/features#roles',
    pos: { top: 390, left: 220 },
    iconSvg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M8 12h8"></path>
      </svg>
    ),
  },
  {
    key: 'transparent',
    label: 'Transparent',
    color: '#D69E2E', // Gold
    bgTint: 'rgba(214, 158, 46, 0.1)',
    title: 'Transparent and Explainable',
    desc: 'A built-in knowledge graph links every task update back to its source, providing total operational visibility.',
    linkText: 'Explore Governance Architecture',
    href: '/features#roles',
    pos: { top: 305, left: 73 },
    iconSvg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M12 16v-4"></path>
        <path d="M12 8h.01"></path>
      </svg>
    ),
  },
  {
    key: 'secure',
    label: 'Secure & Private',
    color: '#319795', // Teal
    bgTint: 'rgba(49, 151, 149, 0.1)',
    title: 'Secure and Privacy-Preserving',
    desc: 'Air-gapped desktop architecture, session-based CSRF protection, and zero-knowledge data retention.',
    linkText: 'Explore Governance Architecture',
    href: '/features#roles',
    pos: { top: 135, left: 73 },
    iconSvg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
      </svg>
    ),
  },
];

export default function TrustWheel() {
  const [currentRingAngle, setCurrentRingAngle] = useState(-90); // Start with Node 0 at Left Active Slot (-90deg offset)
  const [activeIndex, setActiveIndex] = useState(0);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  
  const reqRef = useRef<number | null>(null);
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);

  const ambientSpeed = -0.12;

  useEffect(() => {
    if (shouldReduceMotion) return;

    let angle = currentRingAngle;

    const continuousSpinLoop = () => {
      if (!isUserInteracting) {
        angle += ambientSpeed;
        setCurrentRingAngle(angle);

        let rawIdx = Math.round((270 - angle) / 60) % 6;
        if (rawIdx < 0) rawIdx = ((rawIdx % 6) + 6) % 6;

        setActiveIndex(rawIdx);
      }

      reqRef.current = requestAnimationFrame(continuousSpinLoop);
    };

    reqRef.current = requestAnimationFrame(continuousSpinLoop);

    return () => {
      if (reqRef.current) cancelAnimationFrame(reqRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUserInteracting, shouldReduceMotion]);

  const activePillar = TRUST_PILLARS[activeIndex];

  const snapToNodeAndResume = (targetIndex: number) => {
    setIsUserInteracting(true);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);

    let stepDiff = (targetIndex - activeIndex) % 6;
    if (stepDiff < 0) stepDiff += 6;

    const targetAngle = currentRingAngle - stepDiff * 60;
    setCurrentRingAngle(targetAngle);
    setActiveIndex(targetIndex);

    resumeTimerRef.current = setTimeout(() => {
      setIsUserInteracting(false);
    }, 3500);
  };

  return (
    <div className="trust-grid">
      {/* Left Active Content Card with High Z-Index to Prevent Line Overlap */}
      <div className="trust-content-col" style={{ position: 'relative', zIndex: 20 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activePillar.key}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="trust-card"
            style={{
              position: 'relative',
              zIndex: 25,
              backgroundColor: activePillar.bgTint,
              borderColor: activePillar.color,
              boxShadow: `0 8px 30px ${activePillar.color}22`,
            }}
          >
            <div className="trust-card-header">
              <div
                className="trust-icon-box"
                style={{ backgroundColor: activePillar.color, color: '#FFFFFF' }}
              >
                {activePillar.iconSvg}
              </div>
              <h3 className="trust-card-title">{activePillar.title}</h3>
            </div>
            <div className="trust-card-divider"></div>
            <p className="trust-card-desc">{activePillar.desc}</p>
            <a
              href={activePillar.href}
              className="trust-card-link"
              style={{ color: activePillar.color, fontWeight: 600 }}
            >
              {activePillar.linkText} &rarr;
            </a>
          </motion.div>
        </AnimatePresence>

        {/* Pagination Dots */}
        <div className="trust-pagination">
          {TRUST_PILLARS.map((pillar, index) => (
            <button
              key={pillar.key}
              className={`pag-dot ${index === activeIndex ? 'active' : ''}`}
              onClick={() => snapToNodeAndResume(index)}
              aria-label={pillar.label}
              style={{
                backgroundColor: index === activeIndex ? activePillar.color : undefined,
              }}
            />
          ))}
        </div>
      </div>

      {/* Right Physical Rotating Trust Wheel Column */}
      <div className="trust-wheel-col">
        <div
          className="wheel-container position-relative"
          style={{ width: '440px', height: '440px', margin: '0 auto' }}
        >
          {/* VISUALLY FIXED OVERLAY SVG (Active Left Spoke Line & Left Arc Segment) */}
          <svg
            className="wheel-svg-bg"
            viewBox="0 0 440 440"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 3,
              pointerEvents: 'none',
            }}
          >
            {/* Visually Fixed Active Left Arc Segment */}
            <path
              d="M 73 135 A 170 170 0 0 0 73 305"
              style={{
                fill: 'none',
                stroke: activePillar.color,
                strokeWidth: '4px',
                strokeLinecap: 'round',
                transition: 'stroke 0.35s ease',
              }}
            />

            {/* Visually Fixed Active Left Spoke Line */}
            <line
              x1="220"
              y1="220"
              x2="50"
              y2="220"
              style={{
                stroke: activePillar.color,
                strokeWidth: '3.5px',
                strokeDasharray: '5 4',
                transition: 'stroke 0.35s ease',
              }}
            />
          </svg>

          {/* ITEM 1 FIX: DEAD CENTER ANIMATED SHIELD LOGO MARK */}
          <motion.div
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    scale: [1, 1.06, 1],
                  }
            }
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="wheel-center-badge"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              margin: '-42px 0 0 -42px',
              zIndex: 6,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '84px',
              height: '84px',
              borderRadius: '50%',
              backgroundColor: 'var(--bg-paper)',
              border: '2px solid var(--accent-forest)',
              boxShadow: '0 0 20px rgba(45, 90, 39, 0.25)',
            }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent-forest)" strokeWidth="2.5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--accent-forest)', letterSpacing: '0.08em', marginTop: '2px' }}>
              LEDGER
            </span>
          </motion.div>

          {/* ROTATING SVG SPOKES & DASHED CIRCLES GROUP */}
          <svg
            viewBox="0 0 440 440"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 2,
              transformOrigin: '220px 220px',
              transform: `rotate(${shouldReduceMotion ? 0 : currentRingAngle}deg)`,
              willChange: 'transform',
            }}
          >
            <circle
              cx="220"
              cy="220"
              r="170"
              style={{
                stroke: 'var(--border-subtle)',
                strokeWidth: '1.5px',
                strokeDasharray: '4 4',
                fill: 'none',
              }}
            />
            <circle
              cx="220"
              cy="220"
              r="110"
              style={{
                stroke: 'var(--border-paper)',
                strokeWidth: '1px',
                strokeDasharray: '3 3',
                fill: 'none',
              }}
            />

            {/* 6 Rotating Background Spoke Lines */}
            <line x1="220" y1="220" x2="220" y2="50" style={{ stroke: 'var(--border-subtle)', strokeWidth: '1px', strokeDasharray: '2 3' }} />
            <line x1="220" y1="220" x2="367" y2="135" style={{ stroke: 'var(--border-subtle)', strokeWidth: '1px', strokeDasharray: '2 3' }} />
            <line x1="220" y1="220" x2="367" y2="305" style={{ stroke: 'var(--border-subtle)', strokeWidth: '1px', strokeDasharray: '2 3' }} />
            <line x1="220" y1="220" x2="220" y2="390" style={{ stroke: 'var(--border-subtle)', strokeWidth: '1px', strokeDasharray: '2 3' }} />
            <line x1="220" y1="220" x2="73" y2="305" style={{ stroke: 'var(--border-subtle)', strokeWidth: '1px', strokeDasharray: '2 3' }} />
            <line x1="220" y1="220" x2="73" y2="135" style={{ stroke: 'var(--border-subtle)', strokeWidth: '1px', strokeDasharray: '2 3' }} />
          </svg>

          {/* ITEM 4 FIX: ROTATING NODES RING CONTAINER WITH HIGH Z-INDEX SO LABELS STAY ABOVE ALL SPOKE LINES */}
          <div
            className="wheel-nodes-ring"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '440px',
              height: '440px',
              transformOrigin: '220px 220px',
              transform: `rotate(${shouldReduceMotion ? 0 : currentRingAngle}deg)`,
              willChange: 'transform',
              zIndex: 10,
            }}
          >
            {TRUST_PILLARS.map((pillar, index) => {
              const isActive = index === activeIndex;

              return (
                <div
                  key={pillar.key}
                  className={`wheel-node-item ${isActive ? 'active' : ''}`}
                  style={{
                    position: 'absolute',
                    top: `${pillar.pos.top}px`,
                    left: `${pillar.pos.left}px`,
                    transform: 'translate(-50%, -50%)',
                    cursor: 'pointer',
                    zIndex: isActive ? 20 : 10,
                  }}
                  onClick={() => snapToNodeAndResume(index)}
                >
                  {/* Upright Counter-Rotation wrapper */}
                  <div
                    className="node-inner"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px',
                      transform: `rotate(${shouldReduceMotion ? 0 : -currentRingAngle}deg)`,
                      willChange: 'transform',
                      position: 'relative',
                      zIndex: 12,
                    }}
                  >
                    {/* Glowing backdrop halo for active node */}
                    <div
                      className="node-glow"
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        width: '54px',
                        height: '54px',
                        transform: 'translate(-50%, -50%)',
                        borderRadius: '50%',
                        backgroundColor: isActive ? pillar.color : 'transparent',
                        opacity: isActive ? 0.35 : 0,
                        filter: 'blur(10px)',
                        transition: 'all 0.3s ease',
                      }}
                    />

                    <button
                      className="node-btn"
                      aria-label={pillar.label}
                      style={{
                        position: 'relative',
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        border: isActive ? 'none' : '1px solid var(--border-paper)',
                        backgroundColor: isActive ? pillar.color : 'var(--bg-card)',
                        color: isActive ? '#FFFFFF' : 'var(--text-secondary)',
                        boxShadow: isActive
                          ? `0 0 20px ${pillar.color}88`
                          : '0 2px 8px rgba(0,0,0,0.06)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease',
                        zIndex: 14,
                      }}
                    >
                      {pillar.iconSvg}
                    </button>
                    
                    {/* ITEM 4 FIX: Solid Background Opacity & High Z-Index on Label Box */}
                    <span
                      className="node-label"
                      style={{
                        position: 'relative',
                        zIndex: 15,
                        fontSize: '0.75rem',
                        fontWeight: isActive ? 700 : 500,
                        color: isActive ? pillar.color : 'var(--text-muted)',
                        whiteSpace: 'nowrap',
                        backgroundColor: 'var(--bg-paper)',
                        padding: '3px 10px',
                        borderRadius: '6px',
                        boxShadow: isActive
                          ? `0 2px 8px ${pillar.color}44`
                          : '0 1px 4px rgba(0,0,0,0.08)',
                        border: isActive ? `1.5px solid ${pillar.color}` : '1px solid var(--border-paper)',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {pillar.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
