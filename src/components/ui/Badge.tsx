/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'subtle' | 'outline' | 'accent';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'subtle',
  size = 'md',
  className = '',
  ...props
}) => {
  const sizeClasses = {
    sm: 'text-[12px] px-2.5 py-1',
    md: 'text-[12px] px-3.5 py-1.5',
  }[size];

  const variantStyles = {
    subtle: 'bg-[rgba(31,111,92,0.07)] text-[var(--tema-color-accent-ink)] border border-[rgba(31,111,92,0.15)]',
    outline: 'bg-transparent text-[var(--tema-color-text-muted)] border border-[var(--tema-color-border)]',
    accent: 'bg-[var(--tema-color-accent)] text-[var(--tema-color-on-accent)] border border-[var(--tema-color-accent)]',
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-semibold tracking-wider uppercase select-none rounded-[var(--tema-radius)] ${sizeClasses} ${variantStyles} ${className}`}
      style={{ fontFamily: 'var(--tema-font-label)' }}
      {...props}
    >
      {children}
    </span>
  );
};
