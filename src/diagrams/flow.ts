import { ThemeTokens, ProcessFlowSlideContent } from '../content/types.js';
import { PptxSlide } from '../layouts/base.js';
import { drawCard } from './shapes.js';

export function renderProcessFlow(
  slide: PptxSlide,
  theme: ThemeTokens,
  content: ProcessFlowSlideContent,
  area: { x: number; y: number; w: number; h: number }
) {
  const { steps, outcomeSummary } = content;
  const numSteps = steps.length;
  if (numSteps === 0) return;

  const outcomeH = outcomeSummary ? 0.7 : 0;
  const availableH = area.h - outcomeH;
  const cardH = Math.min(3.6, availableH - 0.2);
  const cardY = area.y + 0.1;

  const arrowW = 0.4;
  const totalArrowW = (numSteps - 1) * arrowW;
  const cardGap = 0.15;
  const totalCardW = area.w - totalArrowW - (numSteps - 1) * cardGap;
  const cardW = totalCardW / numSteps;

  steps.forEach((step, idx) => {
    const cardX = area.x + idx * (cardW + arrowW + cardGap);

    // Step Card
    drawCard(slide, theme, cardX, cardY, cardW, cardH, {
      fillColor: theme.colors.surface,
      borderColor: theme.colors.surfaceBorder,
      borderWidth: 1.5,
    });

    // Step Number Badge
    const circleSize = 0.5;
    slide.addShape('roundRect' as any, {
      x: cardX + (cardW - circleSize) / 2,
      y: cardY + 0.25,
      w: circleSize,
      h: circleSize,
      fill: { color: theme.colors.primary },
      line: { color: theme.colors.primary, width: 0 },
      rectRadius: circleSize / 2,
    });

    slide.addText(String(step.stepNumber), {
      x: cardX + (cardW - circleSize) / 2,
      y: cardY + 0.25,
      w: circleSize,
      h: circleSize,
      fontSize: 14,
      fontFace: theme.typography.fontHeader,
      color: theme.colors.textInverse,
      bold: true,
      align: 'center',
      valign: 'middle',
    });

    // Step Title
    slide.addText(step.title, {
      x: cardX + 0.15,
      y: cardY + 0.9,
      w: cardW - 0.3,
      h: 0.5,
      fontSize: 13,
      fontFace: theme.typography.fontHeader,
      color: theme.colors.textPrimary,
      bold: true,
      align: 'center',
      valign: 'top',
      wrap: true,
    });

    // Step Description
    slide.addText(step.description, {
      x: cardX + 0.15,
      y: cardY + 1.45,
      w: cardW - 0.3,
      h: cardH - 1.6,
      fontSize: 11,
      fontFace: theme.typography.fontBody,
      color: theme.colors.textSecondary,
      align: 'center',
      valign: 'top',
      wrap: true,
    });

    // Arrow to next step
    if (idx < numSteps - 1) {
      const arrowX = cardX + cardW + (cardGap / 2);
      const arrowY = cardY + (cardH / 2) - 0.15;
      slide.addShape('rightArrow' as any, {
        x: arrowX,
        y: arrowY,
        w: arrowW,
        h: 0.3,
        fill: { color: theme.colors.primary },
        line: { color: theme.colors.primary, width: 0 },
      });
    }
  });

  // Outcome banner
  if (outcomeSummary) {
    const bannerY = area.y + cardH + 0.3;
    drawCard(slide, theme, area.x, bannerY, area.w, 0.6, {
      fillColor: theme.isDark ? '064E3B' : 'ECFDF5',
      borderColor: theme.colors.success,
      borderWidth: 1,
    });

    slide.addText([
      { text: 'RESULT / OUTCOME: ', options: { bold: true, color: theme.colors.success } },
      { text: outcomeSummary, options: { bold: false, color: theme.colors.textPrimary } },
    ], {
      x: area.x + 0.3,
      y: bannerY + 0.05,
      w: area.w - 0.6,
      h: 0.5,
      fontSize: 11,
      fontFace: theme.typography.fontBody,
      valign: 'middle',
    });
  }
}
