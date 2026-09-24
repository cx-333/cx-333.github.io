# Local Editing Guide

Homepage: https://cx-333.github.io/  
Repository: https://github.com/cx-333/cx-333.github.io  
Local directory: `D:\myprofile\phd-resume`

## 1. Start locally

Install Git and Node.js 22.12 or later within 22.x. Open the project in an editor and run:

```powershell
cd D:\myprofile\phd-resume
npm.cmd install --global npm@11.6.1
npm.cmd ci
npm.cmd run dev
```

Open the printed address, usually `http://localhost:5173/`. Saved changes reload automatically. Press Ctrl+C to stop. `npm.cmd` avoids PowerShell execution-policy restrictions on `npm.ps1`.

On a new computer, first run `git clone https://github.com/cx-333/cx-333.github.io.git`, enter the cloned directory, and run the installation commands above.

## 2. Editing reference

Most personal information is in `resumeData` at the top of `src/App.jsx`.

| Content | Field or file | Notes |
| --- | --- | --- |
| Identity | `name`, `title`, `location` | Quoted strings |
| Contact and profiles | `email`, `github`, `scholar` | Full profile URLs; email link is generated |
| CV | `cv` | `/cv.pdf` maps to `public/cv.pdf` |
| Biography and interests | `summary`, `interests` | Text and string list |
| Counts | `metrics` | `label` and `value`; not calculated automatically |
| Education | `education` | Degree, school, dates, description |
| Skills | `skills` | Group and item list |
| Publications | `publications` | Cover, title, venue, year, status, tags, description, link, code |
| Projects | `projects` | Name, dates, tags, description, impact |
| Experience | `experiences` | Role, organization, dates, activities |
| Awards | `awards` | String list |
| Homepage appearance | `src/App.css` | Light variables in `:root`, dark variables in `.app.dark` |
| Global font | `src/index.css` | Body font family |
| Browser title and description | `index.html` | Title and description metadata |
| Browser icon | `public/favicon.svg` | Replace the file |

Navigation, section headings, the research focus headline, and contact copy are in the JSX below the data. All HTML entries use `lang="en"`. Keep captions, alternative text, accessible labels, and metadata in English.

Some education, project, award, and experience entries remain template content; review them before presenting them as achievements. A `#` link is a placeholder.

## 3. Profile and attachments

Change values while preserving JavaScript quotes, commas, and brackets:

```javascript
name: "Your Name",
title: "PhD Student in Computer Science",
location: "City / University",
email: "you@example.com",
cv: "/cv.pdf",
```

Place the CV at `public/cv.pdf`. The browser may open it before offering a download. Other attachments also belong in `public/`: `public/files/paper.pdf` is served at `/files/paper.pdf`. Never use `public/` or local drive paths in website URLs. Match capitalization and prefer English filenames.

## 4. Add content and detail pages

Copy a complete publication entry:

```javascript
{
  cover: "/papers/example/cover.webp",
  title: "Paper Title",
  venue: "Conference or Journal",
  year: "2027",
  status: "Under Review",
  tags: ["Machine Learning"],
  description: "A brief description of the contribution.",
  link: "/papers/example/",
  code: "https://github.com/your-account/your-project",
},
```

Entries appear in array order. Use unique titles. Tags populate filters automatically; search includes title, venue, year, status, description, and tags. An empty cover shows a placeholder; an empty code field hides the dark Code button. Desktop covers occupy the left 20% of the paper card; mobile cards stack vertically.

Projects, education, and experience use the same copy-and-edit approach. Remove whole entries, including their separating commas. Interests and awards are string lists.

For a new detail page, create an HTML entry under `papers/<slug>/`, a React entry and component in `src/`, and media under `public/papers/<slug>/`. Register the HTML entry in `build.rollupOptions.input` in `vite.config.js`; point the homepage link to `/papers/<slug>/`. Existing pages demonstrate images, tables, and video support.

## 5. Validate and publish

If the remote changed, run `git pull --ff-only origin main` with a clean working tree before editing.

```powershell
npm.cmd run lint
npm.cmd run build
npm.cmd run preview
```

Open the printed preview URL, usually `http://localhost:4173/`. Check profile details, email, CV, paper links, filters, themes, and narrow screens. Do not double-click `dist/index.html`.

```powershell
git status
git add .
git commit -m "Update profile and publications"
git push origin main
```

