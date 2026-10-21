import { createTheme } from '../tokens.js';
import { ThemeTokens } from '../../content/types.js';

export const techConferenceTheme: ThemeTokens = createTheme(
  'tech-conference',
  'Tech Conference Vibrant',
  false,
  {
    primary: '2563EB',       // Modern Royal Blue
    secondary: '0EA5E9',     // Cyan Accent
    accent: '8B5CF6',        // Purple Highlight
    background: 'F8FAFC',    // Ultra clean slate white
    surface: 'FFFFFF',       // Pure white cards
    surfaceBorder: 'E2E8F0', // Crisp slate border
    textPrimary: '0F172A',   // Deep slate 900
    textSecondary: '334155', // Slate 700
    textMuted: '64748B',     // Slate 500
    textInverse: 'FFFFFF',   // White
    success: '10B981',       // Emerald
    warning: 'F59E0B',       // Amber
    danger: 'EF4444',        // Red
    codeBg: '0F172A',        // Dark terminal
    codeText: '38BDF8',      // Bright cyan syntax
  },
  {
    fontHeader: 'Arial',
    fontBody: 'Calibri',
    fontCode: 'Consolas',
  },
  0.18,
  0.25
);
