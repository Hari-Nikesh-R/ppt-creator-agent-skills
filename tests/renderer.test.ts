import { describe, it } from 'node:test';
import assert from 'node:assert';
import fs from 'fs';
import path from 'path';
import JSZip from 'jszip';
import { PresentationModel } from '../src/content/types.js';
import { renderPresentation } from '../src/rendering/pptx-renderer.js';
import { validatePresentation } from '../src/validation/validator.js';
import { inspectPresentationVisually } from '../src/rendering/visual-inspector.js';

describe('Presentation Renderer & Package Verification', () => {
  const testPptxPath = path.resolve('output/test-render.pptx');
  const previewDir = path.resolve('output/test-previews');

  const sampleModel: PresentationModel = {
    metadata: {
      title: 'End-to-End Test Deck',
      topic: 'Automated Testing',
      author: 'Antigravity QA',
      targetAudience: 'Test Suite',
      presentationType: 'Integration Test',
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
        title: 'End-to-End Test Deck Title',
        subtitle: 'Validating PptxGenJS and OpenXML Packaging',
        presenter: 'QA Agent',
        eventOrContext: 'CI Test Run',
        notes: {
          talkingPoints: ['Welcome the test runner', 'Verify title rendering'],
          transition: 'Moving to agenda',
        },
      },
      {
        id: 's2',
        layout: 'column-comparison',
        title: 'Comparing Architecture Models',
        subtitle: 'Side by side architectural trade-offs',
        columns: [
          {
            heading: 'Traditional Monolith',
            bullets: ['Single deployment unit', 'Direct in-memory calls', 'Simple initial setup'],
          },
          {
            heading: 'Agentic Mesh',
            bullets: ['Autonomous task delegation', 'High concurrency', 'Tool-calling isolation'],
            highlight: true,
          },
        ],
        notes: {
          talkingPoints: ['Emphasize differences in scaling and isolation'],
        },
      },
      {
        id: 's3',
        layout: 'code-example',
        title: 'Java JDK 21 Virtual Threads',
        subtitle: 'Lightweight concurrency for agent workers',
        language: 'java',
        filename: 'AgentWorker.java',
        code: `try (var scope = new StructuredTaskScope.ShutdownOnFailure()) {\n    Supplier<String> planner = scope.fork(() -> planTask());\n    Supplier<ToolResult> exec = scope.fork(() -> runTool());\n    scope.join().throwIfFailed();\n}`,
        explanationPoints: [
          'StructuredTaskScope manages child thread lifecycles.',
          'Virtual threads provide millions of concurrent tasks with minimal footprint.',
        ],
        notes: {
          talkingPoints: ['Highlight that JDK 21 virtual threads avoid OS thread starvation.'],
        },
      },
    ],
  };

  it('renders a valid PPTX file to disk', async () => {
    const result = await renderPresentation(sampleModel, testPptxPath);
    assert.strictEqual(fs.existsSync(testPptxPath), true);
    assert.strictEqual(result.totalSlides, 3);
    assert.ok(result.fileSizeBytes > 1000);
  });

  it('generates a valid OpenXML ZIP package with slide and notes XML files', async () => {
    const fileBuffer = fs.readFileSync(testPptxPath);
    const zip = await JSZip.loadAsync(fileBuffer);

    assert.ok(zip.file('ppt/presentation.xml') !== null);
    assert.ok(zip.file('ppt/slides/slide1.xml') !== null);
    assert.ok(zip.file('ppt/slides/slide2.xml') !== null);
    assert.ok(zip.file('ppt/slides/slide3.xml') !== null);
  });

  it('passes automated QA validation', async () => {
    const report = await validatePresentation(sampleModel, testPptxPath);
    assert.strictEqual(report.passed, true);
    assert.strictEqual(report.errorsCount, 0);
    assert.strictEqual(report.totalSlides, 3);
  });

  it('executes visual inspection generating preview thumbnail on macOS', () => {
    const insp = inspectPresentationVisually(testPptxPath, previewDir);
    assert.strictEqual(insp.isAvailable, true);
    assert.ok(insp.previewsGenerated.length > 0);
    assert.strictEqual(fs.existsSync(insp.previewsGenerated[0]), true);
  });
});
