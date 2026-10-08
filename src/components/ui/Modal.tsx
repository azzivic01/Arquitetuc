/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useMotionPreference } from '../../context/MotionContext';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'md',
}) => {
  const { isReducedMotion } = useMotionPreference();
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  // Store trigger element and manage focus
  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement as HTMLElement;

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }

        // Trap focus inside modal
        if (e.key === 'Tab' && modalRef.current) {
          const focusable = modalRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusable.length === 0) return;

          const first = focusable[0];
          const last = focusable[focusable.length - 1];

          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';

      // Focus first element or modal container
      setTimeout(() => {
        const closeBtn = modalRef.current?.querySelector('button');
        closeBtn?.focus();
      }, 50);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
        triggerRef.current?.focus();
      };
    }
  }, [isOpen, onClose]);

  const maxWClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  }[maxWidth];

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
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

          {/* Dialog Container */}
          <motion.div
            ref={modalRef}
            initial={isReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 12 }}
            animate={isReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={isReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: isReducedMotion ? 0.1 : 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={`relative z-10 w-full ${maxWClasses} bg-[var(--tema-color-surface)] border border-[var(--tema-color-border)] shadow-xl p-6 md:p-8`}
            style={{ borderRadius: 'var(--tema-radius-lg)' }}
          >
            <div className="flex items-center justify-between pb-4 border-b border-[var(--tema-color-border)]">
              <h2
                id="modal-title"
                className="font-display text-2xl font-normal text-[var(--tema-color-text)]"
              >
                {title}
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar janela"
                className="flex h-11 w-11 items-center justify-center rounded-full text-[var(--tema-color-text-muted)] hover:text-[var(--tema-color-text)] hover:bg-[rgba(31,111,92,0.06)] focus-visible:outline-2 focus-visible:outline-[var(--tema-color-accent-ink)]"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="pt-6">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
