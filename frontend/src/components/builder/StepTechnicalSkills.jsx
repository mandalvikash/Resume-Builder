function TagList({ items, onChange, placeholder }) {
  const add = () => onChange([...(items || []), '']);
  const set = (i, v) => {
    const next = [...(items || [])];
    next[i] = v;
    onChange(next);
  };
  const remove = (i) => onChange((items || []).filter((_, idx) => idx !== i));

  return (
    <div className="space-y-2">
      {(items || []).map((item, i) => (
        <div key={i} className="flex gap-2">
          <input
            type="text"
            value={item}
            onChange={(e) => set(i, e.target.value)}
            placeholder={placeholder}
            className="flex-1 rounded-lg border border-slate-300 px-3 py-2"
          />
          <button type="button" onClick={() => remove(i)} className="text-red-600 px-2 hover:underline">
            ×
          </button>
        </div>
      ))}
      <button type="button" onClick={add} className="text-sm text-primary-600 hover:underline">
        + Add item
      </button>
    </div>
  );
}

const CATEGORIES = [
  { key: 'programming', label: 'Programming languages' },
  { key: 'fullstack', label: 'Frameworks / Full stack' },
  { key: 'tools', label: 'Tools' },
  { key: 'certifications', label: 'Certifications' },
];

export default function StepTechnicalSkills({ data, update }) {
  const skills = data.technicalSkills || [];

  const getItems = (cat) => skills.find((s) => s.category === cat)?.items || [];
  const setItems = (cat, items) => {
    const next = skills.map((s) => (s.category === cat ? { ...s, items } : s));
    if (!next.find((s) => s.category === cat)) next.push({ category: cat, items });
    update('technicalSkills', next);
  };

  return (
    <section className="space-y-6">
      <h2 className="font-display text-lg font-semibold text-slate-900">Technical skills</h2>
      {CATEGORIES.map(({ key, label }) => (
        <div key={key} className="p-4 rounded-xl border border-slate-200 bg-white">
          <h3 className="text-sm font-medium text-slate-700 mb-3">{label}</h3>
          <TagList items={getItems(key)} onChange={(items) => setItems(key, items)} placeholder="e.g. Java, Python" />
        </div>
      ))}
    </section>
  );
}
