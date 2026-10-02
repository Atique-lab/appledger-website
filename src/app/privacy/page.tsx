import React from 'react';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata = {
  title: 'Privacy Policy & Data Security - AppLedger',
  description:
    'Learn how AppLedger handles your personal data, contact inquiries, pre-booking reservations, local storage preferences, and commitment to strict data privacy.',
};

export default function PrivacyPage() {
  return (
    <>
      <section className="hero-sub">
        <div className="container">
          <ScrollReveal direction="scale">
            <span className="badge">Privacy & Governance</span>
          </ScrollReveal>
          <ScrollReveal direction="down">
            <h1 className="page-title">Privacy Policy & Data Security</h1>
          </ScrollReveal>
          <ScrollReveal direction="down" delay={0.1}>
            <p className="page-subtitle">
              Transparency, data minimisation, and strict operational privacy are built into every layer of AppLedger.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="section">
        <div className="container container-narrow">
          <ScrollReveal direction="fade-scale" delay={0.1}>
            <div className="card-box shadow-sm mb-4">
              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
                1. Our Core Privacy Commitment
              </h2>
              <p className="paragraph">
                AppLedger (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) respects your privacy. Our core desktop application and marketing website are designed with data isolation principles: we do not track your browsing activity across the web, sell visitor data, or utilize third-party advertising tracking scripts.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="fade-scale" delay={0.2}>
            <div className="card-box shadow-sm mb-4">
              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
                2. Information Collected via Forms & IP Address Logging
              </h2>
              <p className="paragraph">
                When you voluntarily reach out to us using our contact form or reserve early access via our pre-booking form, we collect:
              </p>
              <ul className="detail-bullets mb-4">
                <li><strong>Full Name:</strong> To address you in our communications.</li>
                <li><strong>Email Address:</strong> To send direct replies, reservation updates, and auto-reply confirmations.</li>
                <li><strong>Role, Organization Name & Type:</strong> To categorize your team&apos;s early access deployment profile.</li>
                <li><strong>Employee Count & Operational Reason:</strong> To prepare optimal onboarding guidance for your team.</li>
                <li><strong>Subject & Message Content:</strong> To investigate and resolve your support inquiry.</li>
                <li>
                  <strong>IP Address (`ip_address`):</strong> Automatically captured on form submissions strictly for spam prevention, rate limiting, and security abuse defense.
                </li>
              </ul>
              <p className="paragraph">
                We explicitly confirm that your IP address and personal details are <strong>never sold, rented, or shared with third-party advertisers or data brokers</strong>.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="fade-scale" delay={0.3}>
            <div className="card-box shadow-sm mb-4">
              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
                3. Database Architecture & Transactional Email Processing (Neon & Resend Stack)
              </h2>
              <p className="paragraph">
                Our web application infrastructure is deployed on <strong>Vercel</strong> utilizing a serverless <strong>Neon Postgres</strong> database for encrypted storage and <strong>Resend API</strong> for transactional email delivery:
              </p>
              <ul className="detail-bullets mb-4">
                <li>
                  <strong>Pre-booking Submissions:</strong> Stored in the <code>prebookings</code> Postgres table (`full_name`, `email`, `role`, `org_name`, `org_type`, `employee_count`, `reason`, `ip_address`, `created_at`).
                </li>
                <li>
                  <strong>Contact Inquiries:</strong> Stored in the <code>contact_messages</code> Postgres table (`full_name`, `email`, `subject`, `message`, `ip_address`, `created_at`).
                </li>
                <li>
                  <strong>Transactional Email Delivery:</strong> Notifications and confirmation auto-replies are securely processed via Resend API endpoints over HTTPS (TLS 1.3 encryption).
                </li>
              </ul>
              <p className="paragraph">
                Database access is secured using strict serverless connection tokens over SSL mode. Data is retained solely as long as necessary to process early access onboardings, maintain support history, or satisfy legal obligations.
              </p>
              <p className="paragraph" style={{ marginBottom: 0 }}>
                <strong>Your Right to Erasure:</strong> If you would like your submitted information completely purged from our database records, simply email us at{' '}
                <a href="mailto:support@appledger.in" style={{ color: 'var(--accent-forest)', textDecoration: 'underline' }}>
                  support@appledger.in
                </a>{' '}
                with your request, and we will process your deletion request within a reasonable timeframe.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="fade-scale" delay={0.4}>
            <div className="card-box shadow-sm mb-4">
              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
                4. Local Browser Preferences
              </h2>
              <p className="paragraph">
                We do not use advertising or cross-site tracking cookies. We utilize browser local storage technologies solely for UI state preferences:
              </p>
              <ul className="detail-bullets mb-4">
                <li><code>localStorage.getItem(&apos;ledger-theme&apos;)</code>: Remembers whether you selected Light or Dark Operations mode.</li>
                <li><code>localStorage.getItem(&apos;announcement-dismissed&apos;)</code>: Remembers if you dismissed the top release announcement bar.</li>
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="fade-scale" delay={0.5}>
            <div className="card-box shadow-sm mb-4">
              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
                5. Third-Party External Resources
              </h2>
              <p className="paragraph">
                Typography is optimized zero-CLS via Next.js <code>next/font/google</code> for <code>Fraunces</code> and <code>Inter</code>. No external analytics trackers (such as Google Analytics or Meta Pixel) are loaded on this website.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
