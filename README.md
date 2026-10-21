# Prompt-to-PowerPoint Generator for Google Antigravity

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-v20%2B-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![PptxGenJS](https://img.shields.io/badge/PptxGenJS-v4.0.1-orange.svg)](https://gitbrent.github.io/PptxGenJS/)
[![Tests](https://img.shields.io/badge/Tests-17%20Passed-brightgreen.svg)]()

An enterprise-grade, automated presentation generation system built for **Google Antigravity**. Converts natural-language prompts into professional, fully editable, widescreen (`16:9`) PowerPoint (`.pptx`) presentations with custom themes, modular layouts, native architecture diagrams, syntax-highlighted code, editable charts, speaker notes, and automated quality assurance validation.

---

## 1. System Architecture & Capabilities

```
User Prompt ("Create a 15-slide presentation on...")
                     │
                     ▼
       ┌───────────────────────────┐
       │ Antigravity Agent Skill   │
       │ (.agents/skills/          │
       │   presentation-builder/)  │
       └─────────────┬─────────────┘
                     │  (Prompt interpretation & narrative planning)
                     ▼
       ┌───────────────────────────┐
       │ Structured Model (JSON)   │
       └─────────────┬─────────────┘
                     │
         ┌───────────┴───────────┐
         ▼                       ▼
┌──────────────────┐   ┌──────────────────┐
│ Design System    │   │ Layout Library   │
│ 7 Custom Themes  │   │ 15 Slide Types   │
│ WCAG AA Tokens   │   │ Shapes & Code    │
└────────┬─────────┘   └────────┬─────────┘
         │                      │
         └───────────┬──────────┘
                     ▼
       ┌───────────────────────────┐
       │ PptxGenJS Engine          │
       │ Native Widescreen 16:9    │
       │ OpenXML Packaging         │
       └─────────────┬─────────────┘
                     │
         ┌───────────┴───────────┐
         ▼                       ▼
┌──────────────────┐   ┌──────────────────┐
│ Automated QA     │   │ Visual Inspector │
│ Contrast Ratio   │   │ macOS QuickLook  │
│ OpenXML Zip & XML│   │ LibreOffice PDF  │
│ Speaker Notes    │   │ 16:9 Thumbnails  │
└────────┬─────────┘   └────────┬─────────┘
         │                      │
         └───────────┬──────────┘
                     ▼
       ┌───────────────────────────┐
       │ Complete Deliverables     │
       │ • .pptx presentation      │
       │ • outline.md              │
       │ • speaker-notes.md        │
       │ • validation-report.md    │
       │ • config.json             │
       │ • previews/*.png          │
       └───────────────────────────┘
```

---

## 2. Directory Structure

```text
ppt-creator-agent-skill/
├── .agents/
│   └── skills/
│       └── presentation-builder/
│           ├── SKILL.md                          # Antigravity skill declaration & workflow
│           ├── references/
│           │   ├── design-system.md              # Mathematical grid, typography scales & themes
│           │   ├── slide-layouts.md              # Catalog of 15 reusable slide components
│           │   ├── content-guidelines.md         # Narrative structure & anti-overcrowding rules
│           │   └── quality-checklist.md          # Pre-flight QA & boundary guidelines
│           ├── templates/
│           │   └── presentation-template.json    # JSON schema for declarative presentations
│           └── scripts/
│               └── build-presentation.sh         # Bash execution helper
├── src/
│   ├── index.ts                                  # Library entrypoint
│   ├── cli.ts                                    # Command-line interface
│   ├── content/
│   │   ├── types.ts                              # Strongly-typed TypeScript interfaces
│   │   └── planner.ts                            # Prompt parser & narrative outline generator
│   ├── themes/
│   │   ├── tokens.ts                             # Design tokens, dimensions, margins
│   │   ├── theme-registry.ts                     # Preset registry & token overrides
│   │   └── presets/                              # 7 enterprise themes
│   │       ├── tech-conference.ts                # Royal Blue & Cyan (default)
│   │       ├── dark-technical.ts                 # Obsidian & Terminal Neon
│   │       ├── minimal-corporate.ts              # Navy & Cool Slate
│   │       ├── premium-business.ts               # Charcoal & Warm Bronze
│   │       ├── academic-research.ts              # Crimson & Scholarly Serif
│   │       ├── product-roadmap.ts                # Deep Teal & Mint
│   │       └── training-education.ts             # Approachable Indigo & Amber
│   ├── layouts/                                  # 15 Reusable slide layout renderers
│   │   ├── base.ts                               # Slide header, footer, numbers, notes, background
│   │   ├── title.ts                              # High-impact title & presenter card
│   │   ├── agenda.ts                             # Numbered modular agenda cards
│   │   ├── section-divider.ts                    # Chapter transition with kicker & tags
│   │   ├── text-image.ts                         # Dual-card narrative & image/concept
│   │   ├── hero-stat.ts                          # Giant 54pt metric with proof points
│   │   ├── column-comparison.ts                  # 2, 3, or 4 column side-by-side evaluation
│   │   ├── timeline.ts                           # Milestone roadmap with phase badges
│   │   ├── process-flow.ts                       # Step-by-step pipeline with native arrows
│   │   ├── architecture-diagram.ts               # Tiered system architecture with badges
│   │   ├── code-example.ts                       # macOS-style IDE window with syntax highlighting
│   │   ├── data-chart.ts                         # Native PowerPoint editable charts
│   │   ├── case-study.ts                         # Problem / Solution / Results framework
│   │   ├── pros-cons.ts                          # Advantages vs Trade-offs with verdict banner
│   │   ├── key-takeaways.ts                      # Actionable recommendations & call-to-action
│   │   └── references-closing.ts                 # Verified citations, contact details, Q&A
│   ├── diagrams/
│   │   ├── shapes.ts                             # Cards, badges, callouts, IDE code windows
│   │   ├── architecture.ts                       # Multi-tier architecture diagram engine
│   │   └── flow.ts                               # Process flows & connector lines
│   ├── charts/
│   │   └── chart-builder.ts                      # Native PowerPoint bar/column/line/pie charts
│   ├── rendering/
│   │   ├── pptx-renderer.ts                      # PptxGenJS orchestration engine
│   │   └── visual-inspector.ts                   # macOS QuickLook & LibreOffice previewer
│   └── validation/
│       ├── rules.ts                              # WCAG relative luminance & contrast math
│       ├── validator.ts                          # Semantic & deep OpenXML zip inspector
│       └── report.ts                             # Markdown QA report generator
├── assets/                                       # Slide photography, diagrams, logos
├── examples/
│   ├── java-ai-agents.json                       # Full 15-slide Java AI technical keynote
│   └── cloud-architecture.json                   # Zero-trust cloud modernization review
├── tests/
│   ├── validator.test.ts                         # Contrast math & overflow test suite
│   ├── themes.test.ts                            # 7 theme contrast compliance tests
│   └── renderer.test.ts                          # End-to-end OpenXML packaging test
├── output/                                       # Generated .pptx, notes, outlines, previews
├── package.json
├── tsconfig.json
└── README.md
```

---

## 3. Technology Stack & MCP Evaluation

### PowerPoint Generation Engine
- **PptxGenJS (v4.0.1):** Generates native, 100% editable Microsoft PowerPoint (`.pptx`) OpenXML presentations without requiring Microsoft Office or Python to be installed.
- **Node.js (v20+) & TypeScript (v5.7):** Provides strong typing for slide models, layout components, and design tokens.
- **JSZip & Fast-XML-Parser:** Deeply inspects and validates the binary OpenXML package (`ppt/presentation.xml`, `ppt/slides/*.xml`, `ppt/notesSlides/*.xml`) for structural integrity.

### Model Context Protocol (MCP) Evaluation
We evaluated community PowerPoint MCP servers (e.g., `office-mcp`, `python-pptx-mcp`). Our architectural findings:
1. **Expressiveness & Design Control:** Existing PPT MCP tools expose rudimentary low-level functions (e.g., `add_textbox(x, y, text)`) over stdio JSON-RPC. They lack native support for design tokens, card elevations, flexible multi-tier architecture diagrams, syntax-highlighted IDE frames, and automated WCAG contrast validation.
2. **Security & Dependencies:** Community MCP servers often require external Python virtualenvs, binary wheels, or cloud API tokens.
3. **Deterministic Local Execution:** Executing local TypeScript via the Antigravity `presentation-builder` skill is 100% offline, zero-auth, reproducible, blazingly fast (< 1s per presentation), and generates complete artifacts with zero external attack surface.
4. **When to use MCP:** If your environment connects to an enterprise Microsoft 365 SharePoint/OneDrive MCP server for collaborative co-authoring or live tenant sync, you can configure it under `~/.gemini/antigravity-cli/settings.json`. For generation, the local TypeScript engine is optimal.

### Rendering & Inspection Tools
- **macOS QuickLook (`qlmanage`):** Natively installed on macOS. The inspector executes `qlmanage -t -s 1600 -o output/previews/ <file.pptx>`, producing pixel-perfect 16:9 PNG thumbnail previews of generated presentations.
- **LibreOffice (`soffice`):** If installed, the visual inspector automatically converts decks to PDF via `soffice --headless --convert-to pdf`.
- **Fallbacks:** If no rendering utility is available, the system falls back to deep programmatic OpenXML XML structural validation and reports the visual limitation clearly.

---

## 4. Quickstart & Installation

### Prerequisites
- Node.js `v20.0.0` or higher (`v24` supported)
- npm `v10` or higher

```bash
# Clone or navigate to the repository
cd ppt-creator-agent-skill

# Install dependencies
npm install

# Run the automated test suite (17 unit and integration tests)
npm test
```

---

## 5. How to Invoke the Skill in Google Antigravity

Antigravity automatically discovers customizations located in `.agents/skills/presentation-builder/SKILL.md`.

### Natural-Language Prompt Examples

You can enter any of the following natural-language prompts in Antigravity:

```text
"Create a 15-slide presentation about AI agents using the Java JDK for an audience of experienced Java developers. Make it suitable for a technical conference, include architecture diagrams, code examples, comparisons, speaker notes, and references."
```

```text
"Create an 8-slide executive proposal on migrating our monolithic payments platform to an event-driven Kafka and PostgreSQL architecture. Use the minimal-corporate theme and include a roadmap timeline, cost comparison, and speaker notes."
```

```text
"Build a 10-slide training presentation for junior engineers on Kubernetes container security. Use the dark-technical theme, include step-by-step process flows, common pitfalls, and a hands-on checklist."
```

```text
"Generate a 6-slide product roadmap for our Q3/Q4 AI search feature using the product-roadmap theme with release milestones and KPIs."
```

### CLI Execution
You can also run the generator directly via npm:

```bash
# Generate presentation from declarative JSON model
npm run generate -- --file examples/java-ai-agents.json

# Or generate using the shell helper
./.agents/skills/presentation-builder/scripts/build-presentation.sh examples/cloud-architecture.json

# Custom output directory
npx tsx src/cli.ts --file examples/java-ai-agents.json --output ./my-deliverables/
```

---

## 6. The 7 Design Themes & WCAG AA Contrast

All themes are configured in `src/themes/presets/` and automatically checked for contrast compliance ($\ge 4.5:1$):

| Theme ID | Aesthetic | Canvas Background | Primary Accent | Best For |
| :--- | :--- | :--- | :--- | :--- |
| `tech-conference` | Vibrant Modern Tech | `#F8FAFC` (Slate White) | `#2563EB` (Royal Blue) | Technical keynotes, developer conferences |
| `dark-technical` | Terminal Dark Mode | `#0B0F19` (Obsidian) | `#38BDF8` (Neon Sky) | Cybersecurity, infrastructure, CLI deep dives |
| `minimal-corporate` | Clean Boardroom | `#FFFFFF` (Pure White) | `#1E3A8A` (Corporate Navy) | Executive reviews, vendor pitches, investor decks |
| `premium-business` | Sophisticated Executive| `#FAFAF9` (Stone White) | `#0F172A` (Charcoal) | Strategy proposals, C-level readouts |
| `academic-research` | Scholarly Paper | `#FFFFFF` (Clean Paper) | `#831843` (Burgundy) | University seminars, research papers, R&D reviews |
| `product-roadmap` | Modern Agile | `#F0FDF4` (Mint Tint) | `#0F766E` (Deep Teal) | Sprint reviews, product roadmaps, release updates |
| `training-education`| Engaging Pedagogy | `#FAFAFA` (Soft Light) | `#4338CA` (Indigo) | Workshops, onboarding, engineering bootcamps |

### Customizing Themes & Overrides
You can customize colors, fonts, or corner radii without altering core files:
```typescript
import { resolveTheme } from './src/themes/theme-registry.js';

const customTheme = resolveTheme('tech-conference', {
  colors: {
    primary: '7C3AED',       // Brand Purple
    secondary: '06B6D4',     // Brand Cyan
  },
  borderRadius: 0.25,        // More rounded cards
});
```

---

## 7. The 15 Reusable Slide Layouts

The system provides 15 native slide layouts in `src/layouts/`:

1. **`title`**: Presentation title banner, event badge, speaker credentials, and tags.
2. **`agenda`**: Numbered module cards with inline summaries and highlighted track.
3. **`section-divider`**: Full-bleed section transition with kicker and topic pills.
4. **`text-image`**: Dual-column 50/50 narrative with photography or concept focal box.
5. **`hero-stat`**: Massive 54pt hero statistic banner with 3 supporting proof points.
6. **`column-comparison`**: 2, 3, or 4 column side-by-side evaluation matrix.
7. **`timeline`**: Horizontal milestone track with phase pills and chronological cards.
8. **`process-flow`**: Multi-stage sequential workflow with native arrow connectors.
9. **`architecture-diagram`**: Layered architectural schematics with badges and principle banner.
10. **`code-example`**: macOS-style IDE code window with syntax coloring and explanation card.
11. **`data-chart`**: Native PowerPoint bar/column/line/pie chart with data insights.
12. **`case-study`**: Problem / Solution / Results 3-column framework.
13. **`pros-cons`**: Side-by-side advantages and trade-offs with engineering verdict.
14. **`key-takeaways`**: Strategic action rows with Call-to-Action banner.
15. **`references-closing`**: Verified citations table, contact card, and Q&A closing.

---

## 8. Automated Quality Assurance

Every generation executes automated QA checks before saving:

1. **WCAG AA Contrast Math:** Computes relative luminance ($L = 0.2126R + 0.7152G + 0.0722B$) after sRGB gamma correction. Verifies contrast ratio $\ge 4.5:1$ for body and $\ge 3:1$ for large headings.
2. **Safe Boundary & Density Bounds:** Warns if slide titles exceed 90 characters or text blocks exceed 80 words.
3. **Speaker Notes Audit:** Ensures talking points exist on every slide when notes are enabled.
4. **Structural OpenXML Package Check:** Unzips `.pptx` in memory, verifies `ppt/presentation.xml`, `ppt/slides/slide*.xml`, and notes relationships.
5. **Reference URL Validation:** Verifies that citations contain valid HTTP/HTTPS URLs.

---

## 9. Sample Presentation Deliverables

The repository includes a complete 15-slide conference deck on **"Architecting Autonomous AI Agents on the Modern Java JDK"** in `output/`:

- **Presentation (`.pptx`):** [`architecting-autonomous-ai-agents-on-the-modern-java-jdk.pptx`](file:///Users/harinikeshr/Documents/2026/projects/ppt-creator-agent-skill/output/architecting-autonomous-ai-agents-on-the-modern-java-jdk.pptx) (428 KB, fully editable)
- **Slide Outline (`.md`):** [`architecting-autonomous-ai-agents-on-the-modern-java-jdk-outline.md`](file:///Users/harinikeshr/Documents/2026/projects/ppt-creator-agent-skill/output/architecting-autonomous-ai-agents-on-the-modern-java-jdk-outline.md)
- **Speaker Notes (`.md`):** [`architecting-autonomous-ai-agents-on-the-modern-java-jdk-speaker-notes.md`](file:///Users/harinikeshr/Documents/2026/projects/ppt-creator-agent-skill/output/architecting-autonomous-ai-agents-on-the-modern-java-jdk-speaker-notes.md)
- **QA Validation Report (`.md`):** [`architecting-autonomous-ai-agents-on-the-modern-java-jdk-validation-report.md`](file:///Users/harinikeshr/Documents/2026/projects/ppt-creator-agent-skill/output/architecting-autonomous-ai-agents-on-the-modern-java-jdk-validation-report.md)
- **Source Configuration (`.json`):** [`architecting-autonomous-ai-agents-on-the-modern-java-jdk-config.json`](file:///Users/harinikeshr/Documents/2026/projects/ppt-creator-agent-skill/output/architecting-autonomous-ai-agents-on-the-modern-java-jdk-config.json)
- **High-Res Visual Preview:** [`architecting-autonomous-ai-agents-on-the-modern-java-jdk.pptx.png`](file:///Users/harinikeshr/Documents/2026/projects/ppt-creator-agent-skill/output/previews/architecting-autonomous-ai-agents-on-the-modern-java-jdk.pptx.png)

---

## 10. Extending the System

### Adding a New Slide Layout
1. Add the layout name to `LayoutType` and create an interface in `src/content/types.ts`.
2. Create `src/layouts/your-layout.ts` implementing `renderYourLayout(ctx, content)`.
3. Register the layout in `src/rendering/pptx-renderer.ts`.
4. Document the layout in `.agents/skills/presentation-builder/references/slide-layouts.md`.

### Adding a New Theme
1. Create `src/themes/presets/your-theme.ts` using `createTheme()`.
2. Ensure contrast ratios exceed 4.5:1.
3. Register in `src/themes/theme-registry.ts`.
4. Add to the test suite in `tests/themes.test.ts`.

---

## 11. Troubleshooting & Limitations

- **Custom Fonts:** PowerPoint relies on local font availability. If a user opens a presentation with a font not installed on their OS, PowerPoint substitutes the closest standard font. Standard cross-platform fonts (`Arial`, `Calibri`, `Georgia`, `Consolas`) are selected by default.
- **Visual Inspection on Linux / CI:** `qlmanage` is macOS-specific. On Linux headless servers, install `libreoffice-core` to enable automatic PDF generation. If neither is available, the system falls back to deep programmatic OpenXML XML structural validation.
- **Top-Level Await:** Ensure Node.js `>= 20` is used and `"type": "module"` is configured in `package.json`.

---

## License
MIT © Antigravity Team
