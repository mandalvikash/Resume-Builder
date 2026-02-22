// Developer – Modern portfolio: lime + purple accents, dark/light sections, hero, skill cards, projects.
import { useState, useEffect } from 'react';

const LIME = 'lime';
const VIOLET = 'violet';

// Simple icons for skill categories
const SkillIcons = {
  programming: (cls) => (
    <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  fullstack: (cls) => (
    <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6z" />
    </svg>
  ),
  tools: (cls) => (
    <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  certifications: (cls) => (
    <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  ),
  default: (cls) => (
    <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
};

export default function PortfolioMinimal({ dossier }) {
  const p = dossier?.profile || {};
  const edu = dossier?.education || [];
  const skills = dossier?.technicalSkills || [];
  const cap = dossier?.capstoneProject || {};
  const achievements = dossier?.achievements || [];
  const volunteering = dossier?.volunteering || [];
  const sportsArts = dossier?.sportsArts || [];
  const strengths = dossier?.strengths || [];

  const skillCategories = (skills || []).filter((s) => (s.items || []).length > 0);
  const skillList = (skills || []).flatMap((s) => (s.items || []).filter(Boolean));
  const [scrolled, setScrolled] = useState(false);
  const [highlightedSkill, setHighlightedSkill] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { id: 'project', label: 'Project', show: cap?.title || cap?.role },
    { id: 'skills', label: 'Skills', show: skillList.length > 0 },
    { id: 'background', label: 'Background', show: edu.length > 0 || achievements.length > 0 },
    { id: 'more', label: 'More', show: sportsArts.length > 0 || strengths.length > 0 },
  ].filter((n) => n.show);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased">
      {/* Nav */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-slate-950/95 backdrop-blur-md border-b border-slate-800' : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
          <span className="font-display font-bold text-lime-400 text-lg tracking-tight">
            {p.name?.split(' ')[0] || 'Portfolio'}
          </span>
          <button
            type="button"
            onClick={() => scrollTo('contact')}
            className="px-5 py-2.5 rounded-lg bg-lime-400 text-slate-900 font-semibold text-sm hover:bg-lime-300 transition-colors"
          >
            Hire Me
          </button>
        </div>
      </nav>

      {/* Hero – dark */}
      <header className="relative min-h-[85vh] flex items-center pt-20 pb-16 px-5">
        <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
          <div className="portfolio-reveal">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white leading-tight">
              CODING WITH <span className="text-lime-400">🔥 PASSION</span>, CREATING WITH PURPOSE.
            </h1>
            <p className="mt-4 text-slate-400 text-lg max-w-lg">
              {p.name || 'I\'m a developer'} — {[p.role, p.track].filter(Boolean).join(' · ') || 'building things that matter.'}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => scrollTo('projects')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-lime-400 text-slate-900 font-semibold hover:bg-lime-300 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                View Projects
              </button>
              <a
                href={`mailto:${p.email || ''}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-white/30 text-white font-semibold hover:border-lime-400 hover:text-lime-400 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Hire Me
              </a>
            </div>
          </div>
          <div className="hidden md:flex justify-center items-center">
            <div className="relative w-64 h-72 rounded-2xl bg-violet-500/20 border-2 border-violet-400/30 transform rotate-3 flex items-center justify-center">
              <span className="font-display text-6xl font-bold text-white/90">
                {p.name ? p.name.split(' ').map((n) => n[0]).join('').slice(0, 2) : '?'}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* About – light */}
      <section className="bg-white py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <p className="text-slate-700 text-lg leading-relaxed">
            <span className="text-amber-500">★</span> Hello — I'm <strong className="text-slate-900">{p.name || 'a developer'}</strong>
            {p.role && <> with focus on <strong className="text-lime-600">{p.role}</strong></>}
            {p.track && <> and <strong className="text-violet-600">{p.track}</strong></>}
            . {strengths.length > 0 ? strengths.map((s) => s.name).join(', ') + '.' : 'I build clean, purposeful software.'}
            {(p.phone || p.location) && (
              <span className="block mt-2 text-slate-500 text-sm">
                {[p.phone, p.location].filter(Boolean).join(' · ')}
              </span>
            )}
          </p>
        </div>
      </section>

      {/* Skills – light, grid with icons */}
      {skillCategories.length > 0 && (
        <section id="skills" className="bg-white py-16 px-5 scroll-mt-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 mb-10 text-center">
              I specialize in a range of <span className="text-amber-500">💡</span> skills
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {skillCategories.map((cat, idx) => {
                const Icon = SkillIcons[cat.category] || SkillIcons.default;
                const isHighlighted = highlightedSkill === idx;
                return (
                  <div
                    key={idx}
                    onMouseEnter={() => setHighlightedSkill(idx)}
                    className={`rounded-2xl p-6 border-2 transition-all duration-300 ${
                      isHighlighted
                        ? 'bg-lime-400 border-lime-400 text-slate-900 shadow-lg'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-lime-300'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${isHighlighted ? 'bg-white/20 text-white' : 'bg-white text-slate-600'}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className={`font-display font-bold text-lg ${isHighlighted ? 'text-slate-900' : 'text-slate-900'}`}>
                      {cat.category.charAt(0).toUpperCase() + cat.category.slice(1)}
                    </h3>
                    <p className={`mt-2 text-sm ${isHighlighted ? 'text-slate-800' : 'text-slate-600'}`}>
                      {(cat.items || []).slice(0, 3).join(', ')}
                      {(cat.items || []).length > 3 ? ' & more.' : ''}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Projects – dark */}
      {(cap?.title || cap?.role) && (
        <section id="projects" className="bg-slate-900 py-16 px-5 scroll-mt-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-10 text-center">
              Here's a glimpse of some exciting <span className="text-amber-400">🧑‍💻</span> projects
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl overflow-hidden bg-slate-800 border border-slate-700 hover:border-violet-500/50 transition-colors">
                <div className="h-40 bg-gradient-to-br from-violet-500/30 to-lime-500/20 flex items-center justify-center">
                  <span className="text-4xl font-display font-bold text-white/80">{cap.title?.slice(0, 2) || 'P'}</span>
                </div>
                <div className="p-6">
                  <h3 className="font-display font-bold text-xl text-white">{cap.title || 'Project'}</h3>
                  {cap.role && <p className="mt-1 text-slate-400 text-sm">{cap.role}</p>}
                  <p className="mt-3 text-slate-300 text-sm line-clamp-2">
                    {(cap.responsibilities || [])[0] || 'A showcase project.'}
                  </p>
                  {(cap.techStack || []).length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {(cap.techStack || []).slice(0, 5).map((t, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-700 text-slate-300 text-xs font-medium">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="mt-5 flex gap-3">
                    <button
                      type="button"
                      className="w-10 h-10 rounded-full border-2 border-white/40 text-white flex items-center justify-center hover:border-lime-400 hover:text-lime-400 transition-colors"
                      title="View demo"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                    <a
                      href={p.github || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full border-2 border-white/40 text-white flex items-center justify-center hover:border-violet-400 hover:text-violet-400 transition-colors"
                      title="Source code"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Accomplishments – dark */}
      {achievements.length > 0 && (
        <section className="bg-slate-950 py-16 px-5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-10 text-center">
              I take <span className="text-amber-400">🏆</span> pride in my accomplishments
            </h2>
            <ul className="space-y-4">
              {achievements.map((a, i) => (
                <li key={i} className="flex gap-4 items-start">
                  <span className={`shrink-0 w-6 h-6 rounded flex items-center justify-center text-sm ${i % 2 === 0 ? 'text-lime-400' : 'text-violet-400'}`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                    </svg>
                  </span>
                  <div>
                    <span className="font-semibold text-white">{a.title}</span>
                    {a.description && <span className="text-slate-400"> — {a.description}</span>}
                    {a.date && <span className="text-slate-500 text-sm ml-2">({a.date})</span>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* CTA – dark */}
      <section id="contact" className="bg-slate-900 py-20 px-5 scroll-mt-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6 flex items-center justify-center gap-3">
            Let's work together
            <svg className="w-10 h-10 text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </h2>
          <a
            href={`mailto:${p.email || ''}`}
            className="inline-flex w-20 h-20 rounded-full bg-lime-400 text-slate-900 items-center justify-center hover:bg-lime-300 transition-all hover:scale-110 shadow-xl shadow-lime-400/30"
            aria-label="Contact"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-6 px-5 border-t border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4 text-slate-500 text-sm">
          <span className="font-display font-semibold text-lime-400">{p.name?.split(' ')[0] || 'Portfolio'}</span>
          <div className="flex gap-4">
            {p.email && (
              <a href={`mailto:${p.email}`} className="hover:text-lime-400 transition-colors">{p.email}</a>
            )}
            {p.linkedIn && (
              <a href={p.linkedIn} target="_blank" rel="noopener noreferrer" className="hover:text-lime-400 transition-colors">LinkedIn</a>
            )}
            {p.github && (
              <a href={p.github} target="_blank" rel="noopener noreferrer" className="hover:text-lime-400 transition-colors">GitHub</a>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
