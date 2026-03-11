<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into Spoonly. Here is a summary of all changes made:

## What changed

- **`instrumentation-client.ts`** (new) — Client-side PostHog initialization using the Next.js 15.3+ `instrumentation-client` pattern. Enables automatic exception capture and initializes PostHog via the reverse proxy (`/ingest`).
- **`app/providers.tsx`** (updated) — Simplified to a thin `PHProvider` wrapper now that initialization is handled by `instrumentation-client.ts`. Removed the old `posthog.init()` call and `PostHogPageView` component (pageviews are captured automatically by PostHog's defaults).
- **`next.config.mjs`** (updated) — Added reverse proxy rewrites for `/ingest` → `https://eu.i.posthog.com` and `/ingest/static` → `https://eu-assets.i.posthog.com`, plus `skipTrailingSlashRedirect: true`. This routes PostHog traffic through your own domain, improving ad-blocker resilience and data quality.
- **`.env.local`** (new) — PostHog public key and EU host set as environment variables.
- **`components/cook-tab.tsx`** (updated) — Added `ingredient_added`, `ingredient_removed`, and `find_meals_clicked` events.
- **`components/app-shell.tsx`** (updated) — Added `tab_changed` event when users switch between Cook and Stock tabs.
- **`components/pantry-section.tsx`** (updated) — Added `stock_ingredient_toggled` and `pantry_section_cleared` events.
- **`components/meal-card.tsx`** (updated) — Added `meal_card_expanded` event when users open a meal card to view the recipe.
- **`components/energy-section.tsx`** (updated) — Added `more_meals_expanded` event when users reveal additional meals in an energy section.
- **`app/suggestions/page.tsx`** (updated) — Added `suggestions_viewed` event capturing result counts broken down by energy level.

## Events

| Event | Description | File |
|---|---|---|
| `ingredient_added` | User adds an ingredient from the search dropdown on the Cook tab | `components/cook-tab.tsx` |
| `ingredient_removed` | User removes a manually-selected ingredient tag on the Cook tab | `components/cook-tab.tsx` |
| `find_meals_clicked` | User clicks the Let's Cook button to navigate to the suggestions page | `components/cook-tab.tsx` |
| `tab_changed` | User switches between Cook and Stock tabs via the bottom nav | `components/app-shell.tsx` |
| `stock_ingredient_toggled` | User toggles an ingredient in/out of their pantry stock on the Stock tab | `components/pantry-section.tsx` |
| `pantry_section_cleared` | User clears all ingredients in a pantry section | `components/pantry-section.tsx` |
| `meal_card_expanded` | User expands a meal card to view ingredients and instructions | `components/meal-card.tsx` |
| `more_meals_expanded` | User clicks to show more meals in an energy section | `components/energy-section.tsx` |
| `suggestions_viewed` | User arrives at the suggestions page and sees meal results | `app/suggestions/page.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard**: [Analytics basics](https://eu.posthog.com/project/139728/dashboard/564621)
- **Insight**: [Meal Discovery Funnel](https://eu.posthog.com/project/139728/insights/oRbeGHi7) — conversion funnel from Let's Cook → suggestions viewed → meal expanded
- **Insight**: [Ingredient Engagement vs Let's Cook](https://eu.posthog.com/project/139728/insights/DiEDnsdF) — daily trend of ingredient additions vs cook session starts
- **Insight**: [Stock Tab Engagement](https://eu.posthog.com/project/139728/insights/BuFUcx79) — daily trend of pantry stock interactions
- **Insight**: [Meal Card Expansion Rate](https://eu.posthog.com/project/139728/insights/9fBq3ZIf) — how often users open meal cards, broken down by energy level
- **Insight**: [Tab Navigation](https://eu.posthog.com/project/139728/insights/4TIY2G79) — unique users switching between Cook and Stock tabs per day

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/posthog-integration-nextjs-app-router/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
