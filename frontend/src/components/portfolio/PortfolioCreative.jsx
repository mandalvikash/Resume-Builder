// Creative – Wall of Portfolios style: name-forward, About narrative, experience highlight, clean designer layout.
// Inspired by: https://www.wallofportfolios.in/portfolios/advait-shripad-ramdasi/

function SkillBadge({ name }) {
  return (
    <span
      className="inline-block px-3 py-1.5 text-sm font-medium text-slate-700 bg-slate-100 dark:bg-slate-800 dark:text-slate-300 rounded-full border border-slate-200 dark:border-slate-700"
      title={name}
    >
      {name}
    </span>
  );
}

export default function PortfolioCreative({ dossier }) {
  const p = dossier?.profile || {};
  const edu = dossier?.education || [];
  const skills = dossier?.technicalSkills || [];
  const cap = dossier?.capstoneProject || {};
  const achievements = dossier?.achievements || [];
  const volunteering = dossier?.volunteering || [];
  const sportsArts = dossier?.sportsArts || [];
  const strengths = dossier?.strengths || [];

  const skillList = (skills || []).flatMap((s) => (s.items || []).filter(Boolean));
  const name = p.name || 'Portfolio';
  const role = p.role || p.track || 'Professional';
  const location = p.location || '';

  // Build narrative About from dossier
  const aboutParts = [];
  if (name) aboutParts.push(`${name.split(' ')[0]} is a ${role}${location ? ` based in ${location}` : ''}`);
  if (strengths.length > 0) aboutParts.push(`Specializing in ${strengths.map((s) => s.name).join(', ')}.`);
  if (cap?.title) aboutParts.push(`Recent work includes ${cap.title}.`);
  if (skillList.length > 0) aboutParts.push(`Expertise spans ${skillList.slice(0, 6).join(', ')}${skillList.length > 6 ? ' and more' : ''}.`);
  const aboutText = aboutParts.length > 0
    ? aboutParts.join(' ')
    : `Welcome to my portfolio. I focus on ${role} and bringing ideas to life with clarity and creativity.`;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased">
      {/* Top bar: logo / name + actions */}
      <nav className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur">
        <div className="max-w-4xl mx-auto px-5 py-4 flex items-center justify-between">
          <span className="font-display font-semibold text-slate-900 dark:text-white">
            {name.split(' ')[0] || 'Portfolio'}
          </span>
          <div className="flex items-center gap-3">
            <a
              href={p.linkedIn || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-slate-900 dark:hover:text-white text-sm transition-colors"
            >
              Profile
            </a>
            <a
              href={`mailto:${p.email || ''}`}
              className="px-4 py-2 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Message
            </a>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-5 py-10 md:py-14">
        {/* Identity block – name, handle, location, role (Wall of Portfolios style) */}
        <header className="mb-12 md:mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
            {name}
          </h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400 flex items-center gap-2 flex-wrap">
            <span>@{name.replace(/\s+/g, '').toLowerCase()}</span>
            {location && (
              <>
                <span className="text-slate-300 dark:text-slate-600">·</span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {location}
                </span>
              </>
            )}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="px-3 py-1.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-semibold">
              {role}
            </span>
            <span className="px-3 py-1.5 rounded-full border-2 border-emerald-500 text-emerald-600 dark:text-emerald-400 text-sm font-medium">
              Open to Work
            </span>
          </div>
        </header>

        {/* About – narrative paragraph */}
        <section className="mb-12 md:mb-16">
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4">
            About
          </h2>
          <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed max-w-3xl">
            {aboutText}
            {strengths.length > 0 && (
              <span className="block mt-4 text-slate-600 dark:text-slate-400">
                Discover how I can help bring your next project to life with a blend of {strengths.slice(0, 2).map((s) => s.name).join(' and ')}.
              </span>
            )}
          </p>
        </section>

        {/* Experience includes – skills as tags */}
        {skillList.length > 0 && (
          <section className="mb-12 md:mb-16">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4">
              Experience includes
            </h2>
            <div className="flex flex-wrap gap-2">
              {skillList.map((s, i) => (
                <SkillBadge key={i} name={s} />
              ))}
            </div>
          </section>
        )}

        {/* Portfolio – featured project */}
        {(cap?.title || cap?.role) && (
          <section className="mb-12 md:mb-16">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4">
              Portfolio
            </h2>
            <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-800 overflow-hidden bg-slate-50 dark:bg-slate-900/50">
              <div className="p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-display font-bold text-slate-900 dark:text-white">
                  {cap.title}
                </h3>
                {cap.role && (
                  <p className="mt-1 text-slate-500 dark:text-slate-400">{cap.role}</p>
                )}
                {(cap.responsibilities || []).length > 0 && (
                  <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                    {(cap.responsibilities || [])[0]}
                  </p>
                )}
                {(cap.techStack || []).length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {(cap.techStack || []).map((t, i) => (
                      <SkillBadge key={i} name={t} />
                    ))}
                  </div>
                )}
                <div className="mt-6 flex gap-3">
                  <a
                    href={`mailto:${p.email}?subject=Regarding ${cap.title || 'your project'}`}
                    className="text-sm font-semibold text-slate-900 dark:text-white underline underline-offset-4 hover:no-underline"
                  >
                    Discuss project →
                  </a>
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-slate-600 dark:text-slate-400 underline underline-offset-4 hover:text-slate-900 dark:hover:text-white"
                    >
                      View profile →
                    </a>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Education & Achievements – two columns or stacked */}
        {(edu.length > 0 || achievements.length > 0) && (
          <section className="grid md:grid-cols-2 gap-10 md:gap-14 mb-12 md:mb-16">
            {edu.length > 0 && (
              <div>
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4">
                  Education
                </h2>
                <ul className="space-y-4">
                  {edu.map((e, i) => (
                    <li key={i}>
                      <p className="font-display font-semibold text-slate-900 dark:text-white">{e.degree}</p>
                      <p className="mt-0.5 text-slate-600 dark:text-slate-400">{e.institution}</p>
                      {(e.year || e.percentage) && (
                        <p className="mt-1 text-slate-500 dark:text-slate-500 text-sm">
                          {[e.year, e.percentage].filter(Boolean).join(' · ')}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {achievements.length > 0 && (
              <div>
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4">
                  Achievements
                </h2>
                <ul className="space-y-3">
                  {achievements.map((a, i) => (
                    <li key={i}>
                      <p className="font-semibold text-slate-900 dark:text-white">{a.title}</p>
                      {a.description && (
                        <p className="mt-0.5 text-slate-600 dark:text-slate-400 text-sm">{a.description}</p>
                      )}
                      {a.date && (
                        <p className="mt-0.5 text-slate-500 text-sm">{a.date}</p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        )}

        {volunteering.length > 0 && (
          <section className="mb-12 md:mb-16">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4">
              Volunteering
            </h2>
            <ul className="space-y-2">
              {volunteering.map((v, i) => (
                <li key={i}>
                  <span className="font-semibold text-slate-900 dark:text-white">{v.organization}</span>
                  <span className="text-slate-600 dark:text-slate-400"> — {v.role}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {(sportsArts.length > 0 || strengths.length > 0) && (
          <section className="mb-12 md:mb-16">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4">
              Beyond work
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              {[...(sportsArts.map((s) => s.name)), ...(strengths.map((s) => s.name))].join(' · ')}
            </p>
          </section>
        )}

        {/* CTA – Message */}
        <section className="pt-8 border-t border-slate-200 dark:border-slate-800">
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Interested in working together?
          </p>
          <a
            href={`mailto:${p.email || ''}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold hover:opacity-90 transition-opacity"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Message
          </a>
        </section>
      </main>

      <footer className="border-t border-slate-200 dark:border-slate-800 py-6 px-5 mt-12">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-4 text-sm text-slate-500 dark:text-slate-500">
          <span className="font-display font-semibold text-slate-700 dark:text-slate-400">{name}</span>
          <div className="flex gap-6">
            {p.email && (
              <a href={`mailto:${p.email}`} className="hover:text-slate-900 dark:hover:text-white transition-colors">
                {p.email}
              </a>
            )}
            {p.linkedIn && (
              <a href={p.linkedIn} target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                LinkedIn
              </a>
            )}
            {p.github && (
              <a href={p.github} target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                GitHub
              </a>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
