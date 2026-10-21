import pptxgen from 'pptxgenjs';
import { ThemeTokens, BaseSlideContent, PresentationMetadata } from '../content/types.js';
import {
  SLIDE_WIDTH_INCHES,
  SLIDE_HEIGHT_INCHES,
  SLIDE_MARGIN_X,
  SLIDE_MARGIN_Y,
  HEADER_HEIGHT,
  FOOTER_HEIGHT,
} from '../themes/tokens.js';
import { drawBadge } from '../diagrams/shapes.js';

export type PptxSlide = any;
export type PptxPresentation = any;

export interface LayoutRenderContext {
  pres: PptxPresentation;
  slide: PptxSlide;
  theme: ThemeTokens;
  metadata: PresentationMetadata;
  slideIndex: number;
  totalSlides: number;
}

export function renderSlideBackground(slide: PptxSlide, theme: ThemeTokens) {
  slide.background = { color: theme.colors.background };
}

export function renderSlideHeader(
  slide: PptxSlide,
  theme: ThemeTokens,
  content: BaseSlideContent
): { contentX: number; contentY: number; contentW: number; contentH: number } {
  let headerY = SLIDE_MARGIN_Y;

  // Kicker badge if present
  if (content.kicker) {
    drawBadge(
      slide,
      theme,
      SLIDE_MARGIN_X,
      headerY,
      content.kicker,
      theme.colors.secondary,
      theme.colors.textInverse
    );
    headerY += 0.42;
  }

  // Slide Title
  const titleW = SLIDE_WIDTH_INCHES - 2 * SLIDE_MARGIN_X;
  slide.addText(content.title, {
    x: SLIDE_MARGIN_X,
    y: headerY,
    w: titleW,
    h: 0.55,
    fontSize: theme.typography.fontSizeSlideTitle,
    fontFace: theme.typography.fontHeader,
    color: theme.colors.textPrimary,
    bold: true,
    valign: 'middle',
  });

  headerY += 0.55;

  // Subtitle / context description
  if (content.subtitle) {
    slide.addText(content.subtitle, {
      x: SLIDE_MARGIN_X,
      y: headerY,
      w: titleW,
      h: 0.35,
      fontSize: theme.typography.fontSizeHeading - 4,
      fontFace: theme.typography.fontBody,
      color: theme.colors.textMuted,
      valign: 'top',
    });
    headerY += 0.4;
  } else {
    headerY += 0.15;
  }

  const contentX = SLIDE_MARGIN_X;
  const contentY = headerY;
  const contentW = SLIDE_WIDTH_INCHES - 2 * SLIDE_MARGIN_X;
  const contentH = SLIDE_HEIGHT_INCHES - headerY - FOOTER_HEIGHT - 0.2;

  return { contentX, contentY, contentW, contentH };
}

export function renderSlideFooter(ctx: LayoutRenderContext) {
  const { slide, theme, metadata, slideIndex, totalSlides } = ctx;
  const footerY = SLIDE_HEIGHT_INCHES - FOOTER_HEIGHT;
  const footerW = SLIDE_WIDTH_INCHES - 2 * SLIDE_MARGIN_X;

  // Subtle separator line
  slide.addShape('rect' as any, {
    x: SLIDE_MARGIN_X,
    y: footerY,
    w: footerW,
    h: 0.015,
    fill: { color: theme.colors.surfaceBorder },
    line: { color: theme.colors.surfaceBorder, width: 0 },
  });

  // Left: Presentation title
  slide.addText(`${metadata.title} | ${metadata.organization || metadata.author}`, {
    x: SLIDE_MARGIN_X,
    y: footerY + 0.08,
    w: footerW * 0.7,
    h: 0.3,
    fontSize: theme.typography.fontSizeCaption,
    fontFace: theme.typography.fontBody,
    color: theme.colors.textMuted,
    valign: 'middle',
  });

  // Right: Slide number (Slide X of Y)
  slide.addText(`${slideIndex + 1} / ${totalSlides}`, {
    x: SLIDE_MARGIN_X + footerW * 0.7,
    y: footerY + 0.08,
    w: footerW * 0.3,
    h: 0.3,
    fontSize: theme.typography.fontSizeCaption,
    fontFace: theme.typography.fontBody,
    color: theme.colors.textMuted,
    align: 'right',
    valign: 'middle',
  });
}

export function attachSpeakerNotes(slide: PptxSlide, notes?: BaseSlideContent['notes'], refs?: BaseSlideContent['references']) {
  if (!notes && (!refs || refs.length === 0)) return;

  const lines: string[] = [];

  if (notes?.talkingPoints && notes.talkingPoints.length > 0) {
    lines.push('--- TALKING POINTS ---');
    notes.talkingPoints.forEach((p) => lines.push(`• ${p}`));
    lines.push('');
  }

  if (notes?.transition) {
    lines.push(`--- TRANSITION ---`);
    lines.push(notes.transition);
    lines.push('');
  }

  if (notes?.estimatedSeconds) {
    const mins = Math.floor(notes.estimatedSeconds / 60);
    const secs = notes.estimatedSeconds % 60;
    lines.push(`[Target Duration: ${mins}m ${secs}s]`);
    lines.push('');
  }

  if (refs && refs.length > 0) {
    lines.push('--- REFERENCES & CITATIONS ---');
    refs.forEach((r) => {
      lines.push(`• ${r.label}: ${r.url}${r.notes ? ` (${r.notes})` : ''}`);
    });
  }

  slide.addNotes(lines.join('\n'));
}
