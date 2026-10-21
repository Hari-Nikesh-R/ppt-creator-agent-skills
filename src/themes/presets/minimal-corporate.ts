import { createTheme } from '../tokens.js';
import { ThemeTokens } from '../../content/types.js';

export const minimalCorporateTheme: ThemeTokens = createTheme(
  'minimal-corporate',
  'Minimal Corporate',
  false,
  {
    primary: '1E3A8A',       // Classic Corporate Navy
    secondary: '3B82F6',     // Bright Blue
    accent: '0D9488',        // Teal
    background: 'FFFFFF',    // Pure White
    surface: 'F1F5F9',       // Cool Grey Surface
    surfaceBorder: 'CBD5E1', // Border
    textPrimary: '1E293B',   // Navy Black
    textSecondary: '475569', // Cool Slate
    textMuted: '64748B',     // Muted Slate
    textInverse: 'FFFFFF',
    success: '059669',
    warning: 'D97706',
    danger: 'DC2626',
    codeBg: '1E293B',
    codeText: '93C5FD',
  },
  {
    fontHeader: 'Calibri',
    fontBody: 'Calibri',
    fontCode: 'Consolas',
  },
  0.1,
  0.22
);
