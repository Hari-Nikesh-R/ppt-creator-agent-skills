# Content Guidelines & Storytelling Standards

High-impact presentations rely on clear storytelling, cognitive ergonomics, and factual integrity. Follow these guidelines when preparing presentation models.

---

## 1. Action-Oriented Slide Titles

Slide titles must communicate conclusions, insights, or takeaways—never generic topic labels.

- ❌ *Bad:* "Virtual Threads"
- ✅ *Good:* "Virtual Threads Eliminate Carrier Contention Under Heavy I/O"

- ❌ *Bad:* "Framework Comparison"
- ✅ *Good:* "Spring AI vs LangChain4j: Selecting for Ecosystem Fit vs Polyglot Modularity"

- ❌ *Bad:* "Benchmark Results"
- ✅ *Good:* "Virtual Threads Deliver 19.6x Throughput with 77% Less Heap Memory"

---

## 2. Progressive Narrative Structure

A successful deck guides the audience through five key phases:
1. **The Hook & Context (Slides 1–4):** Why does this topic matter now? Establish the status quo, scale of the problem, and core thesis.
2. **The Architectural Blueprint (Slides 5–6):** Show the big picture before diving into weeds. Decouple components into clear tiers.
3. **The Practical Substance (Slides 7–9):** Deliver concrete implementation details, working code snippets, or sequential process steps.
4. **Empirical Evidence & Trade-offs (Slides 10–13):** Compare alternatives fairly, present quantitative benchmarks, and unpack real-world case studies with measured outcomes.
5. **Action Plan & Citations (Slides 14–15):** Synthesize takeaways into clear next steps and preserve full reference citations.

---

## 3. Cognitive Ergonomics & Anti-Overcrowding Rules

- **The 8-Bullet Maximum:** Never exceed 6–8 bullets per column.
- **The 60-Second Scan Rule:** A viewer must be able to understand the core message within 10 seconds of viewing.
- **Visual Asymmetry:** Alternate between 1-column hero cards, 2-column split comparisons, 3-column frameworks, and layered horizontal diagrams.
- **Code Snippet Length:** Keep code snippets strictly under 15 lines. Highlight only the critical API calls or concurrency constructs; elide boilerplate.

---

## 4. Speaker Notes Crafting

Speaker notes should assist the presenter rather than transcribe the slide text:
1. **Talking Points:** 2–4 bullet points detailing background context, edge cases, or industry anecdotes.
2. **Transition:** A explicit 1-sentence segue connecting the current slide's conclusion to the next slide's premise.
3. **Estimated Duration:** Recommended speaking time (typically 60–180 seconds per slide).
4. **Source Attribution:** Exact URLs and specifications backing the claims.

---

## 5. Factual Integrity & Citation Preservation

- **Never Fabricate:** Never invent benchmarks, JEP numbers, authors, or statistics.
- **Official Sources:** Cite official documentation (e.g., OpenJDK JEPs, Spring documentation, GitHub repositories, peer-reviewed papers).
- **Preserve URLs:** Always associate the exact source URL in the slide reference metadata.
