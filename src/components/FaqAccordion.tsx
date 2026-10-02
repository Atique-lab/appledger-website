'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
}

export default function FaqAccordion({ items }: FaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id || null);

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="faq-list">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id} className={`faq-item ${isOpen ? 'active' : ''}`}>
            <button
              className="faq-question"
              onClick={() => toggleItem(item.id)}
              aria-expanded={isOpen}
            >
              <span>{item.question}</span>
              <svg
                className="faq-icon"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  <div className="faq-answer" style={{ padding: '0 1rem 1rem 1rem', maxHeight: 'none' }}>
                    <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                      {item.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
