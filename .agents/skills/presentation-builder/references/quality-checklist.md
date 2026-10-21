# Presentation Pre-Flight Quality Checklist

Use this checklist before delivering a presentation to ensure flawless visual presentation, structural integrity, and audience engagement.

---

## 1. Visual & Typography Checks
- [ ] **Contrast Compliance:** All text has a WCAG AA contrast ratio $\ge 4.5:1$ against its background surface.
- [ ] **Safe Margins:** No text or shape extends past the $0.80"$ horizontal safe margin or $0.60"$ top margin.
- [ ] **Font Uniformity:** Titles, body copy, and code blocks use consistent font faces defined in the active theme.
- [ ] **Hierarchy:** Slide titles are distinctly larger ($26\text{pt}+$) than card headings ($14\text{pt}–18\text{pt}$) and body bullets ($11\text{pt}–14\text{pt}$).
- [ ] **Card Padding:** All text inside cards maintains at least $0.15"$ internal padding from card borders.

---

## 2. Content & Narrative Checks
- [ ] **Action Titles:** Every slide title communicates a meaningful conclusion or claim rather than a single generic word.
- [ ] **Density Threshold:** No slide exceeds 90 characters in its title or 80 words in any single text container.
- [ ] **Layout Variety:** The presentation uses at least 5 different layout types across its arc. No layout repeats consecutively.
- [ ] **Code Readability:** Code blocks include language indicators, simulated window controls, and syntax coloring.
- [ ] **Verified Citations:** All external claims and benchmark charts cite authoritative source specifications or URLs.

---

## 3. Speaker Notes Checks
- [ ] **Talking Points:** All slides contain concrete talking points elaborating beyond the slide prose.
- [ ] **Transitions:** Clear verbal segues connect each slide to the subsequent slide.
- [ ] **Duration Pacing:** Total estimated time matches the target presentation slot.

---

## 4. Technical & OpenXML Packaging Checks
- [ ] **Clean Compilation:** The CLI builds without TypeScript or bundling warnings.
- [ ] **OpenXML Zip Integrity:** The `.pptx` archive unzips cleanly and contains `ppt/presentation.xml`, `ppt/slides/slide*.xml`, and `ppt/notesSlides/notesSlide*.xml`.
- [ ] **Editable Elements:** Native shapes, text frames, tables, and charts remain directly editable in PowerPoint / Keynote / Google Slides.
- [ ] **Visual Preview:** A valid PNG thumbnail is generated in `output/previews/` via macOS QuickLook or LibreOffice.
- [ ] **QA Report:** The automated validation report confirms `PASSED (0 Errors)`.
