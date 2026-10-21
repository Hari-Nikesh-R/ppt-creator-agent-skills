import pptxgen from 'pptxgenjs';
import { ReferencesClosingSlideContent } from '../content/types.js';
import {
  LayoutRenderContext,
  renderSlideBackground,
  renderSlideHeader,
  renderSlideFooter,
  attachSpeakerNotes,
} from './base.js';
import { drawCard, drawBadge } from '../diagrams/shapes.js';

export function renderReferencesClosingSlide(ctx: LayoutRenderContext, content: ReferencesClosingSlideContent) {
  const { slide, theme } = ctx;
  renderSlideBackground(slide, theme);
  const { contentX, contentY, contentW, contentH } = renderSlideHeader(slide, theme, content);

  const colGap = 0.35;
  const leftW = contentW * 0.62;
  const rightW = contentW * 0.38 - colGap;
  const rightX = contentX + leftW + colGap;

  // Left Column: References & Citations
  drawCard(slide, theme, contentX, contentY, leftW, contentH, {
    fillColor: theme.colors.surface,
    borderColor: theme.colors.surfaceBorder,
  });

  slide.addText('CURATED REFERENCES & SPECIFICATIONS', {
    x: contentX + 0.3,
    y: contentY + 0.25,
    w: leftW - 0.6,
    h: 0.3,
    fontSize: 12,
    fontFace: theme.typography.fontHeader,
    color: theme.colors.primary,
    bold: true,
  });

  const refs = content.referencesList || [];
  const refY = contentY + 0.65;
  const itemH = (contentH - 0.8) / Math.max(1, refs.length);

  refs.forEach((ref, idx) => {
    const curY = refY + idx * itemH;

    slide.addText([
      { text: `${idx + 1}. ${ref.title}\n`, options: { bold: true, fontSize: 11, color: theme.colors.textPrimary } },
      { text: `Source: ${ref.authorOrSource}  |  `, options: { fontSize: 10, color: theme.colors.textSecondary } },
      { text: ref.url, options: { fontSize: 10, color: theme.colors.primary, underline: true } },
    ], {
      x: contentX + 0.3,
      y: curY,
      w: leftW - 0.6,
      h: itemH - 0.08,
      fontFace: theme.typography.fontBody,
      valign: 'top',
    });
  });

  // Right Column: Q&A & Contact Card
  drawCard(slide, theme, rightX, contentY, rightW, contentH, {
    fillColor: theme.isDark ? '1E293B' : 'EFF6FF',
    borderColor: theme.colors.primary,
    borderWidth: 1.5,
  });

  drawBadge(slide, theme, rightX + 0.3, contentY + 0.3, 'THANK YOU', theme.colors.primary, theme.colors.textInverse);

  slide.addText('QUESTIONS & DISCUSSION', {
    x: rightX + 0.3,
    y: contentY + 0.75,
    w: rightW - 0.6,
    h: 0.6,
    fontSize: 18,
    fontFace: theme.typography.fontHeader,
    color: theme.colors.textPrimary,
    bold: true,
  });

  if (content.closingMessage) {
    slide.addText(content.closingMessage, {
      x: rightX + 0.3,
      y: contentY + 1.45,
      w: rightW - 0.6,
      h: 0.9,
      fontSize: 11,
      fontFace: theme.typography.fontBody,
      color: theme.colors.textSecondary,
      valign: 'top',
      wrap: true,
    });
  }

  // Contact Info
  if (content.contactInfo) {
    const ci = content.contactInfo;
    const lines: string[] = [];
    if (ci.name) lines.push(ci.name);
    if (ci.role) lines.push(ci.role);
    if (ci.email) lines.push(`Email: ${ci.email}`);
    if (ci.socialHandle) lines.push(`Social: ${ci.socialHandle}`);
    if (ci.website) lines.push(`Web: ${ci.website}`);

    slide.addText(lines.join('\n'), {
      x: rightX + 0.3,
      y: contentY + contentH - 1.6,
      w: rightW - 0.6,
      h: 1.3,
      fontSize: 11,
      fontFace: theme.typography.fontBody,
      color: theme.colors.primary,
      bold: true,
      valign: 'bottom',
    });
  }

  renderSlideFooter(ctx);
  attachSpeakerNotes(slide, content.notes, content.references);
}
