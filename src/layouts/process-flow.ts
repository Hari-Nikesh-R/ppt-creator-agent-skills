import pptxgen from 'pptxgenjs';
import { ProcessFlowSlideContent } from '../content/types.js';
import {
  LayoutRenderContext,
  renderSlideBackground,
  renderSlideHeader,
  renderSlideFooter,
  attachSpeakerNotes,
} from './base.js';
import { renderProcessFlow } from '../diagrams/flow.js';

export function renderProcessFlowSlide(ctx: LayoutRenderContext, content: ProcessFlowSlideContent) {
  const { slide, theme } = ctx;
  renderSlideBackground(slide, theme);
  const { contentX, contentY, contentW, contentH } = renderSlideHeader(slide, theme, content);

  renderProcessFlow(slide, theme, content, {
    x: contentX,
    y: contentY,
    w: contentW,
    h: contentH,
  });

  renderSlideFooter(ctx);
  attachSpeakerNotes(slide, content.notes, content.references);
}
