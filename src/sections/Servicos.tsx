/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ServiceItem } from '../content';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { useMotionPreference } from '../context/MotionContext';
import { ArrowRight, Sparkles } from 'lucide-react';

export interface ServicosProps {
  items: ServiceItem[];
}

export const Servicos: React.FC<ServicosProps> = ({ items }) => {
  const { isReducedMotion } = useMotionPreference();
  const enabledItems = items.filter((item) => item.enabled);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isReducedMotion ? 0 : 0.08,
      },
    },
  };

  const easeCinematic = [0.16, 1, 0.3, 1] as const;

  const cardVariants = {
    hidden: isReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isReducedMotion ? 0.15 : 0.6,
        ease: easeCinematic,
      },
    },
  };

  return (
    <section
      id="servicos"
      aria-label="Serviços clínicos dermatológicos"
      className="py-20 md:py-32 relative bg-[var(--tema-color-bg)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <span
            className="text-xs md:text-sm font-semibold uppercase tracking-wider text-[var(--tema-color-accent-ink)]"
            style={{ fontFamily: 'var(--tema-font-label)' }}
          >
            Serviços & Atuação
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-[var(--tema-color-text)] mt-3 mb-6">
            Atenção integral focada no{' '}
            <span className="italic font-light text-[var(--tema-color-accent-ink)]">
              equilíbrio
            </span>{' '}
            da barreira cutânea.
          </h2>
          <p className="text-base sm:text-lg text-[var(--tema-color-text-muted)] font-normal leading-relaxed">
            Abordamos a dermatologia clínica com seriedade, diagnosticando as causas profundas e construindo hábitos descomplicados.
          </p>
        </div>

        {/* Services Cards Grid with staggered entry */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10%' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {enabledItems.map((service) => (
            <motion.div key={service.id} variants={cardVariants} className="h-full">
              <Card
                clickable
                className="h-full flex flex-col justify-between p-8 bg-[var(--tema-color-surface)] border border-[var(--tema-color-border)] hover:border-[var(--tema-color-accent-ink)] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-6">
                    <Badge variant="subtle" size="sm">
                      {service.category}
                    </Badge>
                    <span className="text-xs text-[var(--tema-color-text-muted)] font-mono">
                      {service.note}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-normal text-[var(--tema-color-text)] mb-3">
                    {service.title}{' '}
                    <span className="italic font-light text-[var(--tema-color-accent-ink)]">
                      {service.highlightedWord}
                    </span>
                  </h3>

                  <p className="text-sm font-medium text-[var(--tema-color-accent-ink)] mb-4">
                    {service.summary}
                  </p>

                  <p className="text-sm text-[var(--tema-color-text-muted)] leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-2 pt-6 border-t border-[var(--tema-color-border)] mb-6">
                    {service.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs text-[var(--tema-color-text-muted)] bg-[var(--tema-color-bg)] px-2.5 py-1 rounded-[6px] border border-[var(--tema-color-border)]/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-between px-0 hover:px-2 text-[var(--tema-color-accent-ink)] hover:text-[var(--tema-color-accent-ink)]"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                    onClick={() => {
                      const el = document.querySelector('#visite');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Saber sobre agendamento
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
