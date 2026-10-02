import React from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import WorkflowPipelineVisualizer from '@/components/WorkflowPipelineVisualizer';
import RoleFilterTable from '@/components/RoleFilterTable';
import EscalationEngineSimulator from '@/components/EscalationEngineSimulator';
import RlsGuestAccessConsole from '@/components/RlsGuestAccessConsole';

export const metadata = {
  title: 'Comprehensive Features & Role Matrix - AppLedger',
  description:
    "Explore AppLedger's 5-tier role hierarchy, 11 per-team workflow templates, automated 'Request to Action' escalation routing, and RLS-protected guest access.",
};

export default function FeaturesPage() {
  return (
    <>
      <section className="hero-sub">
        <div className="container">
          <ScrollReveal direction="scale">
            <span className="badge">Platform Specifications</span>
          </ScrollReveal>
          <ScrollReveal direction="down">
            <h1 className="page-title">Operational Architecture &amp; Governance Matrix</h1>
          </ScrollReveal>
          <ScrollReveal direction="down" delay={0.1}>
            <p className="page-subtitle">
              Detailed specification of AppLedger&apos;s 5-tier role authorizations, 11 named workflow templates, &quot;Request to Action&quot; escalation engine, and RLS guest access security model.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="feature-detail-stack" style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            {/* Feature 1: Workflow Template Pipeline Visualizer */}
            <ScrollReveal direction="scale" delay={0.1}>
              <div className="feature-detail-card" id="templates">
                <WorkflowPipelineVisualizer />
              </div>
            </ScrollReveal>

            {/* Feature 2: 5-Tier Role-Based Access Control */}
            <ScrollReveal direction="scale" delay={0.1}>
              <div className="feature-detail-card" id="roles">
                <div className="section-header text-center mb-4">
                  <span className="badge">02 / Permission Architecture</span>
                  <h2 className="detail-title">5-Tier Granular Role Hierarchy</h2>
                  <p className="paragraph text-center" style={{ maxWidth: '640px', margin: '0 auto 1.5rem auto' }}>
                    Strict authorization rules prevent unauthorized task deletion, unapproved date extensions, or scope creep. Filter permissions live by clicking any role below:
                  </p>
                </div>
                <RoleFilterTable />
              </div>
            </ScrollReveal>

            {/* Feature 3: "Request to Action" Escalation Engine Simulator */}
            <ScrollReveal direction="scale" delay={0.1}>
              <div className="feature-detail-card" id="escalation">
                <EscalationEngineSimulator />
              </div>
            </ScrollReveal>

            {/* Feature 4: RLS Guest Sandbox Security Console */}
            <ScrollReveal direction="scale" delay={0.1}>
              <div className="feature-detail-card" id="guest-access">
                <RlsGuestAccessConsole />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
