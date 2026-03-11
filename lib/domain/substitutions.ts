// Simple, deterministic substitution rules for obvious swaps.
// These are used to generate messaging like:
// "Missing lime juice – try lemon juice instead".

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

