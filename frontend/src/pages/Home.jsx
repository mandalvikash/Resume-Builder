import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-14">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          GenC Dossier Generator
        </h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Build a professional dossier with your profile, skills, capstone project, achievements, and more.
          Choose a resume template, enable a web portfolio, and share one link.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <Link
          to="/build"
          className="block p-8 rounded-2xl bg-white border-2 border-slate-200 hover:border-primary-500 hover:shadow-xl transition-all text-left group"
        >
          <span className="text-3xl mb-3 block">📄</span>
          <h2 className="font-display text-xl font-semibold text-slate-900 group-hover:text-primary-600">
            Create New Dossier
          </h2>
          <p className="text-slate-600 mt-2">
            Fill in your details, pick a resume and web template, then export LaTeX or share your portfolio link.
          </p>
        </Link>
        <a
          href="#features"
          className="block p-8 rounded-2xl bg-white border-2 border-slate-200 hover:border-accent-500 hover:shadow-xl transition-all text-left group"
        >
          <span className="text-3xl mb-3 block">✨</span>
          <h2 className="font-display text-xl font-semibold text-slate-900 group-hover:text-accent-600">
            Features
          </h2>
          <p className="text-slate-600 mt-2">
            Candidate profile, technical skills, capstone summary, achievements, volunteering, sports/arts, strengths.
          </p>
        </a>
      </div>
      <div id="features" className="mt-20 pt-12 border-t border-slate-200">
        <h2 className="font-display text-2xl font-semibold text-slate-900 mb-6">What you get</h2>
        <ul className="grid sm:grid-cols-2 gap-3 text-slate-700">
          <li className="flex items-center gap-2">✓ LaTeX dossier (download .tex, compile to PDF)</li>
          <li className="flex items-center gap-2">✓ Multiple resume templates</li>
          <li className="flex items-center gap-2">✓ Multiple web portfolio layouts</li>
          <li className="flex items-center gap-2">✓ One shareable link for your portfolio</li>
        </ul>
      </div>
    </div>
  );
}
