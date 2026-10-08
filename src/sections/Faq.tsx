/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { FaqItem } from '../content';
import { Accordion } from '../components/ui/Accordion';

export interface FaqProps {
  items: FaqItem[];
}

export const Faq: React.FC<FaqProps> = ({ items }) => {
  const enabledItems = items.filter((item) => item.enabled);

  const accordionItems = enabledItems.map((item) => ({
    id: item.id,
    title: item.question,
    content: (
      <div>
        <p className="mb-2 leading-relaxed">{item.answer}</p>
        <span
          className="inline-block text-[12px] font-semibold tracking-wider uppercase text-[var(--tema-color-accent-ink)]"
          style={{ fontFamily: 'var(--tema-font-label)' }}
        >
          {item.category}
        </span>
      </div>
    ),
  }));

  return (
    <section
      id="faq"
      aria-label="Perguntas frequentes sobre o atendimento"
      className="py-20 md:py-32 relative bg-[var(--tema-color-bg)]"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <span
            className="text-xs md:text-sm font-semibold uppercase tracking-wider text-[var(--tema-color-accent-ink)]"
            style={{ fontFamily: 'var(--tema-font-label)' }}
          >
            Esclarecimentos
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-[var(--tema-color-text)] mt-3 mb-6">
            Dúvidas{' '}
            <span className="italic font-light text-[var(--tema-color-accent-ink)]">
              frequentes
            </span>{' '}
            sobre as consultas.
          </h2>
          <p className="text-base sm:text-lg text-[var(--tema-color-text-muted)] font-normal leading-relaxed max-w-2xl mx-auto">
            Transparência desde o primeiro momento. Se restar alguma dúvida que não esteja aqui, fique à vontade para nos escrever.
          </p>
        </div>

        {/* Accordion */}
        <div className="bg-[var(--tema-color-surface)] p-6 sm:p-10 rounded-[var(--tema-radius-lg)] border border-[var(--tema-color-border)] shadow-xs">
          <Accordion items={accordionItems} defaultOpenId={enabledItems[0]?.id} />
        </div>
      </div>
    </section>
  );
};
