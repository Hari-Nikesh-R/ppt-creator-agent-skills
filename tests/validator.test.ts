import { describe, it } from 'node:test';
import assert from 'node:assert';
import { getContrastRatio, getRelativeLuminance } from '../src/validation/rules.js';
import { validatePresentation } from '../src/validation/validator.js';
import { PresentationModel } from '../src/content/types.js';

describe('Quality Assurance Rules & Validator', () => {
  it('calculates WCAG relative luminance correctly', () => {
    assert.strictEqual(getRelativeLuminance('000000'), 0);
    assert.ok(Math.abs(getRelativeLuminance('FFFFFF') - 1.0) < 0.05);
  });

  it('computes contrast ratio correctly (black vs white is 21:1)', () => {
    const ratio = getContrastRatio('000000', 'FFFFFF');
    assert.ok(Math.abs(ratio - 21.0) < 0.5);
  });

  it('flags low-contrast combinations', () => {
    const ratio = getContrastRatio('E2E8F0', 'FFFFFF');
    assert.ok(ratio < 4.5);
  });

  it('flags missing slide title in presentation model', async () => {
    const mockModel: PresentationModel = {
      metadata: {
        title: 'Test Deck',
        topic: 'Test',
        author: 'Tester',
        targetAudience: 'Engineers',
        presentationType: 'Review',
        theme: 'tech-conference',
        aspectRatio: '16:9',
        createdAt: '2026-10-21',
        version: '1.0.0',
        includeNotes: true,
      },
      slides: [
        {
          id: 's1',
          layout: 'title',
          title: '', // Missing title!
          subtitle: 'Valid Subtitle',
          presenter: 'Author',
        },
      ],
    };

    const report = await validatePresentation(mockModel);
    assert.strictEqual(report.passed, false);
    assert.ok(report.errorsCount > 0);
    assert.ok(report.issues.some((i) => i.category === 'missing-content'));
  });
});
