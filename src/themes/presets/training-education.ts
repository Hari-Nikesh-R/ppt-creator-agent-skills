import { createTheme } from '../tokens.js';
import { ThemeTokens } from '../../content/types.js';

export const trainingEducationTheme: ThemeTokens = createTheme(
  'training-education',
  'Training & Education Pedagogy',
  false,
  {
    primary: '4338CA',       // Friendly Indigo
    secondary: 'D97706',     // Friendly Amber
    accent: '059669',        // Green check
    background: 'FAFAFA',    // Clean soft background
    surface: 'FFFFFF',       // Crisp Card
    surfaceBorder: 'E5E7EB', // Card border
    textPrimary: '1F2937',   // Dark Charcoal
    textSecondary: '4B5563', // Charcoal
    textMuted: '6B7280',     // Muted Gray
    textInverse: 'FFFFFF',
    success: '10B981',
    warning: 'F59E0B',
    danger: 'EF4444',
    codeBg: '1F2937',
    codeText: 'A5B4FC',
  },
  {
    fontHeader: 'Arial',
    fontBody: 'Calibri',
    fontCode: 'Consolas',
  },
  0.15,
  0.25
);
