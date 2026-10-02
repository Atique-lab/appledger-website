import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';

export default function NotFound() {
  return (
    <section className="section">
      <div className="container text-center">
        <ScrollReveal direction="fade-scale" delay={0.1}>
          <span className="badge badge-accent">Error 404</span>
          <h1 className="page-title" style={{ marginTop: '0.5rem' }}>
            Page Not Found
          </h1>
          <p className="page-subtitle mb-4" style={{ maxWidth: '580px', margin: '0.75rem auto 2rem auto' }}>
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <div className="error-actions" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/" className="btn btn-primary btn-lg">
              Return to Home &rarr;
            </Link>
            <Link href="/contact" className="btn btn-outline btn-lg">
              Contact Support
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
