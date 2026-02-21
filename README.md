# GenC Dossier Generator

A full-stack application to build professional dossiers (portfolios) for trainees. Users enter their profile, education, technical skills, capstone project, achievements, volunteering, sports/arts, and strengths; choose a **resume template** (LaTeX) and a **web portfolio template**; then export a LaTeX file or share a public link to their portfolio.

## Tech stack

- **Frontend:** React 18, Vite, Tailwind CSS, React Router
- **Backend:** Node.js, Express
- **Database:** MongoDB with Mongoose

## Features

- **Candidate profile:** Name, email, phone, location, Cognizant ID, role/track, LinkedIn, GitHub
- **Education:** Multiple entries (degree, institution, year, stream, percentage)
- **Technical skills:** Grouped by Programming, Full stack, Tools, Certifications
- **Capstone project:** Title, tech stack, role, responsibilities, outcomes
- **Achievements & volunteering:** Awards, recognitions, volunteering with organizations
- **Sports, arts & accomplishments:** Extracurricular entries
- **Skills & strengths:** Soft skills (communication, teamwork, etc.)
- **Resume templates:** Classic, Modern, Executive (LaTeX) — download `.tex` and compile to PDF locally or online
- **Web portfolio templates:** Minimal, Card, Creative — public shareable page
- **Share link:** After saving, get a link like `/p/{shareId}` to share; anyone can view the portfolio

## Project structure

```
Portfolio-Builder/
├── backend/                 # Express API
│   ├── src/
│   │   ├── config/db.js
│   │   ├── models/Dossier.js
│   │   ├── routes/dossier.js
│   │   ├── routes/templates.js
│   │   ├── routes/export.js
│   │   ├── services/latexGenerator.js
│   │   ├── templates/latex/   # .tex templates
│   │   └── server.js
│   └── package.json
├── frontend/                # React app
│   ├── src/
│   │   ├── api/client.js
│   │   ├── components/
│   │   │   ├── builder/      # Form steps
│   │   │   └── portfolio/    # Web portfolio views
│   │   ├── pages/
│   │   └── App.jsx
│   └── package.json
├── .env.example
└── README.md
```

## Setup and run

### 1. MongoDB

You need a running MongoDB instance. Create a database (e.g. `genc-dossier`) and set the connection string in `.env`.

### 2. Backend

```bash
cd backend
cp ../.env.example .env
# Edit .env and set MONGODB_URI (e.g. your Atlas URL or mongodb://localhost:27017/genc-dossier)
npm install
npm run dev
```

Server runs at `http://localhost:5000`.

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

App runs at `http://localhost:3000`. Vite proxies `/api` to the backend.

### 4. Environment variables (backend)

| Variable     | Description                    | Example                          |
|-------------|---------------------------------|----------------------------------|
| `MONGODB_URI` | MongoDB connection string      | `mongodb://localhost:27017/genc-dossier` or Atlas URL |
| `PORT`      | Server port (optional)          | `5000`                           |

Copy `.env.example` to `backend/.env` and set `MONGODB_URI`. If you use MongoDB Atlas, paste your connection URL there.

## Usage

1. Open the app and click **Build Dossier** (or go to `/build`).
2. Fill the steps: Profile → Education → Technical skills → Capstone → Achievements & volunteering → Sports & arts → Strengths.
3. In **Templates & Export**, choose a resume template and a web portfolio template (and optionally disable web portfolio).
4. Click **Save dossier**. After saving you get:
   - **Download LaTeX (.tex):** Downloads the filled template. Compile with `pdflatex dossier-xxx.tex` or use Overleaf/online LaTeX.
   - **View portfolio:** Opens your public portfolio page.
   - **Copy share link:** Copies the URL so others can view your portfolio at `/p/{shareId}`.

## API (summary)

- `POST /api/dossiers` — Create dossier
- `GET /api/dossiers` — List dossiers
- `GET /api/dossiers/:id` — Get by ID
- `GET /api/dossiers/share/:shareId` — Get by share ID (for public view)
- `PUT /api/dossiers/:id` — Update dossier
- `DELETE /api/dossiers/:id` — Delete dossier
- `GET /api/templates/resume` — Resume template list
- `GET /api/templates/web` — Web portfolio template list
- `GET /api/export/latex/:id?template=classic` — Download .tex file

## Demo video

Record a 2–3 minute walkthrough: create a dossier, pick templates, save, download LaTeX, open share link in incognito.

## License

MIT.
