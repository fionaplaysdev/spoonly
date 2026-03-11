# Spoonly Suggestion Engine

This document explains how Spoonly turns a set of available ingredients into a short list of meal suggestions.

It is written for future developers and maintainers, and focuses on the *ideas and rules* rather than UI implementation details.

---

## 1. Overview

The suggestion engine answers one question:

> “Given what I have (and what I’ve selected), what can I make right now?”

### Design goals

- **Deterministic**: the same inputs always produce the same outputs.
- **Fast**: runs locally in the browser with no API calls.
- **Low cognitive load**: the engine aims to surface a small set of high-confidence suggestions.
- **Realistic pantry cooking**: suggestions should feel like something you could actually make with the listed items.
- **Not a recipe database**: templates are lightweight meal “shapes” rather than full chef recipes.

---

## 2. Core concepts

### Ingredients

Ingredients are the basic items a user might have in their pantry/freezer/fridge. Each ingredient has a stable `id` (kebab-case) and a human-friendly name.

The ingredient catalogue lives in:

- `lib/domain/ingredients.ts` (`INGREDIENTS`)

### Ingredient sections (pantry grouping)

Ingredients are grouped into *sections* for the Stock UI (e.g. “Flavour Engines”, “Fast Carbs”). Sections are about **how people think about stocking a pantry**, not how the engine matches meals.

Section metadata lives in:

- `lib/domain/ingredients.ts` (`PANTRY_SECTIONS`)

### Ingredient roles (how ingredients behave in meals)

Roles describe how an ingredient contributes to a meal:

- **carb** (base): rice pouches, pasta, pitta, potatoes, etc.
- **protein**: eggs, tofu, beans, lentils, chickpeas, etc.
- **veg**: quick-use vegetables (spinach, peas, broccoli, avocado, etc.)
- **flavour**: flavour engines (miso, curry paste, peanut butter, soy sauce, etc.)
- **finisher**: toppings/acid/crunch (lemon/lime, yoghurt, seeds, herbs, etc.)

Roles are used by the engine to decide whether a meal template is *structurally valid* for a user’s available ingredients.

### Meal templates

A **meal template** is a flexible meal definition:

- It has an archetype (noodle-bowl, rice-bowl, soup, etc.)
- It lists ingredient options by role (e.g. which carbs can serve as the base)
- It specifies which roles are required vs optional
- It contains short, low-effort instructions

Templates live in:

- `lib/domain/meals.ts` (`MEAL_TEMPLATES`)

### Anchor ingredients (meal identity)

Some ingredients define the identity of a meal:

- Peanut noodle bowl without peanut butter isn’t really a peanut noodle bowl.
- Miso noodle broth without miso isn’t really a miso broth.
- “Toast” meals without bread aren’t toast meals.

Templates can declare `anchorIngredientIds` as the ingredients that normally must be present (or explicitly substituted) for the template to be shown.

### Substitutions (explicit only)

Spoonly supports a small, explicit set of approved substitutions, such as:

- lime ↔ lemon
- chickpeas ↔ beans ↔ lentils (where it still feels like the same bowl)
- spinach ↔ peas ↔ broccoli (for quick veg swaps)
- noodle-pouches → instant-ramen
- spring-onions → fresh-herbs

Substitutions are **not inferred from roles**. They must exist in an explicit mapping.

Substitution rules live in:

- `lib/domain/substitutions.ts` (`SUBSTITUTIONS`)

### Energy levels

Each template has an **energy level** indicating the effort required:

- **barely-functioning**
- **low-effort**
- **some-energy**

This is primarily a *user-facing organization* (grouping meals by effort), and also helps keep templates aligned with the product constraints (time/steps).

---

## 3. Ingredient model

The ingredient model is intentionally simple:

- Ingredients are identified by **stable IDs**.
- The user’s pantry state is a set of ingredient IDs saved in **localStorage**.
- Roles are attached to ingredients so the engine can understand how a meal can be composed.

Key idea:

> **Sections are for stocking UI. Roles are for matching logic.**

An ingredient can have multiple roles when that reflects real usage (e.g. cheddar cheese can be protein + finisher).

---

## 4. Meal templates

Templates define meals as:

- A **name** (what the user sees)
- An **archetype** (bowl/soup/toast)
- A **role structure** (what roles matter, and which are required)
- A **set of ingredient options** for each role

Example mental model:

> “This is a rice bowl. You need a carb base + a flavour engine. Protein is encouraged. Finishers are optional.”

Templates often include multiple options for a role (e.g. a bowl might allow either rice *or* potatoes as a carb base). This is intentionally flexible.

---

## 5. Anchor ingredients

