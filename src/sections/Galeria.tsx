/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { GalleryItem } from '../content';
import { GalleryGrid } from '../components/ui/GalleryGrid';

export interface GaleriaProps {
  items: GalleryItem[];
}

export const Galeria: React.FC<GaleriaProps> = ({ items }) => {
  const enabledItems = items.filter((item) => item.enabled);

  return (
    <section
      id="galeria"
      aria-label="Espaço e detalhes da clínica Alba"
      className="py-20 md:py-32 relative bg-[var(--tema-color-bg)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <span
            className="text-xs md:text-sm font-semibold uppercase tracking-wider text-[var(--tema-color-accent-ink)]"
            style={{ fontFamily: 'var(--tema-font-label)' }}
          >
            Nosso Espaço
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-[var(--tema-color-text)] mt-3 mb-6">
            Luz natural, silêncio e detalhes pensados para{' '}
            <span className="italic font-light text-[var(--tema-color-accent-ink)]">
              desacelerar
            </span>
            .
          </h2>
          <p className="text-base sm:text-lg text-[var(--tema-color-text-muted)] font-normal leading-relaxed">
            Clique em cada imagem para explorar os materiais táteis, a iluminação difusa e a atmosfera serena do nosso consultório.
          </p>
        </div>

        {/* Gallery Grid with shared layout lightbox */}
        <GalleryGrid items={enabledItems} />
      </div>
    </section>
  );
};
