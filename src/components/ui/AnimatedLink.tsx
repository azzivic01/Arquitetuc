/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { useMotionPreference } from '../../context/MotionContext';

export interface AnimatedLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  forcedHover?: boolean;
}

export const AnimatedLink: React.FC<AnimatedLinkProps> = ({
  href,
  children,
  className = '',
  forcedHover = false,
  ...props
}) => {
  const { isReducedMotion } = useMotionPreference();
  const [isHovered, setIsHovered] = React.useState(false);
  const activeHover = isHovered || forcedHover;

  return (
    <a
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative inline-flex items-center text-sm font-medium text-[var(--tema-color-text)] transition-colors duration-[var(--motion-duration-fast)] hover:text-[var(--tema-color-accent-ink)] focus-visible:outline-2 focus-visible:outline-[var(--tema-color-accent-ink)] focus-visible:outline-offset-2 py-1 ${className}`}
      {...props}
    >
      <span>{children}</span>
      <motion.span
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-[1.5px] bg-[var(--tema-color-accent-ink)]"
        initial={false}
        animate={{
          width: activeHover ? '100%' : '0%',
        }}
        transition={{
          duration: isReducedMotion ? 0.1 : 0.25,
          ease: [0.16, 1, 0.3, 1],
        }}
      />
    </a>
  );
};
