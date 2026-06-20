# Field & Frame — Photo Archive

A photo gallery website that organizes images by the year they were taken.
Visitors browse a year timeline, view photos in an animated masonry grid,
open any photo full-screen, and swipe between photos left/right. Anyone
can upload new photos straight from the browser.

Built with **React 19 + Vite + Framer Motion**.

---

## Features

- **Browse by year** — a film-reel style year selector. Click a year, the
  gallery animates in the photos taken that year.
- **Full-screen viewer** — click any photo to open it full screen. Swipe
  (touch) or drag (mouse) left/right to move between photos, or use the
  on-screen arrows / ← → keys. Esc closes it.
- **Upload photos** — drag-and-drop or pick files, assign a year (existing
  or brand new), and they're added to the archive instantly. Uploads are
  stored in the browser's IndexedDB, so they persist across reloads
  without needing a backend server.
- **Animated throughout** — page-load reveal, staggered grid entrance,
  hover micro-interactions, shared-element transition from thumbnail to
  full screen, swipe physics in the viewer.
- **Fully responsive** — tested down to small phone widths: the year reel
  scroll-snaps horizontally, the grid drops to 2 columns, and the upload
  dialog becomes a bottom sheet on small screens.

> Demo photos are pre-loaded across 2022–2026 (placeholder images) so the
> gallery looks complete out of the box. Delete the entries in
> `src/data/samplePhotos.js`, or just start uploading — your own uploads
> always appear alongside or instead of them.

---

## Folder structure

```
photo-gallery/
├── public/
│   └── favicon.svg              # branded tab icon
├── src/
│   ├── components/
│   │   ├── Header.jsx           # top bar: logo + "Upload photos" button
│   │   ├── YearReel.jsx         # the year timeline / signature nav element
│   │   ├── Gallery.jsx          # grid container for the selected year
│   │   ├── PhotoCard.jsx        # single thumbnail (entrance + hover anim)
│   │   ├── EmptyState.jsx       # shown when a year has no photos yet
│   │   ├── Lightbox.jsx         # full-screen swipeable viewer
│   │   └── UploadModal.jsx      # drag-and-drop upload dialog
│   ├── context/
│   │   ├── galleryContextDef.js # React context definition
│   │   └── GalleryContext.jsx   # provider: state, derived data, actions
│   ├── hooks/
│   │   └── useGallery.js        # convenience hook to read the context
│   ├── data/
│   │   └── samplePhotos.js      # demo photo set, organized by year
│   ├── utils/
│   │   └── photoStorage.js      # IndexedDB persistence for uploads
│   ├── styles/
│   │   └── layout.css           # all component + responsive styles
│   ├── index.css                # design tokens (color/type/radius) + resets
│   ├── App.jsx                  # page composition
│   └── main.jsx                 # entry point, wraps App in GalleryProvider
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

**How the pieces fit together:** `GalleryContext` is the single source of
truth — it merges sample photos with anything uploaded, tracks which year
is selected, and exposes the lightbox index. Every component reads from
it via `useGallery()`. `YearReel` writes the selected year; `Gallery` +
`PhotoCard` read the filtered list and tell the context which photo to
open; `Lightbox` reads the open index and can step forward/back.

---

## Run it locally

Requires Node.js 18+.

```bash
cd photo-gallery
npm install
npm run dev
```

Open the printed local URL (typically `http://localhost:5173`).

Other scripts:

```bash
npm run build     # production build → dist/
npm run preview   # serve the production build locally
npm run lint      # ESLint
```

---

## Customizing

- **Replace demo photos:** edit or clear out `src/data/samplePhotos.js`.
  Each entry needs `id`, `year`, `src` (a URL), `title`, `caption`, and
  `date` (`YYYY-MM-DD`, used for sorting within a year).
- **Brand name / footer text:** edit `src/components/Header.jsx` and the
  `<footer>` in `src/App.jsx`.
- **Colors / fonts:** all design tokens live at the top of `src/index.css`
  as CSS variables (`--color-accent`, `--font-display`, etc.) — change
  them once and the whole site updates.
- **Where uploads are stored:** uploads currently live in the visitor's
  own browser (IndexedDB), so they're local to that device/browser, not
  shared with other visitors. To make uploads shared and permanent across
  everyone, swap `src/utils/photoStorage.js` for calls to a real backend
  or storage bucket (e.g. S3, Cloudinary, Supabase Storage) — the rest of
  the app doesn't need to change, since it only talks to that one file's
  functions.

---

## Deploying to Vercel

**Option A — Vercel CLI**

```bash
npm install -g vercel
cd photo-gallery
vercel        # first deploy, follow the prompts
vercel --prod # subsequent production deploys
```

**Option B — Git + Vercel dashboard**

1. Push this folder to a GitHub/GitLab/Bitbucket repo.
2. Go to vercel.com/new and import the repo.
3. Vercel auto-detects the **Vite** framework preset — defaults are
   correct (`npm run build`, output directory `dist`). Click **Deploy**.
4. Every push to the main branch redeploys automatically; pull requests
   get their own preview URL.

No environment variables or backend setup are required — this is a fully
static site once built.

---

## Browser support notes

- Uploaded photos are stored client-side; clearing site data/IndexedDB in
  the browser will remove them (demo photos are unaffected, since they
  come from `samplePhotos.js`).
- Animations respect `prefers-reduced-motion`.
