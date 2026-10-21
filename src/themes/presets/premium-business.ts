import { createTheme } from '../tokens.js';
import { ThemeTokens } from '../../content/types.js';

export const premiumBusinessTheme: ThemeTokens = createTheme(
  'premium-business',
  'Premium Business Executive',
  false,
  {
    primary: '0F172A',       // Charcoal Black
    secondary: 'B45309',     // Warm Bronze / Gold
    accent: '047857',        // Forest Green
    background: 'FAFAF9',    // Warm Stone White
    surface: 'FFFFFF',       // Clean White
    surfaceBorder: 'E7E5E4', // Warm Stone Border
    textPrimary: '1C1917',   // Stone 900
    textSecondary: '44403C', // Stone 700
    textMuted: '78716C',     // Stone 500
    textInverse: 'FFFFFF',
    success: '15803D',
    warning: 'B45309',
    danger: 'B91C1C',
    codeBg: '1C1917',
    codeText: 'FCD34D',
  },
  {
    fontHeader: 'Georgia',
    fontBody: 'Calibri',
    fontCode: 'Consolas',
  },
  0.12,
  0.25
);
