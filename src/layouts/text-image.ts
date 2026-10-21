import fs from 'fs';
import pptxgen from 'pptxgenjs';
import { TextImageSlideContent } from '../content/types.js';
import {
  LayoutRenderContext,
  renderSlideBackground,
  renderSlideHeader,
  renderSlideFooter,
  attachSpeakerNotes,
} from './base.js';
import { drawCard } from '../diagrams/shapes.js';

export function renderTextImageSlide(ctx: LayoutRenderContext, content: TextImageSlideContent) {
  const { slide, theme } = ctx;
  renderSlideBackground(slide, theme);
  const { contentX, contentY, contentW, contentH } = renderSlideHeader(slide, theme, content);

  const isImageRight = content.imagePosition !== 'left';
  const colGap = 0.4;
  const colW = (contentW - colGap) / 2;

  const textX = isImageRight ? contentX : contentX + colW + colGap;
  const imageX = isImageRight ? contentX + colW + colGap : contentX;

  // Text Column Card
  drawCard(slide, theme, textX, contentY, colW, contentH, {
    fillColor: theme.colors.surface,
    borderColor: theme.colors.surfaceBorder,
  });

  // Paragraphs
  let textY = contentY + 0.3;
  if (content.bodyParagraphs && content.bodyParagraphs.length > 0) {
    const textBlob = content.bodyParagraphs.join('\n\n');
    slide.addText(textBlob, {
      x: textX + 0.3,
      y: textY,
      w: colW - 0.6,
      h: 2.2,
      fontSize: theme.typography.fontSizeBody,
      fontFace: theme.typography.fontBody,
      color: theme.colors.textPrimary,
      valign: 'top',
      wrap: true,
    });
    textY += 2.4;
  }

  // Bullets
  if (content.bulletPoints && content.bulletPoints.length > 0) {
    const bulletRuns = content.bulletPoints.map((bp) => ({
      text: bp,
      options: { bullet: true, color: theme.colors.textSecondary, fontSize: theme.typography.fontSizeBody - 1 },
    }));

    slide.addText(bulletRuns as any, {
      x: textX + 0.3,
      y: textY,
      w: colW - 0.6,
      h: contentH - (textY - contentY) - 0.3,
      fontFace: theme.typography.fontBody,
      valign: 'top',
      wrap: true,
    });
  }

  // Image Column Card
  drawCard(slide, theme, imageX, contentY, colW, contentH, {
    fillColor: theme.isDark ? '1E293B' : 'F8FAFC',
    borderColor: theme.colors.surfaceBorder,
  });

  const hasImage = content.imagePath && fs.existsSync(content.imagePath);
  if (hasImage && content.imagePath) {
    slide.addImage({
      path: content.imagePath,
      x: imageX + 0.2,
      y: contentY + 0.2,
      w: colW - 0.4,
      h: contentH - 0.7,
    });

    if (content.imageCaption) {
      slide.addText(content.imageCaption, {
        x: imageX + 0.2,
        y: contentY + contentH - 0.45,
        w: colW - 0.4,
        h: 0.3,
        fontSize: theme.typography.fontSizeCaption,
        fontFace: theme.typography.fontBody,
        color: theme.colors.textMuted,
        align: 'center',
      });
    }
  } else {
    // Elegant fallback illustration / concept focal box
    slide.addText('VISUAL FOCUS & ARCHITECTURE', {
      x: imageX + 0.3,
      y: contentY + 1.2,
      w: colW - 0.6,
      h: 0.4,
      fontSize: 14,
      fontFace: theme.typography.fontHeader,
      color: theme.colors.primary,
      bold: true,
      align: 'center',
    });

    slide.addText(
      content.imageCaption ||
        'Real-world system architecture, high-throughput pipelines, and developer-centric ergonomics.',
      {
        x: imageX + 0.4,
        y: contentY + 1.8,
        w: colW - 0.8,
        h: 1.5,
        fontSize: 12,
        fontFace: theme.typography.fontBody,
        color: theme.colors.textSecondary,
        align: 'center',
        valign: 'top',
        wrap: true,
      }
    );
  }

  renderSlideFooter(ctx);
  attachSpeakerNotes(slide, content.notes, content.references);
}
