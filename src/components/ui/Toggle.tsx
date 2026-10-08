/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { useMotionPreference } from '../../context/MotionContext';

export interface ToggleProps {
  label: string;
  description?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  forcedState?: 'checked' | 'unchecked' | 'focus' | 'disabled';
}

export const Toggle: React.FC<ToggleProps> = ({
  label,
  description,
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
  disabled = false,
  forcedState,
}) => {
  const { isReducedMotion } = useMotionPreference();
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked);

  const isChecked =
    forcedState === 'checked'
      ? true
      : forcedState === 'unchecked'
      ? false
      : controlledChecked !== undefined
      ? controlledChecked
      : internalChecked;

  const effectivelyDisabled = disabled || forcedState === 'disabled';
  const isFocus = forcedState === 'focus';

  const handleToggle = () => {
    if (effectivelyDisabled) return;
    const next = !isChecked;
    if (controlledChecked === undefined) {
      setInternalChecked(next);
    }
    onChange?.(next);
  };

  return (
    <div className="flex items-center justify-between gap-4 py-2 min-h-[44px]">
      <div>
        <span className="text-sm font-medium text-[var(--tema-color-text)]">
          {label}
        </span>
        {description && (
          <p className="text-xs text-[var(--tema-color-text-muted)] mt-0.5">
            {description}
          </p>
        )}
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={isChecked}
        aria-label={label}
        disabled={effectivelyDisabled}
        onClick={handleToggle}
        className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full p-0.5 transition-colors duration-[var(--motion-duration-base)] cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--tema-color-accent-ink)] focus-visible:outline-offset-2 ${
          isChecked
            ? 'bg-[var(--tema-color-accent)]'
            : 'bg-[var(--tema-color-border)]'
        } ${
          isFocus
            ? 'outline-2 outline-[var(--tema-color-accent-ink)] outline-offset-2 ring-2 ring-[rgba(31,111,92,0.2)]'
            : ''
        } ${effectivelyDisabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : ''}`}
      >
        <motion.span
          layout={!isReducedMotion}
          transition={{ duration: isReducedMotion ? 0.05 : 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block h-6 w-6 rounded-full bg-[var(--tema-color-surface)] shadow-xs"
          style={{
            transform: isChecked ? 'translateX(20px)' : 'translateX(0px)',
          }}
        />
      </button>
    </div>
  );
};
