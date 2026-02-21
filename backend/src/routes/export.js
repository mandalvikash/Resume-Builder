import express from 'express';
import Dossier from '../models/Dossier.js';
import { authMiddleware } from '../middleware/auth.js';
import { generatePdfFromLatex } from '../services/latexToPdf.js';
import { generatePdfBuffer } from '../services/pdfGenerator.js';

const router = express.Router();

async function getPdfBuffer(dossier, templateId) {
  try {
    return await generatePdfFromLatex(dossier, templateId);
  } catch (latexErr) {
    console.warn('LaTeX PDF failed, falling back to HTML PDF:', latexErr.message);
    return await generatePdfBuffer(dossier, templateId);
  }
}

router.get('/pdf/:id', authMiddleware, async (req, res) => {
  try {
    const dossier = await Dossier.findOne({ _id: req.params.id, userId: req.user._id }).lean();
    if (!dossier) return res.status(404).json({ error: 'Dossier not found' });
    const templateId = req.query.template || dossier.resumeTemplateId || 'classic';
    const pdf = await getPdfBuffer(dossier, templateId);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="dossier-${dossier.shareId}.pdf"`);
    res.send(pdf);
  } catch (err) {
    console.error('PDF export error:', err);
    res.status(500).json({ error: err.message || 'Failed to generate PDF' });
  }
});

router.get('/pdf/share/:shareId', async (req, res) => {
  try {
    const dossier = await Dossier.findOne({ shareId: req.params.shareId }).lean();
    if (!dossier) return res.status(404).json({ error: 'Dossier not found' });
    const templateId = req.query.template || dossier.resumeTemplateId || 'classic';
    const pdf = await getPdfBuffer(dossier, templateId);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="dossier-${dossier.shareId}.pdf"`);
    res.send(pdf);
  } catch (err) {
    console.error('PDF export error:', err);
    res.status(500).json({ error: err.message || 'Failed to generate PDF' });
  }
});

export default router;
