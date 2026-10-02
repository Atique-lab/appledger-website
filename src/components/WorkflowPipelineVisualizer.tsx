'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Play, RefreshCw, Layers } from 'lucide-react';

export interface PipelineStage {
  id: string;
  name: string;
  badgeColor: string;
  taskCount: number;
  tasks: Array<{ code: string; title: string; assignee: string }>;
}

export interface WorkflowTemplate {
  id: string;
  title: string;
  description: string;
  stages: PipelineStage[];
}

export const WORKFLOW_TEMPLATES: WorkflowTemplate[] = [
  {
    id: 'feature',
    title: 'Enterprise Feature Release Workflow',
    description: '4-stage strict gate flow with automated PostgreSQL RLS security policy validation and manager sign-off.',
    stages: [
      {
        id: 'backlog',
        name: '01 / Backlog & Triage',
        badgeColor: '#0284C7',
        taskCount: 5,
        tasks: [
          { code: 'TSK-5012', title: 'Stripe Webhook Payload Audit', assignee: 'Alex Chen' },
          { code: 'TSK-5015', title: 'Role Roster Schema Migration', assignee: 'Sarah Jenkins' },
        ],
      },
      {
        id: 'dev',
        name: '02 / In Development',
        badgeColor: '#7C3AED',
        taskCount: 8,
        tasks: [
          { code: 'TSK-4982', title: 'Multi-Tenant Auth Tokens', assignee: 'Marcus Vance' },
          { code: 'TSK-4990', title: 'Audit Trail Export Engine', assignee: 'Elena Rostova' },
        ],
      },
      {
        id: 'qa',
        name: '03 / QA & RLS Security Audit',
        badgeColor: 'var(--accent-rust)',
        taskCount: 3,
        tasks: [
          { code: 'TSK-4810', title: 'Guest Grant Isolation Test', assignee: 'Priya Sharma' },
        ],
      },
      {
        id: 'prod',
        name: '04 / Production Release',
        badgeColor: 'var(--accent-forest)',
        taskCount: 14,
        tasks: [
          { code: 'TSK-4700', title: 'v2.4 Core Workstation Deploy', assignee: 'Ops Squad' },
        ],
      },
    ],
  },
  {
    id: 'hotfix',
    title: 'Security Audit & Hotfix Pipeline',
    description: 'Fast-track emergency patch pipeline with priority queue rerouting and instant audit timestamp logging.',
    stages: [
      {
        id: 'triage',
        name: '01 / Critical Triage',
        badgeColor: 'var(--accent-rust)',
        taskCount: 2,
        tasks: [
          { code: 'FIX-901', title: 'CVE-2026-104 Patch', assignee: 'DevOps Lead' },
        ],
      },
      {
        id: 'patch',
        name: '02 / Patch Compilation',
        badgeColor: '#7C3AED',
        taskCount: 4,
        tasks: [
          { code: 'FIX-892', title: 'Token Leak Sanitize', assignee: 'Security Squad' },
        ],
      },
      {
        id: 'audit',
        name: '03 / Penetration Audit',
        badgeColor: '#0284C7',
        taskCount: 1,
        tasks: [
          { code: 'FIX-880', title: 'RLS Sandbox Probe', assignee: 'External Auditor' },
        ],
      },
      {
        id: 'deploy',
        name: '04 / Instant Hotfix Rollout',
        badgeColor: 'var(--accent-forest)',
        taskCount: 9,
        tasks: [
          { code: 'FIX-870', title: 'Zero-Downtime Patch', assignee: 'Release Manager' },
        ],
      },
    ],
  },
  {
    id: 'onboard',
    title: 'Client Deliverable Onboarding',
    description: 'Structured onboarding pipeline mapping external client milestone grants under strict RLS guest isolation.',
    stages: [
      {
        id: 'draft',
        name: '01 / SLA Contract Draft',
        badgeColor: '#334155',
        taskCount: 3,
        tasks: [
          { code: 'ONB-101', title: 'Indemnity Clause Verification', assignee: 'Legal Counsel' },
        ],
      },
      {
        id: 'grant',
        name: '02 / RLS Grant Provisioning',
        badgeColor: '#7C3AED',
        taskCount: 2,
        tasks: [
          { code: 'ONB-104', title: 'is_guest = true Profile Setup', assignee: 'Admin Team' },
        ],
      },
      {
        id: 'preview',
        name: '03 / Guest Sandbox Preview',
        badgeColor: '#0284C7',
        taskCount: 4,
        tasks: [
          { code: 'ONB-108', title: 'Milestone Redaction Check', assignee: 'Priya Sharma' },
        ],
      },
      {
        id: 'live',
        name: '04 / Client Portal Live',
        badgeColor: 'var(--accent-forest)',
        taskCount: 18,
        tasks: [
          { code: 'ONB-120', title: 'Enterprise Portal Active', assignee: 'Client Success' },
        ],
      },
    ],
  },
];

