import { ThemeTokens, ArchitectureDiagramSlideContent } from '../content/types.js';
import { PptxSlide } from '../layouts/base.js';
import { drawCard, drawBadge } from './shapes.js';

export function renderArchitectureDiagram(
  slide: PptxSlide,
  theme: ThemeTokens,
  content: ArchitectureDiagramSlideContent,
  area: { x: number; y: number; w: number; h: number }
) {
  const { layers, keyInsight } = content;
  const numLayers = layers.length;
  if (numLayers === 0) return;

  const insightHeight = keyInsight ? 0.7 : 0;
  const availableH = area.h - insightHeight - (numLayers - 1) * 0.2;
  const layerH = availableH / numLayers;

  layers.forEach((layer, layerIdx) => {
    const layerY = area.y + layerIdx * (layerH + 0.2);

    // Draw Layer Container Card
    drawCard(slide, theme, area.x, layerY, area.w, layerH, {
      fillColor: theme.isDark ? '1E293B' : 'F1F5F9',
      borderColor: theme.isDark ? '334155' : 'CBD5E1',
      borderWidth: 1,
    });

    // Layer Label on the left
    const labelW = 2.4;
    slide.addText(layer.title.toUpperCase(), {
      x: area.x + 0.2,
      y: layerY + 0.15,
      w: labelW - 0.3,
      h: layerH - 0.3,
      fontSize: 11,
      fontFace: theme.typography.fontHeader,
      color: theme.colors.primary,
      bold: true,
      valign: 'middle',
      wrap: true,
    });

    // Vertical separator
    slide.addShape('rect' as any, {
      x: area.x + labelW,
      y: layerY + 0.15,
      w: 0.02,
      h: layerH - 0.3,
      fill: { color: theme.isDark ? '334155' : 'CBD5E1' },
      line: { color: theme.isDark ? '334155' : 'CBD5E1', width: 0 },
    });

    // Component cards inside layer
    const comps = layer.components;
    const compsAreaX = area.x + labelW + 0.2;
    const compsAreaW = area.w - labelW - 0.4;
    const compGap = 0.15;
    const compW = (compsAreaW - (comps.length - 1) * compGap) / comps.length;
    const compH = layerH - 0.3;

    comps.forEach((comp, compIdx) => {
      const compX = compsAreaX + compIdx * (compW + compGap);
      const compY = layerY + 0.15;

      // Component Sub-Card
      drawCard(slide, theme, compX, compY, compW, compH, {
        fillColor: theme.colors.surface,
        borderColor: theme.colors.surfaceBorder,
        borderWidth: 1,
      });

      // Component badge if available
      let titleY = compY + 0.12;
      if (comp.badge) {
        drawBadge(
          slide,
          theme,
          compX + 0.15,
          compY + 0.1,
          comp.badge,
          theme.colors.secondary,
          theme.colors.textInverse,
          compW - 0.3,
          0.24
        );
        titleY += 0.3;
      }

      // Component title
      slide.addText(comp.title, {
        x: compX + 0.12,
        y: titleY,
        w: compW - 0.24,
        h: 0.3,
        fontSize: 11,
        fontFace: theme.typography.fontHeader,
        color: theme.colors.textPrimary,
        bold: true,
        align: 'center',
        valign: 'middle',
      });

      // Component subtitle or details
      if (comp.subtitle || (comp.details && comp.details.length > 0)) {
        const detailText = comp.subtitle || comp.details?.slice(0, 2).join(' • ') || '';
        slide.addText(detailText, {
          x: compX + 0.1,
          y: titleY + 0.3,
          w: compW - 0.2,
          h: compH - (titleY - compY) - 0.35,
          fontSize: 9,
          fontFace: theme.typography.fontBody,
          color: theme.colors.textSecondary,
          align: 'center',
          valign: 'top',
          wrap: true,
        });
      }
    });
  });

  // Key architectural takeaway / insight banner
  if (keyInsight) {
    const bannerY = area.y + area.h - insightHeight + 0.1;
    drawCard(slide, theme, area.x, bannerY, area.w, insightHeight - 0.1, {
      fillColor: theme.isDark ? '0F172A' : 'EFF6FF',
      borderColor: theme.colors.primary,
      borderWidth: 1,
    });

    slide.addText([
      { text: 'KEY ARCHITECTURAL PRINCIPLE: ', options: { bold: true, color: theme.colors.primary } },
      { text: keyInsight, options: { bold: false, color: theme.colors.textPrimary } },
    ], {
      x: area.x + 0.3,
      y: bannerY + 0.1,
      w: area.w - 0.6,
      h: insightHeight - 0.3,
      fontSize: 11,
      fontFace: theme.typography.fontBody,
      valign: 'middle',
    });
  }
}
