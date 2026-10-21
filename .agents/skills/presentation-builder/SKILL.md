---
name: presentation-builder
description: >-
  Automated end-to-end PowerPoint presentation generator. Converts natural-language
  prompts into professional, fully editable .pptx presentations with custom themes,
  modular slide layouts, native architecture diagrams, syntax-highlighted code,
  data charts, speaker notes, and automated quality assurance validation.
---

# Presentation Builder Skill

The `presentation-builder` skill empowers Antigravity to interpret natural-language presentation briefs and generate production-grade, editable PowerPoint presentations (`.pptx`) with zero manual formatting overhead.

## End-to-End Workflow

```
[User Prompt] ➔ [Prompt Interpretation] ➔ [Narrative Planning] ➔ [Model JSON] ➔ [PptxGenJS Rendering] ➔ [Automated QA] ➔ [Visual Inspection] ➔ [Final Deliverables]
```

### Stage 1: Prompt Interpretation
When the user requests a presentation:
1. Extract or infer:
   - **Topic & Central Message:** Core thesis and objective.
   - **Target Audience:** Engineering, executive, general, or educational.
   - **Slide Count & Depth:** Explicit number of slides (default: 10–15 slides).
   - **Visual Theme:** One of the 7 built-in design themes (or custom overrides).
   - **Required Components:** Architecture diagrams, code examples, comparisons, charts, speaker notes, references.
2. If any critical ambiguity prevents a meaningful result, ask a focused clarification. Otherwise, adopt sensible defaults (16:9 widescreen, tech-conference theme, speaker notes enabled).

### Stage 2: Narrative & Content Planning
Before generating slides, structure a progressive storyline:
- **Title Slide:** High-impact title, subtitle, presenter credentials, tags.
- **Agenda / Executive Summary:** Roadmap of the session modules.
- **Problem Context / Landscape:** Industry status, bottlenecks, or metrics.
- **Core Architecture & Schematics:** Layered component diagrams and data flow.
- **Deep Dives & Implementation:** Real code snippets or process steps.
- **Comparative Analysis / Benchmarks:** Side-by-side matrices and charts.
- **Case Study / Practical Evidence:** Real-world problem, solution, and measured impact.
- **Trade-offs & Nuance:** Pros and cons.
- **Key Takeaways & Action Plan:** Concrete, actionable next steps.
- **References & Q&A Closing:** Verified citations, contact details, and open questions.

> [!IMPORTANT]
> Never use the same layout consecutively. Mix visual diagrams, code blocks, comparison cards, and data charts to sustain audience engagement.

### Stage 3: Theme Selection
Select from the 7 built-in themes:
- `tech-conference` (default for technical events, royal blue & cyan)
- `dark-technical` (terminal dark mode, neon sky & emerald)
- `minimal-corporate` (clean navy and cool slate)
- `premium-business` (executive charcoal & warm bronze)
- `academic-research` (scholarly burgundy & serif headers)
- `product-roadmap` (modern teal & agile mint)
- `training-education` (pedagogical indigo & amber)

### Stage 4: Layout Selection
Map each slide to its optimal layout type:
- `title` | `agenda` | `section-divider` | `text-image` | `hero-stat`
- `column-comparison` | `timeline` | `process-flow` | `architecture-diagram`
- `code-example` | `data-chart` | `case-study` | `pros-cons`
- `key-takeaways` | `references-closing`

### Stage 5: Generation Execution
Execute the generation pipeline via the project CLI:
```bash
npx tsx src/cli.ts --file <path/to/deck.json> --output output/
```
Or use the helper script:
```bash
./.agents/skills/presentation-builder/scripts/build-presentation.sh examples/java-ai-agents.json
```

### Stage 6: Automated Quality Assurance
The pipeline automatically runs:
1. **WCAG AA Contrast Check:** Verifies text-to-background contrast $\ge 4.5:1$.
2. **Content Overflow Heuristic:** Checks character counts and slide density.
3. **OpenXML Structural Integrity:** Inspects zip archive, slide XMLs, and relationships.
4. **Speaker Notes Audit:** Ensures talking points exist on all slides when requested.
5. **Reference Validation:** Verifies that citations contain valid URLs.

### Stage 7: Visual Inspection
On macOS systems, the pipeline automatically invokes `qlmanage` to render a 16:9 high-resolution preview image (`.pptx.png`) into `output/previews/`. If LibreOffice (`soffice`) is installed, headless PDF export is used.

### Stage 8: Output Delivery
Every generation produces:
1. Editable PowerPoint presentation: `output/<name>.pptx`
2. Slide-by-slide narrative outline: `output/<name>-outline.md`
3. Presenter talking points & transitions: `output/<name>-speaker-notes.md`
4. Automated QA report: `output/<name>-validation-report.md`
5. Reproducible JSON configuration: `output/<name>-config.json`
6. Visual thumbnail preview: `output/previews/<name>.pptx.png`

## Detailed Reference Documentation

- [Design System & Tokens](file:///Users/harinikeshr/Documents/2026/projects/ppt-creator-agent-skill/.agents/skills/presentation-builder/references/design-system.md)
- [Slide Layout Catalog](file:///Users/harinikeshr/Documents/2026/projects/ppt-creator-agent-skill/.agents/skills/presentation-builder/references/slide-layouts.md)
- [Content & Storytelling Guidelines](file:///Users/harinikeshr/Documents/2026/projects/ppt-creator-agent-skill/.agents/skills/presentation-builder/references/content-guidelines.md)
- [Pre-Flight Quality Checklist](file:///Users/harinikeshr/Documents/2026/projects/ppt-creator-agent-skill/.agents/skills/presentation-builder/references/quality-checklist.md)
