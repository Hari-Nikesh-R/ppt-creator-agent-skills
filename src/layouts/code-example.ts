import pptxgen from 'pptxgenjs';
import { CodeExampleSlideContent } from '../content/types.js';
import {
  LayoutRenderContext,
  renderSlideBackground,
  renderSlideHeader,
  renderSlideFooter,
  attachSpeakerNotes,
} from './base.js';
import { drawCodeBlock, drawCard } from '../diagrams/shapes.js';

export function renderCodeExampleSlide(ctx: LayoutRenderContext, content: CodeExampleSlideContent) {
  const { slide, theme } = ctx;
  renderSlideBackground(slide, theme);
  const { contentX, contentY, contentW, contentH } = renderSlideHeader(slide, theme, content);

  const colGap = 0.35;
  const codeW = contentW * 0.60;
  const explW = contentW * 0.40 - colGap;
  const explX = contentX + codeW + colGap;

  // Render IDE Code Block on Left
  drawCodeBlock(
    slide,
    theme,
    contentX,
    contentY,
    codeW,
    contentH,
    content.code,
    content.language,
    content.filename
  );

  // Render Explanations Card on Right
  drawCard(slide, theme, explX, contentY, explW, contentH, {
    fillColor: theme.colors.surface,
    borderColor: theme.colors.surfaceBorder,
  });

  const cardTitle = content.calloutTitle || 'KEY IMPLEMENTATION DETAILS';
  slide.addText(cardTitle, {
    x: explX + 0.25,
    y: contentY + 0.25,
    w: explW - 0.5,
    h: 0.35,
    fontSize: 12,
    fontFace: theme.typography.fontHeader,
    color: theme.colors.primary,
    bold: true,
  });

  // Points
  const points = content.explanationPoints || [];
  const pointsY = contentY + 0.7;
  const itemH = (contentH - 0.9) / Math.max(1, points.length);

  points.forEach((pt, idx) => {
    const curY = pointsY + idx * itemH;

    // Bullet badge indicator
    slide.addShape('roundRect' as any, {
      x: explX + 0.25,
      y: curY + 0.05,
      w: 0.2,
      h: 0.2,
      fill: { color: theme.colors.secondary },
      line: { color: theme.colors.secondary, width: 0 },
      rectRadius: 0.05,
    });

    slide.addText(pt, {
      x: explX + 0.55,
      y: curY,
      w: explW - 0.8,
      h: itemH - 0.1,
      fontSize: 11,
      fontFace: theme.typography.fontBody,
      color: theme.colors.textPrimary,
      valign: 'top',
      wrap: true,
    });
  });

  renderSlideFooter(ctx);
  attachSpeakerNotes(slide, content.notes, content.references);
}
