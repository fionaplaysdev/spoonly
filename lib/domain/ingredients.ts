import type {
  Ingredient,
  IngredientSection,
  IngredientPriority,
  IngredientRole,
} from './types'

export const INGREDIENT_SECTIONS: IngredientSection[] = [
  'flavour-engine',
  'protein',
  'fast-carb',
  'veg',
  'finisher',
]

export const INGREDIENT_PRIORITIES: IngredientPriority[] = ['core', 'nice-to-have']

export const INGREDIENT_ROLES: IngredientRole[] = [
  'carb',
  'protein',
  'flavour',
  'veg',
  'finisher',
]

export const INGREDIENTS: Ingredient[] = [
  // Flavour engines – core
  {
    id: 'soy-sauce',
    name: 'Soy Sauce',
    section: 'flavour-engine',
    priority: 'core',
    roles: ['flavour'],
  },
  {
    id: 'peanut-butter',
    name: 'Peanut Butter',
    section: 'flavour-engine',
    priority: 'core',
    roles: ['flavour'],
  },
  {
    id: 'chilli-crisp',
    name: 'Chilli Crisp',
    section: 'flavour-engine',
    priority: 'core',
    roles: ['flavour'],
  },
  {
    id: 'stock-cubes',
    name: 'Stock Cubes',
    section: 'flavour-engine',
    priority: 'core',
    roles: ['flavour'],
  },
  {
    id: 'garlic-granules',
    name: 'Garlic Granules',
    section: 'flavour-engine',
    priority: 'core',
    roles: ['flavour'],
  },
  {
    id: 'ginger',
    name: 'Ginger',
    section: 'flavour-engine',
    priority: 'core',
    roles: ['flavour'],
  },

  // Flavour engines – nice to have
  {
    id: 'miso-paste',
    name: 'Miso Paste',
    section: 'flavour-engine',
    priority: 'nice-to-have',
    roles: ['flavour'],
  },
  {
    id: 'curry-paste',
    name: 'Curry Paste',
    section: 'flavour-engine',
    priority: 'nice-to-have',
    roles: ['flavour'],
  },
  {
    id: 'tahini',
    name: 'Tahini',
    section: 'flavour-engine',
    priority: 'nice-to-have',
    roles: ['flavour'],
  },
  {
    id: 'pesto',
    name: 'Pesto',
    section: 'flavour-engine',
    priority: 'nice-to-have',
    roles: ['flavour'],
  },
  {
    id: 'gochujang',
    name: 'Gochujang',
    section: 'flavour-engine',
    priority: 'nice-to-have',
    roles: ['flavour'],
  },
  {
    id: 'harissa',
    name: 'Harissa',
    section: 'flavour-engine',
    priority: 'nice-to-have',
    roles: ['flavour'],
  },

  // Proteins – core
  {
    id: 'eggs',
    name: 'Eggs',
    section: 'protein',
    priority: 'core',
    roles: ['protein'],
  },
  {
    id: 'tofu',
    name: 'Tofu',
    section: 'protein',
    priority: 'core',
    roles: ['protein'],
  },
  {
    id: 'beans',
    name: 'Beans',
    section: 'protein',
    priority: 'core',
    roles: ['protein'],
  },
  {
    id: 'lentils',
    name: 'Lentils',
    section: 'protein',
    priority: 'core',
    roles: ['protein'],
  },
  {
    id: 'chickpeas',
    name: 'Chickpeas',
    section: 'protein',
    priority: 'core',
    roles: ['protein'],
  },

  // Proteins – nice to have
  {
    id: 'halloumi',
    name: 'Halloumi',
    section: 'protein',
    priority: 'nice-to-have',
    roles: ['protein'],
  },

  // Fast carbs – core
  {
    id: 'noodle-pouches',
    name: 'Noodle Pouches',
    section: 'fast-carb',
    priority: 'core',
    roles: ['carb'],
  },
  {
    id: 'rice-pouches',
    name: 'Rice Pouches',
    section: 'fast-carb',
    priority: 'core',
    roles: ['carb'],
  },
  {
    id: 'pasta',
    name: 'Pasta',
    section: 'fast-carb',
    priority: 'core',
    roles: ['carb'],
  },
  {
    id: 'pitta',
    name: 'Pitta',
    section: 'fast-carb',
    priority: 'core',
    roles: ['carb'],
  },
  {
    id: 'bread',
    name: 'Bread',
    section: 'fast-carb',
    priority: 'core',
    roles: ['carb'],
  },
  {
    id: 'potatoes',
    name: 'Potatoes',
    section: 'fast-carb',
    priority: 'core',
    roles: ['carb'],
  },

  // Fast carbs – nice to have
  {
    id: 'instant-ramen',
    name: 'Instant Ramen',
    section: 'fast-carb',
    priority: 'nice-to-have',
    roles: ['carb'],
  },

  // Veg – core
  {
    id: 'peas',
    name: 'Peas',
    section: 'veg',
    priority: 'core',
    roles: ['veg'],
  },
  {
    id: 'spinach',
    name: 'Spinach',
    section: 'veg',
    priority: 'core',
    roles: ['veg'],
  },

  // Veg – nice to have
  {
    id: 'green-beans',
    name: 'Green Beans',
    section: 'veg',
    priority: 'nice-to-have',
    roles: ['veg'],
  },
  {
    id: 'broccoli',
    name: 'Broccoli',
    section: 'veg',
    priority: 'nice-to-have',
    roles: ['veg'],
  },
  {
    id: 'edamame',
    name: 'Edamame',
    section: 'veg',
    priority: 'nice-to-have',
    roles: ['veg'],
  },
  {
    id: 'cucumber',
    name: 'Cucumber',
    section: 'veg',
    priority: 'nice-to-have',
    roles: ['veg'],
  },
  {
    id: 'carrot',
    name: 'Carrot',
    section: 'veg',
    priority: 'nice-to-have',
    roles: ['veg'],
  },
  {
    id: 'avocado',
    name: 'Avocado',
    section: 'veg',
    priority: 'nice-to-have',
    roles: ['veg', 'finisher'],
  },

  // Finishers – core
  {
    id: 'lemon-juice',
    name: 'Lemon Juice',
    section: 'finisher',
    priority: 'core',
    roles: ['finisher'],
  },
  {
    id: 'lime-juice',
    name: 'Lime Juice',
    section: 'finisher',
    priority: 'core',
    roles: ['finisher'],
  },
  {
    id: 'sesame-oil',
    name: 'Sesame Oil',
    section: 'finisher',
    priority: 'core',
    roles: ['finisher'],
  },
  {
    id: 'cheddar-cheese',
    name: 'Cheddar Cheese',
    section: 'finisher',
    priority: 'core',
    roles: ['protein', 'finisher'],
  },

  // Finishers – nice to have
  {
    id: 'spring-onions',
    name: 'Spring Onions',
    section: 'finisher',
    priority: 'nice-to-have',
    roles: ['finisher'],
  },
  {
    id: 'fresh-herbs',
    name: 'Fresh Herbs',
    section: 'finisher',
    priority: 'nice-to-have',
    roles: ['finisher'],
  },
  {
    id: 'yoghurt',
    name: 'Yoghurt',
    section: 'finisher',
    priority: 'nice-to-have',
    roles: ['finisher'],
  },
  {
    id: 'toasted-sesame-seeds',
    name: 'Toasted Sesame Seeds',
    section: 'finisher',
    priority: 'nice-to-have',
    roles: ['finisher'],
  },
  {
    id: 'crushed-peanuts',
    name: 'Crushed Peanuts',
    section: 'finisher',
    priority: 'nice-to-have',
    roles: ['finisher'],
  },
  {
    id: 'feta',
    name: 'Feta',
    section: 'finisher',
    priority: 'nice-to-have',
    roles: ['finisher'],
  },
]

