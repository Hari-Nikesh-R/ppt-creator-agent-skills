import { ThemeTokens, ThemeName, ColorPalette, TypographyTokens } from '../content/types.js';
import { techConferenceTheme } from './presets/tech-conference.js';
import { darkTechnicalTheme } from './presets/dark-technical.js';
import { minimalCorporateTheme } from './presets/minimal-corporate.js';
import { premiumBusinessTheme } from './presets/premium-business.js';
import { academicResearchTheme } from './presets/academic-research.js';
import { productRoadmapTheme } from './presets/product-roadmap.js';
import { trainingEducationTheme } from './presets/training-education.js';

export const THEME_PRESETS: Record<ThemeName, ThemeTokens> = {
  'tech-conference': techConferenceTheme,
  'dark-technical': darkTechnicalTheme,
  'minimal-corporate': minimalCorporateTheme,
  'premium-business': premiumBusinessTheme,
  'academic-research': academicResearchTheme,
  'product-roadmap': productRoadmapTheme,
  'training-education': trainingEducationTheme,
};

export interface ThemeOverrides {
  colors?: Partial<ColorPalette>;
  typography?: Partial<TypographyTokens>;
  borderRadius?: number;
  logoUrl?: string;
}

export function resolveTheme(name: ThemeName = 'tech-conference', overrides?: ThemeOverrides): ThemeTokens {
  const base = THEME_PRESETS[name] || THEME_PRESETS['tech-conference'];
  if (!overrides) return base;

  return {
    ...base,
    colors: {
      ...base.colors,
      ...(overrides.colors || {}),
    },
    typography: {
      ...base.typography,
      ...(overrides.typography || {}),
    },
    borderRadius: overrides.borderRadius ?? base.borderRadius,
  };
}
