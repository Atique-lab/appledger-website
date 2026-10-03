import React from 'react';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import ContactForm from '@/components/ContactForm';
import FaqAccordion from '@/components/FaqAccordion';

export const metadata = {
  title: 'Contact Support & FAQ - AppLedger',
  description:
    'Reach out to the AppLedger support team or read our detailed FAQ regarding team setup, guest client access, 5-tier roles, and software updates.',
};

const CONTACT_FAQS = [
  {
    id: 'faq-1',
    question: 'What operating systems does AppLedger support?',
    answer: 'AppLedger is designed primarily as a fast, native-feeling desktop application for 64-bit Windows 10 and Windows 11.',
  },
  {
    id: 'faq-2',
    question: 'Where is task data stored?',
    answer: 'AppLedger utilizes PostgreSQL database infrastructure with strict Row Level Security (RLS), combined with client-side JSON export/import backup options for complete data privacy and security.',
  },
  {
    id: 'faq-3',
    question: 'Can external clients view task progress safely?',
    answer: 'Yes. AppLedger provides task-scoped Guest accounts with read-only permissions. External clients can view project progress, milestone completion, and status updates without granting them edit privileges or exposing internal company boards (enforced by Row Level Security).',
  },
  {
    id: 'faq-4',
    question: 'How will app updates work at launch?',
    answer: 'When AppLedger launches, the desktop app will include a background auto-update engine. When a new release is published, the app silently downloads the update in the background and prompts you to restart when ready — no manual installer downloads required.',
  },
  {
    id: 'faq-5',
    question: 'Is Ledger cloud-based or on-premise ready?',
    answer: 'AppLedger combines native desktop performance with secure PostgreSQL cloud synchronization, protected by 5-tier role governance and multi-tenant organization isolation.',
  },
  {
    id: 'faq-6',
    question: 'How does 5-tier role governance work?',
    answer: 'Ledger enforces granular authorization across 5 tiers: CEO, Admin, Manager, Lead, Member, and Guest, ensuring team members only access designated project boundaries.',
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="hero-sub">
        <div className="container">
          <ScrollReveal direction="scale">
            <span className="badge">Support & Inquiry</span>
          </ScrollReveal>
          <ScrollReveal direction="down">
            <h1 className="page-title">We&apos;re here to help you scale</h1>
          </ScrollReveal>
          <ScrollReveal direction="down" delay={0.1}>
            <p className="page-subtitle">
              Have questions about AppLedger&apos;s task management, role governance, or enterprise deployment? Reach out to our team.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-grid grid-equal-height" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem', alignItems: 'stretch' }}>
            <ScrollReveal direction="left" delay={0.1}>
              <ContactForm />
            </ScrollReveal>

            <div className="contact-info-sidebar">
              <ScrollReveal direction="right" delay={0.15}>
                <div className="info-card faq-accordion-card">
                  <h3 className="faq-card-title">Frequently Asked Questions</h3>
                  <FaqAccordion items={CONTACT_FAQS} />
                </div>
              </ScrollReveal>

              <ScrollReveal direction="right" delay={0.25}>
                <div className="info-card">
                  <h3>Direct Email</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Prefer sending a direct email?</p>
                  <a href="mailto:support@appledger.in" className="info-link" style={{ fontWeight: 600 }}>
                    support@appledger.in
                  </a>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="right" delay={0.35}>
                <div className="info-card">
                  <h3>Support Hours</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Monday – Friday: 9:00 AM – 6:00 PM IST</p>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Response time: Usually within 24 hours.</p>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="right" delay={0.45}>
                <div className="info-card highlight-card">
                  <h3>Reserve Early Access</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                    Join the priority waitlist to get early deployment access when AppLedger launches.
                  </p>
                  <Link href="/#prebook" className="btn btn-outline">
                    Reserve Early Access &rarr;
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
