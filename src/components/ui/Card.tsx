/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { useMotionPreference } from '../../context/MotionContext';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  image?: string;
  imageAlt?: string;
  clickable?: boolean;
  forcedHover?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      image,
      imageAlt = '',
      clickable = false,
      forcedHover = false,
      className = '',
      onClick,
      ...props
    },
    ref
  ) => {
    const { isReducedMotion } = useMotionPreference();

    const baseStyles =
      'overflow-hidden bg-[var(--tema-color-surface)] border border-[var(--tema-color-border)] shadow-xs transition-all duration-[var(--motion-duration-slow)] ease-[var(--motion-ease-cinematic)]';

    const hoverClasses =
      clickable || forcedHover
        ? 'cursor-pointer hover:border-[var(--tema-color-accent-ink)] hover:shadow-md'
        : '';

    const forcedClasses = forcedHover
      ? 'border-[var(--tema-color-accent-ink)] shadow-md translate-y-[-2px]'
      : '';

    return (
      <motion.div
        ref={ref}
        onClick={onClick}
        whileHover={
          clickable && !isReducedMotion && !forcedHover
            ? { y: -3, transition: { duration: 0.3 } }
            : undefined
        }
        className={`${baseStyles} ${hoverClasses} ${forcedClasses} ${className}`}
        style={{
          borderRadius: 'var(--tema-radius)',
        }}
        {...(props as any)}
      >
        {image && (
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--tema-color-bg)]">
            <img
              src={image}
              alt={imageAlt}
              className="h-full w-full object-cover transition-transform duration-[var(--motion-duration-slow)] ease-[var(--motion-ease-cinematic)] group-hover:scale-102"
              loading="lazy"
            />
          </div>
        )}
        <div className="p-6 md:p-8">{children}</div>
      </motion.div>
    );
  }
);

Card.displayName = 'Card';
