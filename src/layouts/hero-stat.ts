import pptxgen from 'pptxgenjs';
import { HeroStatSlideContent } from '../content/types.js';
import {
  LayoutRenderContext,
  renderSlideBackground,
  renderSlideHeader,
  renderSlideFooter,
  attachSpeakerNotes,
} from './base.js';
import { drawCard } from '../diagrams/shapes.js';

export function renderHeroStatSlide(ctx: LayoutRenderContext, content: HeroStatSlideContent) {
  const { slide, theme } = ctx;
  renderSlideBackground(slide, theme);
  const { contentX, contentY, contentW, contentH } = renderSlideHeader(slide, theme, content);

  // Top Card: Big Hero Stat (taking top 55% of content area)
  const topH = contentH * 0.52;
  drawCard(slide, theme, contentX, contentY, contentW, topH, {
    fillColor: theme.isDark ? '161E2E' : 'EFF6FF',
    borderColor: theme.colors.primary,
    borderWidth: 1.5,
  });

  // Giant Stat Text
  slide.addText(content.mainStat, {
    x: contentX + 0.4,
    y: contentY + 0.2,
    w: contentW - 0.8,
    h: 1.2,
    fontSize: 54,
    fontFace: theme.typography.fontHeader,
    color: theme.colors.primary,
    bold: true,
    align: 'center',
    valign: 'middle',
  });

  // Stat Label
  slide.addText(content.statLabel.toUpperCase(), {
    x: contentX + 0.4,
    y: contentY + 1.4,
    w: contentW - 0.8,
    h: 0.35,
    fontSize: 14,
    fontFace: theme.typography.fontHeader,
    color: theme.colors.secondary,
    bold: true,
    align: 'center',
  });

  // Context sentence
  slide.addText(content.contextSentence, {
    x: contentX + 0.8,
    y: contentY + 1.8,
    w: contentW - 1.6,
    h: 0.5,
    fontSize: 13,
    fontFace: theme.typography.fontBody,
    color: theme.colors.textPrimary,
    align: 'center',
    valign: 'middle',
  });

  // Bottom Supporting Metrics Row
  const metrics = content.supportingMetrics || [];
  const bottomY = contentY + topH + 0.25;
  const bottomH = contentH - topH - 0.25;

  if (metrics.length > 0) {
    const gap = 0.25;
    const colW = (contentW - (metrics.length - 1) * gap) / metrics.length;

    metrics.forEach((m, idx) => {
      const colX = contentX + idx * (colW + gap);
      drawCard(slide, theme, colX, bottomY, colW, bottomH, {
        fillColor: theme.colors.surface,
        borderColor: theme.colors.surfaceBorder,
      });

      slide.addText(m.stat, {
        x: colX + 0.15,
        y: bottomY + 0.2,
        w: colW - 0.3,
        h: 0.5,
        fontSize: 24,
        fontFace: theme.typography.fontHeader,
        color: theme.colors.secondary,
        bold: true,
        align: 'center',
      });

      slide.addText(m.label, {
        x: colX + 0.15,
        y: bottomY + 0.7,
        w: colW - 0.3,
        h: 0.3,
        fontSize: 12,
        fontFace: theme.typography.fontHeader,
        color: theme.colors.textPrimary,
        bold: true,
        align: 'center',
      });

      slide.addText(m.detail, {
        x: colX + 0.15,
        y: bottomY + 1.0,
        w: colW - 0.3,
        h: bottomH - 1.1,
        fontSize: 10,
        fontFace: theme.typography.fontBody,
        color: theme.colors.textSecondary,
        align: 'center',
        valign: 'top',
        wrap: true,
      });
    });
  }

  renderSlideFooter(ctx);
  attachSpeakerNotes(slide, content.notes, content.references);
}
