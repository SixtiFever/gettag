/**
 * Tag Landing Page — Color Palette for React Native
 * Extracted from NewLandingPage.css
 *
 * Usage in React Native:
 *   import { colors } from './tag-color-palette';
 *   <View style={{ backgroundColor: colors.background }} />
 */

export const colors = {
  // Base
  background: '#ffffff',
  white: '#ffffff',

  // Slate scale (primary palette)
  slate50: '#f8fafc',
  slate200: '#e2e8f0',
  slate400: '#94a3b8',
  slate600: '#475569',
  slate700: '#334155',
  slate800: '#1e293b',
  slate900: '#0f172a',

  // Semantic — use these for consistent theming
  primary: '#0f172a',        // Main brand dark (logo, buttons)
  primaryHover: '#1e293b',    // Button hover state
  secondary: '#334155',       // Tagline, form labels
  tertiary: '#475569',        // Body text, descriptions
  muted: '#94a3b8',           // Placeholders, subtext
  border: '#e2e8f0',          // Input borders, dividers
  surface: '#f8fafc',         // Success box, cards
  error: '#ef4444',           // Error messages
} as const;

/** RGB values for opacity variants (e.g., shadow, overlay) */
export const colorsRgb = {
  slate900: '15, 23, 42',
  slate800: '30, 41, 59',
  slate700: '51, 65, 85',
  slate600: '71, 85, 105',
  slate400: '148, 163, 184',
  slate200: '226, 232, 240',
  slate50: '248, 250, 252',
  error: '239, 68, 68',
} as const;

/** Helper for rgba strings in React Native */
export const rgba = (key: keyof typeof colorsRgb, alpha: number) =>
  `rgba(${colorsRgb[key]}, ${alpha})`;

export type ColorKey = keyof typeof colors;
