'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <Link href="/" className="brand-logo footer-logo">
            <Image
              src="/images/app-logo.png"
              alt="AppLedger Icon"
              className="brand-logo-img"
              width={32}
              height={32}
            />
            <span className="logo-text">AppLedger</span>
          </Link>
          <p className="footer-desc">
            Streamlined task management, multi-role governance, and automated team escalation designed for modern operations.
          </p>

          {/* Live System Status Badge */}
          <div className="footer-status-badge">
            <span className="status-dot"></span>
            <span className="status-text">All Systems Operational &bull; 99.9% Uptime</span>
          </div>
        </div>

        <div className="footer-links-group">
          <div className="footer-col">
            <h4 className="footer-title">Navigation</h4>
            <ul className="footer-links">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/features">Features Overview</Link></li>
              <li><Link href="/gallery">App Gallery</Link></li>
              <li><Link href="/#prebook">Reserve Early Access</Link></li>
              <li><Link href="/about">About AppLedger</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">Resources</h4>
            <ul className="footer-links">
              <li><Link href="/help">Documentation & Guides</Link></li>
              <li><Link href="/features#roles">Role Hierarchy</Link></li>
              <li><Link href="/features#escalation">Escalation Workflow</Link></li>
              <li><Link href="/contact">Contact & Support</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">Contact</h4>
            <p className="footer-info">Questions or enterprise inquiries?</p>
            <a href="mailto:support@appledger.in" className="footer-email">support@appledger.in</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-content">
          <p>&copy; {currentYear} AppLedger. Created by Atique Shaikh. All rights reserved.</p>
          <p className="footer-note">
            <Link href="/privacy" style={{ color: 'inherit', textDecoration: 'underline' }}>
              Privacy Policy
            </Link>{' '}
            &bull; Public Marketing Site &bull; Independent Deployment
          </p>
        </div>
      </div>
    </footer>
  );
}
