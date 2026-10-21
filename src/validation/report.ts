import { ValidationReport } from '../content/types.js';

export function formatValidationReportMarkdown(report: ValidationReport, presentationTitle: string): string {
  const statusEmoji = report.passed ? '✅ PASSED' : '❌ FAILED';

  const rows = report.issues.map((issue) => {
    const sevBadge =
      issue.severity === 'error'
        ? '**[ERROR]**'
        : issue.severity === 'warning'
        ? '*[WARNING]*'
        : '[INFO]';
    return `| ${issue.slideIndex >= 0 ? `Slide ${issue.slideIndex + 1}` : 'Deck-level'} | ${sevBadge} | \`${issue.category}\` | ${issue.message} |`;
  });

  return `# PowerPoint Quality Assurance & Validation Report

**Presentation:** ${presentationTitle}  
**Status:** ${statusEmoji}  
**Timestamp:** ${report.timestamp}  
**Total Slides:** ${report.totalSlides}  
**Errors:** ${report.errorsCount}  
**Warnings:** ${report.warningsCount}  

## Presentation Metrics
- **Average Words / Content Items per Slide:** ${report.metrics.avgWordsPerSlide}
- **Slides with Speaker Notes:** ${report.metrics.slidesWithNotesCount} / ${report.totalSlides} (${Math.round((report.metrics.slidesWithNotesCount / report.totalSlides) * 100)}%)
- **Slides with Verified Citations:** ${report.metrics.slidesWithReferencesCount}
- **Unique Layouts Employed:** ${report.metrics.uniqueLayoutsUsed.length} (${report.metrics.uniqueLayoutsUsed.join(', ')})

## Detected Issues & Observations

${
  rows.length === 0
    ? '✨ **Zero issues detected! All contrast, typography, overflow bounds, speaker notes, and XML structures are compliant.**'
    : `| Scope | Severity | Category | Description |
| :--- | :--- | :--- | :--- |
${rows.join('\n')}`
}

---
*Report generated automatically by Antigravity Presentation Quality Engine.*
`;
}
