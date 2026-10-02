'use client';

import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { User, ShieldAlert, CheckCircle2, ArrowRight, GitPullRequest } from 'lucide-react';

export default function EscalationPipelineVisualizer() {
  const [activeStep, setActiveStep] = useState(1); // 0, 1, or 2
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 3200);

    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  const stages = [
    {
      role: 'Member / Operator',
      tier: 'Tier 5',
      status: 'Blocker Logged',
      detail: 'External API Secret Expired',
      color: 'var(--text-secondary)',
      bgColor: 'var(--bg-paper)',
      icon: <User style={{ width: 22, height: 22 }} />,
    },
    {
      role: 'Team Lead',
      tier: 'Tier 4',
      status: 'Request to Action Triggered',
      detail: 'Single-click priority routing',
      color: 'var(--accent-rust)',
      bgColor: 'var(--accent-rust-light)',
      icon: <ShieldAlert style={{ width: 22, height: 22 }} />,
    },
    {
      role: 'Manager / Admin',
      tier: 'Tier 3 / Tier 2',
      status: 'Resolved & Signed',
      detail: 'Secret rotated in 4m 12s',
      color: 'var(--accent-forest)',
      bgColor: 'var(--accent-forest-light)',
      icon: <CheckCircle2 style={{ width: 22, height: 22 }} />,
    },
  ];

  return (
    <div className="card-box" style={{ padding: '2.5rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <span className="badge badge-accent" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <GitPullRequest style={{ width: 14, height: 14 }} /> Automated &quot;Request to Action&quot; Flow
          </span>
          <h3 style={{ fontSize: '1.5rem', marginTop: '0.5rem', marginBottom: 0 }}>
            Live System Task Escalation Diagram
          </h3>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--accent-rust)', fontWeight: 600 }}>
          <motion.span
            animate={shouldReduceMotion ? undefined : { scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--accent-rust)', display: 'inline-block' }}
          />
          Continuous Signal Current
        </div>
      </div>

      {/* 3 Pipeline Stages with Moving Continuous Flow Line */}
      <div className="grid-equal-height" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr auto 1fr', gap: '1.25rem', alignItems: 'center' }}>
        {stages.map((stg, index) => {
          const isActive = index === activeStep;

          return (
            <React.Fragment key={index}>
              <motion.div
                className="kpi-card"
                animate={isActive && !shouldReduceMotion ? { scale: [1, 1.02, 1] } : { scale: 1 }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  borderColor: isActive ? stg.color : 'var(--border-paper)',
                  borderWidth: isActive ? '2px' : '1px',
                  boxShadow: isActive ? `0 8px 30px ${stg.color}33` : 'var(--shadow-sm)',
                  transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
                  backgroundColor: 'var(--bg-card)',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span className="kpi-trend-pill" style={{ backgroundColor: stg.bgColor, color: stg.color, fontWeight: 700 }}>
                      {stg.tier}
                    </span>
                    <div style={{ color: stg.color }}>{stg.icon}</div>
                  </div>
                  <h4 style={{ fontSize: '1.05rem', margin: '0 0 0.25rem 0' }}>{stg.role}</h4>
                  
                  {/* Status Badge with Continuous Pulse */}
                  <motion.div
                    animate={isActive && !shouldReduceMotion ? { opacity: [0.75, 1, 0.75] } : { opacity: 1 }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    style={{ fontSize: '0.85rem', fontWeight: 700, color: stg.color, marginBottom: '0.35rem' }}
                  >
                    {stg.status}
                  </motion.div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>{stg.detail}</p>
                </div>
              </motion.div>

              {index < 2 && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '50px', position: 'relative' }}>
                  {/* Flowing Connector SVG */}
                  <svg width="50" height="20" viewBox="0 0 50 20">
                    <line
                      x1="0"
                      y1="10"
                      x2="50"
                      y2="10"
                      stroke={index === activeStep ? 'var(--accent-rust)' : 'var(--border-subtle)'}
                      strokeWidth="2.5"
                      strokeDasharray="6 4"
                      style={{
                        animation: shouldReduceMotion ? 'none' : 'flowDash 1.2s linear infinite',
                      }}
                    />
                  </svg>

                  {/* Traveling Pulse Node */}
                  {index === activeStep && !shouldReduceMotion && (
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 20, opacity: [0, 1, 0] }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                      style={{
                        position: 'absolute',
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: 'var(--accent-rust)',
                        boxShadow: '0 0 10px var(--accent-rust)',
                      }}
                    />
                  )}

                  <ArrowRight style={{ width: 16, height: 16, color: index === activeStep ? 'var(--accent-rust)' : 'var(--text-muted)', marginTop: '4px' }} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes flowDash {
          from {
            stroke-dashoffset: 20;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
}
