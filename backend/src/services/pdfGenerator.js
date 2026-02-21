import puppeteer from 'puppeteer';
import { buildResumeHtml } from './resumeTemplates.js';

export async function generatePdfBuffer(dossier, templateId = 'classic') {
  const html = buildResumeHtml(dossier, templateId);
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '16px', right: '16px', bottom: '16px', left: '16px' },
    });
    return pdf;
  } finally {
    await browser.close();
  }
}
