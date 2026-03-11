// Simple, deterministic substitution rules for obvious swaps.
// These are used to generate messaging like:
// "Missing lime juice – try lemon juice instead".

// Legacy map used by the existing suggestion engine.
export const SUBSTITUTIONS: Record<string, string[]> = {
  // Citrus
  'lime-juice': ['lemon-juice'],
  'lemon-juice': ['lime-juice'],

  // Pulses
  chickpeas: ['beans', 'lentils'],
  beans: ['chickpeas', 'lentils'],
  lentils: ['chickpeas', 'beans'],

  // Greens / veg
  spinach: ['peas', 'broccoli'],
  broccoli: ['spinach', 'peas'],

  // Noodles
  'noodle-pouches': ['instant-ramen'],

  // Garnish / herbs
  'spring-onions': ['fresh-herbs'],
}

// New, richer substitution map for future use.
export const INGREDIENT_SUBSTITUTIONS: Record<string, string[]> = {
  // Flavour engines
  'miso-paste': ['gochujang', 'soy-sauce'],
  'tomato-paste': ['harissa', 'pesto'],
  'chilli-crisp': ['hot-sauce', 'gochujang'],
  tahini: ['peanut-butter'],

  // Proteins
  chickpeas: ['lentils', 'butter-beans'],
  lentils: ['chickpeas'],
  beans: ['butter-beans'],
  tofu: ['halloumi'],

  // Carbs
  bread: ['pitta', 'tortillas'],
  pitta: ['bread', 'tortillas'],
  'rice-pouches': ['noodle-pouches', 'instant-ramen'],
  'noodle-pouches': ['rice-pouches'],

  // Veg
  spinach: ['peas', 'green-beans', 'broccoli'],
  kimchi: ['cucumber'],

  // Finishers
  feta: ['cheddar-cheese'],
  yoghurt: ['feta'],
  'lemon-juice': ['lime-juice'],
  'lime-juice': ['lemon-juice'],
  'sesame-oil': ['olive-oil'],
  'olive-oil': ['sesame-oil'],
}

/** All allowed substitutes for an ingredient (legacy + richer map, deduplicated). */
export function getSubstitutions(ingredientId: string): string[] {
  const legacy = SUBSTITUTIONS[ingredientId] ?? []
  const rich = INGREDIENT_SUBSTITUTIONS[ingredientId] ?? []
  return Array.from(new Set([...legacy, ...rich]))
}


