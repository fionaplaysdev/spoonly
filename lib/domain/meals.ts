import type { EnergyLevel, MealTemplate, MealArchetype } from './types'

export const ENERGY_LEVELS: EnergyLevel[] = [
  'barely-functioning',
  'low-effort',
  'some-energy',
]

export const MEAL_ARCHETYPES: MealArchetype[] = [
  'noodle-bowl',
  'rice-bowl',
  'pasta-bowl',
  'soup',
  'toast-plate',
]

export const MEAL_TEMPLATES: MealTemplate[] = [
  // 1. Peanut noodle bowl
  {
    id: 'peanut-noodle-bowl',
    name: 'Peanut noodle bowl',
    archetype: 'noodle-bowl',
    energyLevel: 'low-effort',
    minutes: 10,
    steps: 4,
    tags: ['one-bowl', 'peanut'],
    ingredientsByRole: {
      carb: ['noodle-pouches'],
      flavour: ['peanut-butter'],
      protein: ['tofu', 'chickpeas'],
      veg: ['spinach', 'broccoli'],
      finisher: ['lime-juice', 'chilli-crisp'],
    },
    roleRequirements: [
      { role: 'carb', required: true, min: 1 },
      { role: 'flavour', required: true, min: 1 },
      { role: 'protein', required: false },
      { role: 'veg', required: false },
      { role: 'finisher', required: false },
    ],
    instructions: [
      'Heat noodle pouches according to packet instructions.',
      'Warm peanut butter with a splash of water and soy sauce if available to make a loose sauce.',
      'Toss hot noodles with the peanut sauce, adding tofu or chickpeas and spinach or broccoli if you have them ready.',
      'Serve in a bowl and finish with lime juice and chilli crisp on top.',
    ],
  },

  // 2. Miso noodle broth
  {
    id: 'miso-noodle-broth',
    name: 'Miso noodle broth',
    archetype: 'soup',
    energyLevel: 'low-effort',
    minutes: 10,
    steps: 4,
    tags: ['soup', 'miso'],
    ingredientsByRole: {
      carb: ['noodle-pouches'],
      flavour: ['miso-paste'],
      protein: ['tofu'],
      veg: ['spinach'],
      finisher: ['sesame-oil', 'spring-onions'],
    },
    roleRequirements: [
      { role: 'carb', required: true, min: 1 },
      { role: 'flavour', required: true, min: 1 },
      { role: 'protein', required: false },
      { role: 'veg', required: false },
      { role: 'finisher', required: false },
    ],
    instructions: [
      'Bring water to a simmer and whisk in miso paste to make a simple broth.',
      'Add noodle pouches and cook until hot and tender.',
      'Stir in tofu cubes and spinach until warmed through.',
      'Serve in a bowl and finish with a drizzle of sesame oil and spring onions if you have them.',
    ],
  },

  // 3. Brothy garlic noodles
  {
    id: 'quick-stock-noodles',
    name: 'Brothy garlic noodles',
    archetype: 'soup',
    energyLevel: 'barely-functioning',
    minutes: 5,
    steps: 3,
    tags: ['soup', 'brothy'],
    ingredientsByRole: {
      carb: ['noodle-pouches'],
      flavour: ['stock-cubes', 'garlic-granules'],
      finisher: ['sesame-oil'],
    },
    roleRequirements: [
      { role: 'carb', required: true, min: 1 },
      { role: 'flavour', required: true, min: 1 },
      { role: 'finisher', required: false },
    ],
    instructions: [
      'Dissolve a stock cube and garlic granules in boiling water to make a quick broth.',
      'Add noodle pouches and cook directly in the broth until hot.',
      'Serve in a bowl and drizzle with sesame oil.',
    ],
  },

  // 4. Peanut rice bowl
  {
    id: 'peanut-rice-bowl',
    name: 'Peanut rice bowl',
    archetype: 'rice-bowl',
    energyLevel: 'low-effort',
    minutes: 10,
    steps: 4,
    tags: ['one-bowl', 'peanut'],
    ingredientsByRole: {
      carb: ['rice-pouches'],
      flavour: ['peanut-butter'],
      protein: ['tofu', 'chickpeas'],
      veg: ['spinach', 'broccoli'],
      finisher: ['lime-juice'],
    },
    roleRequirements: [
      { role: 'carb', required: true, min: 1 },
      { role: 'flavour', required: true, min: 1 },
      { role: 'protein', required: false },
      { role: 'veg', required: false },
      { role: 'finisher', required: false },
    ],
    instructions: [
      'Heat rice pouches according to packet instructions and add to a bowl.',
      'Loosen peanut butter with a splash of hot water to make a spoonable sauce.',
      'Top the rice with tofu or chickpeas and quick-cook veg like spinach or broccoli if you have them.',
      'Finish with a squeeze of lime juice over the bowl.',
    ],
  },

  // 5. Curry lentil rice bowl
  {
    id: 'curry-lentil-rice',
    name: 'Curry lentil rice bowl',
    archetype: 'rice-bowl',
    energyLevel: 'low-effort',
    minutes: 12,
    steps: 5,
    tags: ['one-bowl', 'curry'],
    ingredientsByRole: {
      carb: ['rice-pouches'],
      flavour: ['curry-paste'],
      protein: ['lentils'],
      veg: ['spinach'],
      finisher: ['yoghurt'],
    },
    roleRequirements: [
      { role: 'carb', required: true, min: 1 },
      { role: 'flavour', required: true, min: 1 },
      { role: 'protein', required: true, min: 1 },
      { role: 'veg', required: false },
      { role: 'finisher', required: false },
    ],
    instructions: [
      'Heat a spoon of curry paste in a pan with a splash of water to loosen.',
      'Add drained lentils and simmer until coated and hot.',
      'Stir in spinach until just wilted.',
      'Heat rice pouches and add to a bowl.',
      'Top rice with the curried lentils and a spoonful of yoghurt.',
    ],
  },

  // 6. Egg rice bowl
  {
    id: 'egg-rice-bowl',
    name: 'Egg rice bowl',
    archetype: 'rice-bowl',
    energyLevel: 'barely-functioning',
    minutes: 5,
    steps: 3,
    tags: ['one-bowl', 'egg'],
    ingredientsByRole: {
      carb: ['rice-pouches'],
      protein: ['eggs'],
      flavour: ['soy-sauce'],
      finisher: ['sesame-oil'],
    },
    roleRequirements: [
      { role: 'carb', required: true, min: 1 },
      { role: 'protein', required: true, min: 1 },
      { role: 'flavour', required: true, min: 1 },
      { role: 'finisher', required: false },
    ],
    instructions: [
      'Heat rice pouches and add to a bowl.',
      'Top with a fried, scrambled, or soft-boiled egg.',
      'Season with soy sauce and a drizzle of sesame oil.',
    ],
  },

  // 7. Tofu noodle bowl (stir-fry style)
  {
    id: 'tofu-stir-noodles',
    name: 'Tofu noodle bowl',
    archetype: 'noodle-bowl',
    energyLevel: 'some-energy',
    minutes: 18,
    steps: 5,
    tags: ['stir-fry', 'one-bowl'],
    ingredientsByRole: {
      carb: ['noodle-pouches'],
      protein: ['tofu'],
      veg: ['broccoli', 'spinach'],
      flavour: ['soy-sauce'],
      finisher: ['sesame-oil'],
    },
    roleRequirements: [
      { role: 'carb', required: true, min: 1 },
      { role: 'protein', required: true, min: 1 },
      { role: 'veg', required: true, min: 1 },
      { role: 'flavour', required: true, min: 1 },
      { role: 'finisher', required: false },
    ],
    instructions: [
      'Pan-fry tofu cubes in a little oil until golden on most sides.',
      'Add broccoli florets (or other quick-cook veg) and stir-fry until just tender.',
      'Heat noodle pouches and add to the pan.',
      'Splash in soy sauce and a little water to coat everything.',
      'Serve in bowls and finish with a drizzle of sesame oil.',
    ],
  },

  // 8. Quick cheese pasta
  {
    id: 'cheese-pasta',
    name: 'Quick cheese pasta',
    archetype: 'pasta-bowl',
    energyLevel: 'barely-functioning',
    minutes: 10,
    steps: 3,
    tags: ['comfort', 'cheesy'],
    ingredientsByRole: {
      carb: ['pasta'],
      protein: ['cheddar-cheese'],
      flavour: ['garlic-granules'],
    },
    roleRequirements: [
      { role: 'carb', required: true, min: 1 },
      { role: 'protein', required: true, min: 1 },
      { role: 'flavour', required: true, min: 1 },
    ],
    instructions: [
      'Boil pasta in salted water until tender.',
      'Drain, keeping a splash of cooking water, then stir in grated cheddar cheese and garlic granules.',
      'Add a little pasta water as needed until you have a simple cheesy sauce.',
    ],
  },

  // 9. Lemony greens pasta
  {
    id: 'lemony-greens-pasta',
    name: 'Lemony greens pasta',
    archetype: 'pasta-bowl',
    energyLevel: 'low-effort',
    minutes: 12,
    steps: 4,
    tags: ['pasta', 'veggie'],
    ingredientsByRole: {
      carb: ['pasta'],
      veg: ['spinach'],
      flavour: ['garlic-granules'],
      finisher: ['lemon-juice', 'cheddar-cheese'],
    },
    roleRequirements: [
      { role: 'carb', required: true, min: 1 },
      { role: 'flavour', required: true, min: 1 },
      { role: 'veg', required: false },
      { role: 'finisher', required: false },
    ],
    instructions: [
      'Boil pasta in salted water until almost tender.',
      'Add spinach to the pot for the last minute to wilt.',
      'Drain, then toss with garlic granules and a squeeze of lemon juice.',
      'Top with grated cheddar cheese before serving.',
    ],
  },

  // 10. Pesto pasta
  {
    id: 'pesto-pasta',
    name: 'Pesto pasta',
    archetype: 'pasta-bowl',
    energyLevel: 'barely-functioning',
    minutes: 8,
    steps: 2,
    tags: ['pasta', 'pesto'],
    ingredientsByRole: {
      carb: ['pasta'],
      flavour: ['pesto'],
      protein: ['cheddar-cheese'],
    },
    roleRequirements: [
      { role: 'carb', required: true, min: 1 },
      { role: 'flavour', required: true, min: 1 },
      { role: 'protein', required: false },
    ],
    instructions: [
      'Boil pasta in salted water until tender, then drain.',
      'Stir through pesto and finish with grated cheddar cheese.',
    ],
  },

  // 11. Beans on toast
  {
    id: 'beans-on-toast',
    name: 'Beans on toast',
    archetype: 'toast-plate',
    energyLevel: 'barely-functioning',
    minutes: 5,
    steps: 3,
    tags: ['toast', 'comfort'],
    ingredientsByRole: {
      carb: ['bread'],
      protein: ['beans'],
      flavour: ['stock-cubes'],
    },
    roleRequirements: [
      { role: 'carb', required: true, min: 1 },
      { role: 'protein', required: true, min: 1 },
      { role: 'flavour', required: false },
    ],
    instructions: [
      'Toast slices of bread.',
      'Warm beans in a pan, adding a pinch of crumbled stock cube if desired for extra flavour.',
      'Spoon beans over the toast and eat straight away.',
    ],
  },

  // 12. Egg on toast
  {
    id: 'egg-toast',
    name: 'Egg on toast',
    archetype: 'toast-plate',
    energyLevel: 'barely-functioning',
    minutes: 5,
    steps: 3,
    tags: ['toast', 'egg'],
    ingredientsByRole: {
      carb: ['bread'],
      protein: ['eggs'],
      finisher: ['cheddar-cheese'],
    },
    roleRequirements: [
      { role: 'carb', required: true, min: 1 },
      { role: 'protein', required: true, min: 1 },
      { role: 'finisher', required: false },
    ],
    instructions: [
      'Toast slices of bread.',
      'Cook an egg to your liking (fried, scrambled, or soft-boiled).',
      'Place the egg on the toast and top with grated cheddar cheese if you like.',
    ],
  },

  // 13. Halloumi pitta
  {
    id: 'halloumi-pitta',
    name: 'Halloumi pitta',
    archetype: 'toast-plate',
    energyLevel: 'low-effort',
    minutes: 12,
    steps: 4,
    tags: ['handheld', 'cheesy'],
    ingredientsByRole: {
      carb: ['pitta'],
      protein: ['halloumi'],
      veg: ['cucumber'],
      finisher: ['yoghurt'],
    },
    roleRequirements: [
      { role: 'carb', required: true, min: 1 },
      { role: 'protein', required: true, min: 1 },
      { role: 'veg', required: false },
      { role: 'finisher', required: false },
    ],
    instructions: [
      'Slice halloumi and fry or grill until golden on both sides.',
      'Warm pitta bread in a toaster or dry pan.',
      'Fill pitta with cooked halloumi and sliced cucumber.',
      'Drizzle yoghurt inside as a simple sauce.',
    ],
  },

  // 14. Loaded avocado toast
  {
    id: 'loaded-toast',
    name: 'Loaded avocado toast',
    archetype: 'toast-plate',
    energyLevel: 'low-effort',
    minutes: 10,
    steps: 4,
    tags: ['toast', 'brunch'],
    ingredientsByRole: {
      carb: ['bread'],
      veg: ['avocado'],
      protein: ['eggs'],
      finisher: ['feta'],
    },
    roleRequirements: [
      { role: 'carb', required: true, min: 1 },
      { role: 'veg', required: true, min: 1 },
      { role: 'protein', required: false },
      { role: 'finisher', required: false },
    ],
    instructions: [
      'Toast slices of bread.',
      'Cook an egg (fried or soft-boiled both work well).',
      'Mash avocado onto the toast and top with the egg.',
      'Crumble feta over the top before serving.',
    ],
  },

  // 15. Cheesy potatoes
  {
    id: 'potato-cheese-bowl',
    name: 'Cheesy potatoes',
    archetype: 'rice-bowl',
    energyLevel: 'low-effort',
    minutes: 15,
    steps: 4,
    tags: ['comfort', 'cheesy'],
    ingredientsByRole: {
      carb: ['potatoes'],
      protein: ['cheddar-cheese'],
      finisher: ['yoghurt'],
    },
    roleRequirements: [
      { role: 'carb', required: true, min: 1 },
      { role: 'protein', required: true, min: 1 },
      { role: 'finisher', required: false },
    ],
    instructions: [
      'Cube or slice potatoes and cook until tender (microwave, boil, or roast depending on energy and tools).',
      'Add hot potatoes to a bowl and sprinkle with grated cheddar cheese so it melts.',
      'Add a spoonful of yoghurt on top.',
      'Season simply with salt and pepper if you like.',
    ],
  },

  // 16. Quick lentil soup
  {
    id: 'lentil-soup',
    name: 'Quick lentil soup',
    archetype: 'soup',
    energyLevel: 'low-effort',
    minutes: 12,
    steps: 5,
    tags: ['soup', 'lentil'],
    ingredientsByRole: {
      protein: ['lentils'],
      flavour: ['stock-cubes'],
      veg: ['carrot'],
      finisher: ['lemon-juice'],
    },
    roleRequirements: [
      { role: 'protein', required: true, min: 1 },
      { role: 'flavour', required: true, min: 1 },
      { role: 'veg', required: false },
      { role: 'finisher', required: false },
    ],
    instructions: [
      'Slice or dice carrot if using.',
      'Simmer carrot in water with a stock cube until just tender.',
      'Add lentils and cook until hot and flavours have blended.',
      'Adjust seasoning with more stock cube or water as needed.',
      'Serve in a bowl with a squeeze of lemon juice.',
    ],
  },

  // 17. Ginger garlic noodles
  {
    id: 'ginger-garlic-noodles',
    name: 'Ginger garlic noodles',
    archetype: 'noodle-bowl',
    energyLevel: 'barely-functioning',
    minutes: 5,
    steps: 3,
    tags: ['one-bowl', 'brothy'],
    ingredientsByRole: {
      carb: ['noodle-pouches'],
      flavour: ['garlic-granules', 'ginger'],
      finisher: ['soy-sauce'],
    },
    roleRequirements: [
      { role: 'carb', required: true, min: 1 },
      { role: 'flavour', required: true, min: 1 },
      { role: 'finisher', required: false },
    ],
    instructions: [
      'Dissolve garlic granules and grated or minced ginger in boiling water.',
      'Add noodle pouches and cook directly in the aromatic water until hot.',
      'Serve in a bowl and finish with a splash of soy sauce.',
    ],
  },

  // 18. Chickpea rice bowl
  {
    id: 'chickpea-rice-bowl',
    name: 'Chickpea rice bowl',
    archetype: 'rice-bowl',
    energyLevel: 'low-effort',
    minutes: 12,
    steps: 4,
    tags: ['one-bowl', 'curry'],
    ingredientsByRole: {
      carb: ['rice-pouches'],
      protein: ['chickpeas'],
      veg: ['spinach'],
      flavour: ['harissa'],
      finisher: ['yoghurt'],
    },
    roleRequirements: [
      { role: 'carb', required: true, min: 1 },
      { role: 'protein', required: true, min: 1 },
      { role: 'flavour', required: true, min: 1 },
      { role: 'veg', required: false },
      { role: 'finisher', required: false },
    ],
    instructions: [
      'Heat a spoon of harissa in a pan with a splash of oil or water.',
      'Add chickpeas and cook until coated and hot.',
      'Stir in spinach until just wilted.',
      'Serve over hot rice pouches and top with a spoonful of yoghurt.',
    ],
  },
]

export function getTemplatesByEnergy(level: EnergyLevel): MealTemplate[] {
  return MEAL_TEMPLATES.filter((template) => template.energyLevel === level)
}

export function getTemplateById(id: string): MealTemplate | undefined {
  return MEAL_TEMPLATES.find((template) => template.id === id)
}

