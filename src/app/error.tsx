'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="section">
      <div className="container text-center">
        <ScrollReveal direction="fade-scale" delay={0.1}>
          <span className="badge badge-accent">Error 500</span>
          <h1 className="page-title" style={{ marginTop: '0.5rem' }}>
            System Error Occurred
          </h1>
          <p className="page-subtitle mb-4" style={{ maxWidth: '580px', margin: '0.75rem auto 2rem auto' }}>
            An unexpected error occurred while processing your request. Our technical team has been notified.
          </p>
          <div className="error-actions" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => reset()} className="btn btn-primary btn-lg">
              Try Again
            </button>
            <Link href="/" className="btn btn-outline btn-lg">
              Return to Home &rarr;
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
