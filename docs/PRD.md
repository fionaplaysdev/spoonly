# Spoonly – Product Requirements (v1)

## Product Vision

Spoonly helps people decide what to cook based on the energy they have and the ingredients they already own.

Most cooking apps assume users have motivation and time. Spoonly is designed for moments when users feel tired, overwhelmed, or low on executive function.

The goal is to help users find a quick, achievable meal using pantry ingredients with minimal cognitive load.

Spoonly is not a traditional recipe app. It is a decision-support tool for low-energy cooking.

---

## Primary User & Problem

### Primary User

Primary users include people who experience low energy or executive function around cooking:

- neurodivergent users
- people with chronic fatigue or illness
- busy professionals
- students cooking from pantry staples

The product should feel supportive, forgiving, and low pressure.

### Core Moment

The key moment Spoonly optimizes for:

“It’s late, I’m tired, and I need something to eat quickly using what I already have.”

Typical scenario:

- evening cooking moment (7–10pm)
- user has ingredients but no plan
- decision paralysis is the main barrier

Spoonly answers the question:

“What can I make right now?”

### Expected Usage

Usage patterns may include:

- several times per week
- occasionally daily
- sometimes in “low energy crisis” moments

The experience must be fast and frictionless.

---

## Energy-Level Model

Spoonly categorizes meals by the energy required to cook them.

Energy levels represent mental and physical effort rather than cooking skill.

### Barely Functioning

User has extremely low energy.

Constraints:

- ≤ 5 minutes effort
- ≤ 3 steps
- ≤ 1 pan or bowl
- minimal prep
- no chopping
- ideally uses pre-cooked ingredients

Examples:

- instant noodles with miso
- egg on toast
- peanut noodles
- quick broth using stock cube

### Low Effort

User has some capacity but still wants simplicity.

Constraints:

- ≤ 10–12 minutes
- ≤ 5 steps
- ≤ 1–2 pans
- minimal prep
- simple chopping allowed

Examples:

- pasta with garlic and greens
- rice bowl with egg
- chickpea lemon bowl

### Some Energy

User is willing to cook but still wants something quick.

Constraints:

- ≤ 20 minutes
- ≤ 6–7 steps
- up to 2 pans
- moderate prep allowed

Examples:

- stir-fry
- noodle bowls
- quick curry

---

## Ingredient & Pantry Model

Spoonly uses a structured pantry model.

The goal is flexible meal generation rather than strict inventory tracking.

### Pantry Philosophy

The pantry represents ingredients the user typically has available, not a precise real-time inventory.

The mental model should feel like:

“Things I usually have in the cupboard or freezer.”

In v1 pantry data is stored locally in the browser.

No accounts are required.

### Ingredient Structure

Each ingredient contains:

- id
- name
- section
- priority
- roles

Example conceptually:

Ingredient
id: "miso"
name: "Miso paste"
section: flavour_engine
priority: core
roles: flavour

### Ingredient Sections

Ingredients are grouped into pantry sections.

Sections used in v1:

- flavour engines
- fast proteins
- fast carbs
- frozen vegetables
- finishers

Examples:

Flavour engines
- miso
- soy sauce
- peanut butter
- tahini
- curry paste
- stock cubes

Fast proteins
- eggs
- chickpeas
- lentils
- tofu

Fast carbs
- rice
- noodles
- pasta
- bread
- pitta

Frozen vegetables
- peas
- spinach
- mixed vegetables

Finishers
- chilli oil
- spring onion
- lime
- cheese

### Ingredient Tags (Future)

Future attributes may include:

- vegan
- gluten free
- requires fridge
- freezer item

These are not required for v1.

---

## Meal Template Model

Spoonly uses meal templates rather than fixed recipes.

Templates define meal structures that can be populated by available ingredients.

Example meal archetypes:

- noodle bowl
- rice bowl
- pasta bowl
- soup
- toast plate

### Meal Template Structure

Each meal template includes:

- id
- name
- archetype
- energyLevel
- minutes
- ingredientsByRole
- steps
- tags

Example concept:

Meal Template
id: peanut-noodles
name: Satay-style noodle bowl
archetype: noodle_bowl
energyLevel: low_effort
minutes: 10

ingredientsByRole
carb: noodles
flavour: peanut butter, soy
protein: egg
veg: peas
finisher: lime, chilli oil

Templates should remain flexible and allow substitutions.

---

## Suggestion Engine

Spoonly generates suggestions using deterministic logic rather than AI.

Inputs:

- selected ingredients
- pantry ingredients
- meal templates

Process:

1. Identify ingredient roles available
2. Match templates whose required roles are satisfied
3. Score templates based on ingredient matches
4. Group suggestions by energy level

### Suggestion Ranking

Suggestions are ranked by:

1. number of matching ingredients
2. energy level
3. minimal missing ingredients

Acceptable suggestion example:

3 ingredients matched, 1 optional ingredient missing.

However suggestions must not be missing core ingredient roles.

### Suggestion Philosophy

Spoonly should prioritise fewer, higher-confidence suggestions rather than many vague ones.

Typical output:

3–6 suggestions per energy level.

---

## Persistence

In v1 pantry state is stored using browser localStorage.

No:

- user accounts
- cloud syncing
- multiple profiles

Future versions may add syncing.

---

## Performance & Constraints

The app should feel instant.

Requirements:

- suggestions generated locally
- no API calls required
- works on low-end devices
- minimal bundle size

Offline capability is desirable but not required.

---

## Design & Tone

Brand attributes:

- supportive
- playful
- validating
- non-judgemental

Tone should acknowledge low energy states without being negative.

Examples:

- Barely functioning
- Low effort
- Some energy

Language should feel human and encouraging.

---

## Non-Goals for v1

Spoonly v1 intentionally avoids:

- full recipe databases
- nutritional tracking
- calorie counting
- complex shopping lists
- meal planning calendars
- grocery delivery integrations

The focus is simple meal decisions.

---

## Near-Term Roadmap

Potential features after v1:

- save favourite meals
- pantry restock suggestions
- AI-assisted recipe variation
- meal customisation
- shareable meal links

---

## Success Metrics

Key success behaviour:

User selects ingredients → opens a suggestion → cooks a meal.

Signals to monitor:

- repeat usage
- time to first suggestion
- suggestion click rate
- pantry engagement