'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTheme } from './ThemeProvider';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [announcementVisible, setAnnouncementVisible] = useState(true);

  useEffect(() => {
    const dismissed = localStorage.getItem('announcement-dismissed');
    if (dismissed === 'true') {
      setAnnouncementVisible(false);
    }
  }, []);

  const dismissAnnouncement = () => {
    setAnnouncementVisible(false);
    localStorage.setItem('announcement-dismissed', 'true');
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/features', label: 'Features' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      {/* Floating Theme Toggle FAB */}
      <button
        className="theme-toggle-fab"
        onClick={toggleTheme}
        aria-label="Toggle dark/light mode"
        title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? (
          <svg className="moon-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        ) : (
          <svg className="sun-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        )}
      </button>

      {/* Top Sticky Announcement Bar */}
      <AnimatePresence>
        {announcementVisible && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="announcement-bar"
          >
            <div className="container announcement-container">
              <div className="announcement-content">
                <svg className="announcement-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                <span className="announcement-text">
                  AppLedger is launching soon &mdash;{' '}
                  <Link href="/#prebook" className="announcement-link">
                    Reserve your early access &rarr;
                  </Link>
                </span>
              </div>
              <button
                className="announcement-close"
                onClick={dismissAnnouncement}
                aria-label="Dismiss announcement"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="site-header">
        <div className="container header-container">
          <div className="brand-group">
            <Link href="/" className="brand-logo">
              <Image
                src="/images/app-logo.png"
                alt="AppLedger Icon"
                className="brand-logo-img"
                width={34}
                height={34}
                priority
              />
              <span className="logo-text">AppLedger</span>
            </Link>
          </div>

          <button
            className={`mobile-toggle ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>

          <nav className={`site-nav ${mobileMenuOpen ? 'active' : ''}`}>
            <ul className="nav-list">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`nav-link ${isActive ? 'active' : ''}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="nav-actions">
              <Link href="/#prebook" className="btn btn-primary btn-nav-download">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <polyline points="16 11 18 13 22 9"></polyline>
                </svg>
                <span>Reserve Early Access</span>
              </Link>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
