import { createTheme } from '../tokens.js';
import { ThemeTokens } from '../../content/types.js';

export const darkTechnicalTheme: ThemeTokens = createTheme(
  'dark-technical',
  'Dark Terminal Technical',
  true,
  {
    primary: '38BDF8',       // Neon Sky Blue
    secondary: '818CF8',     // Indigo Violet
    accent: '34D399',        // Neon Emerald
    background: '0B0F19',    // Deep obsidian
    surface: '161E2E',       // Dark navy card
    surfaceBorder: '2E384D', // Card border
    textPrimary: 'F8FAFC',   // Clean White
    textSecondary: 'CBD5E1', // Soft Silver
    textMuted: '94A3B8',     // Muted Slate
    textInverse: '0B0F19',   // Obsidian
    success: '34D399',       // Neon Emerald
    warning: 'FBBF24',       // Neon Amber
    danger: 'F87171',        // Soft Coral
    codeBg: '030712',        // Deep Black Code
    codeText: '4ADE80',      // Terminal Green
  },
  {
    fontHeader: 'Arial',
    fontBody: 'Calibri',
    fontCode: 'Consolas',
  },
  0.15,
  0.25
);
