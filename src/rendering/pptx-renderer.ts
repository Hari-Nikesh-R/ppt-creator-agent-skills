import path from 'path';
import fs from 'fs';
import pptxgen from 'pptxgenjs';
import { PresentationModel, SlideContent } from '../content/types.js';
import { resolveTheme } from '../themes/theme-registry.js';
import { LayoutRenderContext } from '../layouts/base.js';
import { renderTitleSlide } from '../layouts/title.js';
import { renderAgendaSlide } from '../layouts/agenda.js';
import { renderSectionDividerSlide } from '../layouts/section-divider.js';
import { renderTextImageSlide } from '../layouts/text-image.js';
import { renderHeroStatSlide } from '../layouts/hero-stat.js';
import { renderColumnComparisonSlide } from '../layouts/column-comparison.js';
import { renderTimelineSlide } from '../layouts/timeline.js';
import { renderProcessFlowSlide } from '../layouts/process-flow.js';
import { renderArchitectureDiagramSlide } from '../layouts/architecture-diagram.js';
import { renderCodeExampleSlide } from '../layouts/code-example.js';
import { renderDataChartSlide } from '../layouts/data-chart.js';
import { renderCaseStudySlide } from '../layouts/case-study.js';
import { renderProsConsSlide } from '../layouts/pros-cons.js';
import { renderKeyTakeawaysSlide } from '../layouts/key-takeaways.js';
import { renderReferencesClosingSlide } from '../layouts/references-closing.js';

export interface RenderResult {
  outputPath: string;
  totalSlides: number;
  fileSizeBytes: number;
  themeUsed: string;
}

export async function renderPresentation(
  model: PresentationModel,
  outputFilePath: string
): Promise<RenderResult> {
  const PptxConstructor: any = (pptxgen as any).default || pptxgen;
  const pres = new PptxConstructor();

  // Configure widescreen 16:9 (13.333 x 7.5 inches)
  pres.layout = 'LAYOUT_16x9';
  pres.title = model.metadata.title;
  pres.author = model.metadata.author;
  pres.company = model.metadata.organization || 'Antigravity Presentations';
  pres.subject = model.metadata.topic;

  const theme = resolveTheme(model.metadata.theme);
  const totalSlides = model.slides.length;

  // Render each slide
  model.slides.forEach((slideContent: SlideContent, slideIndex: number) => {
    const slide = pres.addSlide();
    const ctx: LayoutRenderContext = {
      pres,
      slide,
      theme,
      metadata: model.metadata,
      slideIndex,
      totalSlides,
    };

    switch (slideContent.layout) {
      case 'title':
        renderTitleSlide(ctx, slideContent);
        break;
      case 'agenda':
        renderAgendaSlide(ctx, slideContent);
        break;
      case 'section-divider':
        renderSectionDividerSlide(ctx, slideContent);
        break;
      case 'text-image':
        renderTextImageSlide(ctx, slideContent);
        break;
      case 'hero-stat':
        renderHeroStatSlide(ctx, slideContent);
        break;
      case 'column-comparison':
        renderColumnComparisonSlide(ctx, slideContent);
        break;
      case 'timeline':
        renderTimelineSlide(ctx, slideContent);
        break;
      case 'process-flow':
        renderProcessFlowSlide(ctx, slideContent);
        break;
      case 'architecture-diagram':
        renderArchitectureDiagramSlide(ctx, slideContent);
        break;
      case 'code-example':
        renderCodeExampleSlide(ctx, slideContent);
        break;
      case 'data-chart':
        renderDataChartSlide(ctx, slideContent);
        break;
      case 'case-study':
        renderCaseStudySlide(ctx, slideContent);
        break;
      case 'pros-cons':
        renderProsConsSlide(ctx, slideContent);
        break;
      case 'key-takeaways':
        renderKeyTakeawaysSlide(ctx, slideContent);
        break;
      case 'references-closing':
        renderReferencesClosingSlide(ctx, slideContent);
        break;
      default:
        renderTextImageSlide(ctx, slideContent as any);
        break;
    }
  });

  // Ensure output directory exists
  const targetDir = path.dirname(outputFilePath);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // Write presentation file
  await pres.writeFile({ fileName: outputFilePath });

  const stats = fs.statSync(outputFilePath);

  return {
    outputPath: outputFilePath,
    totalSlides,
    fileSizeBytes: stats.size,
    themeUsed: theme.displayName,
  };
}
