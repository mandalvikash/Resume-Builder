export default function PortfolioCard({ dossier }) {
  const p = dossier.profile || {};
  const edu = dossier.education || [];
  const skills = dossier.technicalSkills || [];
  const cap = dossier.capstoneProject || {};
  const achievements = dossier.achievements || [];
  const volunteering = dossier.volunteering || [];
  const sportsArts = dossier.sportsArts || [];
  const strengths = dossier.strengths || [];

  const skillList = skills.flatMap((s) => (s.items || []).filter(Boolean));

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Hero card */}
      <section className="pt-12 pb-8 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-10 md:p-14 text-white shadow-2xl">
            <h1 className="text-4xl md:text-5xl font-display font-bold">
              {p.name || 'Portfolio'}
            </h1>
            <p className="mt-2 text-xl text-white/90">
              {p.role}{p.track ? ` · ${p.track}` : ''}
            </p>
            <p className="mt-6 text-white/80 max-w-md">
              {strengths.slice(0, 2).map((s) => s.name).join(' & ') || 'Creative problem solver'}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {p.email && <a href={`mailto:${p.email}`} className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 text-sm font-medium">Email</a>}
              {p.linkedIn && <a href={p.linkedIn} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 text-sm font-medium">LinkedIn</a>}
              {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 text-sm font-medium">GitHub</a>}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 gap-6 -mt-4">
          {/* Featured project card */}
          {(cap?.title || cap?.role) && (
            <div className="md:col-span-2 rounded-2xl bg-white shadow-lg border border-slate-200 overflow-hidden">
              <div className="p-8">
                <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">Featured project</span>
                <h2 className="text-2xl font-display font-bold text-slate-900 mt-2">{cap.title}</h2>
                {cap.techStack?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {(cap.techStack || []).map((t, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-sm">{t}</span>
                    ))}
                  </div>
                )}
                {cap.role && <p className="mt-2 text-slate-600">{cap.role}</p>}
                {(cap.responsibilities || []).length > 0 && (
                  <ul className="mt-4 space-y-2 text-slate-700 text-sm">
                    {(cap.responsibilities || []).map((r, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-indigo-500">•</span>{r}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}

          {/* Skills card */}
          {skillList.length > 0 && (
            <div className="rounded-2xl bg-white shadow-lg border border-slate-200 p-6 hover:shadow-xl transition">
              <h2 className="text-lg font-display font-bold text-slate-900 mb-4">Skills & tools</h2>
              <div className="flex flex-wrap gap-2">
                {skillList.map((s, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-800 text-sm font-medium">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Education card */}
          {edu.length > 0 && (
            <div className="rounded-2xl bg-white shadow-lg border border-slate-200 p-6 hover:shadow-xl transition">
              <h2 className="text-lg font-display font-bold text-slate-900 mb-4">Education</h2>
              <ul className="space-y-3 text-slate-700 text-sm">
                {edu.map((e, i) => (
                  <li key={i}>
                    <strong className="text-slate-900">{e.degree}</strong>
                    <span> — {e.institution} {e.year && `(${e.year})`} {e.percentage && ` · ${e.percentage}`}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Achievements card */}
          {achievements.length > 0 && (
            <div className="rounded-2xl bg-white shadow-lg border border-slate-200 p-6 hover:shadow-xl transition">
              <h2 className="text-lg font-display font-bold text-slate-900 mb-4">Achievements</h2>
              <ul className="space-y-2 text-slate-700 text-sm">
                {achievements.map((a, i) => (
                  <li key={i}>
                    <strong className="text-slate-900">{a.title}</strong>
                    {a.date && <span className="text-slate-500"> ({a.date})</span>}
                    {a.description && <span> — {a.description}</span>}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Volunteering card */}
          {volunteering.length > 0 && (
            <div className="rounded-2xl bg-white shadow-lg border border-slate-200 p-6 hover:shadow-xl transition">
              <h2 className="text-lg font-display font-bold text-slate-900 mb-4">Community</h2>
              <ul className="space-y-2 text-slate-700 text-sm">
                {volunteering.map((v, i) => (
                  <li key={i}>
                    <strong className="text-slate-900">{v.organization}</strong> — {v.role}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Sports & arts card */}
          {sportsArts.length > 0 && (
            <div className="rounded-2xl bg-white shadow-lg border border-slate-200 p-6 hover:shadow-xl transition">
              <h2 className="text-lg font-display font-bold text-slate-900 mb-4">Beyond work</h2>
              <ul className="space-y-1 text-slate-700 text-sm">
                {sportsArts.map((s, i) => (
                  <li key={i}>{s.name}{s.achievement && ` — ${s.achievement}`}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Strengths card */}
          {strengths.length > 0 && (
            <div className="rounded-2xl bg-white shadow-lg border border-slate-200 p-6 hover:shadow-xl transition">
              <h2 className="text-lg font-display font-bold text-slate-900 mb-4">Strengths</h2>
              <ul className="space-y-2 text-slate-700 text-sm">
                {strengths.map((s, i) => (
                  <li key={i}><strong className="text-slate-900">{s.name}</strong>{s.description && ` — ${s.description}`}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <footer className="mt-12 text-center text-slate-500 text-sm">
          {p.email && <a href={`mailto:${p.email}`} className="text-indigo-600 hover:underline">{p.email}</a>}
          {p.phone && <span className="mx-2">·</span>}
          {p.phone}
          {p.location && <span className="mx-2">·</span>}
          {p.location}
        </footer>
      </div>
    </div>
  );
}
