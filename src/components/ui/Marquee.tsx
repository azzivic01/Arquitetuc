/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { useMotionPreference } from '../../context/MotionContext';

export interface MarqueeProps {
  items: string[];
  separator?: string;
  speed?: number; // seconds for full cycle
  className?: string;
}

export const Marquee: React.FC<MarqueeProps> = ({
  items,
  separator = '·',
  speed = 35,
  className = '',
}) => {
  const { isReducedMotion } = useMotionPreference();

  if (isReducedMotion) {
    return (
      <div className={`overflow-x-auto py-3 border-y border-[var(--tema-color-border)] ${className}`}>
        <div className="flex items-center justify-center gap-6 text-xs md:text-sm font-semibold tracking-wider uppercase text-[var(--tema-color-text-muted)] select-none">
          {items.map((item, idx) => (
            <React.Fragment key={idx}>
              <span>{item}</span>
              {idx < items.length - 1 && <span className="opacity-40">{separator}</span>}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden py-3 border-y border-[var(--tema-color-border)] select-none group ${className}`}>
      <motion.div
        className="flex whitespace-nowrap gap-8 text-xs md:text-sm font-semibold tracking-wider uppercase text-[var(--tema-color-text-muted)] w-max"
        style={{ fontFamily: 'var(--tema-font-label)' }}
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: speed,
        }}
      >
        {/* Render twice for continuous loop */}
        {[...items, ...items, ...items, ...items].map((item, idx) => (
          <div key={idx} className="flex items-center gap-8">
            <span className="hover:text-[var(--tema-color-accent-ink)] transition-colors">
              {item}
            </span>
            <span className="text-[var(--tema-color-accent-ink)] opacity-50" aria-hidden="true">
              {separator}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
