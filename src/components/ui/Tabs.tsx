/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useMotionPreference } from '../../context/MotionContext';

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  defaultTabId?: string;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultTabId,
  className = '',
}) => {
  const { isReducedMotion } = useMotionPreference();
  const [activeTab, setActiveTab] = useState(defaultTabId || tabs[0]?.id);

  const activeContent = tabs.find((t) => t.id === activeTab)?.content;

  return (
    <div className={`w-full ${className}`}>
      {/* Tab list */}
      <div
        role="tablist"
        aria-label="Opções de navegação"
        className="flex items-center gap-2 border-b border-[var(--tema-color-border)] pb-2 overflow-x-auto"
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`tabpanel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveTab(tab.id)}
              className={`relative min-h-[44px] px-4 py-2 text-xs md:text-sm font-semibold tracking-wider uppercase transition-colors cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-[var(--tema-color-accent-ink)] focus-visible:outline-offset-2 ${
                isActive
                  ? 'text-[var(--tema-color-accent-ink)]'
                  : 'text-[var(--tema-color-text-muted)] hover:text-[var(--tema-color-text)]'
              }`}
              style={{ fontFamily: 'var(--tema-font-label)' }}
            >
              <span>{tab.label}</span>
              {isActive && (
                <motion.div
                  layoutId={isReducedMotion ? undefined : 'active-tab-line'}
                  className="absolute bottom-[-9px] left-0 right-0 h-[2px] bg-[var(--tema-color-accent-ink)]"
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab panel */}
      <div
        role="tabpanel"
        id={`tabpanel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
        className="pt-6"
      >
        {activeContent}
      </div>
    </div>
  );
};
