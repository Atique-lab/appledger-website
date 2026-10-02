'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Clock, AlertTriangle, Play, RefreshCw, Zap } from 'lucide-react';

export interface EscalationScenario {
  id: string;
  title: string;
  category: string;
  taskCode: string;
  description: string;
  operator: string;
  supervisor: string;
  supervisorRole: string;
  supervisorTier: string;
  color: string;
  badgeClass: string;
  resolutionTime: string;
  impactLevel: string;
}

export const ESCALATION_SCENARIOS: EscalationScenario[] = [
  {
    id: 'tech',
    title: 'Staging API Secret Key Expiration',
    category: 'Tech Release Blocker',
    taskCode: 'TSK-4092',
    description: 'Blocked waiting for DevOps Lead sign-off following scheduled key rotation across automated CI/CD staging pipelines.',
    operator: 'Alex Chen (Senior Software Engineer)',
    supervisor: 'Marcus Vance',
    supervisorRole: 'Tech Lead',
    supervisorTier: 'Tier 4',
    color: 'var(--accent-rust)',
    badgeClass: 'badge-lead',
    resolutionTime: '< 15 mins SLA',
    impactLevel: 'High Priority',
  },
  {
    id: 'vendor',
    title: 'Third-Party Payment Gateway Audit Hold',
    category: 'Vendor Compliance Hold',
    taskCode: 'TSK-8104',
    description: 'Payment gateway API token suspended pending mandatory annual PCI-DSS compliance verification audit.',
    operator: 'Priya Sharma (Operations Manager)',
    supervisor: 'Sarah Jenkins',
    supervisorRole: 'Admin & IT Manager',
    supervisorTier: 'Tier 2',
    color: '#334155',
    badgeClass: 'badge-admin',
    resolutionTime: '< 30 mins SLA',
    impactLevel: 'Critical Security',
  },
  {
    id: 'legal',
    title: 'Enterprise SLA Contract Indemnity Review',
    category: 'Legal Sign-off Escalation',
    taskCode: 'TSK-9921',
    description: 'Unstandardized liability clause detected in Fortune 500 enterprise renewal agreement requiring executive sign-off.',
    operator: 'David Miller (Legal Counsel)',
    supervisor: 'Elena Rostova',
    supervisorRole: 'CEO & Founder',
    supervisorTier: 'Tier 1',
    color: '#1E293B',
    badgeClass: 'badge-ceo',
    resolutionTime: '< 1 hour SLA',
    impactLevel: 'Executive Tier',
  },
];

