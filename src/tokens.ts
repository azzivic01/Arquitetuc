/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const tokens = {
  colors: {
    bg: '#F7F9F8',
    surface: '#FFFFFF',
    border: '#D9E2DE',
    text: '#12211D',
    textMuted: '#53635D',
    accent: '#1F6F5C',
    accentInk: '#1F6F5C',
    onAccent: '#F7F9F8',
  },
  fonts: {
    display: "'Fraunces', Georgia, serif",
    body: "'Manrope', -apple-system, BlinkMacSystemFont, sans-serif",
    label: "'Manrope', -apple-system, BlinkMacSystemFont, sans-serif",
    mono: "'IBM Plex Mono', monospace",
  },
  radius: {
    base: '14px',
    lg: '28px',
  },
  motion: {
    durationFast: '150ms',
    durationBase: '300ms',
    durationSlow: '700ms',
    durationCinematic: '1000ms',
    easeBase: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeCinematic: 'cubic-bezier(0.16, 1, 0.3, 1)',
    stagger: '80ms',
  },
} as const;

export type ThemeTokens = typeof tokens;
