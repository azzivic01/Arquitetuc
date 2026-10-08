/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Volume2, VolumeX } from 'lucide-react';
import { NavItem, ActionItem } from '../../content';
import { Button } from './Button';
import { IconButton } from './IconButton';
import { useMotionPreference } from '../../context/MotionContext';

export interface NavigationMenuProps {
  brandName: string;
  navItems: NavItem[];
  primaryAction: ActionItem;
  soundConfig: {
    labelOn: string;
    labelOff: string;
  };
  isSoundPlaying: boolean;
  onToggleSound: () => void;
}

export const NavigationMenu: React.FC<NavigationMenuProps> = ({
  brandName,
  navItems,
  primaryAction,
  soundConfig,
  isSoundPlaying,
  onToggleSound,
}) => {
  const { isReducedMotion } = useMotionPreference();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[var(--tema-color-bg)]/90 backdrop-blur-md border-b border-[var(--tema-color-border)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="font-display text-2xl font-normal tracking-tight text-[var(--tema-color-text)] hover:text-[var(--tema-color-accent-ink)] transition-colors select-none focus-visible:outline-2 focus-visible:outline-[var(--tema-color-accent-ink)]"
        >
          {brandName}
        </a>

        {/* Zone 2: 4-6 Nav links as clean typography */}
        <nav
          aria-label="Navegação principal"
          className="hidden md:flex items-center gap-8"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[var(--tema-color-text-muted)] hover:text-[var(--tema-color-accent-ink)] transition-colors py-2 relative group focus-visible:outline-2 focus-visible:outline-[var(--tema-color-accent-ink)]"
            >
              <span>{item.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[var(--tema-color-accent-ink)] transition-all duration-[var(--motion-duration-fast)] group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary action + sound control + mobile menu toggle */}
        <div className="flex items-center gap-3">
          {/* Sound control button */}
          <IconButton
            variant="ghost"
            size="sm"
            onClick={onToggleSound}
            aria-label={isSoundPlaying ? soundConfig.labelOff : soundConfig.labelOn}
            aria-pressed={isSoundPlaying}
            title={isSoundPlaying ? soundConfig.labelOff : soundConfig.labelOn}
            className="text-[var(--tema-color-accent-ink)] hover:bg-[rgba(31,111,92,0.08)]"
          >
            {isSoundPlaying ? (
              <Volume2 className="h-4 w-4" aria-hidden="true" />
            ) : (
              <VolumeX className="h-4 w-4" aria-hidden="true" />
            )}
          </IconButton>

          {/* Primary CTA */}
          <div className="hidden sm:block">
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                const el = document.querySelector(primaryAction.href);
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {primaryAction.label}
            </Button>
          </div>

          {/* Mobile hamburger button */}
          <div className="md:hidden">
            <IconButton
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </IconButton>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={isReducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            animate={isReducedMotion ? { opacity: 1 } : { opacity: 1, height: 'auto' }}
            exit={isReducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: isReducedMotion ? 0.1 : 0.25 }}
            className="md:hidden border-b border-[var(--tema-color-border)] bg-[var(--tema-color-surface)] px-6 py-6 overflow-hidden shadow-lg"
          >
            <nav className="flex flex-col gap-4" aria-label="Navegação mobile">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className="text-lg font-medium text-[var(--tema-color-text)] hover:text-[var(--tema-color-accent-ink)] transition-colors py-2 border-b border-[var(--tema-color-border)]/50 focus-visible:outline-2 focus-visible:outline-[var(--tema-color-accent-ink)]"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => {
                    closeMobileMenu();
                    const el = document.querySelector(primaryAction.href);
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full justify-center"
                >
                  {primaryAction.label}
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
