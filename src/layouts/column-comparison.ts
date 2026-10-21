import pptxgen from 'pptxgenjs';
import { ColumnComparisonSlideContent } from '../content/types.js';
import {
  LayoutRenderContext,
  renderSlideBackground,
  renderSlideHeader,
  renderSlideFooter,
  attachSpeakerNotes,
} from './base.js';
import { drawCard, drawBadge } from '../diagrams/shapes.js';

export function renderColumnComparisonSlide(ctx: LayoutRenderContext, content: ColumnComparisonSlideContent) {
  const { slide, theme } = ctx;
  renderSlideBackground(slide, theme);
  const { contentX, contentY, contentW, contentH } = renderSlideHeader(slide, theme, content);

  const columns = content.columns || [];
  const colCount = Math.min(4, Math.max(2, columns.length));
  const colGap = 0.25;
  const colW = (contentW - (colCount - 1) * colGap) / colCount;

  columns.forEach((col, idx) => {
    const colX = contentX + idx * (colW + colGap);
    const isHighlight = col.highlight ?? false;

    // Card background
    drawCard(slide, theme, colX, contentY, colW, contentH, {
      fillColor: isHighlight
        ? (theme.isDark ? '1E293B' : 'EFF6FF')
        : theme.colors.surface,
      borderColor: isHighlight
        ? theme.colors.primary
        : theme.colors.surfaceBorder,
      borderWidth: isHighlight ? 2 : 1,
    });

    let innerY = contentY + 0.25;

    // Badge if provided
    if (col.badge) {
      drawBadge(
        slide,
        theme,
        colX + 0.2,
        innerY,
        col.badge,
        isHighlight ? theme.colors.primary : theme.colors.secondary,
        theme.colors.textInverse
      );
      innerY += 0.42;
    }

    // Column Heading
    slide.addText(col.heading, {
      x: colX + 0.2,
      y: innerY,
      w: colW - 0.4,
      h: 0.4,
      fontSize: 15,
      fontFace: theme.typography.fontHeader,
      color: theme.colors.textPrimary,
      bold: true,
      valign: 'middle',
    });

    innerY += 0.45;

    // Description
    if (col.description) {
      slide.addText(col.description, {
        x: colX + 0.2,
        y: innerY,
        w: colW - 0.4,
        h: 0.5,
        fontSize: 11,
        fontFace: theme.typography.fontBody,
        color: theme.colors.textSecondary,
        valign: 'top',
        wrap: true,
      });
      innerY += 0.55;
    }

    // Separator line
    slide.addShape('rect' as any, {
      x: colX + 0.2,
      y: innerY,
      w: colW - 0.4,
      h: 0.015,
      fill: { color: theme.colors.surfaceBorder },
      line: { color: theme.colors.surfaceBorder, width: 0 },
    });

    innerY += 0.15;

    // Bullets
    const bulletRuns = col.bullets.map((b) => ({
      text: b,
      options: {
        bullet: true,
        color: isHighlight ? theme.colors.textPrimary : theme.colors.textSecondary,
        fontSize: 11,
      },
    }));

    slide.addText(bulletRuns as any, {
      x: colX + 0.2,
      y: innerY,
      w: colW - 0.4,
      h: contentH - (innerY - contentY) - 0.2,
      fontFace: theme.typography.fontBody,
      valign: 'top',
      wrap: true,
    });
  });

  renderSlideFooter(ctx);
  attachSpeakerNotes(slide, content.notes, content.references);
}
