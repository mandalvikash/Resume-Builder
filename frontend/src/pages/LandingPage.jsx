import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import ThemeToggle from '../components/ThemeToggle';

const useScrollReveal = (options = {}) => {
  const [ref, setRef] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px', ...options }
    );
    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref]);

  return [setRef, isVisible];
};

const useCountUp = (end, duration, isVisible) => {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;
    hasAnimated.current = true;
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration, isVisible]);
  return count;
};

const useHeaderScroll = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return scrolled;
};

export default function LandingPage() {
  const [heroRef, heroVisible] = useScrollReveal();
  const [aboutRef, aboutVisible] = useScrollReveal();
  const [whyRef, whyVisible] = useScrollReveal();
  const [statsRef, statsVisible] = useScrollReveal();
  const [stepsRef, stepsVisible] = useScrollReveal();
  const [hoveredStep, setHoveredStep] = useState(null);

  const stats1 = useCountUp(5000, 1500, statsVisible);
  const stats2 = useCountUp(50, 1200, statsVisible);
  const stats3 = useCountUp(98, 1000, statsVisible);

  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: 'Professional Templates',
      text: 'Choose from multiple resume and portfolio layouts. Export LaTeX, PDF, or share a stunning web link.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Quick & Easy',
      text: 'Fill in your profile, skills, capstone, and achievements in minutes. No design skills needed.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
      ),
      title: 'Share Anywhere',
      text: 'One link to share your portfolio. Recruiters and reviewers can view your work instantly, no login required.',
    },
  ];

  const steps = [
    { num: '01', title: 'Sign up & create profile', desc: 'Register in seconds and add your basic info, skills, and achievements.' },
    { num: '02', title: 'Pick a template', desc: 'Choose from professional resume and portfolio layouts that fit your style.' },
    { num: '03', title: 'Share or export', desc: 'Get a shareable link or export to LaTeX—ready for recruiters and reviewers.' },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <Link
            to="/"
            className="font-display font-bold text-xl tracking-tight text-slate-900 dark:text-white"
          >
            GenC Dossier
          </Link>
          <nav className="flex items-center gap-1">
            <ThemeToggle />
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-all duration-200"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="px-5 py-2.5 rounded-lg bg-primary-500 text-white text-sm font-semibold hover:bg-primary-600 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 btn-shine"
            >
              Sign Up
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1920&q=80)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/50 to-slate-900/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(2,6,23,0.4)_100%)]" />
        <div
          className={`relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center text-white transition-all duration-1000 ease-out ${
            heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <p className="text-primary-300 text-sm font-semibold tracking-wider uppercase mb-4 animate-fade-in-up">
            Professional Portfolio Builder
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1] tracking-tight">
            Build Your Dossier
            <span className="block mt-2 bg-gradient-to-r from-primary-300 to-primary-100 bg-clip-text text-transparent">
              in Minutes
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-12 leading-relaxed">
            Create a polished profile with your skills, capstone, and achievements.
            Choose templates, export LaTeX, and share one link with the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary-500 text-white font-semibold hover:bg-primary-400 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 btn-shine"
            >
              Get Started Free
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/5 backdrop-blur border border-white/20 text-white font-semibold hover:bg-white/10 hover:border-white/30 transition-all duration-300"
            >
              See How It Works
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" ref={statsRef} className="relative -mt-16 z-20 px-4">
        <div
          className={`max-w-4xl mx-auto rounded-2xl bg-white dark:bg-slate-800 shadow-xl dark:shadow-2xl border border-slate-100 dark:border-slate-700 p-8 sm:p-10 transition-all duration-700 ${
            statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 dark:divide-slate-600">
            <div className="py-6 sm:py-0 sm:px-8 text-center">
              <p className="font-display text-3xl sm:text-4xl font-bold text-primary-600 dark:text-primary-400">
                {stats1}+
              </p>
              <p className="text-slate-600 dark:text-slate-400 text-sm font-medium mt-1">Portfolios Created</p>
            </div>
            <div className="py-6 sm:py-0 sm:px-8 text-center">
              <p className="font-display text-3xl sm:text-4xl font-bold text-primary-600 dark:text-primary-400">
                {stats2}+
              </p>
              <p className="text-slate-600 dark:text-slate-400 text-sm font-medium mt-1">Templates Available</p>
            </div>
            <div className="py-6 sm:py-0 sm:px-8 text-center">
              <p className="font-display text-3xl sm:text-4xl font-bold text-primary-600 dark:text-primary-400">
                {stats3}%
              </p>
              <p className="text-slate-600 dark:text-slate-400 text-sm font-medium mt-1">User Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" ref={stepsRef} className="py-24 sm:py-32 bg-slate-50 dark:bg-slate-800/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div
            className={`text-center mb-16 transition-all duration-700 ${
              stepsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-xl mx-auto">
              Three simple steps to a professional portfolio.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <div
                key={step.num}
                onMouseEnter={() => setHoveredStep(i)}
                onMouseLeave={() => setHoveredStep(null)}
                className={`relative p-8 rounded-2xl border-2 transition-all duration-300 cursor-default ${
                  hoveredStep === i
                    ? 'border-primary-400 dark:border-primary-500 bg-white dark:bg-slate-800 shadow-xl scale-[1.02]'
                    : 'border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50'
                }`}
              >
                <span className="text-5xl font-display font-bold text-slate-200 dark:text-slate-600">
                  {step.num}
                </span>
                <h3 className="font-display text-xl font-semibold text-slate-900 dark:text-white mt-4 mb-2">
                  {step.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{step.desc}</p>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-slate-200 dark:bg-slate-600" />
                )}
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-500 text-white font-semibold hover:bg-primary-600 transition-all duration-200 hover:shadow-lg"
            >
              Start Now
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section id="about" ref={aboutRef} className="py-24 sm:py-32 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div
            className={`grid md:grid-cols-2 gap-12 md:gap-20 items-center transition-all duration-700 ${
              aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
                About GenC Dossier
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-4">
                GenC Dossier Generator helps aspiring professionals build polished portfolios that
                stand out. Whether you&apos;re preparing for placements, applying to programs, or
                showcasing your achievements—we make it simple.
              </p>
              <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-8">
                Our platform combines a professional resume builder with customizable web portfolio
                templates. Export to LaTeX, share a link, and let your work speak for itself.
              </p>
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-500 text-white font-semibold hover:bg-primary-600 transition-all duration-200 hover:shadow-lg btn-shine"
              >
                Start Building
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                alt="Team collaboration"
                className="w-full h-[320px] sm:h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-choose-us" ref={whyRef} className="py-24 sm:py-32 bg-slate-50 dark:bg-slate-800/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div
            className={`text-center mb-16 transition-all duration-700 ${
              whyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Why Choose Us
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
              Everything you need to create a standout portfolio, all in one place.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((item, i) => (
              <div
                key={item.title}
                className={`group p-8 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-500 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-default ${
                  whyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: whyVisible ? `${i * 80}ms` : '0ms',
                }}
              >
                <div className="w-14 h-14 rounded-xl bg-primary-500/10 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary-500 group-hover:text-white transition-all duration-300">
                  {item.icon}
                </div>
                <h3 className="font-display text-xl font-semibold text-slate-900 dark:text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-32 bg-gradient-to-br from-primary-600 via-primary-600 to-primary-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
        <div className="relative max-w-3xl mx-auto px-4 text-center text-white">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Ready to Showcase Your Best?
          </h2>
          <p className="text-primary-100 text-lg mb-10">
            Join thousands of professionals who built their portfolios with GenC Dossier.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-primary-600 font-semibold hover:bg-slate-100 hover:scale-105 transition-all duration-200 shadow-xl btn-shine"
          >
            Create Your Dossier
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>

      <footer className="bg-slate-900 dark:bg-slate-950 text-slate-400 py-10 text-sm border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>© {new Date().getFullYear()} GenC Dossier Generator</span>
          <nav className="flex gap-8">
            <Link to="/login" className="hover:text-white transition-colors">Sign In</Link>
            <Link to="/signup" className="hover:text-white transition-colors">Sign Up</Link>
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
