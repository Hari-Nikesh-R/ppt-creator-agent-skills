import pptxgen from 'pptxgenjs';
import { ProsConsSlideContent } from '../content/types.js';
import {
  LayoutRenderContext,
  renderSlideBackground,
  renderSlideHeader,
  renderSlideFooter,
  attachSpeakerNotes,
} from './base.js';
import { drawCard, drawBadge } from '../diagrams/shapes.js';

export function renderProsConsSlide(ctx: LayoutRenderContext, content: ProsConsSlideContent) {
  const { slide, theme } = ctx;
  renderSlideBackground(slide, theme);
  const { contentX, contentY, contentW, contentH } = renderSlideHeader(slide, theme, content);

  const verdictH = 0.8;
  const colAreaH = contentH - verdictH - 0.25;
  const colGap = 0.35;
  const colW = (contentW - colGap) / 2;

  // Left: PROS
  drawCard(slide, theme, contentX, contentY, colW, colAreaH, {
    fillColor: theme.isDark ? '064E3B' : 'ECFDF5',
    borderColor: theme.colors.success,
    borderWidth: 1.5,
  });

  drawBadge(slide, theme, contentX + 0.3, contentY + 0.25, 'ADVANTAGES / PROS', theme.colors.success, 'FFFFFF');

  const prosRuns = content.pros.map((p) => ({
    text: p,
    options: { bullet: true, color: theme.colors.textPrimary, fontSize: 12 },
  }));

  slide.addText(prosRuns as any, {
    x: contentX + 0.3,
    y: contentY + 0.75,
    w: colW - 0.6,
    h: colAreaH - 0.9,
    fontFace: theme.typography.fontBody,
    valign: 'top',
    wrap: true,
  });

  // Right: CONS / TRADE-OFFS
  const consX = contentX + colW + colGap;
  drawCard(slide, theme, consX, contentY, colW, colAreaH, {
    fillColor: theme.isDark ? '450A0A' : 'FEF2F2',
    borderColor: theme.colors.danger,
    borderWidth: 1.5,
  });

  drawBadge(slide, theme, consX + 0.3, contentY + 0.25, 'TRADE-OFFS / LIMITATIONS', theme.colors.danger, 'FFFFFF');

  const consRuns = content.cons.map((c) => ({
    text: c,
    options: { bullet: true, color: theme.colors.textPrimary, fontSize: 12 },
  }));

  slide.addText(consRuns as any, {
    x: consX + 0.3,
    y: contentY + 0.75,
    w: colW - 0.6,
    h: colAreaH - 0.9,
    fontFace: theme.typography.fontBody,
    valign: 'top',
    wrap: true,
  });

  // Bottom Verdict Card
  const verdictY = contentY + colAreaH + 0.2;
  drawCard(slide, theme, contentX, verdictY, contentW, verdictH, {
    fillColor: theme.colors.surface,
    borderColor: theme.colors.primary,
    borderWidth: 1.5,
  });

  slide.addText([
    { text: 'ENGINEERING VERDICT:  ', options: { bold: true, color: theme.colors.primary } },
    { text: content.verdict, options: { bold: false, color: theme.colors.textPrimary } },
  ], {
    x: contentX + 0.3,
    y: verdictY + 0.1,
    w: contentW - 0.6,
    h: verdictH - 0.2,
    fontSize: 12,
    fontFace: theme.typography.fontBody,
    valign: 'middle',
  });

  renderSlideFooter(ctx);
  attachSpeakerNotes(slide, content.notes, content.references);
}
