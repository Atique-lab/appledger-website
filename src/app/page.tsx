import React from 'react';
import TrustWheel from '@/components/TrustWheel';
import RoiCalculator from '@/components/RoiCalculator';
import PrebookingForm from '@/components/PrebookingForm';
import OperationalParticles from '@/components/OperationalParticles';
import EscalationPipelineVisualizer from '@/components/EscalationPipelineVisualizer';
import MacbookMockup from '@/components/MacbookMockup';
import ScrollReveal from '@/components/ScrollReveal';
import { Columns, GitPullRequest, Eye, Activity } from 'lucide-react';

export const metadata = {
  title: 'AppLedger - Task Tracking, Rebuilt for Real Accountability',
  description:
    'AppLedger replaces unmonitored chat threads with 5-tier role authorization, single-click Request to Action escalations, 11 per-team workflow templates, and RLS guest access.',
};

export default function HomePage() {
  return (
    <>
      {/* Hero Section with Macbook Mockup & Ambient Motion Particles */}
      <section className="hero" style={{ position: 'relative', overflow: 'hidden', padding: '5.5rem 0 4.5rem 0' }}>
        <OperationalParticles />
        
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: '3rem', alignItems: 'center' }}>
            
            {/* Left Hero Content */}
            <div className="hero-content">
              <ScrollReveal direction="scale">
                <span className="badge badge-accent" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '0.45rem 1rem' }}>
                  <Activity style={{ width: 14, height: 14 }} /> Enterprise Operational Governance
                </span>
              </ScrollReveal>

              <ScrollReveal direction="down" delay={0.1}>
                <h1 className="hero-title" style={{ fontSize: '2.5rem', lineHeight: 1.2, marginTop: '0.75rem', marginBottom: '1rem', fontWeight: 800 }}>
                  Task tracking, rebuilt for real accountability and real security.
                </h1>
              </ScrollReveal>

              <ScrollReveal direction="down" delay={0.2}>
                <p className="hero-subtitle" style={{ fontSize: '1.05rem', lineHeight: 1.55, color: 'var(--text-secondary)', marginBottom: '1.75rem', maxWidth: '540px' }}>
                  AppLedger replaces unmonitored chat threads with a desktop workspace enforcing 5-tier role authorization and automated &quot;Request to Action&quot; escalations.
                </p>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.3}>
                <div className="hero-cta-group" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <a href="#prebook" className="btn btn-primary btn-lg" style={{ padding: '0.85rem 1.85rem', fontSize: '1rem' }}>
                    Reserve Team Batch &rarr;
                  </a>
                  <a href="/features" className="btn btn-secondary btn-lg" style={{ padding: '0.85rem 1.85rem', fontSize: '1rem' }}>
                    View 5-Tier Permission Matrix
                  </a>
                </div>
              </ScrollReveal>
            </div>

            {/* Curvy Macbook Mockup Displaying Real Dashboard */}
            <div className="hero-graphic">
              <ScrollReveal direction="left" delay={0.2}>
                <MacbookMockup />
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Wheel Section (Upgraded with Dead Center Logo Mark & Line Overlap Fix) */}
      <section className="section section-subtle section-trust" id="governance">
        <div className="container">
          <div className="section-header text-center">
            <ScrollReveal direction="scale">
              <span className="badge">AppLedger Governance Architecture</span>
            </ScrollReveal>
            <ScrollReveal direction="down" delay={0.1}>
              <h2>Engineered for accountable &amp; transparent governance.</h2>
            </ScrollReveal>
            <ScrollReveal direction="down" delay={0.2}>
              <p className="paragraph text-center" style={{ maxWidth: '680px', margin: '0 auto' }}>
                Every task update, due date extension, and escalation trigger links to an immutable audit record across 6 core operational governance principles.
              </p>
            </ScrollReveal>
          </div>
          <TrustWheel />
        </div>
      </section>

      {/* Interactive SLA Escalation Flow Section */}
      <section className="section section-forest-tint" id="escalation-flow">
        <div className="container">
          <div className="section-header text-center mb-4">
            <ScrollReveal direction="scale">
              <span className="badge">Interactive Escalation Flow</span>
            </ScrollReveal>
            <ScrollReveal direction="down" delay={0.1}>
              <h2>Single-click &quot;Request to Action&quot; Signal Routing</h2>
            </ScrollReveal>
          </div>
          <EscalationPipelineVisualizer />
        </div>
      </section>

      {/* ITEM 2 FIX: EQUAL HEIGHT PRODUCT CAPABILITIES CARDS */}
      <section className="section" id="capabilities">
        <div className="container">
          <div className="section-header text-center mb-5">
            <ScrollReveal direction="scale">
              <span className="badge badge-accent">Core Product Engine</span>
            </ScrollReveal>
            <ScrollReveal direction="down" delay={0.1}>
              <h2>Engineered for total operational control &amp; zero-knowledge privacy</h2>
            </ScrollReveal>
            <ScrollReveal direction="down" delay={0.2}>
              <p className="paragraph text-center" style={{ maxWidth: '640px', margin: '0 auto', color: 'var(--text-muted)' }}>
                Three core architectural foundations that eliminate operational friction and task stagnation across enterprise teams.
              </p>
            </ScrollReveal>
          </div>

          <div className="feature-grid grid-equal-height" style={{ gap: '2rem', gridTemplateColumns: 'repeat(3, 1fr)', alignItems: 'stretch' }}>
            <ScrollReveal direction="up" delay={0.1}>
              <div
                className="card-box shadow-md"
                style={{
                  padding: '2rem',
                  backgroundColor: 'var(--bg-card)',
                  borderRadius: '16px',
                  border: '1px solid var(--border-paper)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  borderTop: '4px solid var(--accent-forest)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: '12px',
                        backgroundColor: 'var(--accent-forest-light)',
                        color: 'var(--accent-forest)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Columns style={{ width: 24, height: 24 }} />
                    </div>
                    <span className="kpi-trend-pill">11 Pre-built Pipelines</span>
                  </div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.6rem', fontWeight: 700 }}>11 Per-Team Workflow Templates</h3>
                  <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                    Eliminate setup friction. Select pre-configured stage pipelines for Tech Release, Sales Lead Funnel, Legal Audit, and Field Service.
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', fontSize: '0.75rem', color: 'var(--accent-forest)', fontWeight: 600 }}>
                  <span style={{ backgroundColor: 'var(--bg-paper)', padding: '3px 8px', borderRadius: '4px', border: '1px solid var(--border-paper)' }}>Software Dev</span>
                  <span style={{ backgroundColor: 'var(--bg-paper)', padding: '3px 8px', borderRadius: '4px', border: '1px solid var(--border-paper)' }}>Legal Audit</span>
                  <span style={{ backgroundColor: 'var(--bg-paper)', padding: '3px 8px', borderRadius: '4px', border: '1px solid var(--border-paper)' }}>Sales Funnel</span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <div
                className="card-box shadow-md"
                style={{
                  padding: '2rem',
                  backgroundColor: 'var(--bg-card)',
                  borderRadius: '16px',
                  border: '1px solid var(--border-paper)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  borderTop: '4px solid var(--accent-rust)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: '12px',
                        backgroundColor: 'var(--accent-rust-light)',
                        color: 'var(--accent-rust)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <GitPullRequest style={{ width: 24, height: 24 }} />
                    </div>
                    <span className="kpi-trend-pill rust">Automated Routing</span>
                  </div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.6rem', fontWeight: 700 }}>&quot;Request to Action&quot; Escalation</h3>
                  <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                    When tasks block on external dependencies, operators trigger an explicit escalation signal auto-routed directly to designated team leads.
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', fontSize: '0.75rem', color: 'var(--accent-rust)', fontWeight: 600 }}>
                  <span style={{ backgroundColor: 'var(--bg-paper)', padding: '3px 8px', borderRadius: '4px', border: '1px solid var(--border-paper)' }}>Single-Click Signal</span>
                  <span style={{ backgroundColor: 'var(--bg-paper)', padding: '3px 8px', borderRadius: '4px', border: '1px solid var(--border-paper)' }}>Auto-Routed</span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3}>
              <div
                className="card-box shadow-md"
                style={{
                  padding: '2rem',
                  backgroundColor: 'var(--bg-card)',
                  borderRadius: '16px',
                  border: '1px solid var(--border-paper)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  borderTop: '4px solid #319795',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: '12px',
                        backgroundColor: 'rgba(49, 151, 149, 0.1)',
                        color: '#319795',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Eye style={{ width: 24, height: 24 }} />
                    </div>
                    <span className="kpi-trend-pill" style={{ backgroundColor: 'rgba(49, 151, 149, 0.1)', color: '#319795' }}>PostgreSQL RLS</span>
                  </div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.6rem', fontWeight: 700 }}>Isolated Guest Client Access</h3>
                  <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                    Grant clients read-only task visibility via the <code>is_guest</code> flag + task-level grant mappings, protected by PostgreSQL Row-Level Security.
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', fontSize: '0.75rem', color: '#319795', fontWeight: 600 }}>
                  <span style={{ backgroundColor: 'var(--bg-paper)', padding: '3px 8px', borderRadius: '4px', border: '1px solid var(--border-paper)' }}>is_guest Sandbox</span>
                  <span style={{ backgroundColor: 'var(--bg-paper)', padding: '3px 8px', borderRadius: '4px', border: '1px solid var(--border-paper)' }}>Zero Data Bleed</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ITEM 3 FIX: FULL CONTAINER WIDTH CALCULATOR SECTION MATCHING PRODUCT ENGINE */}
      <section className="section section-subtle" id="roi">
        <div className="container">
          <div className="section-header text-center">
            <ScrollReveal direction="scale">
              <span className="badge">Capacity Impact Calculator</span>
            </ScrollReveal>
            <ScrollReveal direction="down" delay={0.1}>
              <h2>Calculate operational capacity unlocked by AppLedger</h2>
            </ScrollReveal>
          </div>
          <RoiCalculator />
        </div>
      </section>

      {/* ITEM 4 FIX: 2-COLUMN CONVERSATIONAL RESERVATION SECTION */}
      <section className="section section-rust-tint">
        <div className="container">
          <PrebookingForm />
        </div>
      </section>
    </>
  );
}
