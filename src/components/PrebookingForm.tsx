'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Building2, FileText, CheckCircle2, ArrowRight, ArrowLeft, MessageSquare, ShieldCheck, Sparkles, PhoneCall } from 'lucide-react';

const ORG_TYPES = [
  'Sole Proprietorship / Sole Trader',
  'Partnership (General / Limited)',
  'Limited Liability Company (LLC)',
  'Corporation / Joint-Stock Company',
  'Cooperative (Co-op)',
  'Multinational Corporation (MNC)',
  'Non-Profit / NGO',
  'Government Agency / Public Sector',
  'Educational Institution / University',
  'Healthcare / Hospital Network',
];

export default function PrebookingForm() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    otherRole: '',
    orgName: '',
    orgType: 'Limited Liability Company (LLC)',
    teamSize: '16-50 Members',
    deploymentMode: 'Air-Gapped Desktop App + Cloud Sync',
    reason: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverMessage, setServerMessage] = useState('');

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid email is required';
    if (!formData.role) errs.role = 'Role in organization is required';
    if (formData.role === 'Other' && !formData.otherRole.trim()) errs.otherRole = 'Please specify your role';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (!formData.orgName.trim()) errs.orgName = 'Organization name is required';
    if (!formData.orgType.trim()) errs.orgType = 'Organization type is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep3 = () => {
    const errs: Record<string, string> = {};
    if (!formData.reason.trim() || formData.reason.trim().length < 10) {
      errs.reason = 'Please explain your operational goals (at least 10 characters)';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) setStep(3);
  };

  const handleBack = () => {
    if (step > 1) setStep((prev) => (prev - 1) as 1 | 2 | 3);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep3()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/prebooking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          role: formData.role === 'Other' ? formData.otherRole : formData.role,
          org_name: formData.orgName,
          org_type: formData.orgType,
          team_size: formData.teamSize,
          deployment_mode: formData.deploymentMode,
          reason: formData.reason,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsSuccess(true);
        setServerMessage(data.message || 'Your team batch reservation has been submitted successfully.');
      } else {
        setErrors({ server: data.error || 'Failed to submit reservation. Please try again.' });
      }
    } catch {
      setErrors({ server: 'Network error. Please check your connection.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Conversational Assistant message dynamically reacting to active form step & selected fields
  const getAssistantMessage = () => {
    if (step === 1) {
      if (formData.role === 'CEO/Founder') {
        return `Welcome CEO ${formData.name ? formData.name.split(' ')[0] : ''}! As an executive, AppLedger provides you with an automated 30-day completion trend dashboard and executive sign-off authority without disturbing squad leads.`;
      }
      if (formData.role === 'Admin/IT Manager') {
        return `Welcome Admin ${formData.name ? formData.name.split(' ')[0] : ''}! AppLedger equips you with 5-tier role authorization, session security controls, and PostgreSQL Row-Level Security sandbox policy management.`;
      }
      if (formData.role === 'Manager' || formData.role === 'Team Lead') {
        return `Welcome Lead ${formData.name ? formData.name.split(' ')[0] : ''}! When team operators hit external blockers, single-click "Request to Action" escalation signals route directly to your workstation for immediate resolution.`;
      }
      if (formData.name) {
        return `Hello ${formData.name.split(' ')[0]}! Entering your work email ensures your team batch gets provisioned with an isolated PostgreSQL RLS sandbox immediately upon access release.`;
      }
      return 'Hello! I am your AppLedger Reservation Assistant. Fill out your operator details on the left, and I will guide you through reserving your team batch.';
    }

    if (step === 2) {
      if (formData.teamSize === '50+ Members') {
        return `Enterprise scale detected for ${formData.orgName || 'your organization'}. We will provision dedicated connection pools and pre-configure all 11 workflow templates for your squads.`;
      }
      return `Setting up ${formData.orgName || 'your organization'} (${formData.orgType}). This pre-configures your default 5-tier permission matrix and squad stage pipelines.`;
    }

    return `Almost done! Detailing your operational requirements for ${formData.orgName || 'your team'} helps our onboarding engineers pre-tune your automated Request to Action escalation rules.`;
  };

  return (
    <div className="card-box shadow-md" style={{ padding: '2.5rem', backgroundColor: 'var(--bg-card)', width: '100%' }} id="prebook">
      {/* Success View */}
      {isSuccess ? (
        <div style={{ padding: '2rem 1rem', textAlign: 'center' }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', backgroundColor: 'var(--accent-forest-light)', color: 'var(--accent-forest)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
            <CheckCircle2 style={{ width: 32, height: 32 }} />
          </div>
          <h3 style={{ fontSize: '1.6rem', color: 'var(--accent-forest)', marginBottom: '0.75rem' }}>Reservation Confirmed!</h3>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-primary)', maxWidth: '520px', margin: '0 auto 1.5rem auto' }}>
            {serverMessage}
          </p>
          <button
            onClick={() => {
              setIsSuccess(false);
              setStep(1);
              setFormData({ name: '', email: '', phone: '', role: '', otherRole: '', orgName: '', orgType: 'Limited Liability Company (LLC)', teamSize: '16-50 Members', deploymentMode: 'Air-Gapped Desktop App + Cloud Sync', reason: '' });
            }}
            className="btn btn-outline"
          >
            Submit Another Reservation
          </button>
        </div>
      ) : (
        <div>
          {/* Header & Step Wizard Indicator */}
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span className="badge badge-accent">Priority Access Batch</span>
            <h2 style={{ fontSize: '1.8rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}>Reserve Your Team Batch</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Complete all 3 parts to secure early access onboarding for your team.</p>

            {/* 3-Step Wizard Indicator Pills */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', marginTop: '1.5rem' }}>
              <div
                style={{
                  padding: '0.65rem 0.5rem',
                  borderRadius: '8px',
                  backgroundColor: step >= 1 ? 'var(--accent-rust-light)' : 'var(--bg-paper)',
                  border: step === 1 ? '2px solid var(--accent-rust)' : '1px solid var(--border-paper)',
                  color: step >= 1 ? 'var(--accent-rust)' : 'var(--text-muted)',
                  fontSize: '0.85rem',
                  fontWeight: step === 1 ? 700 : 500,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                }}
              >
                <User style={{ width: 14, height: 14 }} /> 1. Identity &amp; Role
              </div>

              <div
                style={{
                  padding: '0.65rem 0.5rem',
                  borderRadius: '8px',
                  backgroundColor: step >= 2 ? 'var(--accent-rust-light)' : 'var(--bg-paper)',
                  border: step === 2 ? '2px solid var(--accent-rust)' : '1px solid var(--border-paper)',
                  color: step >= 2 ? 'var(--accent-rust)' : 'var(--text-muted)',
                  fontSize: '0.85rem',
                  fontWeight: step === 2 ? 700 : 500,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                }}
              >
                <Building2 style={{ width: 14, height: 14 }} /> 2. Organization Specs
              </div>

              <div
                style={{
                  padding: '0.65rem 0.5rem',
                  borderRadius: '8px',
                  backgroundColor: step >= 3 ? 'var(--accent-rust-light)' : 'var(--bg-paper)',
                  border: step === 3 ? '2px solid var(--accent-rust)' : '1px solid var(--border-paper)',
                  color: step >= 3 ? 'var(--accent-rust)' : 'var(--text-muted)',
                  fontSize: '0.85rem',
                  fontWeight: step === 3 ? 700 : 500,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                }}
              >
                <FileText style={{ width: 14, height: 14 }} /> 3. Goals &amp; Review
              </div>
            </div>
          </div>

          {/* 2-COLUMN LAYOUT: FORM INPUTS (LEFT) + CONVERSATIONAL TALKING ASSISTANT (RIGHT) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: '2.5rem', alignItems: 'start' }}>
            
            {/* LEFT COLUMN: FORM STEP INPUTS */}
            <div>
              {errors.server && (
                <div style={{ backgroundColor: '#FEE2E2', color: '#991B1B', padding: '0.75rem 1rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                  {errors.server}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <AnimatePresence mode="wait">
                  {/* PART 1: IDENTITY & CONTACT */}
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 15 }}
                      transition={{ duration: 0.25 }}
                      style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
                    >
                      <div className="form-group">
                        <label className="form-label" style={{ fontWeight: 600, display: 'block', marginBottom: '0.4rem' }}>
                          Full Name <span style={{ color: 'var(--accent-rust)' }}>*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="e.g. Atique Shaikh"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: errors.name ? '1px solid red' : '1px solid var(--border-paper)' }}
                        />
                        {errors.name && <span style={{ color: 'red', fontSize: '0.8rem', marginTop: '0.2rem', display: 'block' }}>{errors.name}</span>}
                      </div>

                      <div className="form-group">
                        <label className="form-label" style={{ fontWeight: 600, display: 'block', marginBottom: '0.4rem' }}>
                          Work Email Address <span style={{ color: 'var(--accent-rust)' }}>*</span>
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="e.g. atique@organization.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: errors.email ? '1px solid red' : '1px solid var(--border-paper)' }}
                        />
                        {errors.email && <span style={{ color: 'red', fontSize: '0.8rem', marginTop: '0.2rem', display: 'block' }}>{errors.email}</span>}
                      </div>

                      <div className="form-group">
                        <label className="form-label" style={{ fontWeight: 600, display: 'block', marginBottom: '0.4rem' }}>
                          Phone / WhatsApp Number <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>(Optional)</span>
                        </label>
                        <input
                          type="tel"
                          className="form-control"
                          placeholder="e.g. +91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-paper)' }}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label" style={{ fontWeight: 600, display: 'block', marginBottom: '0.4rem' }}>
                          Your Role in Organization <span style={{ color: 'var(--accent-rust)' }}>*</span>
                        </label>
                        <select
                          className="form-control"
                          value={formData.role}
                          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                          style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: errors.role ? '1px solid red' : '1px solid var(--border-paper)' }}
                        >
                          <option value="">Select your role...</option>
                          <option value="CEO/Founder">CEO / Founder</option>
                          <option value="Admin/IT Manager">Admin / IT Manager</option>
                          <option value="Manager">Manager</option>
                          <option value="Team Lead">Team Lead</option>
                          <option value="Member">Member / Operator</option>
                          <option value="Other">Other</option>
                        </select>
                        {errors.role && <span style={{ color: 'red', fontSize: '0.8rem', marginTop: '0.2rem', display: 'block' }}>{errors.role}</span>}
                      </div>

                      {formData.role === 'Other' && (
                        <div className="form-group">
                          <label className="form-label" style={{ fontWeight: 600, display: 'block', marginBottom: '0.4rem' }}>
                            Specify Your Role <span style={{ color: 'var(--accent-rust)' }}>*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="e.g. Chief Operating Officer"
                            value={formData.otherRole}
                            onChange={(e) => setFormData({ ...formData, otherRole: e.target.value })}
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: errors.otherRole ? '1px solid red' : '1px solid var(--border-paper)' }}
                          />
                          {errors.otherRole && <span style={{ color: 'red', fontSize: '0.8rem', marginTop: '0.2rem', display: 'block' }}>{errors.otherRole}</span>}
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* PART 2: ORGANIZATION DETAILS & DEPLOYMENT PREFERENCE */}
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 15 }}
                      transition={{ duration: 0.25 }}
                      style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
                    >
                      <div className="form-group">
                        <label className="form-label" style={{ fontWeight: 600, display: 'block', marginBottom: '0.4rem' }}>
                          Organization Name <span style={{ color: 'var(--accent-rust)' }}>*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="e.g. Acme Innovations Ltd."
                          value={formData.orgName}
                          onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                          style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: errors.orgName ? '1px solid red' : '1px solid var(--border-paper)' }}
                        />
                        {errors.orgName && <span style={{ color: 'red', fontSize: '0.8rem', marginTop: '0.2rem', display: 'block' }}>{errors.orgName}</span>}
                      </div>

                      <div className="form-group">
                        <label className="form-label" style={{ fontWeight: 600, display: 'block', marginBottom: '0.4rem' }}>
                          Organization Type <span style={{ color: 'var(--accent-rust)' }}>*</span>
                        </label>
                        <select
                          className="form-control"
                          value={formData.orgType}
                          onChange={(e) => setFormData({ ...formData, orgType: e.target.value })}
                          style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-paper)' }}
                        >
                          {ORG_TYPES.map((t, i) => (
                            <option key={i} value={t}>
                              {t}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="form-label" style={{ fontWeight: 600, display: 'block', marginBottom: '0.4rem' }}>
                          Estimated Team Size
                        </label>
                        <select
                          className="form-control"
                          value={formData.teamSize}
                          onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                          style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-paper)' }}
                        >
                          <option value="1-5 Members">1-5 Members</option>
                          <option value="6-15 Members">6-15 Members</option>
                          <option value="16-50 Members">16-50 Members</option>
                          <option value="50+ Members">50+ Enterprise Members</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="form-label" style={{ fontWeight: 600, display: 'block', marginBottom: '0.4rem' }}>
                          Preferred Deployment Mode
                        </label>
                        <select
                          className="form-control"
                          value={formData.deploymentMode}
                          onChange={(e) => setFormData({ ...formData, deploymentMode: e.target.value })}
                          style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-paper)' }}
                        >
                          <option value="Air-Gapped Desktop App + Cloud Sync">Air-Gapped Desktop App + Cloud Sync (Recommended)</option>
                          <option value="On-Premise Private Server">On-Premise Private Server Deployment</option>
                          <option value="Pure Desktop Offline Instance">Pure Desktop Offline Instance</option>
                        </select>
                      </div>
                    </motion.div>
                  )}

                  {/* PART 3: OPERATIONAL GOALS & SUMMARY REVIEW */}
                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 15 }}
                      transition={{ duration: 0.25 }}
                      style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
                    >
                      <div className="form-group">
                        <label className="form-label" style={{ fontWeight: 600, display: 'block', marginBottom: '0.4rem' }}>
                          Why does your organization need this app? <span style={{ color: 'var(--accent-rust)' }}>*</span>
                        </label>
                        <textarea
                          rows={4}
                          className="form-control"
                          placeholder="Tell us about your team's operational goals, delegation bottlenecks, or SLA escalation requirements..."
                          value={formData.reason}
                          onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                          style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: errors.reason ? '1px solid red' : '1px solid var(--border-paper)' }}
                        />
                        {errors.reason && <span style={{ color: 'red', fontSize: '0.8rem', marginTop: '0.2rem', display: 'block' }}>{errors.reason}</span>}
                      </div>

                      {/* Summary Confirmation Box */}
                      <div style={{ backgroundColor: 'var(--bg-paper)', padding: '1.15rem', borderRadius: '10px', border: '1px solid var(--border-paper)', fontSize: '0.875rem' }}>
                        <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontSize: '0.95rem' }}>Reservation Summary Review:</strong>
                        <div style={{ marginBottom: '0.25rem' }}><strong>Applicant:</strong> {formData.name || 'Not specified'} ({formData.email || 'N/A'}) {formData.phone ? `• ${formData.phone}` : ''}</div>
                        <div style={{ marginBottom: '0.25rem' }}><strong>Role:</strong> {formData.role === 'Other' ? formData.otherRole : formData.role || 'Not specified'}</div>
                        <div style={{ marginBottom: '0.25rem' }}><strong>Organization:</strong> {formData.orgName || 'Not specified'} &bull; {formData.orgType}</div>
                        <div><strong>Scale &amp; Mode:</strong> {formData.teamSize} &bull; {formData.deploymentMode}</div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--border-paper)' }}>
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="btn btn-secondary"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                    >
                      <ArrowLeft style={{ width: 16, height: 16 }} /> Back
                    </button>
                  ) : (
                    <div />
                  )}

                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="btn btn-primary"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                    >
                      Next Part <ArrowRight style={{ width: 16, height: 16 }} />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary btn-lg"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                    >
                      {isSubmitting ? 'Submitting Reservation...' : 'Complete Batch Reservation'} &rarr;
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* RIGHT COLUMN: INTERACTIVE CONVERSATIONAL TALKING ASSISTANT */}
            <div style={{ backgroundColor: 'var(--bg-paper)', borderRadius: '14px', border: '1px solid var(--border-paper)', padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--border-paper)', paddingBottom: '0.75rem' }}>
                <MessageSquare style={{ width: 18, height: 18, color: 'var(--accent-rust)' }} />
                <strong style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>AppLedger Reservation Assistant</strong>
              </div>

              {/* Dynamic Conversational Message Reacting to User Inputs */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${step}-${formData.role}-${formData.teamSize}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
                >
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-rust)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Sparkles style={{ width: 14, height: 14 }} /> Guide Message
                  </div>

                  <div
                    style={{
                      fontSize: '0.9rem',
                      lineHeight: 1.6,
                      color: 'var(--text-primary)',
                      backgroundColor: 'var(--bg-card)',
                      padding: '1.15rem',
                      borderRadius: '10px',
                      borderLeft: '4px solid var(--accent-rust)',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    }}
                  >
                    &quot;{getAssistantMessage()}&quot;
                  </div>

                  <div style={{ padding: '0.85rem 1rem', background: 'var(--accent-forest-light)', borderRadius: '8px', border: '1px solid rgba(45, 90, 39, 0.2)', fontSize: '0.8rem', color: 'var(--accent-forest)', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <ShieldCheck style={{ width: 16, height: 16, flexShrink: 0, marginTop: '2px' }} />
                    <span>PostgreSQL Row-Level Security ensures complete data isolation for {formData.orgName || 'your team'}.</span>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Contact Assistance Note */}
              <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-paper)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <PhoneCall style={{ width: 12, height: 12 }} /> Direct Engineering Onboarding
                </span>
                <span style={{ color: 'var(--accent-forest)', fontWeight: 600 }}>Step {step} of 3</span>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
