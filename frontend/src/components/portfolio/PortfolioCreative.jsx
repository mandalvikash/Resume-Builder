export default function PortfolioCreative({ dossier }) {
  if (!dossier) return null;
  const p = dossier.profile || {};
  const edu = Array.isArray(dossier.education) ? dossier.education : [];
  const skills = Array.isArray(dossier.technicalSkills) ? dossier.technicalSkills : [];
  const cap = dossier.capstoneProject || {};
  const achievements = Array.isArray(dossier.achievements) ? dossier.achievements : [];
  const volunteering = Array.isArray(dossier.volunteering) ? dossier.volunteering : [];
  const sportsArts = Array.isArray(dossier.sportsArts) ? dossier.sportsArts : [];
  const strengths = Array.isArray(dossier.strengths) ? dossier.strengths : [];

  const skillList = skills.flatMap((s) => (s && s.items ? s.items : []).filter(Boolean));

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      {/* Bold hero */}
      <section className="bg-stone-900 text-white py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-amber-400 text-sm font-semibold uppercase tracking-[0.2em] mb-4">
            Portfolio
          </p>
          <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight leading-[1.1]">
            {p.name || 'Portfolio'}
          </h1>
          <p className="mt-6 text-xl text-stone-400 max-w-xl">
            {[p.role, p.track].filter(Boolean).join(' · ') || 'Portfolio'}
          </p>
          <div className="mt-10 flex flex-wrap gap-6 text-stone-400">
            {p.email && <a href={`mailto:${p.email}`} className="hover:text-amber-400 transition">{p.email}</a>}
            {p.phone && <span>{p.phone}</span>}
            {p.location && <span>{p.location}</span>}
            {p.linkedIn && <a href={p.linkedIn} target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition">LinkedIn</a>}
            {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition">GitHub</a>}
          </div>
        </div>
      </section>

      {/* Project — full width accent */}
      {(cap?.title || cap?.role) && (
        <section className="bg-amber-500 text-stone-900 py-16 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] opacity-80 mb-4">Featured work</h2>
            <h3 className="text-3xl md:text-4xl font-display font-bold">{cap.title}</h3>
            {cap.techStack?.length > 0 && (
              <p className="mt-2 text-stone-800 font-medium">{(cap.techStack || []).join(' · ')}</p>
            )}
            {cap.role && <p className="mt-1 text-stone-700">{cap.role}</p>}
            {(cap.responsibilities || []).length > 0 && (
              <ul className="mt-6 space-y-2 text-stone-800 max-w-2xl">
                {(cap.responsibilities || []).map((r, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-amber-800 font-bold">—</span>
                    {r}
                  </li>
                ))}
              </ul>
            )}
            {(cap.outcomes || []).length > 0 && (
              <p className="mt-6 text-stone-800">
                <strong>Outcomes:</strong> {cap.outcomes.join('; ')}
              </p>
            )}
          </div>
        </section>
      )}

      {/* Skills — typographic */}
      {skillList.length > 0 && (
        <section className="py-20 px-6 border-b border-stone-200">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-stone-500 mb-8">Skills & tools</h2>
            <p className="text-2xl md:text-3xl font-display font-semibold text-stone-800 leading-relaxed max-w-4xl">
              {skillList.join(' · ')}
            </p>
          </div>
        </section>
      )}

      {/* Education + Achievements — two column */}
      {(edu.length > 0 || achievements.length > 0) && (
        <section className="py-20 px-6 bg-white">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16">
            {edu.length > 0 && (
              <div>
                <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-stone-500 mb-6">Education</h2>
                <ul className="space-y-5">
                  {edu.map((e, i) => (
                    <li key={i}>
                      <p className="font-display font-bold text-stone-900 text-lg">{e.degree}</p>
                      <p className="text-stone-600">{e.institution}</p>
                      <p className="text-stone-500 text-sm mt-1">{e.year}{e.percentage ? ` · ${e.percentage}` : ''}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {achievements.length > 0 && (
              <div>
                <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-stone-500 mb-6">Achievements</h2>
                <ul className="space-y-4">
                  {achievements.map((a, i) => (
                    <li key={i}>
                      <p className="font-display font-bold text-stone-900">{a.title}</p>
                      {a.description && <p className="text-stone-600 text-sm">{a.description}</p>}
                      {a.date && <p className="text-stone-500 text-sm">{a.date}</p>}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Volunteering + Sports & Strengths — stacked */}
      {(volunteering.length > 0 || sportsArts.length > 0 || strengths.length > 0) && (
        <section className="py-20 px-6 border-t border-stone-200">
          <div className="max-w-5xl mx-auto space-y-14">
            {volunteering.length > 0 && (
              <div>
                <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-stone-500 mb-6">Volunteering</h2>
                <ul className="space-y-3">
                  {volunteering.map((v, i) => (
                    <li key={i}>
                      <strong className="text-stone-900">{v.organization}</strong>
                      <span className="text-stone-600"> — {v.role}</span>
                      {v.description && <span className="text-stone-500"> · {v.description}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {sportsArts.length > 0 && (
              <div>
                <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-stone-500 mb-6">Sports & arts</h2>
                <p className="text-xl font-display font-semibold text-stone-800">
                  {sportsArts.map((s) => (s && s.name) || '').filter(Boolean).join(' · ') || '—'}
                </p>
                <ul className="mt-2 text-stone-600 space-y-1">
                  {sportsArts.map((s, i) => (
                    <li key={i}>{(s && s.achievement) || '—'}{s && s.level ? ` (${s.level})` : ''}</li>
                  ))}
                </ul>
              </div>
            )}
            {strengths.length > 0 && (
              <div>
                <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-stone-500 mb-6">Strengths</h2>
                <p className="text-xl font-display font-semibold text-stone-800 max-w-3xl">
                  {strengths.map((s) => (s && s.name) || '').filter(Boolean).join(' · ') || '—'}
                </p>
                <ul className="mt-3 text-stone-600 space-y-1">
                  {strengths.map((s, i) => (
                    <li key={i}>{(s && s.description) || '—'}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      <footer className="py-12 px-6 border-t border-stone-200 text-center text-stone-500 text-sm">
        {p.name || 'Portfolio'}
        {p.email && (
          <>
            {' · '}
            <a href={`mailto:${p.email}`} className="text-amber-700 hover:underline">{p.email}</a>
          </>
        )}
      </footer>
    </div>
  );
}
