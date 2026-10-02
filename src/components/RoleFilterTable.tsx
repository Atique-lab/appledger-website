'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Lock, Eye, Database, Key } from 'lucide-react';

export interface RoleDetail {
  id: string;
  name: string;
  tier: string;
  badgeClass: string;
  color: string;
  bgColor: string;
  description: string;
  capabilities: string[];
  mockTitle: string;
  mockSubtitle: string;
  mockUi: React.ReactNode;
}

export const ROLES: RoleDetail[] = [
  {
    id: 'ceo',
    name: 'CEO / Founder',
    tier: 'Tier 1',
    badgeClass: 'badge-ceo',
    color: '#1E293B',
    bgColor: '#F1F5F9',
    description: 'Complete organization-wide visibility and final executive sign-off authority across all departments.',
    capabilities: ['Global Executive 30d Trend', 'Departmental Velocity Audits', 'Executive Resolution Override', 'Global Audit Log Export'],
    mockTitle: 'CEO Executive Workstation Overview',
    mockSubtitle: '30-Day Completion Trend & Organization Workload Distribution',
    mockUi: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div style={{ padding: '0.85rem 1rem', background: 'var(--bg-paper)', borderRadius: '10px', borderLeft: '4px solid var(--accent-forest)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '0.875rem', fontWeight: 700 }}>Quarterly Enterprise Audit &amp; Compliance Sign-off</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Organization Velocity: 94.2% On-Time SLA</div>
          </div>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-forest)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <CheckCircle2 style={{ width: 14, height: 14 }} /> Executive Signed
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
          <div style={{ background: 'var(--bg-paper)', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-paper)', textAlign: 'center' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-forest)' }}>184</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Tasks Resolved 30d</div>
          </div>
          <div style={{ background: 'var(--bg-paper)', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-paper)', textAlign: 'center' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-rust)' }}>3</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Pending Escalations</div>
          </div>
          <div style={{ background: 'var(--bg-paper)', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-paper)', textAlign: 'center' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>100%</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Audit Compliance</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'admin',
    name: 'Admin / IT Manager',
    tier: 'Tier 2',
    badgeClass: 'badge-admin',
    color: '#334155',
    bgColor: '#F8FAFC',
    description: 'System-wide configuration, 5-tier role provisioning, and PostgreSQL RLS security policy management.',
    capabilities: ['Role Roster Provisioning', 'PostgreSQL RLS Policy Controls', 'Session & Anti-Spam Security', 'System Health Diagnostics'],
    mockTitle: 'Admin Security & Provisioning Console',
    mockSubtitle: '5-Tier Authorization Roster & Session Security Management',
    mockUi: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div style={{ padding: '0.85rem 1rem', background: 'var(--bg-paper)', borderRadius: '10px', borderLeft: '4px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '0.875rem', fontWeight: 700 }}>PostgreSQL RLS Security Policy #POL-8902</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Active Grants: auth.uid() = task_grant.user_id</div>
          </div>
          <span className="badge badge-admin" style={{ fontSize: '0.7rem', margin: 0 }}>Policy Enforced</span>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{ backgroundColor: 'var(--bg-paper)', padding: '4px 10px', borderRadius: '6px', border: '1px solid var(--border-paper)', fontSize: '0.75rem', fontWeight: 600 }}>CSRF Token Validation: Active</span>
          <span style={{ backgroundColor: 'var(--bg-paper)', padding: '4px 10px', borderRadius: '6px', border: '1px solid var(--border-paper)', fontSize: '0.75rem', fontWeight: 600 }}>Roster Sync: 25 Operators</span>
          <span style={{ backgroundColor: 'var(--bg-paper)', padding: '4px 10px', borderRadius: '6px', border: '1px solid var(--border-paper)', fontSize: '0.75rem', fontWeight: 600 }}>Guest Sandbox: Enforced</span>
        </div>
      </div>
    ),
  },
  {
    id: 'manager',
    name: 'Department Manager',
    tier: 'Tier 3',
    badgeClass: 'badge-manager',
    color: '#3730A3',
    bgColor: '#EEF2FF',
    description: 'Oversees multi-squad task pipelines, balances operator workload, and overrides due date extensions.',
    capabilities: ['Multi-Squad Pipeline Control', 'Due Date Extension Approval', 'Operator Workload Balance', 'Departmental KPI Reports'],
    mockTitle: 'Departmental Operations Manager Workstation',
    mockSubtitle: 'Engineering & Product Squad Task Allocation',
    mockUi: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div style={{ padding: '0.85rem 1rem', background: 'var(--bg-paper)', borderRadius: '10px', borderLeft: '4px solid #3730A3', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '0.875rem', fontWeight: 700 }}>Sprint 14 Feature Release Pipeline</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>3 Squads • 42 Open Deliverables</div>
          </div>
          <span className="badge badge-manager" style={{ fontSize: '0.7rem', margin: 0 }}>On Schedule</span>
        </div>

        <div style={{ background: 'var(--bg-paper)', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--border-paper)', fontSize: '0.8rem' }}>
          <strong>Due Date Extension Request:</strong> TSK-1049 requested +3 days by Marcus Vance • <span style={{ color: 'var(--accent-forest)', fontWeight: 700 }}>Manager Approved</span>
        </div>
      </div>
    ),
  },
  {
    id: 'lead',
    name: 'Team Lead',
    tier: 'Tier 4',
    badgeClass: 'badge-lead',
    color: 'var(--accent-rust)',
    bgColor: 'var(--accent-rust-light)',
    description: 'Receives automated "Request to Action" escalation reroutes and resolves technical blockers for squad operators.',
    capabilities: ['Escalated Requests Inbox', 'Single-Click Blocker Resolution', 'Stage Gate Approvals', 'Operator Assignment Routing'],
    mockTitle: 'Team Lead Requests & Escalation Console',
    mockSubtitle: 'Incoming Priority Escalation Reroutes from Squad Operators',
    mockUi: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div style={{ padding: '0.85rem 1rem', background: 'var(--accent-rust-light)', borderRadius: '10px', borderLeft: '4px solid var(--accent-rust)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--accent-rust)' }}>Escalated: Staging API Secret Expiration</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>From: Alex Chen (Member) • Rerouted 4m ago</div>
          </div>
          <button type="button" className="btn btn-primary" style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}>
            Resolve Blocker &rarr;
          </button>
        </div>

        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', background: 'var(--bg-paper)', padding: '0.65rem 0.85rem', borderRadius: '6px' }}>
          <strong>Automated Route Logic:</strong> Operator triggered blocker signal → Rerouted to Lead Marcus Vance (Tier 4).
        </div>
      </div>
    ),
  },
  {
    id: 'member',
    name: 'Member / Operator',
    tier: 'Tier 5',
    badgeClass: 'badge-member',
    color: 'var(--accent-forest)',
    bgColor: 'var(--accent-forest-light)',
    description: 'Executes assigned tasks, updates stage statuses, and triggers single-click "Request to Action" escalations when blocked.',
    capabilities: ['Assigned Task Execution', 'Single-Click Blocker Escalation', 'Stage Progression Updates', 'Comment & Attachment Uploads'],
    mockTitle: 'Operator Execution Workstation',
    mockSubtitle: 'My Assigned Task Roster & Action Triggers',
    mockUi: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div style={{ padding: '0.85rem 1rem', background: 'var(--bg-paper)', borderRadius: '10px', borderLeft: '4px solid var(--accent-forest)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '0.875rem', fontWeight: 700 }}>Implement RLS Sandbox Access Policies</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Due: Today at 5:00 PM • Stage: QA Review</div>
          </div>
          <button type="button" className="btn btn-secondary" style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem', borderColor: 'var(--accent-rust)', color: 'var(--accent-rust)' }}>
            Request to Action
          </button>
        </div>

        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          ✓ Single-click escalation button auto-routes blockers to designated supervisor without manual chat chasing.
        </div>
      </div>
    ),
  },
  {
    id: 'guest',
    name: 'Guest Sandbox Client',
    tier: 'is_guest = true',
    badgeClass: 'badge-guest',
    color: '#92400E',
    bgColor: '#FEF3C7',
    description: 'External client or auditor with isolated read-only visibility into explicitly granted task milestones.',
    capabilities: ['Read-Only Milestone Visibility', 'Zero Internal Comment Access', 'Redacted Salary/Cost Data', 'PostgreSQL RLS Protected'],
    mockTitle: 'External Guest Client Sandbox View',
    mockSubtitle: 'PostgreSQL Row-Level Security Enforced (auth.uid() Restricted)',
    mockUi: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div style={{ padding: '0.85rem 1rem', background: '#FEF3C7', borderRadius: '10px', borderLeft: '4px solid #92400E', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#92400E' }}>Deliverable Milestone #4: UI Design Audit</div>
            <div style={{ fontSize: '0.75rem', color: '#B45309' }}>Guest Grant Scope: Read-Only Milestone Status</div>
          </div>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#92400E', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <Eye style={{ width: 14, height: 14 }} /> Guest Sandbox
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
          <div style={{ background: 'var(--bg-paper)', padding: '0.6rem 0.8rem', borderRadius: '6px', border: '1px solid var(--border-paper)', fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Lock style={{ width: 12, height: 12, color: 'var(--accent-rust)' }} /> Internal Budget: Redacted
          </div>
          <div style={{ background: 'var(--bg-paper)', padding: '0.6rem 0.8rem', borderRadius: '6px', border: '1px solid var(--border-paper)', fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Lock style={{ width: 12, height: 12, color: 'var(--accent-rust)' }} /> Internal Comments: Redacted
          </div>
        </div>
      </div>
    ),
  },
];

export default function RoleFilterTable() {
  const [activeRole, setActiveRole] = useState<RoleDetail>(ROLES[0]);
  const [keyPulseKey, setKeyPulseKey] = useState(0);

  const handleSelectRole = (role: RoleDetail) => {
    setActiveRole(role);
    setKeyPulseKey((prev) => prev + 1);
  };

  return (
    <div style={{ width: '100%' }}>
      {/* 6 ROLE-SWITCHER TABS */}
      <div
        className="role-filter-bar mb-4"
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.65rem',
          flexWrap: 'wrap',
          marginBottom: '2rem',
        }}
      >
        {ROLES.map((role) => {
          const isActive = role.id === activeRole.id;
          return (
            <button
              key={role.id}
              type="button"
              onClick={() => handleSelectRole(role)}
              className={`role-filter-badge ${isActive ? 'active' : ''}`}
              style={{
                padding: '0.55rem 1.15rem',
                borderRadius: '9999px',
                fontSize: '0.875rem',
                fontWeight: isActive ? 700 : 500,
                border: isActive ? `2px solid ${role.color}` : '1px solid var(--border-paper)',
                backgroundColor: isActive ? role.color : 'var(--bg-card)',
                color: isActive ? '#FFFFFF' : 'var(--text-secondary)',
                boxShadow: isActive ? `0 4px 14px ${role.color}44` : 'none',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
            >
              {role.name} ({role.tier})
            </button>
          );
        })}
      </div>

      {/* LIVE WORKSTATION PREVIEW PANEL (NO MOVING LINE) */}
      <div
        className="card-box shadow-md"
        style={{
          position: 'relative',
          padding: '2.25rem 2rem 2rem 2rem',
          backgroundColor: 'var(--bg-card)',
          borderRadius: '16px',
          border: `2px solid ${activeRole.color}`,
          marginBottom: '2rem',
          overflow: 'hidden',
          transition: 'border-color 0.35s ease',
        }}
      >
        {/* Live Workstation Console Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-paper)', paddingBottom: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {/* TRIGGERED KEY UNLOCK ANIMATION ON TAB CLICK */}
              <motion.div
                key={keyPulseKey}
                initial={{ rotate: -25, scale: 0.8 }}
                animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.25, 1] }}
                transition={{ duration: 0.45 }}
                style={{ display: 'inline-flex', color: activeRole.color }}
              >
                <Key style={{ width: 20, height: 20 }} />
              </motion.div>

              <span className={`badge ${activeRole.badgeClass}`} style={{ fontSize: '0.75rem', padding: '3px 8px', margin: 0 }}>
                {activeRole.tier}
              </span>
              <h3 style={{ fontSize: '1.25rem', margin: 0, fontWeight: 700 }}>{activeRole.mockTitle}</h3>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0.25rem 0 0 0' }}>{activeRole.mockSubtitle}</p>
          </div>

          {/* CONTINUOUS AMBIENT BREATHING PULSE ON THE RLS BADGE ITSELF */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.8rem',
              color: 'var(--accent-forest)',
              fontWeight: 600,
              backgroundColor: 'var(--accent-forest-light)',
              padding: '0.45rem 0.85rem',
              borderRadius: '8px',
              border: '1px solid rgba(45, 90, 39, 0.2)',
              animation: 'badgeBreathingPulse 2.4s ease-in-out infinite',
            }}
          >
            <Database style={{ width: 14, height: 14 }} />
            <span>PostgreSQL RLS auth.uid() Active</span>
          </div>
        </div>

        {/* Dynamic Role Workstation UI Preview */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeRole.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            style={{ marginBottom: '1.5rem' }}
          >
            {activeRole.mockUi}
          </motion.div>
        </AnimatePresence>

        {/* Active Role Capabilities Tags */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', paddingTop: '1rem', borderTop: '1px solid var(--border-paper)' }}>
          <strong style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginRight: '0.5rem' }}>Authorized Rights:</strong>
          {activeRole.capabilities.map((cap, idx) => (
            <span
              key={idx}
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                padding: '4px 10px',
                borderRadius: '6px',
                backgroundColor: 'var(--bg-paper)',
                border: '1px solid var(--border-paper)',
                color: 'var(--text-primary)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <CheckCircle2 style={{ width: 12, height: 12, color: activeRole.color }} /> {cap}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
