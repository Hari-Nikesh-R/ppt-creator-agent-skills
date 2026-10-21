import pptxgen from 'pptxgenjs';
import { ArchitectureDiagramSlideContent } from '../content/types.js';
import {
  LayoutRenderContext,
  renderSlideBackground,
  renderSlideHeader,
  renderSlideFooter,
  attachSpeakerNotes,
} from './base.js';
import { renderArchitectureDiagram } from '../diagrams/architecture.js';

export function renderArchitectureDiagramSlide(ctx: LayoutRenderContext, content: ArchitectureDiagramSlideContent) {
  const { slide, theme } = ctx;
  renderSlideBackground(slide, theme);
  const { contentX, contentY, contentW, contentH } = renderSlideHeader(slide, theme, content);

  renderArchitectureDiagram(slide, theme, content, {
    x: contentX,
    y: contentY,
    w: contentW,
    h: contentH,
  });

  renderSlideFooter(ctx);
  attachSpeakerNotes(slide, content.notes, content.references);
}
