import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getShareUrl, downloadPdf } from '../../api/client';

export default function StepTemplates({
  data,
  update,
  save,
  loading,
  savedId,
  shareId,
  resumeTemplates,
  webTemplates,
}) {
  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfError, setPdfError] = useState('');

  const handleCopyLink = () => {
    if (!shareId) return;
    const url = getShareUrl(shareId);
    navigator.clipboard.writeText(url).then(() => alert('Link copied to clipboard!'));
  };

  const handleDownloadPdf = async () => {
    if (!savedId) return;
    setPdfError('');
    setPdfLoading(true);
    try {
      await downloadPdf(savedId, data.resumeTemplateId, `dossier-${shareId || 'export'}.pdf`);
    } catch (e) {
      setPdfError(e.message || 'Failed to generate PDF');
    } finally {
      setPdfLoading(false);
    }
  };

  return (
    <section className="space-y-8">
      <h2 className="font-display text-lg font-semibold text-slate-900">Resume / Dossier template (PDF)</h2>
      <p className="text-slate-600 text-sm">Choose a layout. Your dossier will be compiled to a professional PDF.</p>
      <div className="grid sm:grid-cols-3 gap-4">
        {(resumeTemplates || []).map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => update('resumeTemplateId', t.id)}
            className={`p-4 rounded-xl border-2 text-left transition ${
              data.resumeTemplateId === t.id ? 'border-primary-500 bg-primary-50' : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <span className="font-medium text-slate-900">{t.name}</span>
            <p className="text-sm text-slate-600 mt-1">{t.description}</p>
          </button>
        ))}
      </div>

      <div>
        <h2 className="font-display text-lg font-semibold text-slate-900 mb-2">Web portfolio</h2>
        <label className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            checked={data.enableWebPortfolio !== false}
            onChange={(e) => update('enableWebPortfolio', e.target.checked)}
            className="rounded border-slate-300 text-primary-600"
          />
          <span>Enable web portfolio (shareable link)</span>
        </label>
        {data.enableWebPortfolio !== false && (
          <div className="grid sm:grid-cols-3 gap-4">
            {(webTemplates || []).map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => update('webPortfolioTemplateId', t.id)}
                className={`p-4 rounded-xl border-2 text-left transition ${
                  data.webPortfolioTemplateId === t.id ? 'border-primary-500 bg-primary-50' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <span className="font-medium text-slate-900">{t.name}</span>
                <p className="text-sm text-slate-600 mt-1">{t.description}</p>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="pt-6 border-t border-slate-200 space-y-4">
        <button
          type="button"
          onClick={save}
          disabled={loading}
          className="px-6 py-3 rounded-xl bg-primary-600 text-white font-medium hover:bg-primary-700 disabled:opacity-50"
        >
          {loading ? 'Saving…' : savedId ? 'Update dossier' : 'Save dossier'}
        </button>

        {savedId && (
          <>
            {pdfError && <p className="text-sm text-red-600">{pdfError}</p>}
            <div className="flex flex-wrap gap-3 items-center">
              <button
                type="button"
                onClick={handleDownloadPdf}
                disabled={pdfLoading}
                className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 disabled:opacity-50"
              >
                {pdfLoading ? 'Generating PDF…' : 'Download PDF'}
              </button>
              {data.enableWebPortfolio !== false && shareId && (
                <>
                  <Link
                    to={`/p/${shareId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg bg-slate-800 text-white hover:bg-slate-900"
                  >
                    View portfolio
                  </Link>
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50"
                  >
                    Copy share link
                  </button>
                </>
              )}
            </div>
            {shareId && (
              <p className="text-sm text-slate-600">
                Share link: <code className="bg-slate-100 px-1 rounded">{getShareUrl(shareId)}</code>
              </p>
            )}
          </>
        )}
      </div>
    </section>
  );
}
