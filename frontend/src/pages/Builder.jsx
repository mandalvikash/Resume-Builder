import { useState, useEffect } from 'react';
import {
  getResumeTemplates,
  getWebTemplates,
  createDossier,
  updateDossier,
} from '../api/client';
import StepProfile from '../components/builder/StepProfile';
import StepEducation from '../components/builder/StepEducation';
import StepTechnicalSkills from '../components/builder/StepTechnicalSkills';
import StepCapstone from '../components/builder/StepCapstone';
import StepAchievements from '../components/builder/StepAchievements';
import StepSportsArts from '../components/builder/StepSportsArts';
import StepStrengths from '../components/builder/StepStrengths';
import StepTemplates from '../components/builder/StepTemplates';

const STEPS = [
  { id: 'profile', title: 'Profile', component: StepProfile },
  { id: 'education', title: 'Education', component: StepEducation },
  { id: 'skills', title: 'Technical Skills', component: StepTechnicalSkills },
  { id: 'capstone', title: 'Capstone Project', component: StepCapstone },
  { id: 'achievements', title: 'Achievements & Volunteering', component: StepAchievements },
  { id: 'sports', title: 'Sports & Arts', component: StepSportsArts },
  { id: 'strengths', title: 'Strengths', component: StepStrengths },
  { id: 'templates', title: 'Templates & Export', component: StepTemplates },
];

const initialDossier = {
  profile: { name: '', email: '', phone: '', location: '', cognizantId: '', role: '', track: '', linkedIn: '', github: '' },
  education: [],
  technicalSkills: [
    { category: 'programming', items: [] },
    { category: 'fullstack', items: [] },
    { category: 'tools', items: [] },
    { category: 'certifications', items: [] },
  ],
  capstoneProject: { title: '', techStack: [], role: '', responsibilities: [], outcomes: [] },
  achievements: [],
  volunteering: [],
  sportsArts: [],
  strengths: [],
  resumeTemplateId: 'classic',
  webPortfolioTemplateId: 'minimal',
  enableWebPortfolio: true,
};

export default function Builder() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState(initialDossier);
  const [savedId, setSavedId] = useState(null);
  const [shareId, setShareId] = useState(null);
  const [resumeTemplates, setResumeTemplates] = useState([]);
  const [webTemplates, setWebTemplates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getResumeTemplates().then(setResumeTemplates).catch(console.error);
    getWebTemplates().then(setWebTemplates).catch(console.error);
  }, []);

  const update = (path, value) => {
    setData((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      const parts = path.split('.');
      let cur = next;
      for (let i = 0; i < parts.length - 1; i++) {
        const p = parts[i];
        if (!(p in cur)) cur[p] = {};
        cur = cur[p];
      }
      cur[parts[parts.length - 1]] = value;
      return next;
    });
  };

  const save = async () => {
    setLoading(true);
    setError(null);
    try {
      if (savedId) {
        const updated = await updateDossier(savedId, data);
        setShareId(updated.shareId);
      } else {
        const created = await createDossier(data);
        setSavedId(created._id);
        setShareId(created.shareId);
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const currentStep = STEPS[step];
  const StepComponent = currentStep?.component;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="font-display text-2xl font-bold text-slate-900 mb-2">Build your dossier</h1>
      <p className="text-slate-600 mb-8">Complete each section and choose templates at the end.</p>

      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 border-b border-slate-200">
        {STEPS.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setStep(i)}
            className={`shrink-0 px-3 py-1.5 rounded-lg text-sm font-medium transition ${
              step === i ? 'bg-primary-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {s.title}
          </button>
        ))}
      </div>

      {error && (
        <div className="mb-4 p-4 rounded-lg bg-red-50 text-red-700 text-sm">
          {error}
        </div>
      )}

      {StepComponent && (
        <StepComponent
          data={data}
          update={update}
          save={save}
          loading={loading}
          savedId={savedId}
          shareId={shareId}
          resumeTemplates={resumeTemplates}
          webTemplates={webTemplates}
          onNext={() => setStep((s) => Math.min(s + 1, STEPS.length - 1))}
          onPrev={() => setStep((s) => Math.max(s - 1, 0))}
          isFirst={step === 0}
          isLast={step === STEPS.length - 1}
        />
      )}

      {step < STEPS.length - 1 && (
        <div className="mt-8 flex justify-between">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(s - 1, 0))}
            disabled={step === 0}
            className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={() => setStep((s) => Math.min(s + 1, STEPS.length - 1))}
            className="px-4 py-2 rounded-lg bg-primary-600 text-white"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
