import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function escapeLatex(str) {
  if (str == null || str === '') return '';
  return String(str)
    .replace(/\\/g, '\\textbackslash{}')
    .replace(/[&%$#_{}]/g, '\\$&')
    .replace(/~/g, '\\textasciitilde{}')
    .replace(/\n/g, '\\\\\n');
}

function sectionList(items, bullet = '\\item') {
  if (!items || !items.length) return '';
  return items.map((i) => `${bullet} ${escapeLatex(i)}`).join('\n');
}

function educationBlock(edu) {
  if (!edu || !edu.length) return '';
  return edu
    .map(
      (e) =>
        `\\textbf{${escapeLatex(e.degree || '')}} ${escapeLatex(e.institution || '')} ${escapeLatex(e.year || '')} ${escapeLatex(e.stream || '')} ${escapeLatex(e.percentage || '')}`
    )
    .join(' \\\\\n');
}

function skillsByCategory(skills) {
  if (!skills || !skills.length) return '';
  const byCat = {};
  skills.forEach((s) => {
    const cat = s.category || 'other';
    if (!byCat[cat]) byCat[cat] = [];
    (s.items || []).forEach((item) => byCat[cat].push(item));
  });
  const order = ['programming', 'fullstack', 'tools', 'certifications'];
  return order
    .filter((c) => byCat[c]?.length)
    .map((c) => `\\textbf{${c}}: ${(byCat[c] || []).map(escapeLatex).join(', ')}`)
    .join(' \\\\\n');
}

function projectBlock(proj) {
  if (!proj) return '';
  const lines = [];
  if (proj.title) lines.push(`\\textbf{${escapeLatex(proj.title)}}`);
  if (proj.techStack?.length) lines.push(`Tech: ${proj.techStack.map(escapeLatex).join(', ')}`);
  if (proj.role) lines.push(`Role: ${escapeLatex(proj.role)}`);
  if (proj.responsibilities?.length) lines.push(sectionList(proj.responsibilities));
  if (proj.outcomes?.length) lines.push('Outcomes: ' + sectionList(proj.outcomes));
  return lines.join(' \\\\\n');
}

function achievementsList(arr) {
  if (!arr?.length) return '\\item --';
  return arr.map((a) => `\\item ${escapeLatex(a.title || '')} ${escapeLatex(a.description || '')} (${escapeLatex(a.date || '')})`).join('\n');
}

function volunteeringList(arr) {
  if (!arr?.length) return '\\item --';
  return arr.map((v) => `\\item ${escapeLatex(v.organization || '')} - ${escapeLatex(v.role || '')} ${escapeLatex(v.description || '')}`).join('\n');
}

function sportsArtsList(arr) {
  if (!arr?.length) return '\\item --';
  return arr.map((s) => `\\item ${escapeLatex(s.name || '')} (${s.type}): ${escapeLatex(s.achievement || '')}`).join('\n');
}

function strengthsList(arr) {
  if (!arr?.length) return '\\item --';
  return arr.map((s) => `\\item ${escapeLatex(s.name || '')}: ${escapeLatex(s.description || '')}`).join('\n');
}

export function buildLatexData(dossier) {
  const p = dossier.profile || {};
  return {
    name: escapeLatex(p.name || ''),
    email: escapeLatex(p.email || ''),
    phone: escapeLatex(p.phone || ''),
    location: escapeLatex(p.location || ''),
    cognizantId: escapeLatex(p.cognizantId || ''),
    role: escapeLatex(p.role || ''),
    track: escapeLatex(p.track || ''),
    education: educationBlock(dossier.education),
    technicalSkills: skillsByCategory(dossier.technicalSkills),
    capstone: projectBlock(dossier.capstoneProject),
    achievements: achievementsList(dossier.achievements),
    volunteering: volunteeringList(dossier.volunteering),
    sportsArts: sportsArtsList(dossier.sportsArts),
    strengths: strengthsList(dossier.strengths),
  };
}

const TEMPLATES_DIR = path.join(__dirname, '..', 'templates', 'latex');

export function getLatexTemplate(templateId) {
  const file = path.join(TEMPLATES_DIR, `${templateId || 'classic'}.tex`);
  if (!fs.existsSync(file)) {
    return getClassicLatexContent();
  }
  return fs.readFileSync(file, 'utf-8');
}

function getClassicLatexContent() {
  return `\\documentclass[11pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[margin=1in]{geometry}
\\usepackage{enumitem}
\\usepackage{hyperref}
\\title{Dossier — \\textbf{<<name>>}}
\\author{}
\\date{}
\\begin{document}
\\maketitle
\\section*{Profile}
\\textbf{Name:} <<name>> \\\\
\\textbf{Email:} \\url{<<email>>} \\\\
\\textbf{Phone:} <<phone>> \\\\
\\textbf{Location:} <<location>> \\\\
\\textbf{Cognizant ID:} <<cognizantId>> \\\\
\\textbf{Role/Track:} <<role>> / <<track>>

\\section*{Education}
<<education>>

\\section*{Technical Skills}
<<technicalSkills>>

\\section*{Capstone Project}
<<capstone>>

\\section*{Achievements}
\\begin{itemize}
<<achievements>>
\\end{itemize}

\\section*{Volunteering}
\\begin{itemize}
<<volunteering>>
\\end{itemize}

\\section*{Sports, Arts \\& Accomplishments}
\\begin{itemize}
<<sportsArts>>
\\end{itemize}

\\section*{Skills \\& Strengths}
\\begin{itemize}
<<strengths>>
\\end{itemize}
\\end{document}`;
}

export function renderLatex(dossier, templateId) {
  const data = buildLatexData(dossier);
  let content = getLatexTemplate(templateId);
  Object.entries(data).forEach(([key, value]) => {
    content = content.replace(new RegExp(`<<${key}>>`, 'g'), value);
  });
  return content;
}
