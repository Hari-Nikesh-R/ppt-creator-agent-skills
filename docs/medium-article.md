# Beyond Boring Slides: How I Built an Autonomous Prompt-to-PowerPoint AI Agent in Google Antigravity

*Stop fighting with text boxes, alignment guides, and bullet points. Here is how an autonomous agent skill transforms a single natural-language prompt into a 15-slide, fully editable, conference-ready PowerPoint deck.*

---

**By Hari Nikesh R**  
*Published in AI Advances & Software Architecture • 12 min read*

---

We have all been there. You have an upcoming technical conference keynote, an executive architecture review, or an urgent investor proposal. You know the narrative, the concepts, and the technical arguments by heart.

Yet, you find yourself spending six grueling hours manually nudging rectangle shapes, tweaking hex codes, fighting alignment grids in PowerPoint, and copying and pasting code snippets into ugly grey boxes.

Even when you ask general-purpose LLMs for "slides," they usually spit out a wall of unformatted bullet points. If you try python-based script generators, you often end up with broken aspect ratios, zero aesthetic sense, and low-contrast text that would make any designer cringe.

I wanted something better: **A single natural-language prompt that produces a complete, visually stunning, fully editable `.pptx` presentation with architecture diagrams, syntax-highlighted code editors, native editable charts, speaker notes, and verified references.**

In this article, I will unpack the complete architectural blueprint of how I built the **`presentation-builder`** skill inside **Google Antigravity**, why we chose native local execution over existing PowerPoint MCP servers, how we designed a mathematical design system with automated WCAG AA contrast validation, and how you can run it yourself.

---

## 1. The Core Vision: What "Good" Looks Like

To build a presentation system that professionals actually want to present, we established five non-negotiable architectural requirements:

1. **Native OpenXML Output (`.pptx`):** No static PDFs or flattened images. Every shape, text box, table, and chart must remain 100% editable in Microsoft PowerPoint, Apple Keynote, and Google Slides.
2. **Cognitive Narrative Arc:** A presentation is not a collection of uniform bullet slides. It needs a deliberate story: Title $\rightarrow$ Agenda $\rightarrow$ Problem Hook $\rightarrow$ Tiered Architecture $\rightarrow$ Code Implementation $\rightarrow$ Empirical Benchmarks $\rightarrow$ Production Case Study $\rightarrow$ Trade-offs $\rightarrow$ Actionable Takeaways $\rightarrow$ Verified References.
3. **No Repetitive Layouts:** An audience gets bored when every slide looks identical. The system must dynamically choose between 15 distinct slide layouts based on the nature of the content.
4. **Automated Quality Assurance:** The generator should never output slides with overflowing text, unreadable contrast, missing titles, or broken OpenXML structures.
5. **Zero-Friction Agent Integration:** Packaged as a reusable Google Antigravity Agent Skill so any developer can invoke it with a single natural-language instruction.

---

## 2. System Architecture: The 4-Stage Pipeline

The generator operates as a decoupled, multi-stage pipeline:

```text
Natural-Language Prompt ("Create a 15-slide presentation on...")
                             │
                             ▼
              ┌─────────────────────────────┐
              │ 1. Prompt Interpreter       │
              │    & Narrative Planner      │
              └──────────────┬──────────────┘
                             │ (Structured Presentation Model)
                             ▼
              ┌─────────────────────────────┐
              │ 2. Design Tokens & Themes   │
              │    (7 Configurable Palettes)│
              └──────────────┬──────────────┘
                             │
                             ▼
              ┌─────────────────────────────┐
              │ 3. Layout Library & Shapes  │
              │    (15 Component Renderers) │
              └──────────────┬──────────────┘
                             │
                             ▼
              ┌─────────────────────────────┐
              │ 4. PptxGenJS Engine         │
              │    (Widescreen 16:9 OpenXML)│
              └──────────────┬──────────────┘
                             │
               ┌─────────────┴─────────────┐
               ▼                           ▼
 ┌───────────────────────────┐   ┌───────────────────────────┐
 │ 5. Automated QA Engine    │   │ 6. Visual Inspector       │
 │    • WCAG AA Contrast Math│   │    • macOS QuickLook      │
 │    • Text Overflow Bounds │   │    • High-Res 16:9 PNGs   │
 │    • Deep OpenXML Zip/XML │   │    • LibreOffice PDF      │
 └─────────────┬─────────────┘   └─────────────┬─────────────┘
               │                               │
               └──────────────┬────────────────┘
                              ▼
                 ┌───────────────────────────┐
                 │ Complete Deliverable Pack │
                 │ • presentation.pptx       │
                 │ • outline.md              │
                 │ • speaker-notes.md        │
                 │ • validation-report.md    │
                 │ • config.json             │
                 │ • previews/*.png          │
                 └───────────────────────────┘
```

---

