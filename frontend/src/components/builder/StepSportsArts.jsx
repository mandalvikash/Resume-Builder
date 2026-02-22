const TYPES = [
  { value: 'sports', label: 'Sports' },
  { value: 'arts', label: 'Arts' },
  { value: 'extracurricular', label: 'Extracurricular' },
];

export default function StepSportsArts({ data, update }) {
  const list = data.sportsArts || [];

  const add = () => {
    update('sportsArts', [...list, { type: 'sports', name: '', achievement: '', level: '' }]);
  };
  const remove = (i) => update('sportsArts', list.filter((_, idx) => idx !== i));
  const change = (i, field, value) => {
    const next = [...list];
    next[i] = { ...next[i], [field]: value };
    update('sportsArts', next);
  };

  return (
    <section className="space-y-4">
      <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-white">Sports, arts & personal accomplishments</h2>
      {list.map((item, i) => (
        <div key={i} className="p-4 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 space-y-3">
          <div className="flex justify-between items-center">
            <select
              value={item.type || 'sports'}
              onChange={(e) => change(i, 'type', e.target.value)}
              className="rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-3 py-2"
            >
              {TYPES.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
            <button type="button" onClick={() => remove(i)} className="text-red-600 dark:text-red-400 text-sm hover:underline">
              Remove
            </button>
          </div>
          <input
            type="text"
            placeholder="Name (e.g. Cricket, Painting)"
            value={item.name || ''}
            onChange={(e) => change(i, 'name', e.target.value)}
            className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 px-3 py-2"
          />
          <input
            type="text"
            placeholder="Achievement / involvement"
            value={item.achievement || ''}
            onChange={(e) => change(i, 'achievement', e.target.value)}
            className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 px-3 py-2"
          />
          <input
            type="text"
            placeholder="Level (e.g. College team, State)"
            value={item.level || ''}
            onChange={(e) => change(i, 'level', e.target.value)}
            className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 px-3 py-2"
          />
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="px-4 py-2 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:border-primary-500"
      >
        + Add entry
      </button>
    </section>
  );
}
