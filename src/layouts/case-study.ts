import pptxgen from 'pptxgenjs';
import { CaseStudySlideContent } from '../content/types.js';
import {
  LayoutRenderContext,
  renderSlideBackground,
  renderSlideHeader,
  renderSlideFooter,
  attachSpeakerNotes,
} from './base.js';
import { drawCard, drawBadge } from '../diagrams/shapes.js';

export function renderCaseStudySlide(ctx: LayoutRenderContext, content: CaseStudySlideContent) {
  const { slide, theme } = ctx;
  renderSlideBackground(slide, theme);
  const { contentX, contentY, contentW, contentH } = renderSlideHeader(slide, theme, content);

  const colGap = 0.3;
  const colW = (contentW - 2 * colGap) / 3;

  // 3 Columns: 1. Challenge/Problem, 2. Solution/Architecture, 3. Measured Impact/Results
  const sections = [
    {
      title: 'THE CHALLENGE',
      badge: 'PROBLEM',
      badgeBg: theme.colors.danger,
      text: content.problem,
      isResult: false,
    },
    {
      title: 'THE ARCHITECTURE',
      badge: 'SOLUTION',
      badgeBg: theme.colors.primary,
      text: content.solution,
      isResult: false,
    },
    {
      title: 'MEASURED IMPACT',
      badge: 'OUTCOME',
      badgeBg: theme.colors.success,
      results: content.results,
      isResult: true,
    },
  ];

  sections.forEach((sec, idx) => {
    const colX = contentX + idx * (colW + colGap);

    drawCard(slide, theme, colX, contentY, colW, contentH, {
      fillColor: theme.colors.surface,
      borderColor: theme.colors.surfaceBorder,
    });

    // Badge
    drawBadge(slide, theme, colX + 0.2, contentY + 0.25, sec.badge, sec.badgeBg, theme.colors.textInverse);

    // Section title
    slide.addText(sec.title, {
      x: colX + 0.2,
      y: contentY + 0.65,
      w: colW - 0.4,
      h: 0.35,
      fontSize: 14,
      fontFace: theme.typography.fontHeader,
      color: theme.colors.textPrimary,
      bold: true,
    });

    // Separator line
    slide.addShape('rect' as any, {
      x: colX + 0.2,
      y: contentY + 1.05,
      w: colW - 0.4,
      h: 0.015,
      fill: { color: theme.colors.surfaceBorder },
      line: { color: theme.colors.surfaceBorder, width: 0 },
    });

    const bodyY = contentY + 1.2;
    const bodyH = contentH - 1.4;

    if (sec.isResult && sec.results) {
      const runs = sec.results.map((r) => ({
        text: r,
        options: { bullet: true, color: theme.colors.textPrimary, fontSize: 11 },
      }));
      slide.addText(runs as any, {
        x: colX + 0.2,
        y: bodyY,
        w: colW - 0.4,
        h: bodyH,
        fontFace: theme.typography.fontBody,
        valign: 'top',
        wrap: true,
      });
    } else if (sec.text) {
      slide.addText(sec.text, {
        x: colX + 0.2,
        y: bodyY,
        w: colW - 0.4,
        h: bodyH,
        fontSize: 11,
        fontFace: theme.typography.fontBody,
        color: theme.colors.textSecondary,
        valign: 'top',
        wrap: true,
      });
    }
  });

  renderSlideFooter(ctx);
  attachSpeakerNotes(slide, content.notes, content.references);
}
