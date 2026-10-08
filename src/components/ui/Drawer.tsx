/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useMotionPreference } from '../../context/MotionContext';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  position?: 'right' | 'left';
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  children,
  position = 'right',
}) => {
  const { isReducedMotion } = useMotionPreference();
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
      };
    }
  }, [isOpen, onClose]);

  const slideInitial = position === 'right' ? { x: '100%' } : { x: '-100%' };
  const slideExit = position === 'right' ? { x: '100%' } : { x: '-100%' };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex"
          role="dialog"
          aria-modal="true"
          aria-labelledby="drawer-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: isReducedMotion ? 0.1 : 0.25 }}
            onClick={onClose}
            aria-hidden="true"
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
          />

          {/* Drawer Sheet */}
          <motion.div
            ref={drawerRef}
            initial={isReducedMotion ? { opacity: 0 } : slideInitial}
            animate={isReducedMotion ? { opacity: 1 } : { x: 0 }}
            exit={isReducedMotion ? { opacity: 0 } : slideExit}
            transition={{ duration: isReducedMotion ? 0.1 : 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={`relative z-10 flex h-full w-full max-w-md flex-col bg-[var(--tema-color-surface)] border-l border-[var(--tema-color-border)] p-6 shadow-2xl ${
              position === 'right' ? 'ml-auto' : 'mr-auto'
            }`}
          >
            <div className="flex items-center justify-between pb-4 border-b border-[var(--tema-color-border)]">
              <h2
                id="drawer-title"
                className="font-display text-xl font-medium text-[var(--tema-color-text)]"
              >
                {title}
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar painel lateral"
                className="flex h-11 w-11 items-center justify-center rounded-full text-[var(--tema-color-text-muted)] hover:text-[var(--tema-color-text)] hover:bg-[rgba(31,111,92,0.06)] focus-visible:outline-2 focus-visible:outline-[var(--tema-color-accent-ink)]"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-6">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
