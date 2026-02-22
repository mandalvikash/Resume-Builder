// Showcase – Bento grid with colored section cards; visual, card-first layout.
import { useState } from 'react';

const CARD_ACCENTS = {
  project: 'from-primary-500 to-primary-600',
  skills: 'from-emerald-500 to-emerald-600',
  education: 'from-violet-500 to-violet-600',
  achievements: 'from-amber-500 to-amber-600',
  volunteering: 'from-rose-500 to-rose-600',
  beyond: 'from-slate-600 to-slate-700',
  strengths: 'from-teal-500 to-teal-600',
};

function SkillBadge({ name }) {
  return (
    <span
      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600 shadow-sm hover:shadow transition-shadow"
      title={name}
    >
      {name}
    </span>
  );
}

function BentoCard({ title, accent = 'project', children, className = '', delay = 0 }) {
  const [hover, setHover] = useState(false);
  const gradient = CARD_ACCENTS[accent] || CARD_ACCENTS.project;
  return (
    <div
      id={title ? title.toLowerCase().replace(/\s+&?\s*/g, '-').replace(' ', '-') : undefined}
      className={`portfolio-reveal rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-lg border border-slate-200 dark:border-slate-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${className}`}
      style={{ animationDelay: `${delay}s` }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {title && (
        <div className={`h-1.5 bg-gradient-to-r ${gradient} transition-transform duration-300 ${hover ? 'scale-x-100' : 'scale-x-100'}`} />
      )}
      <div className="p-6 md:p-7">
        {title && (
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4">
            {title}
          </h2>
        )}
        {children}
      </div>
    </div>
  );
}

export default function PortfolioCard({ dossier }) {
  const p = dossier?.profile || {};
  const edu = dossier?.education || [];
  const skills = dossier?.technicalSkills || [];
  const cap = dossier?.capstoneProject || {};
  const achievements = dossier?.achievements || [];
  const volunteering = dossier?.volunteering || [];
  const sportsArts = dossier?.sportsArts || [];
  const strengths = dossier?.strengths || [];

  const skillList = (skills || []).flatMap((s) => (s.items || []).filter(Boolean));

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased">
      {/* Hero – full-width gradient */}
      <header className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white px-6 py-14 md:py-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
        <div className="relative max-w-5xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/80 mb-3">
            Portfolio
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight drop-shadow-sm">
            {p.name || 'Portfolio'}
          </h1>
          <p className="mt-3 text-primary-100 text-lg">
            {[p.role, p.track].filter(Boolean).join(' · ')}
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            {p.email && (
              <a
                href={`mailto:${p.email}`}
                className="inline-flex items-center px-5 py-2.5 rounded-full bg-white/20 hover:bg-white/30 text-sm font-medium backdrop-blur-sm transition-all hover:scale-105"
              >
                Email
              </a>
            )}
            {p.linkedIn && (
              <a
                href={p.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-5 py-2.5 rounded-full bg-white/20 hover:bg-white/30 text-sm font-medium backdrop-blur-sm transition-all hover:scale-105"
              >
                LinkedIn
              </a>
            )}
            {p.github && (
              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-5 py-2.5 rounded-full bg-white/20 hover:bg-white/30 text-sm font-medium backdrop-blur-sm transition-all hover:scale-105"
              >
                GitHub
              </a>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-5 py-10 md:py-14 -mt-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-5">
          {(cap?.title || cap?.role) && (
            <BentoCard accent="project" className="md:col-span-2" delay={0.1}>
              <h3 className="text-xl md:text-2xl font-display font-bold text-slate-900 dark:text-white">
                {cap.title}
              </h3>
              {cap.role && <p className="mt-1 text-slate-500 dark:text-slate-400 text-sm">{cap.role}</p>}
              {(cap.techStack || []).length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {(cap.techStack || []).map((t, i) => (
                    <SkillBadge key={i} name={t} />
                  ))}
                </div>
              )}
              {(cap.responsibilities || []).length > 0 && (
                <ul className="mt-4 space-y-2 text-slate-600 dark:text-slate-400 text-sm">
                  {(cap.responsibilities || []).map((r, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-primary-500 shrink-0">·</span>
                      {r}
                    </li>
                  ))}
                </ul>
              )}
            </BentoCard>
          )}

          {skillList.length > 0 && (
            <BentoCard title="Skills & Tools" accent="skills" delay={0.15}>
              <div className="flex flex-wrap gap-2">
                {skillList.map((s, i) => (
                  <SkillBadge key={i} name={s} />
                ))}
              </div>
            </BentoCard>
          )}

          {edu.length > 0 && (
            <BentoCard title="Education" accent="education" delay={0.2}>
              <ul className="space-y-4 text-sm">
                {edu.map((e, i) => (
                  <li key={i}>
                    <span className="font-semibold text-slate-900 dark:text-white">{e.degree}</span>
                    <span className="text-slate-500 dark:text-slate-400"> — {e.institution}</span>
                    {(e.year || e.percentage) && (
                      <span className="text-slate-400 dark:text-slate-500 block mt-0.5">
                        {[e.year, e.percentage].filter(Boolean).join(' · ')}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </BentoCard>
          )}

          {achievements.length > 0 && (
            <BentoCard title="Achievements" accent="achievements" delay={0.25}>
              <ul className="space-y-3 text-sm">
                {achievements.map((a, i) => (
                  <li key={i}>
                    <span className="font-semibold text-slate-900 dark:text-white">{a.title}</span>
                    {a.description && <span className="text-slate-500 dark:text-slate-400"> — {a.description}</span>}
                    {a.date && <span className="text-slate-400 dark:text-slate-500"> ({a.date})</span>}
                  </li>
                ))}
              </ul>
            </BentoCard>
          )}

          {volunteering.length > 0 && (
            <BentoCard title="Volunteering" accent="volunteering" delay={0.3}>
              <ul className="space-y-2 text-sm">
                {volunteering.map((v, i) => (
                  <li key={i}>
                    <span className="font-semibold text-slate-900 dark:text-white">{v.organization}</span>
                    <span className="text-slate-500 dark:text-slate-400"> — {v.role}</span>
                  </li>
                ))}
              </ul>
            </BentoCard>
          )}

          {(sportsArts.length > 0 || strengths.length > 0) && (
            <BentoCard
              title="Beyond Work"
              accent="beyond"
              className={volunteering.length > 0 && achievements.length > 0 ? '' : 'md:col-span-2'}
              delay={0.35}
            >
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                {[...(sportsArts.map((s) => s.name)), ...(strengths.map((s) => s.name))].join(' · ')}
              </p>
            </BentoCard>
          )}

          {strengths.length > 0 && (
            <BentoCard title="Strengths" accent="strengths" delay={0.4}>
              <ul className="space-y-2 text-sm">
                {strengths.map((s, i) => (
                  <li key={i}>
                    <strong className="text-slate-900 dark:text-white">{s.name}</strong>
                    {s.description && ` — ${s.description}`}
                  </li>
                ))}
              </ul>
            </BentoCard>
          )}
        </div>

        <footer className="mt-14 text-center text-slate-500 dark:text-slate-500 text-sm py-6">
          {p.email && <a href={`mailto:${p.email}`} className="hover:text-primary-500 transition-colors">{p.email}</a>}
          {p.phone && <span className="mx-2">·</span>}
          {p.phone}
          {p.location && <span className="mx-2">·</span>}
          {p.location}
        </footer>
      </div>
    </div>
  );
}
