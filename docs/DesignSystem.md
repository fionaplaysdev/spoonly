# Spoonly Design System (v1 snapshot)

This document captures the current UI conventions so future changes stay consistent with the existing look and feel. It describes what the UI *already* does; it is not a redesign.

---

## 1. Colour palette and tokens

Spoonly uses a custom pastel palette wired through CSS variables and Tailwind-style tokens (see `app/globals.css`).

### Core colours

- **Background / surface**
  - `bg-background`: main page background (lilac-tinted).
  - `bg-card`: card surfaces (off‑white / cream).
  - `bg-muted`: lighter neutral used for subtle surfaces.

- **Text**
  - `text-foreground`: primary text.
  - `text-muted-foreground`: secondary/explanatory text.

- **Borders**
  - `border-border`: default border colour.
  - Many key structural elements use **thicker borders**:
    - `border-2` and `border-3` with `border-foreground` on cards and dividers.

- **Brand / energy colours**
  - `bg-energy-barely`: colour strip for “Barely Functioning”.
  - `bg-energy-low`: strip for “Low Effort”.
  - `bg-energy-some`: strip for “Some Energy”.
  - `--highlight-pink`: used for active nav/tab states.
  - `--highlight-yellow`: used for hovers and emphasis (e.g. ingredient chips).

### Status/tag colours

- **Make now**
  - Background: `bg-energy-some`.
  - Text: `text-foreground`.
  - Border: `border-foreground`.

- **Almost there**
  - Background: `background-color: var(--highlight-yellow)`.
  - Text: `text-foreground`.
  - Border: `border-border`.

---

## 2. Typography usage

Fonts are configured via `next/font` and mapped to CSS variables:

- **Display**: `font-display` (Barlow Condensed)
  - Used for:
    - App title (“Spoonly” header).
    - Big, high-impact headings (e.g. “What’s in the cupboard?”, “Quick cook inspo”).
  - Characteristics:
    - Uppercase, heavy weights (`font-black`), tight tracking (`tracking-tight`).

- **Serif**: `font-serif` (DM Serif Display)
  - Used for:
    - Brand wordmark (“Spoonly” in the header).
    - Occasional subheadings where a softer feel is desired.

- **Sans**: `font-sans` (DM Sans)
  - Used for:
    - Body text.
    - Buttons, labels, chips.
    - Small UI text inside cards.

General rules:

- Headlines: uppercase, bold, tight leading.
- Body: sentence case, `text-sm` or `text-base`.
- Secondary text: `text-sm text-muted-foreground`.

---

## 3. Card styling rules

Cards are the primary container for meals and some content blocks.

- **Base**
  - Background: `bg-card`.
  - Border: `border-3 border-foreground`.
  - Overflow: `overflow-hidden` to keep edges clean.
  - Clickable: whole card is `cursor-pointer` for meals (expand/collapse).

- **Structure**
  - Header row:
    - Left strip: fixed-width coloured column for energy indicator.
    - Right: vertical stack of title + time + optional status pill.
  - Expanded area:
    - Top: ingredients block (with small heading).
    - Optional summaries (missing, substitutions).
    - Bottom: instructions list.
  - Divider between header and content: `border-t-3 border-foreground`.

The same pattern (strong border, cream background, tight padding) should be followed for any new significant content blocks.

---

## 4. Pill / tag styling rules

Pills/tags are used for section labels and suggestion confidence.

- **Energy level pill (section label)**
  - Container: `<div>` with
    - `inline-block bg-primary text-primary-foreground`
    - `px-4 py-2 text-xs font-bold uppercase tracking-wider`.

- **Status tags (“Make now” / “Almost there”) on meal cards**
  - Small, inline pills under the time:
    - `inline-flex items-center px-2 py-0.5 rounded-full`
    - `text-[10px] font-bold uppercase tracking-wider`
    - Borders:
      - Always visible (`border border-...`) for definition.
    - Background:
      - Make now: `bg-energy-some`.
      - Almost there: `background-color: var(--highlight-yellow)`.

When adding new pills, prefer:

- Uppercase, `text-[10px]`–`text-xs`.
- Visible border for contrast against pastel backgrounds.
- `rounded-full` for tags that indicate state rather than structure.

---

## 5. Ingredient status indicators

Inside expanded meal cards, each ingredient line indicates availability:

- **Icons**
  - Available (direct): `✓`
    - Circle: filled with `bg-foreground`, border `border-foreground`, text `text-card`.
  - Available via substitution: `↺`
    - Circle: `border-foreground`, `text-foreground`, no fill.
  - Missing: `○`
    - Circle: `border-muted-foreground`, `text-muted-foreground`.

- **Icon container**
  - `inline-flex items-center justify-center w-4 h-4 rounded-full border text-[10px]`.

- **Text**
  - Primary: ingredient or group label (`text-sm text-foreground`).
  - Substitution hint (when a single ingredient line has a substitute):
    - `text-[11px] text-muted-foreground`.
    - Pattern: “using X” or “using X instead of Y” in summaries.

Grouped alternatives (e.g. “Rice Pouches or Pitta”) are presented as one line; the icon reflects whether at least one option is available.

---

## 6. Spacing and border principles

### Spacing

- **Vertical rhythm**
  - Sections: `space-y-6` or `space-y-8` between major blocks.
  - Inside cards: `p-4` for main content, `space-y-4` for stacked subsections.
  - Ingredient lists: `space-y-1`.

- **Horizontals**
  - Standard side padding on page: `px-4` with `max-w-lg mx-auto` to keep a phone-friendly column.

### Borders

- **Structure**
  - Strong borders define major regions:
    - Top header divider: `border-t-3 border-foreground`.
    - Card containers: `border-3 border-foreground`.
  - Lighter borders for controls/lists:
    - Buttons, inputs, chips: `border-2 border-foreground` or `border-border`.

- **Hover and state**
  - Many interactive elements use border + background change on hover:
    - `hover:[background-color:var(--highlight-yellow)]`.
  - Active nav/tab states:
    - Background `var(--highlight-pink)` with unchanged border.

When adding new elements:

- Use **thick borders (2–3px)** to outline primary structural components.
- Use `space-y-*` and consistent `p-4`–style padding to maintain breathing room without feeling sparse.

