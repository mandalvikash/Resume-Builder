export default function PortfolioMinimal({ dossier }) {
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
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-primary-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.03\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-80" />
        <div className="relative max-w-4xl mx-auto px-6 py-24 md:py-32 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight">
            {p.name || 'Portfolio'}
          </h1>
          <p className="mt-3 text-xl text-slate-300">
            {p.role}{p.track ? ` · ${p.track}` : ''}
          </p>
          <p className="mt-4 text-slate-400 max-w-lg mx-auto">
            {strengths.slice(0, 2).map((s) => s.name).join(' · ') || 'Building solutions that matter'}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {p.email && (
              <a href={`mailto:${p.email}`} className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-sm font-medium transition">
                Get in touch
              </a>
            )}
            {p.linkedIn && (
              <a href={p.linkedIn} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-sm font-medium transition">
                LinkedIn
              </a>
            )}
            {p.github && (
              <a href={p.github} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-sm font-medium transition">
                GitHub
              </a>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Featured project */}
        {(cap?.title || cap?.role) && (
          <section className="mb-20">
            <h2 className="text-2xl font-display font-bold text-slate-900 mb-6">Featured project</h2>
            <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-8 md:p-10">
                <div className="flex flex-wrap gap-2 mb-4">
                  {(cap.techStack || []).map((t, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-md bg-primary-100 text-primary-800 text-sm font-medium">
                      {t}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-semibold text-slate-900">{cap.title}</h3>
                {cap.role && <p className="text-slate-600 mt-1">{cap.role}</p>}
                {(cap.responsibilities || []).length > 0 && (
                  <ul className="mt-4 space-y-2 text-slate-700">
                    {(cap.responsibilities || []).map((r, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-primary-500 mt-1.5 shrink-0">▸</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {(cap.outcomes || []).length > 0 && (
                  <p className="mt-4 text-sm text-slate-600">
                    <strong>Outcomes:</strong> {cap.outcomes.join(' · ')}
                  </p>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Skills */}
        {skillList.length > 0 && (
          <section className="mb-20">
            <h2 className="text-2xl font-display font-bold text-slate-900 mb-6">Skills & tools</h2>
            <div className="flex flex-wrap gap-3">
              {skillList.map((s, i) => (
                <span key={i} className="px-4 py-2 rounded-xl bg-slate-100 text-slate-800 font-medium text-sm">
                  {s}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Education + Experience */}
        {(edu.length > 0 || achievements.length > 0 || volunteering.length > 0) && (
          <section className="mb-20">
            <h2 className="text-2xl font-display font-bold text-slate-900 mb-6">Background</h2>
            <div className="space-y-8">
              {edu.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Education</h3>
                  <ul className="space-y-3">
                    {edu.map((e, i) => (
                      <li key={i} className="flex flex-wrap gap-x-2 gap-y-1">
                        <strong className="text-slate-900">{e.degree}</strong>
                        <span className="text-slate-600">— {e.institution}</span>
                        {e.year && <span className="text-slate-500">({e.year})</span>}
                        {e.percentage && <span className="text-slate-500">· {e.percentage}</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {achievements.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Achievements</h3>
                  <ul className="space-y-2">
                    {achievements.map((a, i) => (
                      <li key={i}>
                        <strong className="text-slate-900">{a.title}</strong>
                        {a.description && <span className="text-slate-600"> — {a.description}</span>}
                        {a.date && <span className="text-slate-500 text-sm"> ({a.date})</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {volunteering.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Volunteering</h3>
                  <ul className="space-y-2">
                    {volunteering.map((v, i) => (
                      <li key={i}>
                        <strong className="text-slate-900">{v.organization}</strong>
                        <span className="text-slate-600"> — {v.role}</span>
                        {v.description && <span className="text-slate-500"> · {v.description}</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Beyond work */}
        {(sportsArts.length > 0 || strengths.length > 0) && (
          <section className="mb-20">
            <h2 className="text-2xl font-display font-bold text-slate-900 mb-6">Beyond work</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {sportsArts.length > 0 && (
                <div className="rounded-xl bg-white border border-slate-200 p-6">
                  <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Sports & arts</h3>
                  <ul className="space-y-2 text-slate-700">
                    {sportsArts.map((s, i) => (
                      <li key={i}>{s.name}{s.achievement && ` — ${s.achievement}`}</li>
                    ))}
                  </ul>
                </div>
              )}
              {strengths.length > 0 && (
                <div className="rounded-xl bg-white border border-slate-200 p-6">
                  <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Strengths</h3>
                  <ul className="space-y-2 text-slate-700">
                    {strengths.map((s, i) => (
                      <li key={i}><strong>{s.name}</strong>{s.description && ` — ${s.description}`}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Contact footer */}
        <footer className="pt-12 border-t border-slate-200">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">{p.name}</p>
            <div className="flex gap-6 text-sm">
              {p.email && <a href={`mailto:${p.email}`} className="text-primary-600 hover:underline">{p.email}</a>}
              {p.phone && <span className="text-slate-600">{p.phone}</span>}
              {p.location && <span className="text-slate-600">{p.location}</span>}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
