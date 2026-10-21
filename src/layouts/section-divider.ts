import pptxgen from 'pptxgenjs';
import { SectionDividerSlideContent } from '../content/types.js';
import { LayoutRenderContext, renderSlideBackground, attachSpeakerNotes } from './base.js';
import { SLIDE_WIDTH_INCHES, SLIDE_HEIGHT_INCHES } from '../themes/tokens.js';
import { drawCard, drawBadge } from '../diagrams/shapes.js';

export function renderSectionDividerSlide(ctx: LayoutRenderContext, content: SectionDividerSlideContent) {
  const { slide, theme } = ctx;
  renderSlideBackground(slide, theme);

  const containerW = SLIDE_WIDTH_INCHES - 1.6;
  const containerH = SLIDE_HEIGHT_INCHES - 1.4;

  // Background focal card
  drawCard(slide, theme, 0.8, 0.7, containerW, containerH, {
    fillColor: theme.isDark ? '161E2E' : 'FFFFFF',
    borderColor: theme.isDark ? '2E384D' : 'E2E8F0',
    borderWidth: 1.5,
  });

  // Left accent bar
  slide.addShape('roundRect' as any, {
    x: 0.8,
    y: 0.7,
    w: 0.15,
    h: containerH,
    fill: { color: theme.colors.primary },
    line: { color: theme.colors.primary, width: 0 },
    rectRadius: 0.05,
  });

  // Section number pill
  drawBadge(
    slide,
    theme,
    1.4,
    1.3,
    `SECTION ${content.sectionNumber || '01'}`,
    theme.colors.primary,
    theme.colors.textInverse
  );

  // Big Section Title
  slide.addText(content.sectionTitle, {
    x: 1.4,
    y: 1.9,
    w: containerW - 1.2,
    h: 1.4,
    fontSize: theme.typography.fontSizeSection,
    fontFace: theme.typography.fontHeader,
    color: theme.colors.textPrimary,
    bold: true,
    valign: 'middle',
    wrap: true,
  });

  // Section summary paragraph
  slide.addText(content.summary, {
    x: 1.4,
    y: 3.5,
    w: containerW - 1.2,
    h: 1.0,
    fontSize: theme.typography.fontSizeHeading,
    fontFace: theme.typography.fontBody,
    color: theme.colors.textSecondary,
    valign: 'top',
    wrap: true,
  });

  // Key topics tags if present
  if (content.keyTopics && content.keyTopics.length > 0) {
    let tagX = 1.4;
    content.keyTopics.forEach((topic) => {
      const w = drawBadge(
        slide,
        theme,
        tagX,
        4.8,
        topic,
        theme.isDark ? '1E293B' : 'F1F5F9',
        theme.colors.textPrimary
      );
      tagX += w + 0.2;
    });
  }

  attachSpeakerNotes(slide, content.notes, content.references);
}
