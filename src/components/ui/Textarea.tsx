/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  helperText?: string;
  forcedState?: 'normal' | 'focus' | 'error' | 'disabled';
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      helperText,
      id,
      className = '',
      disabled,
      forcedState,
      rows = 4,
      ...props
    },
    ref
  ) => {
    const inputId = id || `textarea-${label.toLowerCase().replace(/\s+/g, '-')}`;
    const effectivelyDisabled = disabled || forcedState === 'disabled';
    const isError = !!error || forcedState === 'error';
    const isFocus = forcedState === 'focus';

    return (
      <div className="w-full flex flex-col gap-1.5">
        <label
          htmlFor={inputId}
          className="text-xs font-semibold uppercase tracking-wider text-[var(--tema-color-text)]"
          style={{ fontFamily: 'var(--tema-font-label)' }}
        >
          {label}
        </label>
        <textarea
          ref={ref}
          id={inputId}
          rows={rows}
          disabled={effectivelyDisabled}
          aria-invalid={isError}
          aria-describedby={
            isError ? `${inputId}-error` : helperText ? `${inputId}-desc` : undefined
          }
          className={`w-full px-4 py-3 bg-[var(--tema-color-surface)] text-[var(--tema-color-text)] text-sm rounded-[var(--tema-radius)] border transition-all duration-[var(--motion-duration-fast)] placeholder:text-[var(--tema-color-text-muted)]/60 focus:outline-none ${
            isError
              ? 'border-red-500 focus:ring-2 focus:ring-red-400/30'
              : isFocus
              ? 'border-[var(--tema-color-accent-ink)] ring-2 ring-[rgba(31,111,92,0.15)] outline-2 outline-[var(--tema-color-accent-ink)]'
              : 'border-[var(--tema-color-border)] hover:border-[var(--tema-color-accent-ink)]/60 focus:border-[var(--tema-color-accent-ink)] focus:ring-2 focus:ring-[rgba(31,111,92,0.15)]'
          } ${effectivelyDisabled ? 'opacity-40 cursor-not-allowed bg-neutral-100' : ''} ${className}`}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-xs text-red-600 font-medium">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p id={`${inputId}-desc`} className="text-xs text-[var(--tema-color-text-muted)]">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
