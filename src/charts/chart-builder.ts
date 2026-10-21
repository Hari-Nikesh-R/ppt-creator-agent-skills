import { ThemeTokens, DataChartSlideContent } from '../content/types.js';
import { PptxSlide, PptxPresentation } from '../layouts/base.js';
import { drawCard } from '../diagrams/shapes.js';

export function renderDataChart(
  slide: PptxSlide,
  pres: PptxPresentation,
  theme: ThemeTokens,
  content: DataChartSlideContent,
  area: { x: number; y: number; w: number; h: number }
) {
  const { chartType, series, dataInsights, sourceAttribution } = content;

  // Split area: Chart on Left (60%), Insights on Right (40%)
  const hasInsights = dataInsights && dataInsights.length > 0;
  const chartW = hasInsights ? area.w * 0.58 : area.w;
  const insightsW = hasInsights ? area.w * 0.38 : 0;
  const insightsX = area.x + chartW + area.w * 0.04;

  // Map chart type
  let pptxChartType: any = pres.ChartType.bar;
  if (chartType === 'col') pptxChartType = pres.ChartType.bar;
  else if (chartType === 'bar') pptxChartType = pres.ChartType.bar;
  else if (chartType === 'line') pptxChartType = pres.ChartType.line;
  else if (chartType === 'pie') pptxChartType = pres.ChartType.pie;
  else if (chartType === 'doughnut') pptxChartType = pres.ChartType.doughnut;

  // Chart palette
  const chartColors = [
    theme.colors.primary,
    theme.colors.secondary,
    theme.colors.accent,
    theme.colors.warning,
    theme.colors.success,
  ];

  // Draw container card for the chart
  drawCard(slide, theme, area.x, area.y, chartW, area.h, {
    fillColor: theme.colors.surface,
    borderColor: theme.colors.surfaceBorder,
  });

  // Format data for PptxGenJS
  const chartData = series.map((s) => ({
    name: s.name,
    labels: s.labels,
    values: s.values,
  }));

  const chartOpts: any = {
    x: area.x + 0.3,
    y: area.y + 0.3,
    w: chartW - 0.6,
    h: area.h - 0.8,
    chartColors,
    showLegend: series.length > 1,
    legendPos: 'b',
    legendColor: theme.colors.textSecondary,
    legendFontSize: 10,
    showValue: true,
    dataLabelColor: theme.colors.textPrimary,
    dataLabelFontSize: 9,
    catAxisLabelColor: theme.colors.textSecondary,
    catAxisLabelFontSize: 10,
    valAxisLabelColor: theme.colors.textSecondary,
    valAxisLabelFontSize: 10,
    valGridLine: { color: theme.isDark ? '334155' : 'E2E8F0', size: 1 },
    catGridLine: { style: 'none' },
  };

  if (chartType === 'bar') {
    chartOpts.barDir = 'col';
  }

  slide.addChart(pptxChartType, chartData, chartOpts);

  // Attribution if provided
  if (sourceAttribution) {
    slide.addText(`Source: ${sourceAttribution}`, {
      x: area.x + 0.3,
      y: area.y + area.h - 0.4,
      w: chartW - 0.6,
      h: 0.3,
      fontSize: 9,
      fontFace: theme.typography.fontBody,
      color: theme.colors.textMuted,
      align: 'left',
    });
  }

  // Right side: Data insights cards
  if (hasInsights) {
    drawCard(slide, theme, insightsX, area.y, insightsW, area.h, {
      fillColor: theme.colors.surface,
      borderColor: theme.colors.surfaceBorder,
    });

    slide.addText('KEY DATA INSIGHTS', {
      x: insightsX + 0.25,
      y: area.y + 0.25,
      w: insightsW - 0.5,
      h: 0.3,
      fontSize: 12,
      fontFace: theme.typography.fontHeader,
      color: theme.colors.primary,
      bold: true,
    });

    const itemsY = area.y + 0.65;
    const itemGap = (area.h - 0.9) / Math.max(1, dataInsights.length);

    dataInsights.forEach((insight, idx) => {
      const curY = itemsY + idx * itemGap;

      // Small accent bullet box
      slide.addShape('roundRect' as any, {
        x: insightsX + 0.25,
        y: curY + 0.05,
        w: 0.18,
        h: 0.18,
        fill: { color: theme.colors.secondary },
        line: { color: theme.colors.secondary, width: 0 },
        rectRadius: 0.04,
      });

      slide.addText(insight, {
        x: insightsX + 0.55,
        y: curY,
        w: insightsW - 0.8,
        h: itemGap - 0.1,
        fontSize: 11,
        fontFace: theme.typography.fontBody,
        color: theme.colors.textPrimary,
        valign: 'top',
        wrap: true,
      });
    });
  }
}
