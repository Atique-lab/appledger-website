'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedCounter from './AnimatedCounter';
import { CheckSquare, Square, MessageSquare, TrendingUp, Clock, IndianRupee } from 'lucide-react';

const DEPARTMENT_WORKFLOWS = [
  { id: 'dev', name: 'Software Development', hoursPerMember: 2.2, insight: 'Tech squads eliminate staging key & build blocker delays with SLA escalation signals.' },
  { id: 'sales', name: 'Sales & Lead Funnel', hoursPerMember: 1.9, insight: 'Sales leads move through structured intake-to-proposal pipelines without dropoff.' },
  { id: 'ops', name: 'Operations & Maintenance', hoursPerMember: 2.5, insight: 'Field dispatches and equipment audits get logged with immutable timestamp trails.' },
  { id: 'hr', name: 'HR & Employee Onboarding', hoursPerMember: 1.6, insight: 'Standardizes 30-day onboarding checklists for new hires without admin friction.' },
  { id: 'legal', name: 'Legal Audit & Compliance', hoursPerMember: 2.0, insight: 'Enforces strict document sign-off rules protected by PostgreSQL Row-Level Security.' },
  { id: 'support', name: 'Service & Ticket Management', hoursPerMember: 2.1, insight: 'Customer tickets escalate directly to tier 4 leads when resolution SLA exceeds 24h.' },
  { id: 'marketing', name: 'Content & Editorial', hoursPerMember: 1.5, insight: 'Editorial briefs move smoothly from draft to copy edit and publication.' },
  { id: 'design', name: 'Product & UX Design', hoursPerMember: 1.7, insight: 'Design sprint assets get signed off by external clients via RLS guest accounts.' },
  { id: 'it', name: 'IT Operations & Infrastructure', hoursPerMember: 2.4, insight: 'System maintenance windows & secret rotations are audited with role permissions.' },
  { id: 'finance', name: 'Finance & Tax Audit', hoursPerMember: 1.8, insight: 'Quarterly financial filings are isolated from unauthorized internal staff access.' },
  { id: 'pm', name: 'Project & Exec Oversight', hoursPerMember: 2.3, insight: 'Founders inspect top-down 30-day completion trends without disturbing squad leads.' },
];