## 3. Why We Bypassed PowerPoint MCP Servers

During early research, we evaluated community Model Context Protocol (MCP) servers for PowerPoint (like `python-pptx-mcp`). While MCP is brilliant for connecting agents to external databases and live SaaS APIs, we found critical limitations for high-fidelity presentation generation:

- **Schema Rigidity:** Community PPT MCP servers typically expose low-level primitives over stdio JSON-RPC (e.g., `create_slide`, `add_textbox`). Calling these tools iteratively over dozens of turns clutters the model's context window and often results in hallucinated coordinates or misaligned cards.
- **Lack of Design Systems:** They don't have built-in typography scales, elevation tokens, or flex-card layout math.
- **Security & Environment Overhead:** They require external Python virtual environments and binary wheel dependencies.

**The Solution:** We implemented the engine in local TypeScript using **PptxGenJS v4.0.1**. It runs directly inside the agent's Node runtime:
- **100% offline & zero-credential:** No API keys, tokens, or untrusted daemons required.
- **Blazingly fast:** Builds an entire 15-slide deck, inspects the OpenXML ZIP archive, and exports deliverables in under **800 milliseconds**.
- **Declarative JSON schema:** The agent plans the presentation as a strongly typed data model, which the renderer transforms into native OpenXML primitives in a single deterministic pass.

---

## 4. The Design System: Mathematical Elegance & WCAG AA Contrast

Professional slide design is fundamentally mathematical. Every slide adheres to widescreen 16:9 proportions:
- **Slide Width:** $13.333\text{ inches}$ ($1280\text{pt}$)
- **Slide Height:** $7.500\text{ inches}$ ($720\text{pt}$)
- **Horizontal Safe Margin:** $0.80\text{ inches}$
- **Top Safe Margin:** $0.60\text{ inches}$
- **Header Boundary:** $1.00\text{ inches}$
- **Footer Boundary:** $0.50\text{ inches}$

### 7 Built-In Enterprise Themes
Rather than forcing a one-size-fits-all look, we built 7 distinct themes:
1. **`tech-conference`**: Modern tech keynote with royal blue (`#2563EB`) and cyan (`#0EA5E9`).
2. **`dark-technical`**: Terminal dark mode with obsidian canvas (`#0B0F19`) and neon sky accents.
3. **`minimal-corporate`**: Classic boardroom navy (`#1E3A8A`) and crisp cool slate.
4. **`premium-business`**: Charcoal (`#0F172A`) and warm bronze (`#B45309`).
5. **`academic-research`**: Academic crimson (`#831843`) and serif typography.
6. **`product-roadmap`**: Agile teal (`#0F766E`) and fresh mint (`#F0FDF4`).
7. **`training-education`**: Approachable indigo (`#4338CA`) and warm amber.

### Automated Relative Luminance & Contrast Calculation
To guarantee legibility on projectors and screens, we built mathematical WCAG AA contrast calculation into the pre-flight validator:

$$\text{Relative Luminance } L = 0.2126 R + 0.7152 G + 0.0722 B$$

$$\text{Contrast Ratio } CR = \frac{L_1 + 0.05}{L_2 + 0.05}$$

If any foreground text falls below the $4.5:1$ threshold against its container card, the build pipeline immediately flags it before export.

---

## 5. The 15-Slide Layout Library

A standout feature is the diversity of native layout components. Here are a few highlights:

### 1. macOS-Style IDE Code Window (`code-example`)
Instead of ugly unformatted text, code snippets are rendered inside a dark-mode terminal window with authentic red, yellow, and green window buttons, filename headers, Consolas monospace typography, and an adjacent architectural rationale card.

### 2. Tiered Architecture Schematics (`architecture-diagram`)
Renders multi-layer system architectures (Gateway $\rightarrow$ Cognitive Orchestration $\rightarrow$ Concurrency Mesh $\rightarrow$ Distributed Persistence) with color-coded badges, vertical separator guides, and key takeaway banners.

### 3. Native PowerPoint Data Charts (`data-chart`)
Generates true Office OpenXML charts (bar, column, line, doughnut) paired with key insight cards and formal source citations. Presenters can click directly into the chart in PowerPoint to edit data points or adjust colors.

### 4. Problem-Solution-Results (`case-study`)
A 3-column framework displaying the business challenge (Coral Red badge), the architectural solution (Royal Blue badge), and measured impact metrics (Emerald Green badge).

---

## 6. Real-World Walkthrough: The 15-Slide Java AI Keynote

To put the system to the test, I gave Antigravity the following prompt:

> *"Create a 15-slide presentation about AI agents using the Java JDK for an audience of experienced Java developers. Make it suitable for a technical conference, include architecture diagrams, code examples, comparisons, speaker notes, and references."*

