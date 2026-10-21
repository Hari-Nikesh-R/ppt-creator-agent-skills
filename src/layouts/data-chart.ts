import pptxgen from 'pptxgenjs';
import { DataChartSlideContent } from '../content/types.js';
import {
  LayoutRenderContext,
  renderSlideBackground,
  renderSlideHeader,
  renderSlideFooter,
  attachSpeakerNotes,
} from './base.js';
import { renderDataChart } from '../charts/chart-builder.js';

export function renderDataChartSlide(ctx: LayoutRenderContext, content: DataChartSlideContent) {
  const { pres, slide, theme } = ctx;
  renderSlideBackground(slide, theme);
  const { contentX, contentY, contentW, contentH } = renderSlideHeader(slide, theme, content);

  renderDataChart(slide, pres, theme, content, {
    x: contentX,
    y: contentY,
    w: contentW,
    h: contentH,
  });

  renderSlideFooter(ctx);
  attachSpeakerNotes(slide, content.notes, content.references);
}
