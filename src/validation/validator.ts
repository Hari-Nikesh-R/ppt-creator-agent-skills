import fs from 'fs';
import JSZip from 'jszip';
import { XMLParser } from 'fast-xml-parser';
import { PresentationModel, ValidationReport, ValidationIssue } from '../content/types.js';
import { resolveTheme } from '../themes/theme-registry.js';
import { checkThemeContrast, checkSlideContentDensity } from './rules.js';

export async function validatePresentation(
  model: PresentationModel,
  pptxFilePath?: string
): Promise<ValidationReport> {
  const issues: ValidationIssue[] = [];

  // 1. Theme Contrast Validation
  const theme = resolveTheme(model.metadata.theme);
  const contrastIssues = checkThemeContrast(theme.colors);
  issues.push(...contrastIssues);

  // 2. Semantic & Layout Model Validation
  const densityIssues = checkSlideContentDensity(model);
  issues.push(...densityIssues);

  // 3. Overall presentation metrics
  let totalWords = 0;
  let notesCount = 0;
  let refsCount = 0;
  const layoutSet = new Set<string>();

  model.slides.forEach((s) => {
    layoutSet.add(s.layout);
    if (s.notes?.talkingPoints && s.notes.talkingPoints.length > 0) notesCount++;
    if (s.references && s.references.length > 0) refsCount++;

    const textToCount = [
      s.title,
      s.subtitle || '',
      ...(s.notes?.talkingPoints || []),
    ].join(' ');
    totalWords += textToCount.split(/\s+/).filter(Boolean).length;
  });

  const avgWords = model.slides.length > 0 ? Math.round(totalWords / model.slides.length) : 0;

  // 4. Binary & XML Validation (if file exists)
  if (pptxFilePath && fs.existsSync(pptxFilePath)) {
    try {
      const fileBuffer = fs.readFileSync(pptxFilePath);
      const zip = await JSZip.loadAsync(fileBuffer);
      const parser = new XMLParser();

      // Check presentation.xml
      const presXmlFile = zip.file('ppt/presentation.xml');
      if (!presXmlFile) {
        issues.push({
          slideIndex: -1,
          slideId: 'binary',
          severity: 'error',
          category: 'structure',
          message: 'Generated PPTX package is corrupt: ppt/presentation.xml not found.',
        });
      } else {
        const presXmlText = await presXmlFile.async('text');
        const parsed = parser.parse(presXmlText);
        if (!parsed['p:presentation']) {
          issues.push({
            slideIndex: -1,
            slideId: 'binary',
            severity: 'error',
            category: 'structure',
            message: 'Generated PPTX root XML is missing p:presentation element.',
          });
        }
      }

      // Check all slide XML files exist
      for (let i = 1; i <= model.slides.length; i++) {
        const slideFile = zip.file(`ppt/slides/slide${i}.xml`);
        if (!slideFile) {
          issues.push({
            slideIndex: i - 1,
            slideId: `slide-${i}`,
            severity: 'error',
            category: 'structure',
            message: `Slide XML for slide ${i} (ppt/slides/slide${i}.xml) is missing in package.`,
          });
        }
      }

      // Check speaker notes in XML package if requested
      if (model.metadata.includeNotes) {
        let notesSlideFound = 0;
        zip.forEach((relativePath) => {
          if (relativePath.startsWith('ppt/notesSlides/notesSlide') && relativePath.endsWith('.xml')) {
            notesSlideFound++;
          }
        });

        if (notesSlideFound === 0 && notesCount > 0) {
          issues.push({
            slideIndex: -1,
            slideId: 'notes',
            severity: 'warning',
            category: 'speaker-notes',
            message: 'Speaker notes were generated in model but no notesSlides XML detected in pptx package.',
          });
        }
      }
    } catch (err: any) {
      issues.push({
        slideIndex: -1,
        slideId: 'binary',
        severity: 'error',
        category: 'structure',
        message: `Failed to inspect PPTX zip archive: ${err.message}`,
      });
    }
  }

  const errorsCount = issues.filter((i) => i.severity === 'error').length;
  const warningsCount = issues.filter((i) => i.severity === 'warning').length;

  return {
    timestamp: new Date().toISOString(),
    totalSlides: model.slides.length,
    passed: errorsCount === 0,
    errorsCount,
    warningsCount,
    issues,
    metrics: {
      avgWordsPerSlide: avgWords,
      slidesWithNotesCount: notesCount,
      slidesWithReferencesCount: refsCount,
      uniqueLayoutsUsed: Array.from(layoutSet),
    },
  };
}
