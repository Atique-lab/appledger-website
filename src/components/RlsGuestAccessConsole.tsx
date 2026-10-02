'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Eye, Lock, UserCheck, CheckCircle2 } from 'lucide-react';

export default function RlsGuestAccessConsole() {
  const [isGuest, setIsGuest] = useState(false);

  const handleToggle = (guestMode: boolean) => {
    if (guestMode === isGuest) return;
    setIsGuest(guestMode);
  };

  return (
    <div className="card-box shadow-md" style={{ padding: '2.25rem', backgroundColor: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border-paper)', width: '100%' }}>
      {/* SECTION HEADER & TOGGLE BAR */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <span className="badge badge-accent">04 / Data Isolation</span>
        <h2 style={{ fontSize: '1.8rem', marginTop: '0.4rem', marginBottom: '0.5rem' }}>Row-Level Security Guest Access Console</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '640px', margin: '0 auto 1.5rem auto' }}>
          Grant external clients and auditors read-only milestone visibility. PostgreSQL Row-Level Security policies evaluate <code>is_guest</code> flags at the database layer to prevent zero-knowledge data bleed.
        </p>

        {/* MEMBER vs GUEST LIVE TOGGLE BUTTONS */}
        <div style={{ display: 'inline-flex', background: 'var(--bg-paper)', padding: '6px', borderRadius: '9999px', border: '1px solid var(--border-paper)' }}>
          <button
            type="button"
            onClick={() => handleToggle(false)}
            className="role-filter-badge"
            style={{
              padding: '0.6rem 1.4rem',
              borderRadius: '9999px',
              fontSize: '0.9rem',
              fontWeight: !isGuest ? 700 : 500,
              backgroundColor: !isGuest ? 'var(--accent-forest)' : 'transparent',
              color: !isGuest ? '#FFFFFF' : 'var(--text-secondary)',
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.3s ease',
            }}
          >
            <UserCheck style={{ width: 16, height: 16 }} /> Internal Member View (is_guest = false)
          </button>

          <button
            type="button"
            onClick={() => handleToggle(true)}
            className="role-filter-badge"
            style={{
              padding: '0.6rem 1.4rem',
              borderRadius: '9999px',
              fontSize: '0.9rem',
              fontWeight: isGuest ? 700 : 500,
              backgroundColor: isGuest ? '#92400E' : 'transparent',
              color: isGuest ? '#FFFFFF' : 'var(--text-secondary)',
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.3s ease',
            }}
          >
            <Eye style={{ width: 16, height: 16 }} /> External Guest Sandbox (is_guest = true)
          </button>
        </div>
      </div>

      {/* WORKSTATION CARD PREVIEW WITH STAGGERED CASCADING LOCK REVEAL (NO SCAN WIPE) */}
      <div
        className="card-box shadow-md mb-5"
        style={{
          position: 'relative',
          padding: '2rem',
          backgroundColor: 'var(--bg-card)',
          borderRadius: '16px',
          border: isGuest ? '2px solid #92400E' : '2px solid var(--accent-forest)',
          marginBottom: '2.5rem',
          overflow: 'hidden',
          transition: 'border-color 0.35s ease',
        }}
      >
        {/* CONTINUOUS SOFT SECURITY PULSE SHIELD BADGE */}
        <div style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px', zIndex: 5 }}>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: '50%',
              backgroundColor: isGuest ? '#FEF3C7' : 'var(--accent-forest-light)',
              color: isGuest ? '#92400E' : 'var(--accent-forest)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animation: 'rlsShieldPulse 2.5s ease-in-out infinite',
            }}
          >
            <ShieldCheck style={{ width: 20, height: 20 }} />
          </div>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: isGuest ? '#92400E' : 'var(--accent-forest)' }}>
            {isGuest ? 'PostgreSQL RLS Sandbox Enforced' : 'Internal Full Scope Authorized'}
          </span>
        </div>

        <div style={{ marginBottom: '1.25rem' }}>
          <span className={isGuest ? 'badge badge-guest' : 'badge badge-member'} style={{ fontSize: '0.75rem', padding: '3px 8px', margin: 0 }}>
            {isGuest ? 'Guest Grant Sandbox' : 'Internal Squad Scope'}
          </span>
          <h3 style={{ fontSize: '1.3rem', marginTop: '0.4rem', fontWeight: 700 }}>
            Deliverable Milestone #4: Enterprise Payment Integration
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Assigned Squad: Engineering &bull; Target Completion: October 28, 2026
          </p>
        </div>

        {/* WORKSTATION FIELDS DISPLAY WITH STAGGERED CASCADING LOCK REVEAL */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.5rem' }}>
          
          {/* FIELD 1: MILESTONE STATUS (VISIBLE IN BOTH MODES) */}
          <div style={{ background: 'var(--bg-paper)', padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-paper)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
              MILESTONE STATUS
            </div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--accent-forest)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 style={{ width: 16, height: 16 }} /> QA Passed &bull; Ready for Release
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              {isGuest ? 'Read-Only Grant: Visible' : 'Full Edit & Approval Rights'}
            </div>
          </div>

          {/* FIELD 2: HOURLY RATE / BUDGET (STAGGER 1: 0ms delay) */}
          <div style={{ background: 'var(--bg-paper)', padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-paper)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
              INTERNAL SQUAD BUDGET &amp; HOURLY COST
            </div>
            <div style={{ filter: isGuest ? 'blur(4px)' : 'none', transition: 'filter 0.3s ease', fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              $140.00 / hr &bull; Total Allocated: $18,400.00
            </div>

            <AnimatePresence>
              {isGuest && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.3, delay: 0.0 }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(254, 243, 199, 0.92)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: '#92400E',
                  }}
                >
                  <Lock style={{ width: 16, height: 16, animation: 'lockIconDrop 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)' }} /> REDACTED (PostgreSQL RLS POL-409)
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* FIELD 3: INTERNAL SQUAD COMMENTS (STAGGER 2: 100ms delay) */}
          <div style={{ background: 'var(--bg-paper)', padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-paper)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
              INTERNAL SQUAD DISCUSSION LOGS
            </div>
            <div style={{ filter: isGuest ? 'blur(4px)' : 'none', transition: 'filter 0.3s ease', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              &quot;Waiting for Senior Architect code review on Stripe webhook payload verification logic.&quot;
            </div>

            <AnimatePresence>
              {isGuest && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(254, 243, 199, 0.92)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: '#92400E',
                  }}
                >
                  <Lock style={{ width: 16, height: 16, animation: 'lockIconDrop 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)' }} /> REDACTED (Zero-Knowledge Scope)
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* FIELD 4: EMPLOYEE WORKLOAD PERFORMANCE (STAGGER 3: 200ms delay) */}
          <div style={{ background: 'var(--bg-paper)', padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-paper)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
              OPERATOR PERFORMANCE METRICS
            </div>
            <div style={{ filter: isGuest ? 'blur(4px)' : 'none', transition: 'filter 0.3s ease', fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 700 }}>
              Operator Velocity: 96% SLA &bull; Open Tasks: 4
            </div>

            <AnimatePresence>
              {isGuest && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(254, 243, 199, 0.92)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: '#92400E',
                  }}
                >
                  <Lock style={{ width: 16, height: 16, animation: 'lockIconDrop 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)' }} /> REDACTED (Internal Privacy)
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* EXPLICIT SIDE-BY-SIDE FIELD COMPARISON TABLE */}
      <div style={{ backgroundColor: 'var(--bg-paper)', borderRadius: '14px', border: '1px solid var(--border-paper)', padding: '1.75rem' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem', textAlign: 'center' }}>
          Explicit Scope Comparison: Internal Member View vs Guest Sandbox View
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center', marginBottom: '1.5rem' }}>
          Guest access is governed by the <code>is_guest</code> profile flag + explicit task-grant mappings in PostgreSQL Row-Level Security, not a separate role tier.
        </p>

        <div style={{ overflowX: 'auto' }}>
          <table className="custom-table" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th style={{ width: '30%' }}>Workstation Data Field</th>
                <th style={{ width: '35%', color: 'var(--accent-forest)' }}>Internal Member View (is_guest = false)</th>
                <th style={{ width: '35%', color: '#92400E' }}>Guest Sandbox View (is_guest = true)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Deliverable Milestone Status</strong></td>
                <td><span style={{ color: 'var(--accent-forest)', fontWeight: 600 }}>Full Edit &amp; Stage Update Access</span></td>
                <td><span style={{ color: 'var(--accent-forest)', fontWeight: 600 }}>✓ Visible (Read-Only Milestone Status)</span></td>
              </tr>
              <tr>
                <td><strong>Internal Squad Budget / Hourly Cost</strong></td>
                <td><span style={{ color: 'var(--accent-forest)', fontWeight: 600 }}>Visible ($140/hr)</span></td>
                <td><span style={{ color: 'var(--accent-rust)', fontWeight: 700 }}>🔒 Redacted ([PROTECTED BY RLS])</span></td>
              </tr>
              <tr>
                <td><strong>Internal Squad Discussion Logs</strong></td>
                <td><span style={{ color: 'var(--accent-forest)', fontWeight: 600 }}>Full Comment &amp; Upload Access</span></td>
                <td><span style={{ color: 'var(--accent-rust)', fontWeight: 700 }}>🔒 Redacted ([ZERO-KNOWLEDGE])</span></td>
              </tr>
              <tr>
                <td><strong>Employee Workload Metrics</strong></td>
                <td><span style={{ color: 'var(--accent-forest)', fontWeight: 600 }}>Visible (96% Velocity)</span></td>
                <td><span style={{ color: 'var(--accent-rust)', fontWeight: 700 }}>🔒 Redacted ([SCOPE RESTRICTED])</span></td>
              </tr>
              <tr>
                <td><strong>Escalation Blocker Controls</strong></td>
                <td><span style={{ color: 'var(--accent-forest)', fontWeight: 600 }}>Single-Click Blocker Dispatched</span></td>
                <td><span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Disabled (Read-Only Visitor Scope)</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
