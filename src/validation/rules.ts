import { PresentationModel, ValidationIssue, ColorPalette } from '../content/types.js';

/**
 * Calculates WCAG relative luminance from hex color string.
 */
export function getRelativeLuminance(hex: string): number {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
  const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
  const b = parseInt(cleanHex.substring(4, 6), 16) / 255;

  const srgb = [r, g, b].map((val) => {
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
}

/**
 * Computes WCAG contrast ratio between two hex colors.
 */
export function getContrastRatio(hex1: string, hex2: string): number {
  const l1 = getRelativeLuminance(hex1);
  const l2 = getRelativeLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Verifies color contrast of the theme palette.
 */
export function checkThemeContrast(palette: ColorPalette): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  // Primary text vs background
  const textBgRatio = getContrastRatio(palette.textPrimary, palette.background);
  if (textBgRatio < 4.5) {
    issues.push({
      slideIndex: -1,
      slideId: 'theme',
      severity: 'error',
      category: 'contrast',
      message: `Low contrast between textPrimary (#${palette.textPrimary}) and background (#${palette.background}): ${textBgRatio.toFixed(2)}:1 (minimum 4.5:1 required).`,
    });
  }

  // Text primary vs surface
  const textSurfaceRatio = getContrastRatio(palette.textPrimary, palette.surface);
  if (textSurfaceRatio < 4.5) {
    issues.push({
      slideIndex: -1,
      slideId: 'theme',
      severity: 'warning',
      category: 'contrast',
      message: `Borderline contrast between textPrimary (#${palette.textPrimary}) and surface (#${palette.surface}): ${textSurfaceRatio.toFixed(2)}:1.`,
    });
  }

  return issues;
}

/**
 * Checks content density and overflow risks for a slide.
 */
export function checkSlideContentDensity(model: PresentationModel): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  model.slides.forEach((slide, idx) => {
    // 1. Title length check
    const effectiveTitle = slide.title || (slide as any).sectionTitle;
    if (!effectiveTitle || effectiveTitle.trim().length === 0) {
      issues.push({
        slideIndex: idx,
        slideId: slide.id || `slide-${idx + 1}`,
        severity: 'error',
        category: 'missing-content',
        message: `Slide ${idx + 1} has an empty or missing title.`,
      });
    } else if (effectiveTitle.length > 90) {
      issues.push({
        slideIndex: idx,
        slideId: slide.id || `slide-${idx + 1}`,
        severity: 'warning',
        category: 'overflow',
        message: `Slide ${idx + 1} title exceeds 90 characters (${slide.title.length} chars). Consider shortening for visual impact.`,
      });
    }

    // 2. Speaker notes check if requested
    if (model.metadata.includeNotes) {
      if (!slide.notes || !slide.notes.talkingPoints || slide.notes.talkingPoints.length === 0) {
        issues.push({
          slideIndex: idx,
          slideId: slide.id || `slide-${idx + 1}`,
          severity: 'warning',
          category: 'speaker-notes',
          message: `Slide ${idx + 1} is missing speaker notes talking points when notes were requested.`,
        });
      }
    }

    // 3. Layout specific checks
    if (slide.layout === 'column-comparison') {
      const cols = (slide as any).columns;
      if (!cols || cols.length < 2) {
        issues.push({
          slideIndex: idx,
          slideId: slide.id,
          severity: 'error',
          category: 'structure',
          message: `Slide ${idx + 1} uses column-comparison but provides fewer than 2 columns.`,
        });
      }
    } else if (slide.layout === 'architecture-diagram') {
      const layers = (slide as any).layers;
      if (!layers || layers.length === 0) {
        issues.push({
          slideIndex: idx,
          slideId: slide.id,
          severity: 'error',
          category: 'structure',
          message: `Slide ${idx + 1} architecture diagram has no defined layers.`,
        });
      }
    } else if (slide.layout === 'code-example') {
      const code = (slide as any).code;
      if (!code || code.trim().length === 0) {
        issues.push({
          slideIndex: idx,
          slideId: slide.id,
          severity: 'error',
          category: 'missing-content',
          message: `Slide ${idx + 1} code-example has no code snippet provided.`,
        });
      }
    }

    // 4. References check
    if (slide.references && slide.references.length > 0) {
      slide.references.forEach((ref) => {
        if (!ref.url || !ref.url.startsWith('http')) {
          issues.push({
            slideIndex: idx,
            slideId: slide.id,
            severity: 'warning',
            category: 'references',
            message: `Slide ${idx + 1} reference "${ref.label}" contains invalid or non-HTTP URL: ${ref.url}`,
          });
        }
      });
    }
  });

  return issues;
}
