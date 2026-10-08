/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useMotionPreference } from '../../context/MotionContext';

export interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom';
  forcedVisible?: boolean;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  forcedVisible = false,
}) => {
  const { isReducedMotion } = useMotionPreference();
  const [isVisible, setIsVisible] = useState(false);
  const show = isVisible || forcedVisible;

  const posClasses =
    position === 'top'
      ? 'bottom-full left-1/2 -translate-x-1/2 mb-2'
      : 'top-full left-1/2 -translate-x-1/2 mt-2';

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {show && (
          <motion.div
            role="tooltip"
            initial={isReducedMotion ? { opacity: 0 } : { opacity: 0, y: position === 'top' ? 4 : -4 }}
            animate={isReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={isReducedMotion ? { opacity: 0 } : { opacity: 0, y: position === 'top' ? 4 : -4 }}
            transition={{ duration: isReducedMotion ? 0.05 : 0.15 }}
            className={`absolute ${posClasses} z-50 pointer-events-none whitespace-nowrap px-3 py-1.5 text-xs font-medium bg-[var(--tema-color-text)] text-[var(--tema-color-bg)] rounded-[var(--tema-radius)] shadow-md`}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
