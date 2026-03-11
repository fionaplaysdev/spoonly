# Spoonly – To-do list

## Staging & release

- [ ] **Set up staging / dev environment** – So we're not pushing straight to live. Options: separate Vercel project for a `staging` or `develop` branch, or use Vercel Preview deployments for every branch so each PR gets a URL before merging to main.

## Product & content

- [ ] **Add an About / info page** – For people who discover the app. Include: what Spoonly is, how it works (pantry + suggestions), that data stays in the browser only, and optional link to contact or repo.

## Codebase & polish

- [ ] **README** – Add a short “how to run” (e.g. `npm install`, `npm run dev`), optional env vars (PostHog), and note that the app is client-side with no backend.

- [ ] **Favicons** – Layout references `/icon-light-32x32.png`, `/icon-dark-32x32.png`, `/apple-icon.png` but only `icon.svg` exists in `public/`. Add the missing assets or simplify layout metadata to match what’s there.

- [ ] **Turn off TypeScript ignoreBuildErrors** – In `next.config.mjs`, remove `typescript: { ignoreBuildErrors: true }` and fix any reported type errors so the build catches issues before deploy.

- [ ] **Add a smoke test** – One simple check (e.g. suggestions page renders and shows at least one section) so refactors and staging deploys are safer. Use Playwright or React Testing Library as preferred.

---

*Last updated: March 2025*
