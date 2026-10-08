/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
  forcedState?: 'normal' | 'focus' | 'error' | 'disabled';
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
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
    const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, '-')}`;
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
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            disabled={effectivelyDisabled}
            aria-invalid={isError}
            aria-describedby={
              isError ? `${inputId}-error` : helperText ? `${inputId}-desc` : undefined
            }
            className={`w-full min-h-[48px] px-4 py-3 bg-[var(--tema-color-surface)] text-[var(--tema-color-text)] text-sm rounded-[var(--tema-radius)] border transition-all duration-[var(--motion-duration-fast)] placeholder:text-[var(--tema-color-text-muted)]/60 focus:outline-none ${
              isError
                ? 'border-red-500 focus:ring-2 focus:ring-red-400/30'
                : isFocus
                ? 'border-[var(--tema-color-accent-ink)] ring-2 ring-[rgba(31,111,92,0.15)] outline-2 outline-[var(--tema-color-accent-ink)]'
                : 'border-[var(--tema-color-border)] hover:border-[var(--tema-color-accent-ink)]/60 focus:border-[var(--tema-color-accent-ink)] focus:ring-2 focus:ring-[rgba(31,111,92,0.15)]'
            } ${effectivelyDisabled ? 'opacity-40 cursor-not-allowed bg-neutral-100' : ''} ${className}`}
            {...props}
          />
        </div>
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

Input.displayName = 'Input';