export default function RoiCalculator() {
  const [teamSize, setTeamSize] = useState(25);
  const [selectedDepts, setSelectedDepts] = useState<string[]>(['dev', 'ops', 'legal']);

  const toggleDept = (id: string) => {
    setSelectedDepts((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  // Compute capacity impact dynamically based on selected department weights
  const selectedDeptObjs = DEPARTMENT_WORKFLOWS.filter((d) => selectedDepts.includes(d.id));
  const avgHoursPerMember =
    selectedDeptObjs.length > 0
      ? selectedDeptObjs.reduce((acc, d) => acc + d.hoursPerMember, 0) / selectedDeptObjs.length
      : 1.8;

  const hoursSavedPerMonth = Math.round(teamSize * avgHoursPerMember * 10);
  const annualCostINR = Math.round(hoursSavedPerMonth * 12 * 650);
  const fasterRes = Math.min(92, Math.round(48 + teamSize * 0.35 + selectedDepts.length * 2));

  // Determine latest conversational guide message
  const activeInsight =
    selectedDeptObjs.length > 0
      ? selectedDeptObjs[selectedDeptObjs.length - 1].insight
      : 'Select one or more team workflows to see specific departmental capacity insights.';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className="roi-card card-box shadow-md"
      style={{ width: '100%', padding: '2.5rem', backgroundColor: 'var(--bg-card)' }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '2.5rem', alignItems: 'start' }}>
        
        {/* LEFT COLUMN: FORM INPUTS */}
        <div>
          {/* Input 1: Team Size Slider */}
          <div className="roi-slider-group" style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <label htmlFor="teamSizeSlider" style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                1. Operational Team Size
              </label>
              <span className="badge badge-accent" style={{ fontSize: '0.95rem', padding: '0.4rem 0.85rem' }}>
                {teamSize} Members
              </span>
            </div>

            <input
              type="range"
              id="teamSizeSlider"
              min="2"
              max="100"
              value={teamSize}
              onChange={(e) => setTeamSize(Number(e.target.value))}
              className="roi-slider"
              style={{ width: '100%', height: '8px', borderRadius: '4px', cursor: 'pointer', accentColor: 'var(--accent-rust)' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
              <span>2 Members</span>
              <span>50</span>
              <span>100 Enterprise Members</span>
            </div>
          </div>

          {/* Input 2: 11 Departmental Workflow Checkboxes */}
          <div>
            <label style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)', display: 'block', marginBottom: '0.75rem' }}>
              2. Select Active Team Workflows ({selectedDepts.length} Selected)
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', maxHeight: '240px', overflowY: 'auto', paddingRight: '0.5rem' }}>
              {DEPARTMENT_WORKFLOWS.map((dept) => {
                const isSelected = selectedDepts.includes(dept.id);
                return (
                  <button
                    key={dept.id}
                    type="button"
                    onClick={() => toggleDept(dept.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '0.6rem 0.75rem',
                      borderRadius: '8px',
                      border: isSelected ? '1.5px solid var(--accent-rust)' : '1px solid var(--border-paper)',
                      backgroundColor: isSelected ? 'var(--accent-rust-light)' : 'var(--bg-paper)',
                      color: isSelected ? 'var(--accent-rust)' : 'var(--text-secondary)',
                      fontSize: '0.825rem',
                      fontWeight: isSelected ? 600 : 400,
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {isSelected ? (
                      <CheckSquare style={{ width: 16, height: 16, color: 'var(--accent-rust)', flexShrink: 0 }} />
                    ) : (
                      <Square style={{ width: 16, height: 16, color: 'var(--border-subtle)', flexShrink: 0 }} />
                    )}
                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{dept.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: CONVERSATIONAL GUIDE SIDE PANEL */}
        <div style={{ backgroundColor: 'var(--bg-paper)', borderRadius: '14px', border: '1px solid var(--border-paper)', padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--border-paper)', paddingBottom: '0.75rem' }}>
            <MessageSquare style={{ width: 18, height: 18, color: 'var(--accent-rust)' }} />
            <strong style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>Operational Capacity Guide</strong>
          </div>

          {/* Conversational Insight Reaction */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeInsight}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              style={{
                fontSize: '0.9rem',
                lineHeight: 1.55,
                color: 'var(--text-secondary)',
                backgroundColor: 'var(--bg-card)',
                padding: '1rem',
                borderRadius: '10px',
                borderLeft: '4px solid var(--accent-rust)',
              }}
            >
              &quot;{activeInsight}&quot;
            </motion.div>
          </AnimatePresence>

          {/* Real-time Dynamic Metrics in INR (₹) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.85rem 1rem', background: 'var(--bg-card)', borderRadius: '10px', border: '1px solid var(--border-paper)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock style={{ width: 18, height: 18, color: 'var(--accent-forest)' }} />
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Monthly Team Hours Saved</span>
              </div>
              <strong style={{ fontSize: '1.3rem', color: 'var(--accent-forest)' }}>
                <AnimatedCounter value={hoursSavedPerMonth} /> hrs
              </strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.85rem 1rem', background: 'var(--accent-rust-light)', borderRadius: '10px', border: '1px solid rgba(192, 92, 59, 0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <IndianRupee style={{ width: 18, height: 18, color: 'var(--accent-rust)' }} />
                <span style={{ fontSize: '0.85rem', color: 'var(--accent-rust)', fontWeight: 600 }}>Annual Capacity Unlocked</span>
              </div>
              <strong style={{ fontSize: '1.3rem', color: 'var(--accent-rust)' }}>
                ₹{(annualCostINR / 100000).toFixed(2)} Lakhs
              </strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.85rem 1rem', background: 'var(--bg-card)', borderRadius: '10px', border: '1px solid var(--border-paper)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <TrendingUp style={{ width: 18, height: 18, color: 'var(--accent-forest)' }} />
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>SLA Escalation Speed</span>
              </div>
              <strong style={{ fontSize: '1.3rem', color: 'var(--text-primary)' }}>
                <AnimatedCounter value={fasterRes} suffix="%" /> Faster
              </strong>
            </div>
          </div>

          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>
            Calculated for ₹{annualCostINR.toLocaleString('en-IN')} annual team capacity benchmark
          </div>
        </div>
      </div>
    </motion.div>
  );
}