export default function WorkflowPipelineVisualizer() {
  const [activeTemplate, setActiveTemplate] = useState<WorkflowTemplate>(WORKFLOW_TEMPLATES[0]);
  const [activeStageIndex, setActiveStageIndex] = useState(0); // 0 to 3
  const [isDispatching, setIsDispatching] = useState(false);
  const [completedStages, setCompletedStages] = useState<number[]>([]);

  const handleDispatchTask = () => {
    if (isDispatching) return;
    setIsDispatching(true);
    setActiveStageIndex(0);
    setCompletedStages([]);

    // Stage 1 -> Stage 2 -> Stage 3 -> Stage 4
    setTimeout(() => {
      setActiveStageIndex(1);
      setCompletedStages([0]);
    }, 700);

    setTimeout(() => {
      setActiveStageIndex(2);
      setCompletedStages([0, 1]);
    }, 1400);

    setTimeout(() => {
      setActiveStageIndex(3);
      setCompletedStages([0, 1, 2]);
    }, 2100);

    setTimeout(() => {
      setCompletedStages([0, 1, 2, 3]);
      setIsDispatching(false);
    }, 2800);
  };

  return (
    <div className="card-box shadow-md" style={{ padding: '2.25rem', backgroundColor: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border-paper)', width: '100%' }}>
      {/* SECTION HEADER & TEMPLATE SELECTOR TABS */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <span className="badge badge-accent">01 / Workflow Engine</span>
        <h2 style={{ fontSize: '1.8rem', marginTop: '0.4rem', marginBottom: '0.5rem' }}>Workflow Template Pipeline Visualizer</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '640px', margin: '0 auto 1.5rem auto' }}>
          Configurable multi-stage gate pipelines with automated stage progression, PostgreSQL Row-Level Security checks, and live task card dispatching.
        </p>

        {/* 3 TEMPLATE TABS */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          {WORKFLOW_TEMPLATES.map((tmpl) => {
            const isActive = tmpl.id === activeTemplate.id;
            return (
              <button
                key={tmpl.id}
                type="button"
                onClick={() => {
                  if (!isDispatching) {
                    setActiveTemplate(tmpl);
                    setActiveStageIndex(0);
                    setCompletedStages([]);
                  }
                }}
                className={`role-filter-badge ${isActive ? 'active' : ''}`}
                style={{
                  padding: '0.55rem 1.15rem',
                  borderRadius: '9999px',
                  fontSize: '0.85rem',
                  fontWeight: isActive ? 700 : 500,
                  border: isActive ? '2px solid var(--accent-forest)' : '1px solid var(--border-paper)',
                  backgroundColor: isActive ? 'var(--accent-forest)' : 'var(--bg-card)',
                  color: isActive ? '#FFFFFF' : 'var(--text-secondary)',
                  cursor: isDispatching ? 'not-allowed' : 'pointer',
                  transition: 'all 0.25s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Layers style={{ width: 14, height: 14 }} /> {tmpl.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* DISPATCH ACTION CONTROL BAR */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--bg-paper)', padding: '1rem 1.25rem', borderRadius: '12px', border: '1px solid var(--border-paper)', marginBottom: '1.75rem' }}>
        <div>
          <strong style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>{activeTemplate.title}</strong>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{activeTemplate.description}</div>
        </div>

        <button
          type="button"
          onClick={handleDispatchTask}
          disabled={isDispatching}
          className="btn btn-primary"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '0.55rem 1.25rem',
            backgroundColor: 'var(--accent-forest)',
            borderColor: 'var(--accent-forest)',
            cursor: isDispatching ? 'not-allowed' : 'pointer',
          }}
        >
          {isDispatching ? (
            <>
              <RefreshCw style={{ width: 16, height: 16, animation: 'spin 1s linear infinite' }} /> Hopping Down Pipeline...
            </>
          ) : (
            <>
              <Play style={{ width: 16, height: 16 }} /> Dispatch Task Card Through Pipeline &rarr;
            </>
          )}
        </button>
      </div>

      {/* 4-STAGE KANBAN PIPELINE BOARD WITH SEQUENTIAL 4-BEAT LIGHT-UP WAVE & TASK-CARD TOKEN HOPPING */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', position: 'relative' }}>
        {activeTemplate.stages.map((stage, idx) => {
          const isCurrentActive = isDispatching && activeStageIndex === idx;
          const isCompleted = completedStages.includes(idx);

          return (
            <div
              key={stage.id}
              style={{
                backgroundColor: 'var(--bg-paper)',
                borderRadius: '12px',
                border: isCurrentActive ? `2px solid ${stage.badgeColor}` : '1px solid var(--border-paper)',
                padding: '1.25rem 1rem',
                position: 'relative',
                transition: 'all 0.3s ease',
              }}
            >
              {/* STAGE HEADER WITH BESPOKE SEQUENTIAL 4-BEAT LIGHT-UP PULSE AT IDLE */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1rem',
                  paddingBottom: '0.75rem',
                  borderBottom: '1px solid var(--border-paper)',
                }}
              >
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    backgroundColor: stage.badgeColor,
                    padding: '3px 8px',
                    borderRadius: '9999px',
                    // Sequential 4-beat light-up rhythm (idx 0: 0s, idx 1: 0.8s, idx 2: 1.6s, idx 3: 2.4s)
                    animation: `sequenceLightUpWave 3.2s ease-in-out infinite ${idx * 0.8}s`,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  {isCompleted && <CheckCircle2 style={{ width: 12, height: 12 }} />}
                  {stage.name}
                </span>

                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                  {stage.taskCount + (isCompleted ? 1 : 0)} Tasks
                </span>
              </div>

              {/* EXISTING STAGE TASKS */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {stage.tasks.map((task, tIdx) => (
                  <div
                    key={tIdx}
                    style={{
                      backgroundColor: 'var(--bg-card)',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      border: '1px solid var(--border-paper)',
                      fontSize: '0.78rem',
                    }}
                  >
                    <div style={{ fontWeight: 700, color: stage.badgeColor, marginBottom: '2px' }}>{task.code}</div>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>{task.title}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Assignee: {task.assignee}</div>
                  </div>
                ))}

                {/* ANIMATED TASK-CARD TOKEN (HOPS DOWN COLUMN-BY-COLUMN DURING DISPATCH) */}
                {isCurrentActive && (
                  <motion.div
                    initial={{ scale: 0.8, y: -10, opacity: 0 }}
                    animate={{ scale: 1.05, y: 0, opacity: 1 }}
                    transition={{ duration: 0.35, type: 'spring' }}
                    style={{
                      backgroundColor: stage.badgeColor,
                      color: '#FFFFFF',
                      padding: '0.85rem',
                      borderRadius: '8px',
                      boxShadow: `0 8px 20px ${stage.badgeColor}66`,
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      zIndex: 10,
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <span>TSK-5012</span>
                      <span style={{ fontSize: '0.7rem', backgroundColor: 'rgba(255,255,255,0.25)', padding: '2px 6px', borderRadius: '4px' }}>DISPATCHING</span>
                    </div>
                    <div>Payment Webhook Upgrade</div>
                    <div style={{ fontSize: '0.7rem', marginTop: '4px', opacity: 0.9 }}>PostgreSQL RLS Sealed &bull; Squad Alpha</div>
                  </motion.div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
