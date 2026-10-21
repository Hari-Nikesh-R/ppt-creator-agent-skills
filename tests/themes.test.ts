import { describe, it } from 'node:test';
import assert from 'node:assert';
import { THEME_PRESETS, resolveTheme } from '../src/themes/theme-registry.js';
import { getContrastRatio } from '../src/validation/rules.js';
import { ThemeName } from '../src/content/types.js';

describe('Design System Themes & Contrast Tokens', () => {
  const themeKeys = Object.keys(THEME_PRESETS) as ThemeName[];

  it('provides all 7 specified enterprise themes', () => {
    assert.ok(themeKeys.includes('tech-conference'));
    assert.ok(themeKeys.includes('dark-technical'));
    assert.ok(themeKeys.includes('minimal-corporate'));
    assert.ok(themeKeys.includes('premium-business'));
    assert.ok(themeKeys.includes('academic-research'));
    assert.ok(themeKeys.includes('product-roadmap'));
    assert.ok(themeKeys.includes('training-education'));
  });

  themeKeys.forEach((themeKey) => {
    it(`theme [${themeKey}] satisfies WCAG AA contrast ratio (>= 4.5:1) for body text`, () => {
      const theme = THEME_PRESETS[themeKey];
      const ratio = getContrastRatio(theme.colors.textPrimary, theme.colors.background);
      assert.ok(ratio >= 4.5, `Theme ${themeKey} has insufficient contrast: ${ratio}`);
    });
  });

  it('supports theme token overrides', () => {
    const overridden = resolveTheme('tech-conference', {
      colors: { primary: 'FF0000' },
      borderRadius: 0.5,
    });

    assert.strictEqual(overridden.colors.primary, 'FF0000');
    assert.strictEqual(overridden.borderRadius, 0.5);
    assert.strictEqual(overridden.colors.background, THEME_PRESETS['tech-conference'].colors.background);
  });
});
