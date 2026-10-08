/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { useMotionPreference } from '../../context/MotionContext';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  'aria-label': string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  forcedState?: 'normal' | 'hover' | 'focus' | 'disabled';
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      children,
      variant = 'secondary',
      size = 'md',
      className = '',
      disabled,
      forcedState,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const { isReducedMotion } = useMotionPreference();
    const effectivelyDisabled = disabled || forcedState === 'disabled';

    const sizeClasses = {
      sm: 'w-[44px] h-[44px] p-2.5',
      md: 'w-[48px] h-[48px] p-3',
      lg: 'w-[54px] h-[54px] p-3.5',
    }[size];

    const variantStyles: Record<string, string> = {
      primary:
        'bg-[var(--tema-color-accent)] text-[var(--tema-color-on-accent)] border border-[var(--tema-color-accent)] shadow-xs hover:brightness-105',
      secondary:
        'bg-[var(--tema-color-surface)] text-[var(--tema-color-text)] border border-[var(--tema-color-border)] shadow-xs hover:border-[var(--tema-color-accent-ink)] hover:text-[var(--tema-color-accent-ink)]',
      ghost:
        'bg-transparent text-[var(--tema-color-text)] border border-transparent hover:bg-[rgba(31,111,92,0.08)] hover:text-[var(--tema-color-accent-ink)]',
    };

    let forcedClasses = '';
    if (forcedState === 'hover') {
      if (variant === 'primary') forcedClasses = 'brightness-110 shadow-md';
      if (variant === 'secondary') forcedClasses = 'border-[var(--tema-color-accent-ink)] text-[var(--tema-color-accent-ink)]';
      if (variant === 'ghost') forcedClasses = 'bg-[rgba(31,111,92,0.08)] text-[var(--tema-color-accent-ink)]';
    } else if (forcedState === 'focus') {
      forcedClasses = 'outline-2 outline-[var(--tema-color-accent-ink)] outline-offset-2';
    }

    return (
      <motion.button
        ref={ref}
        type={type}
        disabled={effectivelyDisabled}
        whileHover={
          !isReducedMotion && !effectivelyDisabled && !forcedState
            ? { scale: 1.05 }
            : undefined
        }
        whileTap={
          !isReducedMotion && !effectivelyDisabled && !forcedState
            ? { scale: 0.95 }
            : undefined
        }
        className={`inline-flex items-center justify-center rounded-[var(--tema-radius)] transition-colors duration-[var(--motion-duration-base)] cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--tema-color-accent-ink)] focus-visible:outline-offset-2 ${sizeClasses} ${variantStyles[variant]} ${forcedClasses} ${effectivelyDisabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : ''} ${className}`}
        {...(props as any)}
      >
        {children}
      </motion.button>
    );
  }
);

IconButton.displayName = 'IconButton';
