# Reusable Slide Layout Catalog

This catalog outlines all 15 native PowerPoint slide layout components, their required data structures, and ideal use cases.

---

### 1. `title`
- **Purpose:** Presentation title and opening deck slide.
- **Fields:** `title`, `subtitle`, `presenter`, `role`, `organization`, `date`, `eventOrContext`, `tags`.
- **Composition:** Large banner card with accent strip, badges, and presenter metadata.

### 2. `agenda`
- **Purpose:** Table of contents, module overview, executive roadmap.
- **Fields:** `items: [{ number, title, description }]`, `highlightIndex`.
- **Composition:** Vertical stack of cards with numbered badges and inline descriptions.

### 3. `section-divider`
- **Purpose:** Full-bleed chapter transition between major topics.
- **Fields:** `sectionNumber`, `sectionTitle`, `summary`, `keyTopics`.
- **Composition:** High-contrast focal card with vertical accent stripe and topic tag pills.

### 4. `text-image`
- **Purpose:** Conceptual narrative paired with an illustration, diagram image, or architecture graphic.
- **Fields:** `bodyParagraphs`, `bulletPoints`, `imagePath`, `imageCaption`, `imagePosition` (`left` | `right`).
- **Composition:** 50/50 split dual-card layout. Gracefully falls back to a concept focal box if no image is supplied.

### 5. `hero-stat`
- **Purpose:** Quantitative focal point, key benchmark, or company milestone.
- **Fields:** `mainStat`, `statLabel`, `contextSentence`, `supportingMetrics: [{ stat, label, detail }]`.
- **Composition:** Giant 54pt hero number banner on top, 3 supporting metric cards underneath.

### 6. `column-comparison`
- **Purpose:** Side-by-side evaluation of 2, 3, or 4 options, technologies, or architectures.
- **Fields:** `columns: [{ heading, badge, description, bullets, highlight }]`.
- **Composition:** Responsive equal-width cards with optional primary border highlight for recommended option.

### 7. `timeline`
- **Purpose:** Chronological milestone roadmap, product release schedule, or historical progression.
- **Fields:** `milestones: [{ dateOrPhase, title, description, status, badge }]`.
- **Composition:** Continuous horizontal progress track with circular nodes, phase pills above, and cards below.

### 8. `process-flow`
- **Purpose:** Multi-stage sequential workflow, cognitive decision loop, or CI/CD pipeline.
- **Fields:** `steps: [{ stepNumber, title, description }]`, `outcomeSummary`.
- **Composition:** Numbered step cards connected by native PowerPoint arrows, with an outcome banner at the bottom.

### 9. `architecture-diagram`
- **Purpose:** Tiered system architecture, microservices, agent swarms, and data pipeline layers.
- **Fields:** `layers: [{ title, components: [{ title, subtitle, layer, badge }] }]`, `keyInsight`.
- **Composition:** Horizontal tiered containers with internal component cards, badges, and architectural principle banner.

### 10. `code-example`
- **Purpose:** Developer-centric code review with syntax styling and architectural rationale.
- **Fields:** `language`, `filename`, `code`, `explanationPoints`, `calloutTitle`.
- **Composition:** 60/40 split. Left: macOS-style IDE window with red/yellow/green dots, dark background, and syntax colors. Right: Explanation bullets card.

### 11. `data-chart`
- **Purpose:** Native editable PowerPoint data visualizations.
- **Fields:** `chartType` (`bar` | `col` | `line` | `pie` | `doughnut`), `series`, `dataInsights`, `sourceAttribution`.
- **Composition:** Native Office chart on left, key data takeaways on right, and formal source attribution at bottom.

### 12. `case-study`
- **Purpose:** Problem / Solution / Results framework.
- **Fields:** `clientOrContext`, `problem`, `solution`, `results`, `quoteOrTakeaway`.
- **Composition:** 3 vertical cards with semantic badge colors (Problem: Red, Solution: Blue, Results: Green).

### 13. `pros-cons`
- **Purpose:** Objective architectural trade-offs and nuanced technology appraisals.
- **Fields:** `conceptName`, `pros`, `cons`, `verdict`.
- **Composition:** Emerald advantages card on left, coral trade-offs card on right, and engineering verdict banner spanning the full width at bottom.

### 14. `key-takeaways`
- **Purpose:** Executive summary, final recommendations, and strategic actions.
- **Fields:** `takeaways: [{ title, action }]`, `callToAction`.
- **Composition:** Numbered recommendation rows with accent markers and high-impact Call to Action card.

### 15. `references-closing`
- **Purpose:** Verified bibliography, academic citations, speaker contact info, and Q&A.
- **Fields:** `referencesList: [{ title, authorOrSource, url }]`, `contactInfo`, `closingMessage`.
- **Composition:** Curated references list on left, contact details & Q&A invitation card on right.
