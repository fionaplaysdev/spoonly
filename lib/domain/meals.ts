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
    anchorIngredientIds: ['noodle-pouches', 'peanut-butter'],
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
    anchorIngredientIds: ['noodle-pouches', 'miso-paste'],
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
    anchorIngredientIds: ['noodle-pouches', 'stock-cubes'],
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
    anchorIngredientIds: ['rice-pouches', 'peanut-butter'],
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
    anchorIngredientIds: ['rice-pouches', 'curry-paste', 'lentils'],
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
    anchorIngredientIds: ['rice-pouches', 'eggs'],
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

  // 7. Peanut sesame noodles
  {
    id: 'peanut-sesame-noodles',
    name: 'Peanut sesame noodles',
    archetype: 'noodle-bowl',
    energyLevel: 'some-energy',
    minutes: 12,
    steps: 4,
    tags: ['one-bowl', 'peanut'],
    ingredientsByRole: {
      carb: ['noodle-pouches'],
      protein: ['tofu'],
      veg: ['cucumber', 'spinach'],
      flavour: ['peanut-butter', 'soy-sauce'],
      finisher: ['sesame-oil', 'crushed-peanuts'],
    },
    anchorIngredientIds: ['noodle-pouches', 'peanut-butter'],
    roleRequirements: [
      { role: 'carb', required: true, min: 1 },
      { role: 'protein', required: true, min: 1 },
      { role: 'veg', required: true, min: 1 },
      { role: 'flavour', required: true, min: 1 },
      { role: 'finisher', required: false },
    ],
    instructions: [
      'Cook or heat the noodle pouches.',
      'Mix peanut butter, soy sauce and a splash of hot water into a quick sauce.',
      'Toss noodles with the sauce, tofu and veg.',
      'Finish with sesame oil and crushed peanuts.',
    ],
  },

  // 8. Miso tofu noodle broth
  {
    id: 'miso-tofu-noodle-broth',
    name: 'Miso tofu noodle broth',
    archetype: 'soup',
    energyLevel: 'some-energy',
    minutes: 12,
    steps: 4,
    tags: ['soup', 'miso', 'one-bowl'],
    ingredientsByRole: {
      carb: ['noodle-pouches'],
      protein: ['tofu'],
      veg: ['spinach'],
      flavour: ['miso-paste'],
      finisher: ['sesame-oil', 'spring-onions'],
    },
    anchorIngredientIds: ['noodle-pouches', 'miso-paste'],
    roleRequirements: [
      { role: 'carb', required: true, min: 1 },
      { role: 'protein', required: true, min: 1 },
      { role: 'veg', required: true, min: 1 },
      { role: 'flavour', required: true, min: 1 },
      { role: 'finisher', required: false },
    ],
    instructions: [
      'Heat water with miso paste to make a quick broth.',
      'Add noodles, tofu and spinach.',
      'Simmer briefly until hot.',
      'Finish with sesame oil and spring onions.',
    ],
  },

  // 9. Kimchi fried rice
  {
    id: 'kimchi-fried-rice',
    name: 'Kimchi fried rice',
    archetype: 'rice-bowl',
    energyLevel: 'some-energy',
    minutes: 15,
    steps: 5,
    tags: ['stir-fry', 'kimchi'],
    ingredientsByRole: {
      carb: ['rice-pouches'],
      protein: ['eggs'],
      veg: ['kimchi'],
      flavour: ['soy-sauce'],
      finisher: ['sesame-oil', 'spring-onions'],
    },
    anchorIngredientIds: ['rice-pouches', 'kimchi'],
    roleRequirements: [
      { role: 'carb', required: true, min: 1 },
      { role: 'protein', required: true, min: 1 },
      { role: 'veg', required: true, min: 1 },
      { role: 'flavour', required: true, min: 1 },
      { role: 'finisher', required: false },
    ],
    instructions: [
      'Fry chopped kimchi in a pan.',
      'Add rice pouches and stir-fry until hot.',
      'Push rice to one side and scramble the egg.',
      'Combine everything with soy sauce.',
      'Finish with sesame oil and spring onions.',
    ],
  },

  // 10. Tomato butter bean pan
  {
    id: 'tomato-butter-bean-pan',
    name: 'Tomato butter bean pan',
    archetype: 'toast-plate',
    energyLevel: 'some-energy',
    minutes: 15,
    steps: 5,
    tags: ['one-pan', 'tomato'],
    ingredientsByRole: {
      carb: ['bread', 'pitta'],
      protein: ['butter-beans'],
      veg: ['spinach'],
      flavour: ['tomato-paste', 'garlic-granules'],
      finisher: ['olive-oil', 'black-pepper'],
    },
    anchorIngredientIds: ['butter-beans', 'tomato-paste'],
    roleRequirements: [
      { role: 'carb', required: true, min: 1 },
      { role: 'protein', required: true, min: 1 },
      { role: 'veg', required: true, min: 1 },
      { role: 'flavour', required: true, min: 1 },
      { role: 'finisher', required: false },
    ],
    instructions: [
      'Warm olive oil in a pan.',
      'Add garlic and tomato paste and cook briefly.',
      'Stir in butter beans and spinach.',
      'Simmer until thick and saucy.',
      'Serve with bread or pitta.',
    ],
  },

  // 11. Lemon feta chickpea bowl
  {
    id: 'lemon-feta-chickpea-bowl',
    name: 'Lemon feta chickpea bowl',
    archetype: 'rice-bowl',
    energyLevel: 'some-energy',
    minutes: 12,
    steps: 4,
    tags: ['one-bowl', 'lemon', 'feta'],
    ingredientsByRole: {
      carb: ['rice-pouches'],
      protein: ['chickpeas'],
      veg: ['spinach'],
      flavour: ['lemon-juice'],
      finisher: ['feta', 'olive-oil'],
    },
    anchorIngredientIds: ['chickpeas', 'lemon-juice', 'feta'],
    roleRequirements: [
      { role: 'carb', required: true, min: 1 },
      { role: 'protein', required: true, min: 1 },
      { role: 'veg', required: true, min: 1 },
      { role: 'flavour', required: true, min: 1 },
      { role: 'finisher', required: false },
    ],
    instructions: [
      'Warm chickpeas in a pan with olive oil.',
      'Add spinach and cook until wilted.',
      'Serve over heated rice.',
      'Finish with lemon juice and crumbled feta.',
    ],
  },

  // 12. Chilli crisp egg noodles
  {
    id: 'chilli-crisp-egg-noodles',
    name: 'Chilli crisp egg noodles',
    archetype: 'noodle-bowl',
    energyLevel: 'some-energy',
    minutes: 12,
    steps: 5,
    tags: ['one-bowl', 'chilli-crisp'],
    ingredientsByRole: {
      carb: ['noodle-pouches'],
      protein: ['eggs'],
      veg: ['spinach'],
      flavour: ['chilli-crisp', 'soy-sauce'],
      finisher: ['sesame-oil'],
    },
    anchorIngredientIds: ['noodle-pouches', 'chilli-crisp'],
    roleRequirements: [
      { role: 'carb', required: true, min: 1 },
      { role: 'protein', required: true, min: 1 },
      { role: 'veg', required: true, min: 1 },
      { role: 'flavour', required: true, min: 1 },
      { role: 'finisher', required: false },
    ],
    instructions: [
      'Heat noodles in a pan.',
      'Add chilli crisp and soy sauce.',
      'Push noodles aside and scramble the egg.',
      'Mix everything together with spinach.',
      'Finish with sesame oil.',
    ],
  },

  // 13. Curry tofu rice bowl
  {
    id: 'curry-tofu-rice-bowl',
    name: 'Curry tofu rice bowl',
    archetype: 'rice-bowl',
    energyLevel: 'some-energy',
    minutes: 15,
    steps: 5,
    tags: ['one-bowl', 'curry'],
    ingredientsByRole: {
      carb: ['rice-pouches'],
      protein: ['tofu'],
      veg: ['spinach', 'peas'],
      flavour: ['curry-paste'],
      finisher: ['yoghurt', 'lime-juice'],
    },
    anchorIngredientIds: ['rice-pouches', 'curry-paste'],
    roleRequirements: [
      { role: 'carb', required: true, min: 1 },
      { role: 'protein', required: true, min: 1 },
      { role: 'veg', required: true, min: 1 },
      { role: 'flavour', required: true, min: 1 },
      { role: 'finisher', required: false },
    ],
    instructions: [
      'Fry curry paste briefly in a pan.',
      'Add tofu and cook until hot.',
      'Stir in veg and a splash of water to loosen.',
      'Serve over rice.',
      'Finish with yoghurt and lime juice.',
    ],
  },

  // 14. Halloumi lemon wrap
  {
    id: 'halloumi-lemon-wrap',
    name: 'Halloumi lemon wrap',
    archetype: 'toast-plate',
    energyLevel: 'some-energy',
    minutes: 12,
    steps: 4,
    tags: ['wrap', 'halloumi'],
    ingredientsByRole: {
      carb: ['tortillas'],
      protein: ['halloumi'],
      veg: ['cucumber'],
      flavour: ['lemon-juice'],
      finisher: ['yoghurt', 'olive-oil'],
    },
    anchorIngredientIds: ['halloumi', 'tortillas', 'lemon-juice'],
    roleRequirements: [
      { role: 'carb', required: true, min: 1 },
      { role: 'protein', required: true, min: 1 },
      { role: 'veg', required: true, min: 1 },
      { role: 'flavour', required: true, min: 1 },
      { role: 'finisher', required: false },
    ],
    instructions: [
      'Pan-fry slices of halloumi until golden.',
      'Warm tortillas.',
      'Fill with halloumi, cucumber and yoghurt.',
      'Finish with lemon juice and olive oil.',
    ],
  },

  // 15. Quick cheese pasta
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
    anchorIngredientIds: ['pasta', 'cheddar-cheese'],
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
    anchorIngredientIds: ['pasta'],
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
    anchorIngredientIds: ['pasta', 'pesto'],
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
    anchorIngredientIds: ['bread', 'beans'],
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
    anchorIngredientIds: ['bread', 'eggs'],
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
    anchorIngredientIds: ['pitta', 'halloumi'],
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
    anchorIngredientIds: ['bread', 'avocado'],
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
    anchorIngredientIds: ['potatoes', 'cheddar-cheese'],
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
    anchorIngredientIds: ['lentils', 'stock-cubes'],
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
    anchorIngredientIds: ['noodle-pouches', 'garlic-granules', 'ginger'],
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
    anchorIngredientIds: ['rice-pouches', 'chickpeas', 'harissa'],
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

  // 19. Avocado egg bowl
  {
    id: 'avocado-egg-bowl',
    name: 'Avocado egg bowl',
    archetype: 'rice-bowl',
    energyLevel: 'low-effort',
    minutes: 12,
    steps: 4,
    tags: ['one-bowl', 'avocado'],
    ingredientsByRole: {
      carb: ['rice-pouches', 'potatoes'],
      protein: ['eggs'],
      veg: ['avocado'],
      finisher: ['feta', 'sesame-oil', 'spring-onions'],
    },
    anchorIngredientIds: ['avocado', 'eggs'],
    roleRequirements: [
      { role: 'carb', required: true, min: 1 },
      { role: 'protein', required: true, min: 1 },
      { role: 'veg', required: true, min: 1 },
      { role: 'finisher', required: false },
    ],
    instructions: [
      'Cook rice pouches or small potato cubes until hot and tender.',
      'Cook an egg to your liking.',
      'Slice or cube avocado.',
      'Assemble in a bowl with the carb base, egg, and avocado, then top with feta, a drizzle of sesame oil, and spring onions if you have them.',
    ],
  },

  // 20. Avocado feta bowl
  {
    id: 'avocado-feta-bowl',
    name: 'Avocado feta bowl',
    archetype: 'rice-bowl',
    energyLevel: 'low-effort',
    minutes: 12,
    steps: 4,
    tags: ['one-bowl', 'avocado'],
    ingredientsByRole: {
      carb: ['rice-pouches', 'pitta'],
      protein: ['chickpeas', 'beans'],
      veg: ['avocado'],
      finisher: ['feta', 'lemon-juice'],
    },
    anchorIngredientIds: ['avocado'],
    roleRequirements: [
      { role: 'carb', required: true, min: 1 },
      { role: 'protein', required: true, min: 1 },
      { role: 'veg', required: true, min: 1 },
      { role: 'finisher', required: false },
    ],
    instructions: [
      'Heat rice pouches or warm pitta as your base.',
      'Warm chickpeas or beans in a pan until hot.',
      'Slice or cube avocado.',
      'Serve the warm pulses over the base with avocado, crumble feta on top, and finish with a squeeze of lemon juice.',
    ],
  },

  // 21. Avocado pitta
  {
    id: 'avocado-pitta',
    name: 'Avocado pitta',
    archetype: 'toast-plate',
    energyLevel: 'barely-functioning',
    minutes: 8,
    steps: 3,
    tags: ['toast', 'avocado'],
    ingredientsByRole: {
      carb: ['pitta'],
      veg: ['avocado'],
      protein: ['eggs'],
      finisher: ['feta', 'lemon-juice'],
    },
    anchorIngredientIds: ['avocado', 'pitta'],
    roleRequirements: [
      { role: 'carb', required: true, min: 1 },
      { role: 'veg', required: true, min: 1 },
      { role: 'protein', required: false },
      { role: 'finisher', required: false },
    ],
    instructions: [
      'Warm pitta in a toaster or dry pan.',
      'Mash avocado onto the warm pitta.',
      'Top with a cooked egg if you like, crumble feta over, and finish with a little lemon juice.',
    ],
  },

  // 22. Halloumi pitta with greens
  {
    id: 'halloumi-pitta-greens',
    name: 'Halloumi pitta with greens',
    archetype: 'toast-plate',
    energyLevel: 'low-effort',
    minutes: 12,
    steps: 4,
    tags: ['handheld', 'cheesy'],
    ingredientsByRole: {
      carb: ['pitta'],
      protein: ['halloumi'],
      veg: ['spinach', 'avocado'],
      finisher: ['lemon-juice'],
    },
    anchorIngredientIds: ['halloumi', 'pitta'],
    roleRequirements: [
      { role: 'carb', required: true, min: 1 },
      { role: 'protein', required: true, min: 1 },
      { role: 'veg', required: false },
      { role: 'finisher', required: false },
    ],
    instructions: [
      'Slice halloumi and fry or grill until golden on both sides.',
      'Warm pitta bread.',
      'Fill pitta with halloumi and a handful of spinach or sliced avocado.',
      'Finish with a squeeze of lemon juice.',
    ],
  },

  // 23. Chickpea pitta
  {
    id: 'chickpea-pitta',
    name: 'Chickpea pitta',
    archetype: 'toast-plate',
    energyLevel: 'barely-functioning',
    minutes: 10,
    steps: 3,
    tags: ['toast', 'chickpea'],
    ingredientsByRole: {
      carb: ['pitta'],
      protein: ['chickpeas'],
      veg: ['spinach'],
      flavour: ['tahini', 'harissa'],
    },
    anchorIngredientIds: ['chickpeas', 'pitta'],
    roleRequirements: [
      { role: 'carb', required: true, min: 1 },
      { role: 'protein', required: true, min: 1 },
      { role: 'flavour', required: true, min: 1 },
      { role: 'veg', required: false },
    ],
    instructions: [
      'Warm chickpeas in a pan with a spoon of harissa until coated.',
      'Warm pitta bread.',
      'Spread tahini inside the pitta, stuff with the warm chickpeas and a little spinach if you have it.',
    ],
  },

  // 24. Cheesy potato bowl (variant with extras)
  {
    id: 'cheesy-potato-bowl',
    name: 'Cheesy potato bowl',
    archetype: 'rice-bowl',
    energyLevel: 'low-effort',
    minutes: 15,
    steps: 4,
    tags: ['comfort', 'cheesy'],
    ingredientsByRole: {
      carb: ['potatoes'],
      protein: ['eggs', 'beans'],
      veg: ['broccoli', 'peas'],
      finisher: ['cheddar-cheese'],
    },
    anchorIngredientIds: ['potatoes', 'cheddar-cheese'],
    roleRequirements: [
      { role: 'carb', required: true, min: 1 },
      { role: 'finisher', required: true, min: 1 },
      { role: 'protein', required: false },
      { role: 'veg', required: false },
    ],
    instructions: [
      'Cook diced potatoes until tender (boil, microwave, or roast).',
      'Add any quick veg like peas or small broccoli florets for the last few minutes.',
      'Tip into a bowl and top with grated cheddar so it melts.',
      'Add a fried egg or some beans if you want extra protein.',
    ],
  },

  // 25. Yoghurt chickpea bowl
  {
    id: 'yoghurt-chickpea-bowl',
    name: 'Yoghurt chickpea bowl',
    archetype: 'rice-bowl',
    energyLevel: 'low-effort',
    minutes: 12,
    steps: 4,
    tags: ['one-bowl', 'chickpea'],
    ingredientsByRole: {
      carb: ['rice-pouches', 'pitta'],
      protein: ['chickpeas'],
      veg: ['spinach'],
      flavour: ['harissa'],
      finisher: ['yoghourt', 'lemon-juice'],
    },
    anchorIngredientIds: ['chickpeas', 'yoghurt'],
    roleRequirements: [
      { role: 'carb', required: true, min: 1 },
      { role: 'protein', required: true, min: 1 },
      { role: 'flavour', required: true, min: 1 },
      { role: 'finisher', required: true, min: 1 },
      { role: 'veg', required: false },
    ],
    instructions: [
      'Heat a spoon of harissa in a pan with a splash of oil or water.',
      'Add chickpeas and cook until coated and hot, then stir in spinach to wilt.',
      'Serve over hot rice pouches or with warm pitta.',
      'Top with a spoonful of yoghurt and a squeeze of lemon juice.',
    ],
  },

  // 26. Ginger stock noodles
  {
    id: 'ginger-stock-noodles',
    name: 'Ginger stock noodles',
    archetype: 'soup',
    energyLevel: 'barely-functioning',
    minutes: 8,
    steps: 3,
    tags: ['soup', 'brothy'],
    ingredientsByRole: {
      carb: ['noodle-pouches'],
      flavour: ['stock-cubes', 'ginger'],
      protein: ['tofu'],
      veg: ['spinach', 'peas'],
      finisher: ['sesame-oil'],
    },
    anchorIngredientIds: ['stock-cubes', 'ginger'],
    roleRequirements: [
      { role: 'carb', required: true, min: 1 },
      { role: 'flavour', required: true, min: 1 },
      { role: 'protein', required: false },
      { role: 'veg', required: false },
      { role: 'finisher', required: false },
    ],
    instructions: [
      'Dissolve a stock cube and grated or minced ginger in boiling water to make a quick broth.',
      'Add noodle pouches, tofu, and any quick veg like spinach or peas and cook until hot.',
      'Serve in a bowl and finish with a drizzle of sesame oil.',
    ],
  },

  // 27. Garlic sesame noodles
  {
    id: 'garlic-sesame-noodles',
    name: 'Garlic sesame noodles',
    archetype: 'noodle-bowl',
    energyLevel: 'barely-functioning',
    minutes: 8,
    steps: 3,
    tags: ['one-bowl'],
    ingredientsByRole: {
      carb: ['noodle-pouches'],
      flavour: ['garlic-granules'],
      protein: ['tofu'],
      veg: ['broccoli', 'spinach'],
      finisher: ['sesame-oil'],
    },
    anchorIngredientIds: ['garlic-granules', 'sesame-oil'],
    roleRequirements: [
      { role: 'carb', required: true, min: 1 },
      { role: 'flavour', required: true, min: 1 },
      { role: 'protein', required: false },
      { role: 'veg', required: false },
      { role: 'finisher', required: false },
    ],
    instructions: [
      'Cook noodle pouches according to the packet.',
      'Toss hot noodles with a little oil, garlic granules, and sesame oil.',
      'Add tofu and quick veg like small broccoli florets or spinach if you have them.',
    ],
  },

  // 28. Warm lentil bowl
  {
    id: 'warm-lentil-bowl',
    name: 'Warm lentil bowl',
    archetype: 'rice-bowl',
    energyLevel: 'low-effort',
    minutes: 15,
    steps: 4,
    tags: ['one-bowl', 'lentil'],
    ingredientsByRole: {
      carb: ['rice-pouches', 'potatoes'],
      protein: ['lentils'],
      veg: ['spinach', 'broccoli'],
      flavour: ['curry-paste'],
      finisher: ['yoghurt'],
    },
    anchorIngredientIds: ['lentils'],
    roleRequirements: [
      { role: 'carb', required: true, min: 1 },
      { role: 'protein', required: true, min: 1 },
      { role: 'flavour', required: true, min: 1 },
      { role: 'finisher', required: false },
      { role: 'veg', required: false },
    ],
    instructions: [
      'Heat a spoon of curry paste in a pan with a splash of water.',
      'Add lentils and cook until hot, then stir in spinach or small broccoli florets.',
      'Serve over hot rice pouches or cooked potatoes.',
      'Top with a spoonful of yoghurt.',
    ],
  },

  // 29. Tomato chickpea rice bowl
  {
    id: 'tomato-chickpea-rice-bowl',
    name: 'Tomato chickpea rice bowl',
    archetype: 'rice-bowl',
    energyLevel: 'low-effort',
    minutes: 15,
    steps: 4,
    tags: ['one-bowl', 'tomato'],
    ingredientsByRole: {
      carb: ['rice-pouches'],
      protein: ['chickpeas'],
      veg: ['spinach', 'cherry-tomatoes'],
      flavour: ['tomato-paste', 'garlic-granules'],
      finisher: ['olive-oil', 'black-pepper'],
    },
    anchorIngredientIds: ['rice-pouches', 'tomato-paste', 'chickpeas'],
    roleRequirements: [
      { role: 'carb', required: true, min: 1 },
      { role: 'protein', required: true, min: 1 },
      { role: 'flavour', required: true, min: 1 },
      { role: 'veg', required: false },
      { role: 'finisher', required: false },
    ],
    instructions: [
      'Heat rice pouches according to the packet and tip into a bowl.',
      'In a pan, warm chickpeas with tomato paste and garlic until coated and hot.',
      'Stir in spinach and halved cherry tomatoes until just wilted and glossy.',
      'Serve the tomato chickpeas over the rice and finish with olive oil and black pepper.',
    ],
  },

  // 30. Butter bean tomato toast
  {
    id: 'butter-bean-tomato-toast',
    name: 'Butter bean tomato toast',
    archetype: 'toast-plate',
    energyLevel: 'low-effort',
    minutes: 10,
    steps: 4,
    tags: ['toast', 'tomato'],
    ingredientsByRole: {
      carb: ['bread'],
      protein: ['butter-beans'],
      flavour: ['tomato-paste', 'garlic-granules'],
      finisher: ['olive-oil', 'black-pepper'],
    },
    anchorIngredientIds: ['bread', 'butter-beans', 'tomato-paste'],
    roleRequirements: [
      { role: 'carb', required: true, min: 1 },
      { role: 'protein', required: true, min: 1 },
      { role: 'flavour', required: true, min: 1 },
      { role: 'finisher', required: false },
    ],
    instructions: [
      'Toast slices of bread.',
      'In a pan, warm butter beans with tomato paste and a pinch of garlic until coated and bubbling.',
      'Spoon the tomato beans over the toast.',
      'Finish with a drizzle of olive oil and black pepper.',
    ],
  },

  // 31. Kimchi noodle bowl
  {
    id: 'kimchi-noodle-bowl',
    name: 'Kimchi noodle bowl',
    archetype: 'noodle-bowl',
    energyLevel: 'low-effort',
    minutes: 12,
    steps: 4,
    tags: ['one-bowl', 'kimchi'],
    ingredientsByRole: {
      carb: ['noodle-pouches'],
      protein: ['tofu', 'eggs'],
      veg: ['kimchi', 'spinach'],
      flavour: ['soy-sauce', 'sesame-oil'],
      finisher: ['spring-onions', 'chilli-flakes'],
    },
    anchorIngredientIds: ['noodle-pouches', 'kimchi'],
    roleRequirements: [
      { role: 'carb', required: true, min: 1 },
      { role: 'veg', required: true, min: 1 },
      { role: 'flavour', required: true, min: 1 },
      { role: 'protein', required: false },
      { role: 'finisher', required: false },
    ],
    instructions: [
      'Cook noodle pouches according to the packet and drain lightly.',
      'In a pan or bowl, toss hot noodles with chopped kimchi, soy sauce, and sesame oil.',
      'Add tofu cubes or a soft egg if you like, plus a handful of spinach to wilt.',
      'Serve in a bowl and top with spring onions and chilli flakes.',
    ],
  },

  // 32. Halloumi wrap
  {
    id: 'halloumi-wrap',
    name: 'Halloumi wrap',
    archetype: 'toast-plate',
    energyLevel: 'low-effort',
    minutes: 12,
    steps: 4,
    tags: ['handheld', 'cheesy'],
    ingredientsByRole: {
      carb: ['tortillas'],
      protein: ['halloumi'],
      veg: ['cucumber', 'cherry-tomatoes'],
      finisher: ['yoghurt', 'lemon-juice'],
    },
    anchorIngredientIds: ['tortillas', 'halloumi'],
    roleRequirements: [
      { role: 'carb', required: true, min: 1 },
      { role: 'protein', required: true, min: 1 },
      { role: 'veg', required: false },
      { role: 'finisher', required: false },
    ],
    instructions: [
      'Slice halloumi and fry or grill until golden on both sides.',
      'Warm tortillas in a dry pan.',
      'Fill each tortilla with halloumi strips, sliced cucumber, and halved cherry tomatoes.',
      'Drizzle with yoghurt and a little lemon juice, then roll into a wrap.',
    ],
  },

  // 33. Cucumber peanut noodles
  {
    id: 'cucumber-peanut-noodles',
    name: 'Cucumber peanut noodles',
    archetype: 'noodle-bowl',
    energyLevel: 'low-effort',
    minutes: 10,
    steps: 4,
    tags: ['one-bowl', 'peanut'],
    ingredientsByRole: {
      carb: ['noodle-pouches'],
      protein: ['tofu'],
      veg: ['cucumber', 'cherry-tomatoes'],
      flavour: ['peanut-butter', 'soy-sauce', 'hot-sauce'],
      finisher: ['spring-onions', 'chilli-flakes'],
    },
    anchorIngredientIds: ['noodle-pouches', 'peanut-butter', 'cucumber'],
    roleRequirements: [
      { role: 'carb', required: true, min: 1 },
      { role: 'flavour', required: true, min: 1 },
      { role: 'veg', required: true, min: 1 },
      { role: 'protein', required: false },
      { role: 'finisher', required: false },
    ],
    instructions: [
      'Cook noodle pouches according to the packet, then rinse briefly if you want them cooler.',
      'Stir together peanut butter, a splash of soy sauce, and a little hot sauce with water to make a loose sauce.',
      'Toss noodles with the sauce, sliced cucumber, and halved cherry tomatoes; add tofu if you like.',
      'Serve in a bowl and top with spring onions and chilli flakes.',
    ],
  },

  // 34. Spicy egg tortilla wrap
  {
    id: 'spicy-egg-tortilla-wrap',
    name: 'Spicy egg tortilla wrap',
    archetype: 'toast-plate',
    energyLevel: 'barely-functioning',
    minutes: 8,
    steps: 3,
    tags: ['handheld', 'egg'],
    ingredientsByRole: {
      carb: ['tortillas'],
      protein: ['eggs'],
      veg: ['spinach'],
      flavour: ['hot-sauce', 'garlic-granules'],
      finisher: ['cheddar-cheese', 'black-pepper'],
    },
    anchorIngredientIds: ['tortillas', 'eggs', 'hot-sauce'],
    roleRequirements: [
      { role: 'carb', required: true, min: 1 },
      { role: 'protein', required: true, min: 1 },
      { role: 'flavour', required: true, min: 1 },
      { role: 'veg', required: false },
      { role: 'finisher', required: false },
    ],
    instructions: [
      'Warm a tortilla in a pan or microwave.',
      'Scramble or fry eggs with a pinch of garlic and a little spinach if you have it.',
      'Pile the eggs onto the tortilla, drizzle with hot sauce, scatter cheddar, and finish with black pepper before rolling up.',
    ],
  },

  // 35. Tomato feta toast
  {
    id: 'tomato-feta-toast',
    name: 'Tomato feta toast',
    archetype: 'toast-plate',
    energyLevel: 'barely-functioning',
    minutes: 8,
    steps: 3,
    tags: ['toast', 'tomato'],
    ingredientsByRole: {
      carb: ['bread'],
      veg: ['cherry-tomatoes'],
      protein: ['feta'],
      finisher: ['olive-oil', 'black-pepper'],
    },
    anchorIngredientIds: ['bread', 'cherry-tomatoes', 'feta'],
    roleRequirements: [
      { role: 'carb', required: true, min: 1 },
      { role: 'veg', required: true, min: 1 },
      { role: 'protein', required: true, min: 1 },
      { role: 'finisher', required: false },
    ],
    instructions: [
      'Toast slices of bread.',
      'Halve cherry tomatoes and lightly salt them while the toast cooks.',
      'Top toast with the tomatoes, crumble feta over, then finish with olive oil and black pepper.',
    ],
  },
]

export function getTemplatesByEnergy(level: EnergyLevel): MealTemplate[] {
  return MEAL_TEMPLATES.filter((template) => template.energyLevel === level)
}

export function getTemplateById(id: string): MealTemplate | undefined {
  return MEAL_TEMPLATES.find((template) => template.id === id)
}

