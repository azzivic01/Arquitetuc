/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { SiteContent } from '../content';
import { Button } from '../components/ui/Button';
import { useMotionPreference } from '../context/MotionContext';
import { ArrowUpRight } from 'lucide-react';

export interface CtaFinalProps {
  content: SiteContent['ctaFinal'];
}

export const CtaFinal: React.FC<CtaFinalProps> = ({ content }) => {
  const { isReducedMotion } = useMotionPreference();

  if (!content.enabled) return null;

  return (
    <section
      id="cta-final"
      aria-label="Agendamento final"
      className="py-20 md:py-32 relative bg-[var(--tema-color-bg)]"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={isReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
          whileInView={isReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: isReducedMotion ? 0.15 : 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden bg-[var(--tema-color-surface)] border border-[var(--tema-color-border)] p-10 sm:p-16 lg:p-20 text-center shadow-sm"
          style={{ borderRadius: 'var(--tema-radius-lg)' }}
        >
          {/* Subtle background glow */}
          <div
            aria-hidden="true"
            className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[rgba(31,111,92,0.04)] blur-3xl pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[rgba(31,111,92,0.04)] blur-3xl pointer-events-none"
          />

          <span
            className="inline-block text-xs md:text-sm font-semibold uppercase tracking-wider text-[var(--tema-color-accent-ink)] mb-4"
            style={{ fontFamily: 'var(--tema-font-label)' }}
          >
            {content.kicker}
          </span>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-[var(--tema-color-text)] leading-tight max-w-3xl mx-auto mb-6">
            {content.title.leadingText}{' '}
            <span className="italic font-light text-[var(--tema-color-accent-ink)]">
              {content.title.highlightedWord}
            </span>{' '}
            {content.title.trailingText}
          </h2>

          <p className="text-base sm:text-lg text-[var(--tema-color-text-muted)] font-normal leading-relaxed max-w-xl mx-auto mb-10">
            {content.description}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <Button
              variant="primary"
              size="lg"
              onClick={() => {
                const el = document.querySelector(content.primaryAction.href);
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              rightIcon={<ArrowUpRight className="w-5 h-5 ml-1" />}
            >
              {content.primaryAction.label}
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => {
                const el = document.querySelector(content.secondaryAction.href);
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {content.secondaryAction.label}
            </Button>
          </div>

          <p className="text-xs text-[var(--tema-color-text-muted)] font-mono">
            {content.metadataNote}
          </p>
        </motion.div>
      </div>
    </section>
  );
};
