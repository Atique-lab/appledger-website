import React from 'react';
import Image from 'next/image';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata = {
  title: 'About AppLedger & Founder Story - Atique Shaikh',
  description:
    "Learn about AppLedger's operational mission, 5-tier organizational governance, and the story of founder Atique Shaikh.",
};

export default function AboutPage() {
  return (
    <div className="about-page-wrapper">
      {/* PART 1 — ABOUT LEDGER */}
      <section className="hero-sub">
        <div className="container">
          <ScrollReveal direction="scale">
            <span className="badge">Platform Purpose</span>
          </ScrollReveal>
          <ScrollReveal direction="down">
            <h1 className="page-title">Built to eliminate delegation opacity and task stagnation</h1>
          </ScrollReveal>
          <ScrollReveal direction="down" delay={0.1}>
            <p className="page-subtitle">
              AppLedger provides operational teams with structured 5-tier role authorizations, automated &quot;Request to Action&quot; escalations, and 11 pre-configured workflow templates.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-equal-height" style={{ gap: '2rem', gridTemplateColumns: '1fr 1fr' }}>
            <ScrollReveal direction="left" delay={0.15}>
              <div className="card-box shadow-md highlight-left-forest" style={{ padding: '2rem', height: '100%' }}>
                <span className="badge">Operational Focus</span>
                <h2 className="section-title" style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>
                  A focused task &amp; governance desktop engine
                </h2>
                <p className="paragraph">
                  Unmonitored chat threads and loose spreadsheets lead to unassigned task bottlenecks, missed SLA deadlines, and zero audit trails.
                </p>
                <p className="paragraph">
                  AppLedger replaces administrative chaos with 5 distinct role tiers (CEO, Admin, Manager, Lead, Member), 11 departmental workflow templates, and PostgreSQL RLS policies that enforce zero-knowledge guest client isolation.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.25}>
              <div className="card-box shadow-md highlight-left-rust" style={{ padding: '2rem', height: '100%' }}>
                <span className="badge badge-accent">Target Roster</span>
                <h3 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
                  Built for specific operational roles
                </h3>
                <ul className="detail-bullets">
                  <li><strong>Founders &amp; CEOs:</strong> Require top-down executive progress visibility without disturbing team leads.</li>
                  <li><strong>Operations Admins &amp; HR:</strong> Configure escalation thresholds, assign team rosters, and inspect bottlenecks.</li>
                  <li><strong>Department Managers &amp; Leads:</strong> Resolve &quot;Request to Action&quot; escalations and manage Kanban sprint backlogs.</li>
                  <li><strong>External Clients &amp; Auditors:</strong> Access task-scoped deliverables via the <code>is_guest</code> RLS sandbox.</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* PART 2 — FOUNDER STORY */}
      <section className="section founder-hero-section">
        <div className="container">
          <div className="founder-hero-asymmetric">
            <ScrollReveal direction="left" delay={0.1}>
              <div className="founder-hero-image-wrap">
                <div className="duotone-overlay"></div>
                <Image
                  src="/images/founder/atique-hero.jpeg"
                  alt="Atique Shaikh - Founder of AppLedger"
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </div>
            </ScrollReveal>

            <div className="founder-hero-content">
              <ScrollReveal direction="scale" delay={0.0}>
                <span className="small-caps-label">Founder & Lead Developer</span>
              </ScrollReveal>

              <ScrollReveal direction="down" delay={0.15}>
                <h2 className="founder-hero-headline">
                  Built by someone still figuring it out.
                </h2>
              </ScrollReveal>

              <div className="founder-story-text">
                <ScrollReveal direction="down" delay={0.2}>
                  <p className="paragraph story-para">
                    I&apos;m Atique. I grew up in Bihar, in a place where &quot;become an engineer or become a doctor&quot; was more or less the only career conversation anyone had with you. I picked a third option nobody really talked about &mdash; I taught myself how to build things on a computer.
                  </p>
                </ScrollReveal>
                <ScrollReveal direction="down" delay={0.25}>
                  <p className="paragraph story-para">
                    Right now I&apos;m working through my BCA with IGNOU, which gives me the flexibility to actually spend my hours where they count: writing code, breaking it, and writing it again. Web and app development first, then pulling AI, data structures, and algorithms into the mix &mdash; not because a syllabus told me to, but because Ledger kept demanding I get better at all of it.
                  </p>
                </ScrollReveal>
                <ScrollReveal direction="down" delay={0.3}>
                  <p className="paragraph story-para">
                    I moved to Delhi chasing exactly this &mdash; a shot at building something real instead of just studying the idea of it. Ledger is the first proof that the bet is working.
                  </p>
                </ScrollReveal>
              </div>

              <ScrollReveal direction="down" delay={0.35}>
                <div className="founder-meta-row">
                  <div className="founder-pills">
                    <span className="pill-tag">BCA &bull; IGNOU</span>
                    <span className="pill-tag pill-accent">Bihar &rarr; Delhi</span>
                  </div>

                  <a
                    href="https://www.linkedin.com/in/atique-shaikh-b47251382"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="linkedin-link-btn"
                    aria-label="Atique Shaikh on LinkedIn"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                    </svg>
                    <span>LinkedIn</span>
                  </a>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Rizwan Shaikh Inspiration */}
      <section className="section inspiration-section">
        <div className="container">
          <div className="inspiration-overlap-wrap">
            <ScrollReveal direction="left" delay={0.1}>
              <div className="inspiration-photo-col">
                <div className="photo-frame-offset">
                  <Image
                    src="/images/founder/rizwan-shaikh.png"
                    alt="Rizwan Shaikh - Inspiration & Guide"
                    width={360}
                    height={360}
                    className="inspiration-img"
                  />
                </div>
              </div>
            </ScrollReveal>

            <div className="inspiration-content-col">
              <ScrollReveal direction="scale">
                <span className="small-caps-label">Inspiration & Guide</span>
              </ScrollReveal>

              <ScrollReveal direction="right" delay={0.2}>
                <div className="dark-quote-card">
                  <blockquote className="pull-quote">
                    &quot;I owe a real part of who I am &mdash; as a builder and as a person &mdash; to Rizwan Shaikh. He gave me guidance on life and education exactly when I needed it, no strings attached.&quot;
                  </blockquote>
                  <cite className="quote-author">&mdash; Atique, on his guide & mentor</cite>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="down" delay={0.3}>
                <div className="mentor-bio-text">
                  <p className="paragraph">
                    Rizwan Shaikh is a technologist, social innovator, and entrepreneur with over a decade of experience building scalable digital solutions across edtech, fintech, public health, and social impact. As a co-creator at iPixel, he bridges the gap between technology and societal transformation. He is currently pursuing an MSc in Social Innovation and Entrepreneurship at the London School of Economics and Political Science (LSE).
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="down" delay={0.35}>
                <a
                  href="https://www.linkedin.com/in/rizwan3/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-sm linkedin-btn-brand"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                  <span>Connect with Rizwan Shaikh on LinkedIn &rarr;</span>
                </a>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Md Bellal Support Tribute */}
      <section className="section section-highlight support-section">
        <div className="container">
          <ScrollReveal direction="scale" delay={0.15}>
            <div className="support-card-calm">
              <div className="support-avatar-wrap">
                <Image
                  src="/images/founder/md-bellal.jpg"
                  alt="Md Bellal"
                  width={110}
                  height={110}
                  className="support-avatar-img"
                />
              </div>

              <div className="support-content">
                <span className="badge badge-accent">Testing Lead</span>
                <h3 className="support-name">Md Bellal</h3>

                <blockquote className="tribute-text">
                  &quot;Md Bellal has been there for every step of my tech journey &mdash; not mentorship in the formal sense, more like having an elder brother who happens to know how to debug your code at 1 a.m. Whatever I&apos;ve built carries a piece of what he taught me.&quot;
                </blockquote>

                <a
                  href="https://www.linkedin.com/in/mohdbellal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="linkedin-simple-link"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                  <span>LinkedIn Profile &rarr;</span>
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
