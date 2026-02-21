import fs from 'fs';
import path from 'path';
import os from 'os';
import { execSync } from 'child_process';
import { renderLatex } from './latexGenerator.js';
import { nanoid } from 'nanoid';

const TEX_FILENAME = 'dossier.tex';

/**
 * Compile LaTeX source to PDF using pdflatex.
 * Requires TeX Live or MiKTeX installed and pdflatex in PATH.
 * @param {string} texContent - Full LaTeX document source
 * @returns {Buffer} PDF file buffer
 */
function compileLatexToPdf(texContent) {
  const tempDir = path.join(os.tmpdir(), `dossier-${nanoid(8)}`);
  fs.mkdirSync(tempDir, { recursive: true });
  const texPath = path.join(tempDir, TEX_FILENAME);
  const pdfPath = path.join(tempDir, 'dossier.pdf');

  try {
    fs.writeFileSync(texPath, texContent, 'utf-8');

    const pdflatexCmd = process.platform === 'win32'
      ? `pdflatex -interaction=nonstopmode -halt-on-error "${TEX_FILENAME}"`
      : `pdflatex -interaction=nonstopmode -halt-on-error ${TEX_FILENAME}`;

    execSync(pdflatexCmd, {
      cwd: tempDir,
      stdio: 'pipe',
      timeout: 60000,
    });
    // Second run for references/TOC
    execSync(pdflatexCmd, {
      cwd: tempDir,
      stdio: 'pipe',
      timeout: 60000,
    });

    if (!fs.existsSync(pdfPath)) {
      throw new Error('LaTeX compilation did not produce a PDF. Is pdflatex installed?');
    }
    const pdfBuffer = fs.readFileSync(pdfPath);
    return pdfBuffer;
  } finally {
    try {
      fs.rmSync(tempDir, { recursive: true, force: true });
    } catch (_) {}
  }
}

/**
 * Generate PDF from dossier using LaTeX: fill template → compile → return PDF buffer.
 * @param {Object} dossier - Dossier document
 * @param {string} templateId - classic | modern | executive
 * @returns {Buffer} PDF buffer
 */
export function generatePdfFromLatex(dossier, templateId = 'classic') {
  const texContent = renderLatex(dossier, templateId);
  return compileLatexToPdf(texContent);
}
