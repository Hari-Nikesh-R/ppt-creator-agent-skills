import { createTheme } from '../tokens.js';
import { ThemeTokens } from '../../content/types.js';

export const productRoadmapTheme: ThemeTokens = createTheme(
  'product-roadmap',
  'Product Strategy & Roadmap',
  false,
  {
    primary: '0F766E',       // Modern Deep Teal
    secondary: '0284C7',     // Vivid Ocean
    accent: 'D97706',        // Vibrant Tangerine
    background: 'F0FDF4',    // Hint of Mint / Clean
    surface: 'FFFFFF',       // Card White
    surfaceBorder: 'CCFBF1', // Mint Border
    textPrimary: '134E4A',   // Deep Forest/Teal
    textSecondary: '334155', // Slate
    textMuted: '64748B',     // Muted Slate
    textInverse: 'FFFFFF',
    success: '10B981',
    warning: 'F59E0B',
    danger: 'EF4444',
    codeBg: '134E4A',
    codeText: '5EEAD4',
  },
  {
    fontHeader: 'Arial',
    fontBody: 'Calibri',
    fontCode: 'Consolas',
  },
  0.2,
  0.25
);
