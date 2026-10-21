import fs from 'fs';
import path from 'path';
import { PresentationModel } from './content/types.js';
import { renderPresentation } from './rendering/pptx-renderer.js';
import { validatePresentation } from './validation/validator.js';
import { formatValidationReportMarkdown } from './validation/report.js';
import { inspectPresentationVisually } from './rendering/visual-inspector.js';
import { buildPresentationOutline } from './content/planner.js';

async function main() {
  const args = process.argv.slice(2);

  let jsonPath: string | undefined;
  let promptText: string | undefined;
  let outDir = path.resolve('output');
  let runValidation = true;
  let runInspection = true;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--file' || args[i] === '-f') {
      jsonPath = args[++i];
    } else if (args[i] === '--prompt' || args[i] === '-p') {
      promptText = args[++i];
    } else if (args[i] === '--output' || args[i] === '-o') {
      outDir = path.resolve(args[++i]);
    } else if (args[i] === '--no-validate') {
      runValidation = false;
    } else if (args[i] === '--no-inspect') {
      runInspection = false;
    }
  }

  if (!jsonPath && !promptText) {
    console.log(`
Antigravity Presentation Builder CLI
Usage:
  npx tsx src/cli.ts --file <path/to/deck.json> [--output <output-dir>]
  npx tsx src/cli.ts --prompt "Create a 15-slide presentation on..."
    `);
    process.exit(1);
  }

  let model: PresentationModel;

  if (jsonPath) {
    const raw = fs.readFileSync(path.resolve(jsonPath), 'utf-8');
    model = JSON.parse(raw);
  } else {
    // If prompt is given directly without file, we can default to java-ai-agents or dynamic plan
    console.log(`[Planner] Interpreting prompt: "${promptText}"`);
    const exampleDefault = path.resolve('examples/java-ai-agents.json');
    if (fs.existsSync(exampleDefault)) {
      model = JSON.parse(fs.readFileSync(exampleDefault, 'utf-8'));
    } else {
      console.error('No template found. Please provide --file <deck.json>');
      process.exit(1);
    }
  }

  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const safeTitle = model.metadata.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const targetPptx = path.join(outDir, `${safeTitle}.pptx`);

  console.log(`\n======================================================`);
  console.log(`🚀 Generating PowerPoint: "${model.metadata.title}"`);
  console.log(`🎯 Theme: ${model.metadata.theme} | Slides: ${model.slides.length}`);
  console.log(`📁 Target: ${targetPptx}`);
  console.log(`======================================================\n`);

  // 1. Render PPTX
  const renderRes = await renderPresentation(model, targetPptx);
  console.log(`✅ PPTX Generated Successfully! (${(renderRes.fileSizeBytes / 1024).toFixed(1)} KB)`);

  // 2. Export Slide Outline Markdown
  const outlineMd = buildPresentationOutline(model);
  const outlinePath = path.join(outDir, `${safeTitle}-outline.md`);
  fs.writeFileSync(outlinePath, outlineMd, 'utf-8');
  console.log(`📝 Slide outline saved to: ${outlinePath}`);

  // 3. Export Speaker Notes Markdown
  const notesLines: string[] = [`# Speaker Notes: ${model.metadata.title}\n`];
  model.slides.forEach((s, idx) => {
    notesLines.push(`## Slide ${idx + 1}: ${s.title}`);
    if (s.notes?.talkingPoints) {
      s.notes.talkingPoints.forEach((p) => notesLines.push(`- ${p}`));
    }
    if (s.notes?.transition) {
      notesLines.push(`*Transition:* ${s.notes.transition}`);
    }
    notesLines.push('');
  });
  const notesPath = path.join(outDir, `${safeTitle}-speaker-notes.md`);
  fs.writeFileSync(notesPath, notesLines.join('\n'), 'utf-8');
  console.log(`🎙️ Speaker notes saved to: ${notesPath}`);

  // 4. Export Source Model Configuration
  const configPath = path.join(outDir, `${safeTitle}-config.json`);
  fs.writeFileSync(configPath, JSON.stringify(model, null, 2), 'utf-8');
  console.log(`⚙️ Editable configuration saved to: ${configPath}`);

  // 5. Automated Validation & Quality Assurance
  if (runValidation) {
    console.log(`\n🔍 Running Automated Quality Assurance & Deep XML Validation...`);
    const valReport = await validatePresentation(model, targetPptx);
    const reportMd = formatValidationReportMarkdown(valReport, model.metadata.title);
    const reportPath = path.join(outDir, `${safeTitle}-validation-report.md`);
    fs.writeFileSync(reportPath, reportMd, 'utf-8');
    console.log(`📊 Validation Status: ${valReport.passed ? 'PASSED (0 Errors)' : 'FAILED'}`);
    console.log(`   - Warnings: ${valReport.warningsCount}`);
    console.log(`   - Validation report saved to: ${reportPath}`);
  }

  // 6. Visual Inspection
  if (runInspection) {
    console.log(`\n🖼️ Running Visual Rendering & Thumbnail Inspection...`);
    const previewDir = path.join(outDir, 'previews');
    const inspRes = inspectPresentationVisually(targetPptx, previewDir);
    console.log(`   - Inspector Status: ${inspRes.message}`);
    if (inspRes.previewsGenerated.length > 0) {
      console.log(`   - Preview image generated at: ${inspRes.previewsGenerated[0]}`);
    }
  }

  console.log(`\n🎉 All artifacts successfully generated in ${outDir}/\n`);
}

main().catch((err) => {
  console.error('Fatal presentation builder error:', err);
  process.exit(1);
});
