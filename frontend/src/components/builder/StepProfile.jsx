const inputClass =
  'mt-1 block w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500';

export default function StepProfile({ data, update }) {
  const p = data.profile || {};

  return (
    <section className="space-y-6">
      <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-white">Candidate profile</h2>

      <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 overflow-hidden shadow-sm">
        <div className="p-6 grid sm:grid-cols-2 gap-4">
          <label className="block sm:col-span-2">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Full name</span>
            <input
              type="text"
              value={p.name || ''}
              onChange={(e) => update('profile.name', e.target.value)}
              className={inputClass}
              placeholder="Your name"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Email</span>
            <input
              type="email"
              value={p.email || ''}
              onChange={(e) => update('profile.email', e.target.value)}
              className={inputClass}
              placeholder="email@example.com"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Phone</span>
            <input
              type="text"
              value={p.phone || ''}
              onChange={(e) => update('profile.phone', e.target.value)}
              className={inputClass}
              placeholder="+91 ..."
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Location</span>
            <input
              type="text"
              value={p.location || ''}
              onChange={(e) => update('profile.location', e.target.value)}
              className={inputClass}
              placeholder="City, Country"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Role / Track</span>
            <input
              type="text"
              value={p.role || ''}
              onChange={(e) => update('profile.role', e.target.value)}
              className={inputClass}
              placeholder="e.g. Programmer Analyst"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Cognizant ID</span>
            <input
              type="text"
              value={p.cognizantId || ''}
              onChange={(e) => update('profile.cognizantId', e.target.value)}
              className={inputClass}
              placeholder="e.g. 123456"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Track</span>
            <input
              type="text"
              value={p.track || ''}
              onChange={(e) => update('profile.track', e.target.value)}
              className={inputClass}
              placeholder="e.g. GenC Elevate"
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">LinkedIn</span>
            <input
              type="url"
              value={p.linkedIn || ''}
              onChange={(e) => update('profile.linkedIn', e.target.value)}
              className={inputClass}
              placeholder="https://linkedin.com/in/..."
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">GitHub</span>
            <input
              type="url"
              value={p.github || ''}
              onChange={(e) => update('profile.github', e.target.value)}
              className={inputClass}
              placeholder="https://github.com/..."
            />
          </label>
        </div>
      </div>
    </section>
  );
}
