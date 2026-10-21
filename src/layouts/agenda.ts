import pptxgen from 'pptxgenjs';
import { AgendaSlideContent } from '../content/types.js';
import {
  LayoutRenderContext,
  renderSlideBackground,
  renderSlideHeader,
  renderSlideFooter,
  attachSpeakerNotes,
} from './base.js';
import { drawCard } from '../diagrams/shapes.js';

export function renderAgendaSlide(ctx: LayoutRenderContext, content: AgendaSlideContent) {
  const { slide, theme } = ctx;
  renderSlideBackground(slide, theme);
  const { contentX, contentY, contentW, contentH } = renderSlideHeader(slide, theme, content);

  const items = content.items || [];
  const count = items.length;
  if (count > 0) {
    const gap = 0.15;
    const itemH = (contentH - (count - 1) * gap) / count;

    items.forEach((item, idx) => {
      const itemY = contentY + idx * (itemH + gap);
      const isHighlighted = content.highlightIndex === idx;

      // Card
      drawCard(slide, theme, contentX, itemY, contentW, itemH, {
        fillColor: isHighlighted
          ? (theme.isDark ? '1E293B' : 'EFF6FF')
          : theme.colors.surface,
        borderColor: isHighlighted
          ? theme.colors.primary
          : theme.colors.surfaceBorder,
        borderWidth: isHighlighted ? 1.5 : 1,
      });

      // Number badge
      const numBoxSize = Math.min(itemH - 0.2, 0.7);
      const numBoxY = itemY + (itemH - numBoxSize) / 2;
      slide.addShape('roundRect' as any, {
        x: contentX + 0.25,
        y: numBoxY,
        w: numBoxSize,
        h: numBoxSize,
        fill: { color: isHighlighted ? theme.colors.primary : (theme.isDark ? '334155' : 'E2E8F0') },
        line: { color: '000000', width: 0 },
        rectRadius: 0.1,
      });

      slide.addText(item.number || `0${idx + 1}`, {
        x: contentX + 0.25,
        y: numBoxY,
        w: numBoxSize,
        h: numBoxSize,
        fontSize: 14,
        fontFace: theme.typography.fontHeader,
        color: isHighlighted ? theme.colors.textInverse : theme.colors.textPrimary,
        bold: true,
        align: 'center',
        valign: 'middle',
      });

      // Title & description
      const textX = contentX + 0.4 + numBoxSize;
      const textW = contentW - (textX - contentX) - 0.4;
      slide.addText([
        { text: `${item.title}  `, options: { bold: true, fontSize: 14, color: theme.colors.textPrimary } },
        { text: `—  ${item.description}`, options: { bold: false, fontSize: 12, color: theme.colors.textSecondary } },
      ], {
        x: textX,
        y: itemY + 0.1,
        w: textW,
        h: itemH - 0.2,
        valign: 'middle',
      });
    });
  }

  renderSlideFooter(ctx);
  attachSpeakerNotes(slide, content.notes, content.references);
}
