export default function StepStrengths({ data, update }) {
  const list = data.strengths || [];

  const add = () => update('strengths', [...list, { name: '', description: '' }]);
  const remove = (i) => update('strengths', list.filter((_, idx) => idx !== i));
  const change = (i, field, value) => {
    const next = [...list];
    next[i] = { ...next[i], [field]: value };
    update('strengths', next);
  };

  return (
    <section className="space-y-4">
      <h2 className="font-display text-lg font-semibold text-slate-900">Skills & strengths (soft skills)</h2>
      <p className="text-slate-600 text-sm">e.g. Communication, teamwork, problem-solving</p>
      {list.map((item, i) => (
        <div key={i} className="p-4 rounded-xl border border-slate-200 bg-white flex gap-3">
          <input
            type="text"
            placeholder="Strength name"
            value={item.name || ''}
            onChange={(e) => change(i, 'name', e.target.value)}
            className="flex-1 rounded-lg border border-slate-300 px-3 py-2"
          />
          <input
            type="text"
            placeholder="Brief description"
            value={item.description || ''}
            onChange={(e) => change(i, 'description', e.target.value)}
            className="flex-1 rounded-lg border border-slate-300 px-3 py-2"
          />
          <button type="button" onClick={() => remove(i)} className="text-red-600 px-2 hover:underline shrink-0">
            ×
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="px-4 py-2 rounded-lg border-2 border-dashed border-slate-300 text-slate-600 hover:border-primary-500"
      >
        + Add strength
      </button>
    </section>
  );
}
