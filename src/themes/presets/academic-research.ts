import { createTheme } from '../tokens.js';
import { ThemeTokens } from '../../content/types.js';

export const academicResearchTheme: ThemeTokens = createTheme(
  'academic-research',
  'Academic & Research',
  false,
  {
    primary: '831843',       // Academic Burgundy / Crimson
    secondary: '1E3A8A',     // Deep Navy
    accent: '0E7490',        // Deep Cyan
    background: 'FFFFFF',    // Crisp Academic White
    surface: 'F8FAFC',       // Subtle Paper Tint
    surfaceBorder: 'E2E8F0', // Border
    textPrimary: '111827',   // Academic Black
    textSecondary: '374151', // Dark Grey
    textMuted: '6B7280',     // Muted Grey
    textInverse: 'FFFFFF',
    success: '166534',
    warning: '9A3412',
    danger: '991B1B',
    codeBg: '1F2937',
    codeText: 'F9A8D4',
  },
  {
    fontHeader: 'Times New Roman',
    fontBody: 'Calibri',
    fontCode: 'Consolas',
  },
  0.08,
  0.2
);
