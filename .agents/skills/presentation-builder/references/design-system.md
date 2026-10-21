# Presentation Builder Design System Reference

This document defines the mathematical scales, color systems, typography tokens, and spatial rules powering the Antigravity presentation generator.

---

## 1. Canvas Dimensions & Grid System

All slides adhere to modern widescreen 16:9 presentation dimensions:
- **Canvas Width:** `13.333 inches` (`1280pt` / `1920px` equivalent)
- **Canvas Height:** `7.500 inches` (`720pt` / `1080px` equivalent)
- **Safe Horizontal Margin ($M_x$):** `0.80 inches` (left & right margins)
- **Safe Vertical Margin ($M_y$):** `0.60 inches` (top margin)
- **Header Zone:** `1.00 inches` (kicker badge, title, subtitle)
- **Footer Zone:** `0.50 inches` (separator line, deck metadata, slide number)
- **Active Content Area:** `11.733 inches` wide $\times$ `5.200 inches` high

All layout components calculate coordinates relative to the dynamic `contentX`, `contentY`, `contentW`, and `contentH` boundaries provided by the base slide renderer.

---

## 2. Color Palette & Semantic Roles

Every theme provides a complete semantic palette:

| Token | Semantic Purpose | WCAG Requirement |
| :--- | :--- | :--- |
| `primary` | Dominant branding, key titles, primary badges, major borders | High contrast against surface |
| `secondary` | Secondary accents, kicker tags, supporting metric numbers | Distinct from primary |
| `accent` | Callout highlights, focus indicators | Visual pop |
| `background` | Slide canvas background fill | Target contrast baseline |
| `surface` | Card background, container box fill | Distinct from background |
| `surfaceBorder` | Container card border lines | Subtle separation (1px / 1pt) |
| `textPrimary` | Slide titles, column headings, primary prose | $\ge 4.5:1$ against surface/bg |
| `textSecondary` | Body paragraphs, supporting bullets, subtitles | $\ge 4.5:1$ against surface/bg |
| `textMuted` | Footers, captions, timestamps, disclaimers | $\ge 3.0:1$ against surface/bg |
| `textInverse` | Text placed on primary or secondary badges | $\ge 4.5:1$ against badge bg |
| `success` | Positive results, completed milestones, pros | Visual distinction |
| `warning` | Cautions, in-progress items, review callouts | Visual distinction |
| `danger` | Trade-offs, problems, cons, failure short-circuits | Visual distinction |
| `codeBg` | Terminal code editor background | Dark obsidian / charcoal |
| `codeText` | Code syntax foreground | Bright cyan / emerald / yellow |

---

## 3. Typography Hierarchy

Fonts are chosen for cross-platform compatibility across Windows, macOS, and Linux without font-substitution distortion:

| Element | Font Face (Default) | Size (pt) | Weight | Line Spacing |
| :--- | :--- | :--- | :--- | :--- |
| Presentation Title | Arial / Georgia | 40pt | Bold | 1.1x |
| Section Title | Arial / Times New Roman | 36pt | Bold | 1.1x |
| Slide Title | Arial / Calibri | 26pt | Bold | 1.2x |
| Subtitle / Kicker | Arial / Calibri | 14pt–16pt | Regular / Bold | 1.2x |
| Card Headings | Arial / Calibri | 14pt–18pt | Bold | 1.2x |
| Body Prose / Bullets | Calibri | 11pt–14pt | Regular | 1.25x |
| Code Snippets | Consolas / Courier New | 11pt–12pt | Regular | 1.2x |
| Captions & Footers | Calibri | 10pt–11pt | Regular | 1.0x |

---

## 4. Theme Presets Catalog

1. **`tech-conference`:** Modern developer conference aesthetic (Royal Blue `#2563EB`, Cyan `#0EA5E9`, Slate White `#F8FAFC`).
2. **`dark-technical`:** High-contrast terminal dark mode (Obsidian `#0B0F19`, Neon Sky `#38BDF8`, Neon Emerald `#34D399`).
3. **`minimal-corporate`:** Enterprise boardroom presentation (Classic Navy `#1E3A8A`, Slate `#F1F5F9`, Crisp White).
4. **`premium-business`:** Executive leadership deck (Charcoal `#0F172A`, Warm Bronze `#B45309`, Warm Stone `#FAFAF9`).
5. **`academic-research`:** Scientific & university symposium (Burgundy `#831843`, Deep Navy `#1E3A8A`, Paper Tint `#F8FAFC`).
6. **`product-roadmap`:** Agile product review (Deep Teal `#0F766E`, Vivid Ocean `#0284C7`, Mint `#F0FDF4`).
7. **`training-education`:** Workshop & course materials (Friendly Indigo `#4338CA`, Warm Amber `#D97706`, Soft White).
