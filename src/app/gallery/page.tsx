import React from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import GalleryLightbox from '@/components/GalleryLightbox';

export const metadata = {
  title: 'App Gallery & Desktop Interface - AppLedger',
  description:
    'A visual preview of AppLedger desktop interface featuring Kanban boards, 5-tier role governance, Request to Action escalation inbox, and CEO executive dashboards.',
  alternates: {
    canonical: 'https://appledger.in/gallery',
  },
  openGraph: {
    title: 'App Gallery - AppLedger Desktop Interface',
    description: 'Explore all 6 operational categories and screenshots of the AppLedger desktop application.',
    url: 'https://appledger.in/gallery',
  },
};

export default function GalleryPage() {
  return (
    <>
      <section className="hero-sub">
        <div className="container">
          <ScrollReveal direction="scale">
            <span className="badge">Visual Preview</span>
          </ScrollReveal>
          <ScrollReveal direction="down">
            <h1 className="page-title">Experience AppLedger&apos;s Interface</h1>
          </ScrollReveal>
          <ScrollReveal direction="down" delay={0.1}>
            <p className="page-subtitle">
              A preview of the clean, editorial task management interface built for focused team coordination.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ScrollReveal direction="scale" delay={0.2}>
            <GalleryLightbox />
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