Anchor ingredients exist to prevent “technically valid but wrong” suggestions.

### Why anchors exist

Role matching alone can produce odd results:

- If “carb” is required, the engine might think pasta can replace bread for a toast template.
- If “flavour” is required, the engine might treat any flavour engine as interchangeable, even when it changes the dish identity.

### How anchors affect suggestions

For each template:

- The engine checks whether every anchor ingredient is available **or** has an approved substitute available.
- If any anchor is missing with no allowed substitution, the template is **hidden** (not shown at all).

Anchors should be used sparingly:

- They are for meal identity, not for listing every ingredient.
- Lime juice is rarely an anchor. Peanut butter often is (for peanut meals).

---

## 6. Substitutions

Substitutions are intentionally limited.

### Why substitutions are explicit

If we substitute “anything with the same role,” the engine becomes fuzzy and starts suggesting meals that don’t match user expectations.

Instead:

- Only substitutions in `SUBSTITUTIONS` are allowed.
- Substitutions are chosen because they preserve meal identity and user intent.

### Where substitutions apply

Substitutions can be used to:

- Satisfy **required role requirements** (template-specific).
- Satisfy **anchor ingredients** (only if explicitly allowed).
- Reduce “missing ingredients” for better usability.

The match detail records substitutions so the UI can later say things like:

- “Using lemon juice instead of lime juice.”
- “Beans work here instead of chickpeas.”

---

## 7. Suggestion pipeline (step by step)

At a high level, suggestions are generated like this:

1. **Collect available ingredients**
   - Combine:
     - pantry stock IDs (from localStorage via the stock context)
     - ingredient IDs explicitly selected in the Cook flow

2. **Evaluate each template**
   - For every template, the engine computes a `TemplateMatchDetail`:
     - which template ingredients are available directly
     - which are missing
     - which are satisfied via substitution
     - which required roles are satisfied
     - which anchors are missing

3. **Filter out invalid templates**
   - Templates are hidden if:
     - a required role is missing (and no approved substitute satisfies it), or
     - an anchor ingredient is missing (and no approved substitute satisfies it)

4. **Score and sort**
   - Remaining templates are scored and then sorted (see Ranking Logic).

5. **Group by energy level**
   - Suggestions are grouped into:
     - barely-functioning
     - low-effort
     - some-energy

---

## 8. Suggestion classification

Spoonly uses two main states for suggestions (plus a hidden state):

### MAKE NOW

Shown when:

- **All anchors are satisfied**, and
- **All required roles are satisfied**, and
- **No template ingredients are missing** (after considering substitutions)

In other words: the meal should feel genuinely doable “as written,” with substitutions already accounted for.

### ALMOST THERE

Shown when:

- **All anchors are satisfied**, and
- **All required roles are satisfied**, and
- Some ingredients are missing (typically optional finishers or other non-defining items)

This is meant to represent:

> “You can make a close version of this, but you’ll skip a topping or two.”

### DO NOT SHOW

Hidden when:

- Any **required role** is missing, or
- Any **anchor ingredient** is missing (with no approved substitute)

This prevents suggestions that would feel misleading or like a different dish entirely.

---

## 9. Ranking logic

Spoonly’s ranking is designed to feel **ingredient-led**, not template-led.

The engine prioritises:

1. Templates that use the **most user-selected ingredient IDs**
2. Then templates that use the **most pantry/in-stock ingredient IDs**
3. Then templates with **fewer missing ingredients**
4. Then a deterministic score tie-breaker
5. Finally, a consistent energy-level ordering as a last tie-breaker

Key product rule behind this:

> A top suggestion should feel like it is mainly built from what the user already has (and selected), not just something that is structurally valid.

---

## 10. Design philosophy

Spoonly’s suggestion engine is shaped by a few core principles:

- **Deterministic matching**
  - Predictable output builds trust.
  - Debugging and iteration are easier when results are reproducible.

- **Realistic pantry cooking**
  - Templates should match how people actually assemble “good enough” meals.
  - Short steps, minimal prep, low tool requirements.

- **Avoid chef-style recipes**
  - No complex techniques.
  - No long ingredient lists.
  - No assumption that the user will shop for specialty items.

- **Supportive, low-pressure suggestions**
  - “Almost there” should feel helpful, not scolding.
  - Missing items should be surfaced clearly.
  - Substitutions should be conservative and identity-preserving.

---

## Where to look in the code

- **Ingredients + pantry grouping**: `lib/domain/ingredients.ts`
- **Meal templates**: `lib/domain/meals.ts`
- **Substitution rules**: `lib/domain/substitutions.ts`
- **Suggestion matching/ranking**: `lib/domain/suggestions.ts`

