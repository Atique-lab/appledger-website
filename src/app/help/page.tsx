'use client';

import React, { useState } from 'react';
import ScrollReveal from '@/components/ScrollReveal';

export default function HelpPage() {
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState('all');

  const articles = [
    {
      id: 'article-1',
      cat: 'database',
      badge: 'Data Security & Sync',
      title: 'Data Privacy, Cloud Sync & Backups',
      snippet:
        'Learn how AppLedger secures your task data with PostgreSQL RLS security and native IPC JSON backup and restore capabilities.',
      bodyHeading: 'Data Security & Backups:',
      bodyText:
        'AppLedger provides secure cloud synchronization powered by PostgreSQL Row Level Security (RLS). You can easily export or import your workspace tasks via Settings → Data Export / Backup in AppLedger Desktop.',
      keywords: 'database config cloud sync json backup privacy security postgres',
    },
    {
      id: 'article-2',
      cat: 'roles',
      badge: 'Role Governance',
      title: 'User Invitation & 5-Tier Role Governance',
      snippet:
        'Learn how to assign CEO, Admin, Manager, Lead, Member, and Guest roles to guarantee strict access boundaries across projects.',
      bodyHeading: 'Role Assignment:',
      bodyText:
        'Admins can invite team members under Team Settings → Members and select the appropriate role tier from the dropdown menu.',
      keywords: 'roles governance permissions admin manager lead member guest',
    },
    {
      id: 'article-3',
      cat: 'escalations',
      badge: 'Escalation & SLA',
      title: 'Escalation Trigger Rules & SLA Setup',
      snippet:
        'How to configure automatic escalation alerts when a task stays blocked past a designated threshold or SLA limit.',
      bodyHeading: 'Triggering Escalations:',
      bodyText:
        'Click Escalate Task on any task detail modal to submit a priority signal directly to the assigned Team Lead.',
      keywords: 'escalation alert bottleneck urgent signal sla leads',
    },
  ];

  const filteredArticles = articles.filter((art) => {
    const matchesCat = activeCat === 'all' || art.cat === activeCat;
    const searchLower = search.toLowerCase();
    const matchesSearch =
      search === '' ||
      art.title.toLowerCase().includes(searchLower) ||
      art.snippet.toLowerCase().includes(searchLower) ||
      art.keywords.toLowerCase().includes(searchLower);

    return matchesCat && matchesSearch;
  });

  return (
    <>
      <section className="hero-sub">
        <div className="container text-center">
          <ScrollReveal direction="scale">
            <span className="badge">User Documentation</span>
          </ScrollReveal>
          <ScrollReveal direction="down">
            <h1 className="page-title">Help Center & Guides</h1>
          </ScrollReveal>
          <ScrollReveal direction="down" delay={0.1}>
            <p className="page-subtitle">
              Learn about AppLedger Desktop architecture, data security, 5-tier role access, and automated team escalations.
            </p>
          </ScrollReveal>

          {/* Search Box */}
          <ScrollReveal direction="fade-scale" delay={0.2}>
            <div style={{ maxWidth: '580px', margin: '2rem auto 0 auto', position: 'relative' }}>
              <input
                type="text"
                className="form-control"
                style={{ paddingLeft: '2.8rem', height: '52px', fontSize: '1rem' }}
                placeholder="Search guides, setup steps, or escalation rules..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', stroke: 'var(--text-muted)' }}
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-grid" style={{ gridTemplateColumns: '260px 1fr', gap: '2.5rem' }}>
            {/* Sidebar */}
            <aside>
              <ScrollReveal direction="left" delay={0.1}>
                <div className="info-card">
                  <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem' }}>Categories</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <button
                      className={`btn ${activeCat === 'all' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                      onClick={() => setActiveCat('all')}
                      style={{ justifyContent: 'flex-start' }}
                    >
                      All Articles
                    </button>
                    <button
                      className={`btn ${activeCat === 'database' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                      onClick={() => setActiveCat('database')}
                      style={{ justifyContent: 'flex-start' }}
                    >
                      Data Security & Sync
                    </button>
                    <button
                      className={`btn ${activeCat === 'roles' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                      onClick={() => setActiveCat('roles')}
                      style={{ justifyContent: 'flex-start' }}
                    >
                      Role Governance
                    </button>
                    <button
                      className={`btn ${activeCat === 'escalations' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                      onClick={() => setActiveCat('escalations')}
                      style={{ justifyContent: 'flex-start' }}
                    >
                      Escalation & SLA
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            </aside>

            {/* Content Stack */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {filteredArticles.length > 0 ? (
                filteredArticles.map((art) => (
                  <ScrollReveal key={art.id} direction="scale">
                    <article className="card-box shadow-sm">
                      <span className="badge">{art.badge}</span>
                      <h2 className="card-title" style={{ fontSize: '1.5rem', margin: '0.5rem 0' }}>
                        {art.title}
                      </h2>
                      <p className="paragraph" style={{ marginBottom: '1.25rem' }}>
                        {art.snippet}
                      </p>
                      <div style={{ borderTop: '1px solid var(--border-paper)', paddingTop: '1rem' }}>
                        <h3 style={{ fontSize: '1rem', marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
                          {art.bodyHeading}
                        </h3>
                        <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)' }}>{art.bodyText}</p>
                      </div>
                    </article>
                  </ScrollReveal>
                ))
              ) : (
                <div className="card-box text-center" style={{ padding: '3rem' }}>
                  <p style={{ color: 'var(--text-muted)' }}>No articles found matching &quot;{search}&quot;</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