### What the Generator Produced in 800ms:
1. **The `.pptx` Presentation:** A 428 KB native deck with 15 unique slides.
2. **Slide-by-Slide Outline:** Comprehensive narrative markdown linking topics to OpenJDK specifications (JEP 444, JEP 480).
3. **Presenter Talking Points & Segues:** Every single slide includes 2–4 detailed speaker notes plus explicit verbal transitions (e.g., *"Let's see how this execution layer is implemented in clean Java code using Structured Concurrency"*).
4. **Automated Quality Report:** Confirmed 0 errors, 0 overflow warnings, 100% speaker notes coverage, and valid OpenXML package integrity.
5. **High-Resolution Visual Preview:** Rendered via macOS QuickLook at $1600 \times 903$ resolution into `output/previews/`.

Here is the high-resolution title slide preview generated directly from the OpenXML file:

![Title Slide Preview](https://raw.githubusercontent.com/Hari-Nikesh-R/ppt-creator-agent-skills/main/output/previews/architecting-autonomous-ai-agents-on-the-modern-java-jdk.pptx.png)

---

## 7. Automated Testing: 17/17 Green

A reliable software tool must have automated tests. Running `npm test` executes:
- **Math Verification:** Tests relative luminance and contrast ratio calculations.
- **Theme Palette Auditing:** Asserts that all 7 built-in themes exceed WCAG AA contrast standards.
- **OpenXML ZIP Parsing:** Inspects the generated `.pptx` archive using `JSZip` to verify that `ppt/presentation.xml`, `ppt/slides/slide*.xml`, and `ppt/notesSlides/notesSlide*.xml` exist and are well-formed.
- **Visual Thumbnail Generation:** Validates that macOS QuickLook generates non-empty PNG previews.

```bash
$ npm test

▶ Presentation Renderer & Package Verification
  ✔ renders a valid PPTX file to disk (21ms)
  ✔ generates a valid OpenXML ZIP package with slide and notes XML files (3ms)
  ✔ passes automated QA validation (5ms)
  ✔ executes visual inspection generating preview thumbnail on macOS (213ms)
▶ Design System Themes & Contrast Tokens
  ✔ provides all 7 specified enterprise themes (0.6ms)
  ✔ theme [tech-conference] satisfies WCAG AA contrast ratio (>= 4.5:1) (0.2ms)
  ✔ theme [dark-technical] satisfies WCAG AA contrast ratio (>= 4.5:1) (0.1ms)
  ✔ theme [minimal-corporate] satisfies WCAG AA contrast ratio (>= 4.5:1) (0.1ms)
  ✔ theme [premium-business] satisfies WCAG AA contrast ratio (>= 4.5:1) (0.1ms)
  ✔ theme [academic-research] satisfies WCAG AA contrast ratio (>= 4.5:1) (0.1ms)
  ✔ theme [product-roadmap] satisfies WCAG AA contrast ratio (>= 4.5:1) (0.1ms)
  ✔ theme [training-education] satisfies WCAG AA contrast ratio (>= 4.5:1) (0.1ms)
  ✔ supports theme token overrides (0.2ms)
▶ Quality Assurance Rules & Validator
  ✔ calculates WCAG relative luminance correctly (0.7ms)
  ✔ computes contrast ratio correctly (black vs white is 21:1) (0.1ms)
  ✔ flags low-contrast combinations (0.1ms)
  ✔ flags missing slide title in presentation model (2.2ms)

ℹ tests 17 | pass 17 | fail 0 | duration_ms 626ms
```

---

## 8. Try It Yourself & GitHub Repository

The entire codebase, the Antigravity skill definition, the 15-slide sample presentation, and reference guides are open source:

👉 **GitHub Repository:** [https://github.com/Hari-Nikesh-R/ppt-creator-agent-skills](https://github.com/Hari-Nikesh-R/ppt-creator-agent-skills)

### Quickstart:
```bash
# 1. Clone the repository
git clone https://github.com/Hari-Nikesh-R/ppt-creator-agent-skills.git
cd ppt-creator-agent-skills

# 2. Install dependencies
npm install

# 3. Run the automated test suite
npm test

# 4. Generate your first presentation
npm run generate -- --file examples/java-ai-agents.json
```

---

## Key Takeaways

1. **Stop wasting hours on manual formatting:** Generative AI is best leveraged when paired with a deterministic, mathematically grounded layout engine.
2. **Native OpenXML matters:** Presentations must remain editable living documents, not static images.
3. **Contrast and cognitive ergonomics can be automated:** Mathematical formulas can prevent unreadable slides and overcrowded text before a human ever opens the file.
4. **Antigravity Skills make agents truly repeatable:** Packaging complex procedures into `.agents/skills/<name>/SKILL.md` turns any coding assistant into an expert designer and presentation architect.

*Have you experimented with AI-generated presentations or building skills in Google Antigravity? Let me know your thoughts and questions in the comments!*