export interface PantrySectionMeta {
  id: IngredientSection
  name: string
  description: string
  ingredientIds: string[]
  tip?: {
    text: string
  }
}

export const PANTRY_SECTIONS: PantrySectionMeta[] = [
  {
    id: 'flavour-engine',
    name: 'Flavour Engines',
    description: 'Big flavour, minimal effort',
    ingredientIds: INGREDIENTS.filter(
      (ingredient) => ingredient.section === 'flavour-engine',
    ).map((ingredient) => ingredient.id),
    tip: {
      text: 'Freeze ginger whole and grate from frozen, freeze tomato paste in teaspoon blobs, and freeze leftover coconut milk in cubes.',
    },
  },
  {
    id: 'protein',
    name: 'Proteins',
    description: 'Fast, filling protein options',
    ingredientIds: INGREDIENTS.filter(
      (ingredient) => ingredient.section === 'protein',
    ).map((ingredient) => ingredient.id),
  },
  {
    id: 'fast-carb',
    name: 'Fast Carbs',
    description: 'Quick energy foundations',
    ingredientIds: INGREDIENTS.filter(
      (ingredient) => ingredient.section === 'fast-carb',
    ).map((ingredient) => ingredient.id),
  },
  {
    id: 'veg',
    name: 'Veg',
    description: 'Quick vegetables, fresh or frozen',
    ingredientIds: INGREDIENTS.filter(
      (ingredient) => ingredient.section === 'veg',
    ).map((ingredient) => ingredient.id),
    tip: {
      text: 'Frozen veg is low effort, lasts forever, and still counts as real vegetables.',
    },
  },
  {
    id: 'finisher',
    name: 'Finishers',
    description: 'Acid, crunch, and toppings',
    ingredientIds: INGREDIENTS.filter(
      (ingredient) => ingredient.section === 'finisher',
    ).map((ingredient) => ingredient.id),
    tip: {
      text: 'Freeze chopped spring onions for quick garnish, and keep lemons in the freezer — they grate beautifully.',
    },
  },
]

export function getIngredientById(id: string): Ingredient | undefined {
  return INGREDIENTS.find((ingredient) => ingredient.id === id)
}

export function getIngredientName(id: string): string {
  return getIngredientById(id)?.name ?? id
}

export function getIngredientsBySection(section: IngredientSection): Ingredient[] {
  return INGREDIENTS.filter((ingredient) => ingredient.section === section)
}

export function getCoreIngredients(): Ingredient[] {
  return INGREDIENTS.filter((ingredient) => ingredient.priority === 'core')
}

// Map legacy ids from the original pantry model to the new domain ids.
export function normalizeLegacyIngredientId(id: string): string | null {
  switch (id) {
    case 'canned-beans':
      return 'beans'
    case 'canned-lentils':
      return 'lentils'
    case 'frozen-peas':
      return 'peas'
    case 'frozen-spinach':
      return 'spinach'
    case 'frozen-green-beans':
      return 'green-beans'
    case 'frozen-broccoli':
      return 'broccoli'
    case 'frozen-edamame':
      return 'edamame'
    case 'cheese':
      return 'cheddar-cheese'
    case 'noodles':
      return 'noodle-pouches'
    default:
      return id
  }
}

