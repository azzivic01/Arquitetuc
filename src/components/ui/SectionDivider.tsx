/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export interface SectionDividerProps {
  className?: string;
  withMark?: boolean;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({
  className = '',
  withMark = false,
}) => {
  return (
    <div
      role="separator"
      className={`relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12 md:my-16 ${className}`}
    >
      <div className="h-[1px] w-full bg-[var(--tema-color-border)]" />
      {withMark && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--tema-color-bg)] px-4">
          <div className="h-1.5 w-1.5 rounded-full bg-[var(--tema-color-accent-ink)] opacity-60" />
        </div>
      )}
    </div>
  );
};
