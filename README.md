# Xin Chen — Academic Homepage

**[Visit the homepage → https://cx-333.github.io/](https://cx-333.github.io/)**

A static academic website built with React and Vite, with profile information, education, searchable publications, projects, awards, research experience, and light/dark themes. Website text and documentation are in English.

- [Repository](https://github.com/cx-333/cx-333.github.io)
- [Local editing guide](./LOCAL_EDITING_GUIDE.md)
- [Deployment history](https://github.com/cx-333/cx-333.github.io/actions)

## Run locally

Install Git and Node.js 22.12 or later within 22.x:

```powershell
npm.cmd install --global npm@11.6.1
npm.cmd ci
npm.cmd run dev
```

Open the address printed in the terminal. Before publishing:

```powershell
npm.cmd run lint
npm.cmd run build
npm.cmd run preview
```

## Edit and publish

Edit `resumeData` in `src/App.jsx`, homepage styles in `src/App.css`, and attachments in `public/`. Some profile sections still contain sample content and placeholder links.

```powershell
git add .
git commit -m "Update academic homepage"
git push origin main
```

GitHub Actions validates and builds `main`, synchronizes `dist/` to `gh-pages`, and deploys through the official Pages action. It waits for legacy branch publishing to prevent raw source from overwriting the compiled site. The publishing branch retains only the latest build. Routine updates do not require force pushes. Do not edit `dist/` or `gh-pages` directly.

Configuration: `.github/workflows/gh-pages.yml`. The original Hugo site was replaced during migration.

## Paper pages

- **RRSQ-DVSC:** `/papers/rrsq-dvsc/` — manuscript, code, method, ablations, visual comparisons, and optional videos.
- **FPPA:** `/papers/fppa/` — ICASSP 2027 submission under review, Figure 1 cover, framework, evaluation curves, ablations, and three interactive fidelity/perception comparisons.

Both static pages support direct links and refreshes. See the editing guide for file locations and asset provenance.
