/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ChevronDown } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  error?: string;
  helperText?: string;
  forcedState?: 'normal' | 'focus' | 'disabled';
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      options,
      error,
      helperText,
      id,
      className = '',
      disabled,
      forcedState,
      ...props
    },
    ref
  ) => {
    const selectId = id || `select-${label.toLowerCase().replace(/\s+/g, '-')}`;
    const effectivelyDisabled = disabled || forcedState === 'disabled';
    const isFocus = forcedState === 'focus';

    return (
      <div className="w-full flex flex-col gap-1.5">
        <label
          htmlFor={selectId}
          className="text-xs font-semibold uppercase tracking-wider text-[var(--tema-color-text)]"
          style={{ fontFamily: 'var(--tema-font-label)' }}
        >
          {label}
        </label>
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            disabled={effectivelyDisabled}
            className={`w-full min-h-[48px] px-4 pr-10 py-3 bg-[var(--tema-color-surface)] text-[var(--tema-color-text)] text-sm rounded-[var(--tema-radius)] border appearance-none transition-all duration-[var(--motion-duration-fast)] cursor-pointer focus:outline-none ${
              error
                ? 'border-red-500 focus:ring-2 focus:ring-red-400/30'
                : isFocus
                ? 'border-[var(--tema-color-accent-ink)] ring-2 ring-[rgba(31,111,92,0.15)] outline-2 outline-[var(--tema-color-accent-ink)]'
                : 'border-[var(--tema-color-border)] hover:border-[var(--tema-color-accent-ink)]/60 focus:border-[var(--tema-color-accent-ink)] focus:ring-2 focus:ring-[rgba(31,111,92,0.15)]'
            } ${effectivelyDisabled ? 'opacity-40 cursor-not-allowed bg-neutral-100' : ''} ${className}`}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-[var(--tema-color-text-muted)]">
            <ChevronDown className="h-4 w-4" aria-hidden="true" />
          </div>
        </div>
        {error && (
          <p className="text-xs text-red-600 font-medium">{error}</p>
        )}
        {!error && helperText && (
          <p className="text-xs text-[var(--tema-color-text-muted)]">{helperText}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
