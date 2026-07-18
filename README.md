# Manichandra M R — Portfolio

Terminal-themed personal portfolio built with Next.js, TypeScript, and Tailwind CSS.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Edit content

All resume text lives in one file: [`data/resume.ts`](data/resume.ts). Edit it to update
experience, projects, skills, or contact info — layout components read from it, no need to
touch JSX for copy changes.

To swap the downloadable resume, replace `public/Manichandra_MR_Resume_2026.pdf` and update
`resumeFile` in `data/resume.ts` if the filename changes.

## Build

```bash
npm run build
```

## Deploy to Vercel

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new), import the repo — Next.js is auto-detected, no config needed.
3. Deploy. Every push to `main` redeploys automatically.

Or from the CLI:

```bash
npx vercel
```
