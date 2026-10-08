/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { SiteContent } from '../content';
import { Button } from '../components/ui/Button';
import { useMotionPreference } from '../context/MotionContext';
import { ArrowDown, MapPin } from 'lucide-react';

export interface HeroProps {
  content: SiteContent['hero'];
}

export const Hero: React.FC<HeroProps> = ({ content }) => {
  const { isReducedMotion } = useMotionPreference();

  if (!content.enabled) return null;

  // Words for mask animation
  const leadingWords = content.title.leadingText.split(' ');
  const trailingWords = content.title.trailingText.split(' ');

  const easeCinematic = [0.16, 1, 0.3, 1] as const;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isReducedMotion ? 0 : 0.08,
        delayChildren: isReducedMotion ? 0 : 0.1,
      },
    },
  };

  const wordVariants = {
    hidden: isReducedMotion ? { opacity: 0 } : { y: 24, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: isReducedMotion ? 0.15 : 0.7,
        ease: easeCinematic,
      },
    },
  };

  const fadeUpVariants = {
    hidden: isReducedMotion ? { opacity: 0 } : { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: isReducedMotion ? 0.15 : 0.7,
        ease: easeCinematic,
      },
    },
  };

  return (
    <section
      id="hero"
      aria-label="Apresentação da clínica Alba"
      className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Text Column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Kicker */}
            <motion.div variants={fadeUpVariants} className="mb-4">
              <span
                className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold uppercase tracking-wider text-[var(--tema-color-accent-ink)]"
                style={{ fontFamily: 'var(--tema-font-label)' }}
              >
                <span className="w-2 h-2 rounded-full bg-[var(--tema-color-accent-ink)] opacity-75" />
                {content.kicker}
              </span>
            </motion.div>

            {/* The SINGLE <h1> of the entire page */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-[var(--tema-color-text)] leading-[1.08] tracking-tight mb-6">
              {leadingWords.map((word, i) => (
                <span key={`lead-${i}`} className="inline-block overflow-hidden mr-[0.25em]">
                  <motion.span variants={wordVariants} className="inline-block">
                    {word}
                  </motion.span>
                </span>
              ))}
              <span className="inline-block overflow-hidden mr-[0.25em]">
                <motion.span
                  variants={wordVariants}
                  className="inline-block italic font-light text-[var(--tema-color-accent-ink)]"
                >
                  {content.title.highlightedWord}
                </motion.span>
              </span>
              {trailingWords.map((word, i) => (
                <span key={`trail-${i}`} className="inline-block overflow-hidden mr-[0.25em]">
                  <motion.span variants={wordVariants} className="inline-block">
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>

            {/* Description */}
            <motion.p
              variants={fadeUpVariants}
              className="text-lg sm:text-xl text-[var(--tema-color-text-muted)] font-normal leading-relaxed max-w-xl mb-8"
            >
              {content.description}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUpVariants}
              className="flex flex-wrap items-center gap-4 mb-8"
            >
              <Button
                variant="primary"
                size="lg"
                onClick={() => {
                  const el = document.querySelector(content.primaryAction.href);
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                rightIcon={<ArrowDown className="w-4 h-4 ml-1" />}
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
            </motion.div>

            {/* Metadata Note */}
            <motion.div
              variants={fadeUpVariants}
              className="flex items-center gap-2 text-xs md:text-sm text-[var(--tema-color-text-muted)] border-t border-[var(--tema-color-border)]/70 pt-4 w-full"
            >
              <MapPin className="w-4 h-4 text-[var(--tema-color-accent-ink)] shrink-0" aria-hidden="true" />
              <span>{content.metadataNote}</span>
            </motion.div>
          </motion.div>

          {/* Visual Carrier / Image Column */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={
                isReducedMotion
                  ? { opacity: 0 }
                  : { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 }
              }
              animate={
                isReducedMotion
                  ? { opacity: 1 }
                  : { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }
              }
              transition={{
                duration: isReducedMotion ? 0.2 : 1.0,
                ease: [0.16, 1, 0.3, 1],
                delay: isReducedMotion ? 0 : 0.3,
              }}
              className="relative overflow-hidden border border-[var(--tema-color-border)] shadow-md aspect-[4/5] w-full bg-[var(--tema-color-surface)]"
              style={{ borderRadius: 'var(--tema-radius-lg)' }}
            >
              <motion.img
                src={content.image}
                alt={content.imageAlt}
                animate={
                  isReducedMotion
                    ? undefined
                    : {
                        scale: [1, 1.025, 1],
                      }
                }
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="h-full w-full object-cover"
                loading="eager"
              />

              {/* Subtle ambient light gradient */}
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[var(--tema-color-text)]/15 via-transparent to-transparent"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
