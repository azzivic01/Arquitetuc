/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ZoomIn } from 'lucide-react';
import { GalleryItem } from '../../content';
import { useMotionPreference } from '../../context/MotionContext';

export interface GalleryGridProps {
  items: GalleryItem[];
}

export const GalleryGrid: React.FC<GalleryGridProps> = ({ items }) => {
  const { isReducedMotion } = useMotionPreference();
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  useEffect(() => {
    if (selectedItem) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setSelectedItem(null);
      };
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
      };
    }
  }, [selectedItem]);

  return (
    <div className="w-full">
      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {items.map((item) => (
          <motion.div
            key={item.id}
            layoutId={isReducedMotion ? undefined : `gallery-card-${item.id}`}
            onClick={() => setSelectedItem(item)}
            className="group relative cursor-pointer overflow-hidden bg-[var(--tema-color-surface)] border border-[var(--tema-color-border)] shadow-xs hover:border-[var(--tema-color-accent-ink)] transition-all duration-[var(--motion-duration-slow)] focus-visible:outline-2 focus-visible:outline-[var(--tema-color-accent-ink)]"
            style={{ borderRadius: 'var(--tema-radius)' }}
            tabIndex={0}
            role="button"
            aria-label={`Visualizar imagem: ${item.title}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelectedItem(item);
              }
            }}
          >
            {/* Image Container with Reveal and Hover Zoom */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--tema-color-bg)]">
              <motion.img
                src={item.image}
                alt={item.imageAlt}
                className="h-full w-full object-cover transition-transform duration-[var(--motion-duration-cinematic)] ease-[var(--motion-ease-cinematic)] group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-[var(--motion-duration-base)] flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-[var(--motion-duration-base)] flex h-12 w-12 items-center justify-center rounded-full bg-[var(--tema-color-surface)]/90 text-[var(--tema-color-accent-ink)] shadow-md">
                  <ZoomIn className="h-5 w-5" aria-hidden="true" />
                </span>
              </div>
            </div>

            {/* Caption bar */}
            <div className="p-4 flex items-center justify-between">
              <div>
                <span
                  className="text-[12px] font-semibold uppercase tracking-wider text-[var(--tema-color-accent-ink)]"
                  style={{ fontFamily: 'var(--tema-font-label)' }}
                >
                  {item.category}
                </span>
                <p className="font-display text-base font-normal text-[var(--tema-color-text)]">
                  {item.title}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal with Shared Layout Transition */}
      <AnimatePresence>
        {selectedItem && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={selectedItem.title}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: isReducedMotion ? 0.1 : 0.3 }}
              onClick={() => setSelectedItem(null)}
              aria-hidden="true"
              className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            />

            {/* Lightbox Container */}
            <motion.div
              layoutId={isReducedMotion ? undefined : `gallery-card-${selectedItem.id}`}
              initial={isReducedMotion ? { opacity: 0 } : false}
              animate={isReducedMotion ? { opacity: 1 } : false}
              exit={isReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: isReducedMotion ? 0.1 : 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-hidden bg-[var(--tema-color-surface)] border border-[var(--tema-color-border)] shadow-2xl flex flex-col"
              style={{ borderRadius: 'var(--tema-radius-lg)' }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 md:p-6 border-b border-[var(--tema-color-border)]">
                <div>
                  <span
                    className="text-[12px] font-semibold uppercase tracking-wider text-[var(--tema-color-accent-ink)]"
                    style={{ fontFamily: 'var(--tema-font-label)' }}
                  >
                    {selectedItem.category}
                  </span>
                  <h3 className="font-display text-xl md:text-2xl font-normal text-[var(--tema-color-text)]">
                    {selectedItem.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  aria-label="Fechar visualização da imagem"
                  className="flex h-11 w-11 items-center justify-center rounded-full text-[var(--tema-color-text-muted)] hover:text-[var(--tema-color-text)] hover:bg-[rgba(31,111,92,0.06)] focus-visible:outline-2 focus-visible:outline-[var(--tema-color-accent-ink)] cursor-pointer"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              {/* Image presentation */}
              <div className="relative flex-1 min-h-[300px] md:min-h-[460px] bg-neutral-900 flex items-center justify-center overflow-hidden">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.imageAlt}
                  className="max-h-[65vh] w-full object-contain"
                />
              </div>

              {/* Caption */}
              <div className="p-4 md:p-6 bg-[var(--tema-color-surface)] text-sm md:text-base text-[var(--tema-color-text-muted)]">
                {selectedItem.caption}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
