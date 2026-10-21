import { ThemeTokens } from '../content/types.js';
import { PptxSlide } from '../layouts/base.js';

export interface CardOptions {
  fillColor?: string;
  borderColor?: string;
  borderWidth?: number;
  rectRadius?: number;
}

export function drawCard(
  slide: PptxSlide,
  theme: ThemeTokens,
  x: number,
  y: number,
  w: number,
  h: number,
  options?: CardOptions
) {
  const fillColor = options?.fillColor ?? theme.colors.surface;
  const borderColor = options?.borderColor ?? theme.colors.surfaceBorder;
  const borderWidth = options?.borderWidth ?? 1;

  slide.addShape('roundRect' as any, {
    x,
    y,
    w,
    h,
    fill: { color: fillColor },
    line: { color: borderColor, width: borderWidth },
    rectRadius: options?.rectRadius ?? theme.borderRadius,
  });
}

export function drawBadge(
  slide: PptxSlide,
  theme: ThemeTokens,
  x: number,
  y: number,
  text: string,
  bgColor?: string,
  textColor?: string,
  w?: number,
  h?: number
) {
  const bg = bgColor ?? theme.colors.primary;
  const fg = textColor ?? theme.colors.textInverse;
  const badgeW = w ?? Math.max(1.0, text.length * 0.1 + 0.4);
  const badgeH = h ?? 0.32;

  slide.addShape('roundRect' as any, {
    x,
    y,
    w: badgeW,
    h: badgeH,
    fill: { color: bg },
    line: { color: bg, width: 0 },
    rectRadius: 0.16,
  });

  slide.addText(text.toUpperCase(), {
    x,
    y: y + 0.02,
    w: badgeW,
    h: badgeH - 0.04,
    fontSize: 9,
    fontFace: theme.typography.fontHeader,
    color: fg,
    bold: true,
    align: 'center',
    valign: 'middle',
    margin: 0,
  });

  return badgeW;
}

export function drawCodeBlock(
  slide: PptxSlide,
  theme: ThemeTokens,
  x: number,
  y: number,
  w: number,
  h: number,
  code: string,
  language = 'JAVA',
  filename?: string
) {
  const headerHeight = 0.4;
  const bodyHeight = h - headerHeight;

  // Header background
  slide.addShape('roundRect' as any, {
    x,
    y,
    w,
    h: headerHeight,
    fill: { color: theme.isDark ? '1E293B' : '1E293B' },
    line: { color: '334155', width: 1 },
    rectRadius: 0.08,
  });

  // Traffic lights
  const dotY = y + 0.14;
  const dotR = 0.12;
  slide.addShape('roundRect' as any, {
    x: x + 0.18,
    y: dotY,
    w: dotR,
    h: dotR,
    fill: { color: 'EF4444' },
    line: { color: 'EF4444', width: 0 },
    rectRadius: 0.06,
  });
  slide.addShape('roundRect' as any, {
    x: x + 0.36,
    y: dotY,
    w: dotR,
    h: dotR,
    fill: { color: 'F59E0B' },
    line: { color: 'F59E0B', width: 0 },
    rectRadius: 0.06,
  });
  slide.addShape('roundRect' as any, {
    x: x + 0.54,
    y: dotY,
    w: dotR,
    h: dotR,
    fill: { color: '10B981' },
    line: { color: '10B981', width: 0 },
    rectRadius: 0.06,
  });

  // Filename / Language tag
  const titleText = filename || `${language.toUpperCase()} SNIPPET`;
  slide.addText(titleText, {
    x: x + 0.8,
    y: y + 0.05,
    w: w - 1.0,
    h: headerHeight - 0.1,
    fontSize: 10,
    fontFace: theme.typography.fontCode,
    color: '94A3B8',
    align: 'right',
    valign: 'middle',
  });

  // Editor body
  slide.addShape('rect' as any, {
    x,
    y: y + headerHeight,
    w,
    h: bodyHeight,
    fill: { color: theme.colors.codeBg },
    line: { color: '334155', width: 1 },
  });

  // Code text
  slide.addText(code, {
    x: x + 0.25,
    y: y + headerHeight + 0.2,
    w: w - 0.5,
    h: bodyHeight - 0.4,
    fontSize: theme.typography.fontSizeCode,
    fontFace: theme.typography.fontCode,
    color: theme.colors.codeText,
    valign: 'top',
    wrap: true,
  });
}
