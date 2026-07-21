# LinksZane — static rebuild (Option A)

This generates a **real, separate HTML file for every video and every tag**,
so Google can actually index them individually — unlike the single-page
version, which only ever has one crawlable URL.

## What's built so far

- `/` — homepage, lists all videos
- `/watch/<video-id>/` — one real page per video, with its own title, meta
  description, embed, tags, download link, and a few other videos linked below
- `/tag/<tag-name>/` — one real page per tag, listing every video that has it
- `/sitemap.xml` — auto-generated, lists the homepage + every video + every
  tag page (this is the part that fixes "why does my site only have one page")
- `/robots.txt`

## What's NOT built yet (next steps, once this is confirmed working)

- The admin login/add/remove panel — for now, keep using your existing
  `index.html` admin panel to manage videos in Supabase; this new project
  only *reads* from Supabase to generate pages
- Search, Latest/Most Viewed/Random sorting, and pagination on the homepage
- Wiring your admin's "Add Video" button to auto-trigger a rebuild

## 1. Install

You'll need [Node.js](https://nodejs.org) installed (v18 or newer). Then, inside this folder:

```
npm install
```

## 2. Add your Supabase credentials

Create a file named `.env` in this folder (same level as `package.json`):

```
SUPABASE_URL=https://owuchppfijermqpuggfh.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
```

This file should **not** be uploaded anywhere public — it's just for building
on your own machine. (Netlify gets its own copy of these, set separately —
see step 4.)

## 3. Build and preview locally

```
npm run dev
```

This starts a local preview server and prints a `http://localhost:8080`
address — open it in a browser to check everything looks right before
deploying. Every video should have its own working page at
`/watch/<id>/`.

## 4. Deploy to Netlify

Since this now needs a **build step** (unlike before, where you just dragged
one HTML file in), set it up as a proper connected site instead of a manual
drag-and-drop:

1. Push this folder to a GitHub repository
2. In Netlify: **Add new site → Import an existing project** → connect that repo
3. Netlify should auto-detect the build settings from `netlify.toml`
   (build command `npm run build`, publish folder `_site`) — confirm they're
   right
4. **Site settings → Environment variables** → add `SUPABASE_URL` and
   `SUPABASE_ANON_KEY` (same values as your `.env` file) so Netlify can fetch
   your videos during its own build
5. Deploy — Netlify will run the build and publish `_site`

## 5. Re-submit your sitemap to Google

Once live, go to Search Console → Sitemaps → resubmit
`https://linkszane.netlify.app/sitemap.xml`. It should now show real numbers
under "Discovered pages" instead of 0.

## About rebuilds

New videos won't appear on the site the instant you add them to Supabase —
Netlify needs to re-run the build first. Once this is confirmed working, the
next step is wiring your admin panel to call a **Netlify Build Hook** right
after a successful save, so it rebuilds automatically (takes about 30–90
seconds) instead of you having to trigger it by hand.
