'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    security_hp_blank: '',
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        setSuccessMsg(data.message);
        setFormData({ name: '', email: '', subject: '', message: '', security_hp_blank: '' });
      } else {
        setErrorMsg(data.message || 'Failed to send message.');
      }
    } catch (err) {
      console.error('Contact submission error:', err);
      setErrorMsg('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-card">
      <h2 className="card-title">Send Us a Message</h2>

      <AnimatePresence mode="wait">
        {successMsg ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="alert alert-success"
            style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '1.5rem' }}
          >
            <strong>Message Received!</strong>
            <p>{successMsg}</p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
          >
            {/* Honeypot field */}
            <input
              type="text"
              name="security_hp_blank"
              value={formData.security_hp_blank}
              onChange={handleChange}
              className="honeypot-field"
              tabIndex={-1}
              autoComplete="off"
            />

            {errorMsg && <div className="alert alert-error">{errorMsg}</div>}

            <div className="form-group">
              <label className="form-label">
                Your Full Name <span className="required">*</span>
              </label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="e.g. Atique Shaikh"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Your Email Address <span className="required">*</span>
              </label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="e.g. support@appledger.in"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Subject <span className="required">*</span>
              </label>
              <input
                type="text"
                name="subject"
                className="form-control"
                placeholder="e.g. Enterprise Onboarding Inquiry"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Message <span className="required">*</span>
              </label>
              <textarea
                name="message"
                className="form-control"
                rows={5}
                placeholder="How can we help your team's operations?"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary btn-lg"
              style={{ width: '100%' }}
            >
              {loading ? 'Sending Message...' : 'Send Message →'}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
