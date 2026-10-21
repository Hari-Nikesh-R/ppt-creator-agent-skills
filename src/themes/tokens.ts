import { ThemeTokens, ThemeName, ColorPalette, TypographyTokens } from '../content/types.js';

export const DEFAULT_TYPOGRAPHY: TypographyTokens = {
  fontHeader: 'Arial',
  fontBody: 'Calibri',
  fontCode: 'Consolas',
  fontSizeTitle: 40,
  fontSizeSubtitle: 20,
  fontSizeSection: 36,
  fontSizeSlideTitle: 26,
  fontSizeHeading: 18,
  fontSizeBody: 14,
  fontSizeCaption: 11,
  fontSizeCode: 12,
};

export const SLIDE_WIDTH_INCHES = 13.333;
export const SLIDE_HEIGHT_INCHES = 7.5;
export const SLIDE_MARGIN_X = 0.8;
export const SLIDE_MARGIN_Y = 0.6;
export const HEADER_HEIGHT = 1.0;
export const FOOTER_HEIGHT = 0.5;

export function createTheme(
  name: ThemeName,
  displayName: string,
  isDark: boolean,
  colors: ColorPalette,
  typographyOverrides?: Partial<TypographyTokens>,
  borderRadius = 0.15,
  cardPadding = 0.25
): ThemeTokens {
  return {
    name,
    displayName,
    isDark,
    colors,
    typography: { ...DEFAULT_TYPOGRAPHY, ...typographyOverrides },
    borderRadius,
    cardPadding,
  };
}
