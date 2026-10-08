/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { useMotionPreference } from '../../context/MotionContext';

export interface AccordionItemData {
  id: string;
  title: string;
  content: string | React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItemData[];
  defaultOpenId?: string;
  allowMultiple?: boolean;
  forcedOpenId?: string;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  defaultOpenId,
  allowMultiple = false,
  forcedOpenId,
  className = '',
}) => {
  const { isReducedMotion } = useMotionPreference();
  const [openIds, setOpenIds] = useState<string[]>(
    defaultOpenId ? [defaultOpenId] : []
  );

  const toggle = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={`divide-y divide-[var(--tema-color-border)] border-y border-[var(--tema-color-border)] ${className}`}>
      {items.map((item) => {
        const isOpen = forcedOpenId === item.id || openIds.includes(item.id);

        return (
          <div key={item.id} className="group py-1">
            <h3>
              <button
                type="button"
                id={`accordion-btn-${item.id}`}
                aria-expanded={isOpen}
                aria-controls={`accordion-panel-${item.id}`}
                onClick={() => toggle(item.id)}
                className="flex w-full min-h-[48px] items-center justify-between py-4 text-left font-display text-lg md:text-xl font-medium text-[var(--tema-color-text)] transition-colors duration-[var(--motion-duration-fast)] hover:text-[var(--tema-color-accent-ink)] focus-visible:outline-2 focus-visible:outline-[var(--tema-color-accent-ink)] focus-visible:outline-offset-2"
              >
                <span className="pr-4">{item.title}</span>
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--tema-color-border)] text-[var(--tema-color-text-muted)] transition-all duration-[var(--motion-duration-base)] group-hover:border-[var(--tema-color-accent-ink)] group-hover:text-[var(--tema-color-accent-ink)]"
                  style={{
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                >
                  <ChevronDown className="h-4 w-4" aria-hidden="true" />
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`accordion-panel-${item.id}`}
                  role="region"
                  aria-labelledby={`accordion-btn-${item.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: 'auto',
                    opacity: 1,
                    transition: {
                      height: { duration: isReducedMotion ? 0.1 : 0.35, ease: [0.16, 1, 0.3, 1] },
                      opacity: { duration: isReducedMotion ? 0.1 : 0.25 },
                    },
                  }}
                  exit={{
                    height: 0,
                    opacity: 0,
                    transition: {
                      height: { duration: isReducedMotion ? 0.1 : 0.25 },
                      opacity: { duration: 0.15 },
                    },
                  }}
                  className="overflow-hidden"
                >
                  <div className="pb-6 pt-1 text-base leading-relaxed text-[var(--tema-color-text-muted)]">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
