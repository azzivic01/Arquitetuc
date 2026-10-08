/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { useMotionPreference } from '../../context/MotionContext';

export interface ProgressBarProps {
  value: number; // 0 to 100
  label?: string;
  showValueLabel?: boolean;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  label,
  showValueLabel = true,
  className = '',
}) => {
  const { isReducedMotion } = useMotionPreference();
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div className={`w-full flex flex-col gap-1.5 ${className}`}>
      {(label || showValueLabel) && (
        <div className="flex justify-between items-center text-xs font-semibold uppercase tracking-wider text-[var(--tema-color-text-muted)]">
          {label && <span style={{ fontFamily: 'var(--tema-font-label)' }}>{label}</span>}
          {showValueLabel && (
            <span className="font-mono text-xs">{clampedValue}%</span>
          )}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label || 'Progresso'}
        className="h-2 w-full overflow-hidden rounded-full bg-[var(--tema-color-border)]"
      >
        <motion.div
          className="h-full bg-[var(--tema-color-accent)] rounded-full"
          initial={false}
          animate={{ width: `${clampedValue}%` }}
          transition={{
            duration: isReducedMotion ? 0.1 : 0.6,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      </div>
    </div>
  );
};
