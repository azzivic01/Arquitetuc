/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { useMotionPreference } from '../../context/MotionContext';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  forcedState?: 'normal' | 'hover' | 'focus' | 'disabled' | 'loading';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      className = '',
      disabled,
      forcedState,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const { isReducedMotion } = useMotionPreference();

    const effectivelyLoading = isLoading || forcedState === 'loading';
    const effectivelyDisabled = disabled || forcedState === 'disabled' || effectivelyLoading;

    // Size mappings (touch target >= 44px)
    const sizeClasses = {
      sm: 'min-h-[44px] px-4 text-xs font-semibold uppercase tracking-wider',
      md: 'min-h-[48px] px-6 text-sm font-semibold tracking-wide',
      lg: 'min-h-[54px] px-8 text-base font-semibold tracking-wide',
    }[size];

    // Base styles using theme CSS variables
    const baseClasses =
      'relative inline-flex items-center justify-center gap-2 select-none font-medium cursor-pointer transition-all duration-[var(--motion-duration-base)] ease-[var(--motion-ease-base)] focus-visible:outline-2 focus-visible:outline-[var(--tema-color-accent-ink)] focus-visible:outline-offset-2';

    // Variant classes using pure CSS variables
    const variantStyles: Record<string, string> = {
      primary:
        'bg-[var(--tema-color-accent)] text-[var(--tema-color-on-accent)] border border-[var(--tema-color-accent)] shadow-sm hover:brightness-105 active:brightness-95',
      secondary:
        'bg-[var(--tema-color-surface)] text-[var(--tema-color-text)] border border-[var(--tema-color-border)] shadow-xs hover:border-[var(--tema-color-accent-ink)] hover:text-[var(--tema-color-accent-ink)]',
      ghost:
        'bg-transparent text-[var(--tema-color-text)] border border-transparent hover:bg-[rgba(31,111,92,0.06)] hover:text-[var(--tema-color-accent-ink)]',
    };

    // Forced demo state adjustments for UI Kit showcase
    let forcedClasses = '';
    if (forcedState === 'hover') {
      if (variant === 'primary') forcedClasses = 'brightness-110 shadow-md translate-y-[-1px]';
      if (variant === 'secondary') forcedClasses = 'border-[var(--tema-color-accent-ink)] text-[var(--tema-color-accent-ink)] bg-[rgba(31,111,92,0.04)]';
      if (variant === 'ghost') forcedClasses = 'bg-[rgba(31,111,92,0.08)] text-[var(--tema-color-accent-ink)]';
    } else if (forcedState === 'focus') {
      forcedClasses = 'outline-2 outline-[var(--tema-color-accent-ink)] outline-offset-2';
    }

    const disabledClasses = effectivelyDisabled
      ? 'opacity-40 cursor-not-allowed pointer-events-none'
      : '';

    return (
      <motion.button
        ref={ref}
        type={type}
        disabled={effectivelyDisabled}
        whileHover={
          !isReducedMotion && !effectivelyDisabled && !forcedState
            ? { scale: 1.015, y: -1 }
            : undefined
        }
        whileTap={
          !isReducedMotion && !effectivelyDisabled && !forcedState
            ? { scale: 0.985, y: 0 }
            : undefined
        }
        className={`${baseClasses} ${sizeClasses} ${variantStyles[variant]} ${forcedClasses} ${disabledClasses} ${className}`}
        style={{
          borderRadius: 'var(--tema-radius)',
          fontFamily: 'var(--tema-font-label)',
        }}
        {...(props as any)}
      >
        {effectivelyLoading && (
          <Loader2
            className="w-4 h-4 animate-spin text-current"
            aria-hidden="true"
          />
        )}
        {!effectivelyLoading && leftIcon && (
          <span className="shrink-0" aria-hidden="true">{leftIcon}</span>
        )}
        <span className="truncate">{children}</span>
        {!effectivelyLoading && rightIcon && (
          <span className="shrink-0 transition-transform duration-[var(--motion-duration-fast)]" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
