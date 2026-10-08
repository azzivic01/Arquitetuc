/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SiteContent } from '../content';
import { useMotionPreference } from '../context/MotionContext';
import { Eye, EyeOff } from 'lucide-react';

export interface RodapeProps {
  content: SiteContent['rodape'];
}

export const Rodape: React.FC<RodapeProps> = ({ content }) => {
  const { isReducedMotion, toggleReducedMotion } = useMotionPreference();

  if (!content.enabled) return null;

  return (
    <footer
      aria-label="Rodapé do site"
      className="border-t border-[var(--tema-color-border)] bg-[var(--tema-color-bg)] py-12 md:py-16 text-sm text-[var(--tema-color-text-muted)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-12 border-b border-[var(--tema-color-border)]">
          {/* Brand info */}
          <div className="md:col-span-5 flex flex-col items-start gap-3">
            <span className="font-display text-2xl font-normal text-[var(--tema-color-text)]">
              {content.brandName}
            </span>
            <p className="text-sm text-[var(--tema-color-text-muted)] max-w-sm leading-relaxed">
              {content.tagline}
            </p>
            <p className="text-xs font-mono text-[var(--tema-color-text-muted)]/80 mt-1">
              {content.addressMarker}
            </p>
          </div>

          {/* Nav links mirror */}
          <div className="md:col-span-4 flex flex-col gap-2">
            <span
              className="text-xs font-semibold uppercase tracking-wider text-[var(--tema-color-text)] mb-2"
              style={{ fontFamily: 'var(--tema-font-label)' }}
            >
              Navegação
            </span>
            <div className="grid grid-cols-2 gap-2">
              {content.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm hover:text-[var(--tema-color-accent-ink)] transition-colors py-1 focus-visible:outline-2 focus-visible:outline-[var(--tema-color-accent-ink)]"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Accessibility Motion Switch */}
          <div className="md:col-span-3 flex flex-col items-start md:items-end justify-between">
            <div>
              <span
                className="text-xs font-semibold uppercase tracking-wider text-[var(--tema-color-text)] mb-2 block"
                style={{ fontFamily: 'var(--tema-font-label)' }}
              >
                Acessibilidade
              </span>
              <button
                type="button"
                onClick={toggleReducedMotion}
                aria-pressed={isReducedMotion}
                className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-[var(--tema-radius)] border border-[var(--tema-color-border)] bg-[var(--tema-color-surface)] text-[var(--tema-color-text)] hover:border-[var(--tema-color-accent-ink)] hover:text-[var(--tema-color-accent-ink)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--tema-color-accent-ink)] cursor-pointer"
                style={{ fontFamily: 'var(--tema-font-label)' }}
              >
                {isReducedMotion ? (
                  <>
                    <Eye className="h-3.5 w-3.5 text-[var(--tema-color-accent-ink)]" aria-hidden="true" />
                    <span>{content.reducedMotionAction.enableLabel}</span>
                  </>
                ) : (
                  <>
                    <EyeOff className="h-3.5 w-3.5 text-[var(--tema-color-accent-ink)]" aria-hidden="true" />
                    <span>{content.reducedMotionAction.disableLabel}</span>
                  </>
                )}
              </button>
            </div>

            <div className="text-xs text-[var(--tema-color-text-muted)] mt-6 md:mt-0 md:text-right">
              {isReducedMotion ? (
                <span className="text-[var(--tema-color-accent-ink)] font-medium">
                  Animações reduzidas ativas
                </span>
              ) : (
                <span>Movimento completo ativo</span>
              )}
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--tema-color-text-muted)]/80">
          <p>{content.rights}</p>
          <a
            href="#hero"
            className="hover:text-[var(--tema-color-accent-ink)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--tema-color-accent-ink)]"
          >
            Voltar ao topo ↑
          </a>
        </div>
      </div>
    </footer>
  );
};
