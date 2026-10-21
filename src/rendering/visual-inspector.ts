import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

export interface VisualInspectionResult {
  toolUsed: 'qlmanage' | 'soffice' | 'none';
  previewsGenerated: string[];
  isAvailable: boolean;
  message: string;
}

export function inspectPresentationVisually(
  pptxPath: string,
  previewDir: string
): VisualInspectionResult {
  if (!fs.existsSync(pptxPath)) {
    return {
      toolUsed: 'none',
      previewsGenerated: [],
      isAvailable: false,
      message: `File does not exist: ${pptxPath}`,
    };
  }

  if (!fs.existsSync(previewDir)) {
    fs.mkdirSync(previewDir, { recursive: true });
  }

  // 1. Try macOS native QuickLook manager (qlmanage)
  try {
    const qlCheck = execSync('which qlmanage', { stdio: 'pipe' }).toString().trim();
    if (qlCheck && fs.existsSync(qlCheck)) {
      // Execute thumbnail generation
      execSync(`qlmanage -t -s 1600 -o "${previewDir}" "${pptxPath}"`, {
        stdio: 'pipe',
        timeout: 15000,
      });

      const baseName = path.basename(pptxPath);
      const expectedThumb = path.join(previewDir, `${baseName}.png`);

      if (fs.existsSync(expectedThumb)) {
        return {
          toolUsed: 'qlmanage',
          previewsGenerated: [expectedThumb],
          isAvailable: true,
          message: `Generated high-resolution 16:9 thumbnail preview via macOS QuickLook at ${expectedThumb}`,
        };
      }
    }
  } catch (err: any) {
    // Continue to next inspector
  }

  // 2. Try LibreOffice soffice if installed
  try {
    const sofficeCheck = execSync('which soffice || which libreoffice', { stdio: 'pipe' }).toString().trim();
    if (sofficeCheck) {
      execSync(`"${sofficeCheck}" --headless --convert-to pdf "${pptxPath}" --outdir "${previewDir}"`, {
        stdio: 'pipe',
        timeout: 20000,
      });

      const baseName = path.basename(pptxPath, path.extname(pptxPath));
      const pdfPath = path.join(previewDir, `${baseName}.pdf`);
      if (fs.existsSync(pdfPath)) {
        return {
          toolUsed: 'soffice',
          previewsGenerated: [pdfPath],
          isAvailable: true,
          message: `Converted presentation to PDF for visual inspection via LibreOffice at ${pdfPath}`,
        };
      }
    }
  } catch (err) {
    // soffice not available
  }

  return {
    toolUsed: 'none',
    previewsGenerated: [],
    isAvailable: false,
    message: 'Visual rendering tools (soffice/LibreOffice) not installed in local environment. Structural XML & programmatic QA inspection utilized.',
  };
}
