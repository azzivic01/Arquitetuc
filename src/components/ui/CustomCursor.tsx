/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useMotionPreference } from '../../context/MotionContext';

export const CustomCursor: React.FC = () => {
  const { isReducedMotion } = useMotionPreference();
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isPointerDevice, setIsPointerDevice] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on devices with fine pointer (mouse, trackpad)
    const media = window.matchMedia('(pointer: fine)');
    setIsPointerDevice(media.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsPointerDevice(e.matches);
    };

    media.addEventListener('change', handleMediaChange);
    return () => media.removeEventListener('change', handleMediaChange);
  }, []);

  useEffect(() => {
    if (!isPointerDevice || isReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = !!target.closest('button, a, input, textarea, select, [role="button"], [data-cursor="interactive"]');
        setIsHovered(isInteractive);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isPointerDevice, isReducedMotion, isVisible]);

  if (!isPointerDevice || isReducedMotion || !isVisible) {
    return null;
  }

  return (
    <motion.div
      aria-hidden="true"
      className="fixed pointer-events-none z-50 rounded-full border transition-colors"
      style={{
        left: 0,
        top: 0,
        borderColor: isHovered ? 'var(--tema-color-accent-ink)' : 'var(--tema-color-border)',
        backgroundColor: isHovered ? 'rgba(31, 111, 92, 0.08)' : 'transparent',
      }}
      animate={{
        x: position.x - (isHovered ? 20 : 10),
        y: position.y - (isHovered ? 20 : 10),
        width: isHovered ? 40 : 20,
        height: isHovered ? 40 : 20,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        type: 'spring',
        damping: 32,
        stiffness: 400,
        mass: 0.4,
      }}
    />
  );
};
