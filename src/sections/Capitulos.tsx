/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ChapterItem } from '../content';
import { useMotionPreference } from '../context/MotionContext';
import { Check } from 'lucide-react';

export interface CapitulosProps {
  items: ChapterItem[];
}

export const Capitulos: React.FC<CapitulosProps> = ({ items }) => {
  const { isReducedMotion } = useMotionPreference();
  const sectionRef = useRef<HTMLDivElement>(null);

  // Scroll progress for the entire Capitulos section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start center', 'end end'],
  });

  // Calculate SVG strokeDashoffset animation
  // Line drawing effect:
  const strokePathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const enabledItems = items.filter((item) => item.enabled);

  return (
    <section
      id="capitulos"
      ref={sectionRef}
      aria-label="Capítulos do atendimento"
      className="relative py-20 md:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <span
            className="text-xs md:text-sm font-semibold uppercase tracking-wider text-[var(--tema-color-accent-ink)]"
            style={{ fontFamily: 'var(--tema-font-label)' }}
          >
            A Linha de Cuidado
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-[var(--tema-color-text)] mt-3 mb-6">
            Quatro momentos para acolher a sua pele com{' '}
            <span className="italic font-light text-[var(--tema-color-accent-ink)]">
              atenção
            </span>
            .
          </h2>
          <p className="text-base sm:text-lg text-[var(--tema-color-text-muted)] font-normal leading-relaxed">
            Cada etapa do atendimento foi estruturada para garantir clareza, respeito ao seu tempo e soluções que realmente se mantêm na sua rotina.
          </p>
        </div>

        {/* Chapters container with interactive Care Line */}
        <div className="relative">
          {/* THE SIGNATURE SVG "LINHA DE CUIDADO" (Desktop lateral line) */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute left-8 top-12 bottom-12 w-8 pointer-events-none z-10"
          >
            {/* Background trace */}
            <div className="absolute left-[15px] top-0 bottom-0 w-[2px] bg-[var(--tema-color-border)] opacity-60" />

            {/* Dynamic drawing line */}
            <svg className="absolute left-0 top-0 h-full w-8 overflow-visible">
              <motion.line
                x1="16"
                y1="0"
                x2="16"
                y2="100%"
                stroke="var(--tema-color-accent)"
                strokeWidth="2.5"
                strokeLinecap="round"
                style={{
                  pathLength: isReducedMotion ? 1 : strokePathLength,
                }}
              />
            </svg>
          </div>

          {/* List of narrative chapters */}
          <div className="flex flex-col gap-20 md:gap-32 lg:pl-24">
            {enabledItems.map((chapter, index) => {
              const isEven = index % 2 === 0;

              return (
                <ChapterRow
                  key={chapter.id}
                  chapter={chapter}
                  index={index}
                  total={enabledItems.length}
                  isEven={isEven}
                  isReducedMotion={isReducedMotion}
                  sectionScrollProgress={scrollYProgress}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

interface ChapterRowProps {
  chapter: ChapterItem;
  index: number;
  total: number;
  isEven: boolean;
  isReducedMotion: boolean;
  sectionScrollProgress: any;
}

const ChapterRow: React.FC<ChapterRowProps> = ({
  chapter,
  index,
  total,
  isEven,
  isReducedMotion,
  sectionScrollProgress,
}) => {
  const rowRef = useRef<HTMLDivElement>(null);

  // Step milestone threshold in progress
  const stepThreshold = index / (total - 1);

  // Parallax on image relative to this row
  const { scrollYProgress: rowScroll } = useScroll({
    target: rowRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(rowScroll, [0, 1], isReducedMotion ? [0, 0] : [-25, 25]);

  return (
    <div
      ref={rowRef}
      id={chapter.id}
      className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
    >
      {/* Indicator waypoint for mobile and desktop */}
      <div className="flex items-center gap-4 lg:hidden">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--tema-color-accent)] text-[var(--tema-color-on-accent)] font-semibold text-xs">
          {chapter.stepNumber}
        </span>
        <span
          className="text-xs font-semibold uppercase tracking-wider text-[var(--tema-color-accent-ink)]"
          style={{ fontFamily: 'var(--tema-font-label)' }}
        >
          {chapter.stepName}
        </span>
      </div>

      {/* Text Column */}
      <motion.div
        initial={isReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
        whileInView={isReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: isReducedMotion ? 0.15 : 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`lg:col-span-6 flex flex-col items-start ${
          isEven ? 'lg:order-1' : 'lg:order-2'
        }`}
      >
        {/* Step indicator in desktop */}
        <div className="hidden lg:flex items-center gap-3 mb-4">
          <motion.div
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--tema-color-accent)] font-semibold text-xs transition-colors"
            style={{
              backgroundColor: isReducedMotion ? 'var(--tema-color-accent)' : undefined,
              color: isReducedMotion ? 'var(--tema-color-on-accent)' : undefined,
            }}
            whileInView={{
              backgroundColor: 'var(--tema-color-accent)',
              color: 'var(--tema-color-on-accent)',
            }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.5 }}
          >
            {chapter.stepNumber}
          </motion.div>
          <span
            className="text-xs font-semibold uppercase tracking-wider text-[var(--tema-color-accent-ink)]"
            style={{ fontFamily: 'var(--tema-font-label)' }}
          >
            {chapter.stepName}
          </span>
        </div>

        <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-light text-[var(--tema-color-text)] mb-3 leading-tight">
          {chapter.title}{' '}
          <span className="italic font-light text-[var(--tema-color-accent-ink)]">
            {chapter.highlightedWord}
          </span>
        </h3>

        <p className="text-sm md:text-base font-medium text-[var(--tema-color-accent-ink)] mb-4">
          {chapter.subtitle}
        </p>

        <p className="text-base text-[var(--tema-color-text-muted)] font-normal leading-relaxed mb-6">
          {chapter.description}
        </p>

        <ul className="flex flex-col gap-2.5 w-full border-t border-[var(--tema-color-border)] pt-4">
          {chapter.details.map((detail, idx) => (
            <li
              key={idx}
              className="flex items-center gap-3 text-sm text-[var(--tema-color-text)]"
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[rgba(31,111,92,0.1)] text-[var(--tema-color-accent-ink)]">
                <Check className="h-3 w-3 stroke-[2.5]" aria-hidden="true" />
              </span>
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Image Column with Mask Reveal and Parallax (Item c & b) */}
      <motion.div
        initial={
          isReducedMotion
            ? { opacity: 0 }
            : { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 }
        }
        whileInView={
          isReducedMotion
            ? { opacity: 1 }
            : { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }
        }
        viewport={{ once: true, margin: '-12%' }}
        transition={{ duration: isReducedMotion ? 0.2 : 0.9, ease: [0.16, 1, 0.3, 1] }}
        className={`lg:col-span-6 relative overflow-hidden bg-[var(--tema-color-surface)] border border-[var(--tema-color-border)] shadow-sm aspect-[4/3] w-full ${
          isEven ? 'lg:order-2' : 'lg:order-1'
        }`}
        style={{ borderRadius: 'var(--tema-radius-lg)' }}
      >
        <motion.div
          style={{ y: imageY }}
          className="relative h-[115%] w-full -top-[7.5%]"
        >
          <img
            src={chapter.image}
            alt={chapter.imageAlt}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};