export default function EscalationEngineSimulator() {
  const [activeScenario, setActiveScenario] = useState<EscalationScenario>(ESCALATION_SCENARIOS[0]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [packetProgress, setPacketProgress] = useState(0);
  const [logs, setLogs] = useState<Array<{ id: number; text: string; time: string }>>([]);

  const addLog = (text: string) => {
    const time = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }) + '.' + Math.floor(Math.random() * 900 + 100);
    setLogs((prev) => [{ id: Date.now() + Math.random(), text, time }, ...prev.slice(0, 4)]);
  };

  useEffect(() => {
    setLogs([
      { id: 1, text: `System Idle • Endpoint heartbeat active for ${activeScenario.taskCode}`, time: '12:00:00.000' },
    ]);
  }, [activeScenario]);

  const handleTriggerEscalation = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setPacketProgress(0);

    addLog(`[Signal Triggered] ${activeScenario.operator} dispatched Request to Action for ${activeScenario.taskCode}`);

    setTimeout(() => {
      setPacketProgress(35);
      addLog(`[RLS Policy Eval] PostgreSQL auth.uid() evaluated. Rerouting to ${activeScenario.supervisorRole} (${activeScenario.supervisorTier})`);
    }, 700);

    setTimeout(() => {
      setPacketProgress(70);
      addLog(`[Supervisor Rerouted] Alert delivered to ${activeScenario.supervisor}'s Requests Inbox with resolution triggers`);
    }, 1400);

    setTimeout(() => {
      setPacketProgress(100);
      addLog(`[Audit Logged] Escalation timestamp locked in immutable ledger. SLA counter active (${activeScenario.resolutionTime})`);
      setIsAnimating(false);
    }, 2100);
  };

  return (
    <div className="card-box shadow-md" style={{ padding: '2.25rem', backgroundColor: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border-paper)', width: '100%' }}>
      {/* SECTION HEADER & SCENARIO TABS */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <span className="badge badge-accent">03 / Bottleneck Resolution</span>
        <h2 style={{ fontSize: '1.8rem', marginTop: '0.4rem', marginBottom: '0.5rem' }}>&quot;Request to Action&quot; Escalation Engine</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '640px', margin: '0 auto 1.5rem auto' }}>
          When operators hit external blockers, a single click dispatches an auto-routed escalation packet directly to their supervisor with immutable audit logs.
        </p>

        {/* 3 SCENARIO SELECTOR TABS */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          {ESCALATION_SCENARIOS.map((sc) => {
            const isActive = sc.id === activeScenario.id;
            return (
              <button
                key={sc.id}
                type="button"
                onClick={() => {
                  if (!isAnimating) {
                    setActiveScenario(sc);
                    setPacketProgress(0);
                  }
                }}
                className={`role-filter-badge ${isActive ? 'active' : ''}`}
                style={{
                  padding: '0.55rem 1.15rem',
                  borderRadius: '9999px',
                  fontSize: '0.85rem',
                  fontWeight: isActive ? 700 : 500,
                  border: isActive ? `2px solid ${sc.color}` : '1px solid var(--border-paper)',
                  backgroundColor: isActive ? sc.color : 'var(--bg-card)',
                  color: isActive ? '#FFFFFF' : 'var(--text-secondary)',
                  cursor: isAnimating ? 'not-allowed' : 'pointer',
                  transition: 'all 0.25s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Zap style={{ width: 14, height: 14 }} /> {sc.category}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2-COLUMN SIMULATOR GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '2rem', alignItems: 'start' }}>
        
        {/* LEFT COLUMN: INTERACTIVE VISUAL ROUTING DIAGRAM */}
        <div style={{ backgroundColor: 'var(--bg-paper)', borderRadius: '14px', border: '1px solid var(--border-paper)', padding: '1.75rem', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <span className="badge badge-accent" style={{ margin: 0, fontSize: '0.75rem' }}>
              Scenario: {activeScenario.taskCode}
            </span>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent-forest)' }}>
              SLA Target: {activeScenario.resolutionTime}
            </span>
          </div>

          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.4rem' }}>{activeScenario.title}</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.75rem', lineHeight: 1.5 }}>
            &quot;{activeScenario.description}&quot;
          </p>

          {/* VISUAL SUPERVISOR ROUTING TRACK WITH ENDPOINT HEARTBEAT PULSES (NO MOVING LINE) */}
          <div style={{ position: 'relative', padding: '1.5rem 1rem', backgroundColor: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border-paper)', marginBottom: '1.5rem' }}>
            
            {/* STATIC DASHED ROUTING TRACK (NO LINE MOTION) */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '18%',
                right: '18%',
                height: '2px',
                borderTop: '2px dashed var(--border-subtle)',
                transform: 'translateY(-50%)',
                zIndex: 1,
              }}
            />

            {/* DISPATCHED PRIORITY PACKET (ANIMATES ONLY ON TRIGGER) */}
            {isAnimating && (
              <motion.div
                initial={{ left: '18%' }}
                animate={{ left: `${18 + (packetProgress * 0.64)}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  backgroundColor: activeScenario.color,
                  boxShadow: `0 0 16px ${activeScenario.color}, 0 0 24px #38BDF8`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFF',
                  zIndex: 10,
                }}
              >
                <Zap style={{ width: 12, height: 12 }} />
              </motion.div>
            )}

            {/* OPERATOR & SUPERVISOR NODES WITH ALTERNATING ENDPOINT HEARTBEAT PULSES AT IDLE */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 2 }}>
              
              {/* OPERATOR ENDPOINT (HEARTBEAT 1) */}
              <div style={{ textAlign: 'center', width: '130px' }}>
                <div
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: '50%',
                    backgroundColor: 'var(--accent-rust-light)',
                    color: 'var(--accent-rust)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 0.5rem auto',
                    border: '2px solid var(--accent-rust)',
                    animation: 'endpointHeartbeat1 2.2s ease-in-out infinite',
                  }}
                >
                  <AlertTriangle style={{ width: 20, height: 20 }} />
                </div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700 }}>Operator</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{activeScenario.operator.split(' ')[0]}</div>
              </div>

              {/* SUPERVISOR ENDPOINT (HEARTBEAT 2) */}
              <div style={{ textAlign: 'center', width: '150px' }}>
                <div
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: '50%',
                    backgroundColor: 'var(--accent-forest-light)',
                    color: 'var(--accent-forest)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 0.5rem auto',
                    border: '2px solid var(--accent-forest)',
                    animation: 'endpointHeartbeat2 2.2s ease-in-out infinite',
                  }}
                >
                  <ShieldCheck style={{ width: 20, height: 20 }} />
                </div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700 }}>{activeScenario.supervisor}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--accent-forest)', fontWeight: 600 }}>{activeScenario.supervisorRole} ({activeScenario.supervisorTier})</div>
              </div>

            </div>
          </div>

          {/* TRIGGER BUTTON */}
          <button
            type="button"
            onClick={handleTriggerEscalation}
            disabled={isAnimating}
            className="btn btn-primary btn-lg"
            style={{
              width: '100%',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              backgroundColor: activeScenario.color,
              borderColor: activeScenario.color,
              cursor: isAnimating ? 'not-allowed' : 'pointer',
            }}
          >
            {isAnimating ? (
              <>
                <RefreshCw style={{ width: 18, height: 18, animation: 'spin 1s linear infinite' }} /> Routing Priority Packet...
              </>
            ) : (
              <>
                <Play style={{ width: 18, height: 18 }} /> Trigger Escalation Signal for {activeScenario.taskCode} &rarr;
              </>
            )}
          </button>
        </div>

        {/* RIGHT COLUMN: IMMUTABLE AUDIT TIMESTAMP LOGGING */}
        <div style={{ backgroundColor: 'var(--bg-paper)', borderRadius: '14px', border: '1px solid var(--border-paper)', padding: '1.75rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--border-paper)', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
            <Clock style={{ width: 18, height: 18, color: 'var(--accent-rust)' }} />
            <strong style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>Immutable Audit Timestamp Trail</strong>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flexGrow: 1, minHeight: '220px' }}>
            <AnimatePresence>
              {logs.map((log) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    fontSize: '0.8rem',
                    fontFamily: 'monospace',
                    padding: '0.75rem 0.85rem',
                    borderRadius: '8px',
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border-paper)',
                    color: 'var(--text-primary)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px',
                  }}
                >
                  <span style={{ fontSize: '0.7rem', color: 'var(--accent-rust)', fontWeight: 700 }}>
                    [{log.time}]
                  </span>
                  <span>{log.text}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-paper)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <span>Audit Trail Mode: Immutable</span>
            <span style={{ color: 'var(--accent-forest)', fontWeight: 600 }}>PostgreSQL RLS Sealed</span>
          </div>
        </div>

      </div>
    </div>
  );
}
