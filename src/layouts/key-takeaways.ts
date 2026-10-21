import pptxgen from 'pptxgenjs';
import { KeyTakeawaysSlideContent } from '../content/types.js';
import {
  LayoutRenderContext,
  renderSlideBackground,
  renderSlideHeader,
  renderSlideFooter,
  attachSpeakerNotes,
} from './base.js';
import { drawCard } from '../diagrams/shapes.js';

export function renderKeyTakeawaysSlide(ctx: LayoutRenderContext, content: KeyTakeawaysSlideContent) {
  const { slide, theme } = ctx;
  renderSlideBackground(slide, theme);
  const { contentX, contentY, contentW, contentH } = renderSlideHeader(slide, theme, content);

  const takeaways = content.takeaways || [];
  const ctaH = content.callToAction ? 0.75 : 0;
  const cardsH = contentH - ctaH - (content.callToAction ? 0.2 : 0);

  const count = takeaways.length;
  if (count > 0) {
    const gap = 0.18;
    const cardH = (cardsH - (count - 1) * gap) / count;

    takeaways.forEach((item, idx) => {
      const curY = contentY + idx * (cardH + gap);

      drawCard(slide, theme, contentX, curY, contentW, cardH, {
        fillColor: theme.colors.surface,
        borderColor: theme.colors.surfaceBorder,
      });

      // Left Accent Strip
      slide.addShape('roundRect' as any, {
        x: contentX,
        y: curY,
        w: 0.1,
        h: cardH,
        fill: { color: theme.colors.primary },
        line: { color: theme.colors.primary, width: 0 },
        rectRadius: 0.05,
      });

      // Number badge
      const numW = 0.45;
      slide.addText(String(idx + 1), {
        x: contentX + 0.25,
        y: curY + 0.1,
        w: numW,
        h: cardH - 0.2,
        fontSize: 22,
        fontFace: theme.typography.fontHeader,
        color: theme.colors.primary,
        bold: true,
        valign: 'middle',
      });

      // Content
      slide.addText([
        { text: `${item.title}: `, options: { bold: true, fontSize: 13, color: theme.colors.textPrimary } },
        { text: item.action, options: { bold: false, fontSize: 12, color: theme.colors.textSecondary } },
      ], {
        x: contentX + 0.8,
        y: curY + 0.1,
        w: contentW - 1.0,
        h: cardH - 0.2,
        valign: 'middle',
      });
    });
  }

  // Call to Action Banner
  if (content.callToAction) {
    const ctaY = contentY + cardsH + 0.2;
    drawCard(slide, theme, contentX, ctaY, contentW, ctaH, {
      fillColor: theme.isDark ? '1E293B' : 'EFF6FF',
      borderColor: theme.colors.primary,
      borderWidth: 1.5,
    });

    slide.addText([
      { text: 'ACTIONABLE NEXT STEP: ', options: { bold: true, color: theme.colors.primary } },
      { text: content.callToAction, options: { bold: false, color: theme.colors.textPrimary } },
    ], {
      x: contentX + 0.3,
      y: ctaY + 0.1,
      w: contentW - 0.6,
      h: ctaH - 0.2,
      fontSize: 12,
      fontFace: theme.typography.fontBody,
      valign: 'middle',
    });
  }

  renderSlideFooter(ctx);
  attachSpeakerNotes(slide, content.notes, content.references);
}
