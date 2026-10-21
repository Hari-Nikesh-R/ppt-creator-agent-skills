import pptxgen from 'pptxgenjs';
import { TimelineSlideContent } from '../content/types.js';
import {
  LayoutRenderContext,
  renderSlideBackground,
  renderSlideHeader,
  renderSlideFooter,
  attachSpeakerNotes,
} from './base.js';
import { drawCard, drawBadge } from '../diagrams/shapes.js';

export function renderTimelineSlide(ctx: LayoutRenderContext, content: TimelineSlideContent) {
  const { slide, theme } = ctx;
  renderSlideBackground(slide, theme);
  const { contentX, contentY, contentW, contentH } = renderSlideHeader(slide, theme, content);

  const milestones = content.milestones || [];
  const count = milestones.length;
  if (count === 0) return;

  const cardGap = 0.2;
  const cardW = (contentW - (count - 1) * cardGap) / count;
  const lineY = contentY + 0.8;

  // Horizontal track line
  slide.addShape('rect' as any, {
    x: contentX,
    y: lineY,
    w: contentW,
    h: 0.04,
    fill: { color: theme.colors.primary },
    line: { color: theme.colors.primary, width: 0 },
  });

  milestones.forEach((m, idx) => {
    const cardX = contentX + idx * (cardW + cardGap);
    const nodeCenterX = cardX + cardW / 2;

    // Node circular marker on timeline
    const nodeR = 0.24;
    slide.addShape('roundRect' as any, {
      x: nodeCenterX - nodeR / 2,
      y: lineY - nodeR / 2 + 0.02,
      w: nodeR,
      h: nodeR,
      fill: { color: m.status === 'completed' ? theme.colors.success : theme.colors.primary },
      line: { color: theme.colors.background, width: 2 },
      rectRadius: nodeR / 2,
    });

    // Date / Phase badge above node
    const badgeW = Math.max(1.2, m.dateOrPhase.length * 0.09 + 0.3);
    drawBadge(
      slide,
      theme,
      nodeCenterX - badgeW / 2,
      lineY - 0.55,
      m.dateOrPhase,
      theme.colors.secondary,
      theme.colors.textInverse,
      badgeW,
      0.3
    );

    // Milestone detail card below track
    const cardY = lineY + 0.45;
    const cardH = contentH - (cardY - contentY) - 0.2;

    drawCard(slide, theme, cardX, cardY, cardW, cardH, {
      fillColor: theme.colors.surface,
      borderColor: theme.colors.surfaceBorder,
    });

    slide.addText(m.title, {
      x: cardX + 0.15,
      y: cardY + 0.2,
      w: cardW - 0.3,
      h: 0.45,
      fontSize: 13,
      fontFace: theme.typography.fontHeader,
      color: theme.colors.textPrimary,
      bold: true,
      align: 'center',
      valign: 'middle',
    });

    slide.addText(m.description, {
      x: cardX + 0.15,
      y: cardY + 0.75,
      w: cardW - 0.3,
      h: cardH - 0.9,
      fontSize: 11,
      fontFace: theme.typography.fontBody,
      color: theme.colors.textSecondary,
      align: 'center',
      valign: 'top',
      wrap: true,
    });
  });

  renderSlideFooter(ctx);
  attachSpeakerNotes(slide, content.notes, content.references);
}
