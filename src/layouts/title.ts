import pptxgen from 'pptxgenjs';
import { TitleSlideContent } from '../content/types.js';
import { LayoutRenderContext, renderSlideBackground, attachSpeakerNotes } from './base.js';
import { SLIDE_WIDTH_INCHES, SLIDE_HEIGHT_INCHES } from '../themes/tokens.js';
import { drawBadge, drawCard } from '../diagrams/shapes.js';

export function renderTitleSlide(ctx: LayoutRenderContext, content: TitleSlideContent) {
  const { slide, theme } = ctx;
  renderSlideBackground(slide, theme);

  // Gradient or card accent banner
  const bannerW = SLIDE_WIDTH_INCHES - 1.6;
  const bannerH = SLIDE_HEIGHT_INCHES - 1.4;

  drawCard(slide, theme, 0.8, 0.7, bannerW, bannerH, {
    fillColor: theme.isDark ? '161E2E' : 'FFFFFF',
    borderColor: theme.isDark ? '2E384D' : 'E2E8F0',
    borderWidth: 1.5,
    rectRadius: 0.2,
  });

  // Top accent strip
  slide.addShape('roundRect' as any, {
    x: 0.8,
    y: 0.7,
    w: bannerW,
    h: 0.15,
    fill: { color: theme.colors.primary },
    line: { color: theme.colors.primary, width: 0 },
    rectRadius: 0.08,
  });

  let currentY = 1.3;

  // Event / Context Tag
  if (content.eventOrContext) {
    drawBadge(
      slide,
      theme,
      1.3,
      currentY,
      content.eventOrContext,
      theme.colors.secondary,
      theme.colors.textInverse
    );
    currentY += 0.55;
  }

  // Presentation Title
  slide.addText(content.title, {
    x: 1.3,
    y: currentY,
    w: bannerW - 1.0,
    h: 1.6,
    fontSize: theme.typography.fontSizeTitle,
    fontFace: theme.typography.fontHeader,
    color: theme.colors.textPrimary,
    bold: true,
    valign: 'middle',
    wrap: true,
  });

  currentY += 1.8;

  // Subtitle
  slide.addText(content.subtitle, {
    x: 1.3,
    y: currentY,
    w: bannerW - 1.0,
    h: 0.8,
    fontSize: theme.typography.fontSizeSubtitle,
    fontFace: theme.typography.fontBody,
    color: theme.colors.textSecondary,
    valign: 'top',
    wrap: true,
  });

  currentY += 0.9;

  // Divider line
  slide.addShape('rect' as any, {
    x: 1.3,
    y: currentY,
    w: bannerW - 1.0,
    h: 0.02,
    fill: { color: theme.colors.surfaceBorder },
    line: { color: theme.colors.surfaceBorder, width: 0 },
  });

  currentY += 0.25;

  // Presenter info & date
  const metaParts: string[] = [];
  if (content.presenter) metaParts.push(content.presenter);
  if (content.role) metaParts.push(content.role);
  if (content.organization) metaParts.push(content.organization);
  if (content.date) metaParts.push(content.date);

  slide.addText(metaParts.join('  •  '), {
    x: 1.3,
    y: currentY,
    w: bannerW - 1.0,
    h: 0.4,
    fontSize: 13,
    fontFace: theme.typography.fontBody,
    color: theme.colors.primary,
    bold: true,
    valign: 'middle',
  });

  // Optional tags at bottom
  if (content.tags && content.tags.length > 0) {
    let tagX = 1.3;
    content.tags.forEach((tag) => {
      const tagW = drawBadge(slide, theme, tagX, currentY + 0.55, tag, theme.isDark ? '1E293B' : 'F1F5F9', theme.colors.textSecondary);
      tagX += tagW + 0.15;
    });
  }

  attachSpeakerNotes(slide, content.notes, content.references);
}