Review the staged file list: `git add .` includes all non-ignored changes. `node_modules` and `dist` are ignored. Wait for **Deploy GitHub Pages** in [Actions](https://github.com/cx-333/cx-333.github.io/actions) to succeed, then inspect the live site. A push alone does not confirm deployment. **Run workflow** can trigger another deployment.

The existing local `origin` uses GitHub SSH; the original Gitee remote is named `gitee`. On an HTTPS clone, follow Git authentication prompts; a GitHub login password is not a Git HTTPS password.

## 6. Deployment structure

- `main`: source, lockfile, documentation, workflow.
- `gh-pages`: latest generated static site; old output files are cleared.
- `dist`: regenerated local build output, never edited directly.
- Pages: official `actions/deploy-pages` publication after any legacy publisher finishes. Selecting GitHub Actions in Settings → Pages can remove the redundant legacy publisher.
- Vite retains a relative base; this site is hosted at the account's root domain.

The migration replaced the old Hugo site. Routine updates do not require force pushes. Removing branch history does not immediately erase every cached or unreachable GitHub object.

## 7. Troubleshooting

| Problem | Action |
| --- | --- |
| Old content | Check Actions, refresh with Ctrl+F5, allow time for CDN updates |
| Deployment failure | Inspect the failed step; rerun lint and build locally |
| Blank page | Check build output and paths; publish `dist` contents |
| Missing asset | Commit the file and match path capitalization |
| Inactive link | Replace `#` with a real URL |
| Unsupported Node | Use Node.js 22.12+ within 22.x and rerun `npm.cmd ci` |
| Rejected push | Check remote/access and reconcile changes before pushing |
| Undo publication | Find the commit, run `git revert <commit>`, then push |

References: [Pages publishing sources](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site), [publishing action](https://github.com/peaceiris/actions-gh-pages).

## 8. RRSQ-DVSC

URL: `/papers/rrsq-dvsc/`. The cover and View button open this independent static page.

| Content | Location |
| --- | --- |
| Metadata, links, comparisons, ablations, videos | `src/data/rrsq-dvsc.js` |
| Body and structure | `src/pages/PaperDetail.jsx` |
| Shared paper styles | `src/pages/PaperDetail.css` |
| Title and metadata | `papers/rrsq-dvsc/index.html` |
| PDF and media | `public/papers/rrsq-dvsc/` |
| Homepage card | First publication in `src/App.jsx` |

To add a video, copy `demo.mp4` into the media directory and populate `videos`:

```javascript
videos: [
  {
    src: "/papers/rrsq-dvsc/demo.mp4",
    poster: "/papers/rrsq-dvsc/comparison-1db.webp",
    title: "Video Reconstruction Comparison",
    // Optional English WebVTT captions:
    // captions: "/papers/rrsq-dvsc/demo-en.vtt",
  },
],
```

Use browser-compatible MP4, such as H.264 video and AAC audio. Controls, inline mobile playback, and a download link are provided; an empty list hides the section. No video was supplied with the current materials.

Replace assets using the same names, or update their paths. The manuscript is `paper.pdf`; the cover is its first page. Replacing a PDF does not regenerate `cover.webp` automatically.

Sources: `main20260227.pdf` and `figs` under `F:\research-article\2025\latex-TWC`. Deployment uses project copies. Ablation percentages come from manuscript Table II relative to CNN; negative LPIPS changes mean reduced perceptual distance. Status is Under Review, without an invented DOI.

## 9. FPPA / ICASSP 2027

URL: `/papers/fppa/`. Title: **Fidelity-Preserving Perceptual Image Compression via a Rate-Aware Mixture of LoRA Experts**. Status: **ICASSP 2027 · Under Review**; 2027 is the conference year, not an acceptance claim. The cover is Figure 1 rendered from `fig1-1.pdf`.

| Content | Location |
| --- | --- |
| Homepage card | Second publication in `src/App.jsx` |
| Metadata, resources, ablations | `src/data/fppa.js` |
| Sample paths and precise metrics | `src/data/fppa-samples.json` |
| Body and interactions | `src/pages/FppaDetail.jsx` |
| Page and slider styles | `src/pages/FppaDetail.css` |
| Shared styles | `src/pages/PaperDetail.css` |
| Title and metadata | `papers/fppa/index.html` |
| PDF and images | `public/papers/fppa/` |

Asset provenance:

- `paper.pdf`: unmodified supplied `ICASSP2027/ICASSP2027.pdf`.
- `cover.webp`: `fig1-1.pdf`, verified against Figure 1.
- `framework.webp`: Figure 2 cropped from manuscript page 2.
- Evaluation and visual comparison: matching PNGs in supplied `code/assets`.
- Three original/fidelity/perception sets: lossless WebP at original resolution.
- QP, BPP, PSNR, SSIM, LPIPS: `fidelity/results.txt` and `perception/results.txt`, four decimal places. Per-image supplementary metrics are not Kodak/CLIC2020 averages.
- Ablations: manuscript Table 1; BD-Rate reference is Ours. The 67.7% reduction is `1 - 11.62 / (4.49 * 8)` and compares adapter parameters only.
- [Official code](https://github.com/cx-333/fppa): manuscript footnote.

The source manuscript and assets are in the supplied 2026 research directory on drive F. Deployment uses project copies and does not depend on that drive. No video was supplied.

Each sample specifies name, original/fidelity/perception paths, and both metric objects. Keep paired images identically sized and aligned; update scores when replacing images. Selecting another sample resets the slider to 50%. Normal builds include all pages and assets; no extra server is needed.
