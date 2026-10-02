'use client';

import React, { useState, useRef, useEffect } from 'react';

export interface OrgGroup {
  category: string;
  items: string[];
}

export const ORG_TYPE_GROUPS: OrgGroup[] = [
  {
    category: 'Commercial & For-Profit Organizations',
    items: [
      'SaaS & Software Development',
      'IT Managed Services & Infrastructure (MSP)',
      'Digital Marketing & Media Agency',
      'E-commerce, Retail & D2C Brands',
      'Chartered Accountancy, Tax & Audit Practice',
      'Financial Advisory & Investment Firm',
      'Corporate Law Firm & Legal Practice',
      'Management & Strategy Consulting',
      'Architecture, Engineering & Construction',
      'Manufacturing, Supply Chain & Logistics',
      'Commercial Healthcare & Medical Practice',
    ],
  },
  {
    category: 'Non-Profit & Civil Society Organizations',
    items: [
      'Non-Governmental Organization (NGO)',
      'Charitable Trust & Foundation',
      'Industry Association & Trade Union',
      'Research Institute & Think Tank',
      'Social Impact & Community Venture',
    ],
  },
  {
    category: 'Government & Public Sector Entities',
    items: [
      'Central / Federal Government Department',
      'State / Provincial Public Agency',
      'Municipal & Local Administration Authority',
      'Public Sector Undertaking (PSU)',
      'Public Healthcare System & Hospital',
      'Public Educational Institution & University',
    ],
  },
  {
    category: 'Supranational & Intergovernmental Bodies',
    items: [
      'United Nations (UN) Agency or Entity',
      'International Financial Institution (e.g. World Bank, IMF)',
      'Regional Economic Union & Development Bank',
      'Multilateral Regulatory & Standards Organization',
      'International Diplomatic & Treaty Mission',
      'Other Organizational Structure',
    ],
  },
];

interface OrgTypeComboboxProps {
  value: string;
  onChange: (val: string) => void;
  required?: boolean;
}

export default function OrgTypeCombobox({ value, onChange, required = false }: OrgTypeComboboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState(value);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSearch(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredGroups = ORG_TYPE_GROUPS.map((group) => ({
    category: group.category,
    items: group.items.filter((item) =>
      item.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter((group) => group.items.length > 0);

  const flatOptions = filteredGroups.flatMap((g) => g.items);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        setIsOpen(true);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIndex((prev) => (prev + 1) % flatOptions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex((prev) => (prev - 1 + flatOptions.length) % flatOptions.length);
    } else if (e.key === 'Enter' && focusedIndex >= 0 && focusedIndex < flatOptions.length) {
      e.preventDefault();
      const selected = flatOptions[focusedIndex];
      onChange(selected);
      setSearch(selected);
      setIsOpen(false);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`combobox-wrapper ${isOpen ? 'open' : ''}`}
      style={{ position: 'relative' }}
    >
      <input
        type="text"
        className="form-control combobox-input"
        placeholder="Type to filter or select organization type..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          onChange(e.target.value);
          setIsOpen(true);
          setFocusedIndex(0);
        }}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
        required={required}
        aria-autocomplete="list"
      />
      <svg
        className="combobox-chevron"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>

      {isOpen && (
        <div className="combobox-dropdown" role="listbox">
          {filteredGroups.length > 0 ? (
            filteredGroups.map((group) => (
              <div key={group.category} className="combobox-group">
                <div className="combobox-group-header">{group.category}</div>
                {group.items.map((item) => {
                  const isSelected = value === item;
                  return (
                    <div
                      key={item}
                      className={`combobox-option ${isSelected ? 'selected' : ''}`}
                      aria-selected={isSelected}
                      onClick={() => {
                        onChange(item);
                        setSearch(item);
                        setIsOpen(false);
                      }}
                    >
                      {item}
                    </div>
                  );
                })}
              </div>
            ))
          ) : (
            <div className="combobox-option" style={{ color: 'var(--text-muted)' }}>
              No matching categories found
            </div>
          )}
        </div>
      )}
    </div>
  );
}
