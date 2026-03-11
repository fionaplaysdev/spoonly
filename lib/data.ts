import type { Ingredient, Meal, PantryCategory, KitchenTip } from './types'

export const pantryCategories: PantryCategory[] = [
  {
    id: 'flavour-engines',
    name: 'Flavour Engines',
    description: 'These power most quick meals',
    ingredients: [
      // Core
      { id: 'soy-sauce', name: 'Soy Sauce', category: 'flavour-engines', isCore: true },
      { id: 'peanut-butter', name: 'Peanut Butter', category: 'flavour-engines', isCore: true },
      { id: 'chilli-crisp', name: 'Chilli Crisp', category: 'flavour-engines', isCore: true },
      { id: 'stock-cubes', name: 'Stock Cubes', category: 'flavour-engines', isCore: true },
      { id: 'garlic-granules', name: 'Garlic Granules', category: 'flavour-engines', isCore: true },
      // Nice to have
      { id: 'miso-paste', name: 'Miso Paste', category: 'flavour-engines' },
      { id: 'curry-paste', name: 'Curry Paste', category: 'flavour-engines' },
      { id: 'tahini', name: 'Tahini', category: 'flavour-engines' },
      { id: 'pesto', name: 'Pesto', category: 'flavour-engines' },
      { id: 'gochujang', name: 'Gochujang', category: 'flavour-engines' },
      { id: 'harissa', name: 'Harissa', category: 'flavour-engines' },
    ],
  },
  {
    id: 'fast-proteins',
    name: 'Fast Proteins',
    description: 'Easy protein, almost no prep',
    ingredients: [
      // Core
      { id: 'eggs', name: 'Eggs', category: 'fast-proteins', isCore: true },
      { id: 'canned-beans', name: 'Canned Beans', category: 'fast-proteins', isCore: true },
      { id: 'canned-lentils', name: 'Canned Lentils', category: 'fast-proteins', isCore: true },
      // Nice to have
      { id: 'tofu', name: 'Tofu', category: 'fast-proteins' },
      { id: 'chickpeas', name: 'Chickpeas', category: 'fast-proteins' },
      { id: 'butter-beans', name: 'Butter Beans', category: 'fast-proteins' },
    ],
  },
  {
    id: 'fast-carbs',
    name: 'Fast Carbs',
    description: 'Foundations for quick meals',
    ingredients: [
      // Core
      { id: 'noodles', name: 'Noodles', category: 'fast-carbs', isCore: true },
      { id: 'rice-pouches', name: 'Rice Pouches', category: 'fast-carbs', isCore: true },
      { id: 'pasta', name: 'Pasta', category: 'fast-carbs', isCore: true },
      // Nice to have
      { id: 'bread', name: 'Bread', category: 'fast-carbs' },
      { id: 'pitta', name: 'Pitta', category: 'fast-carbs' },
      { id: 'gnocchi', name: 'Gnocchi', category: 'fast-carbs' },
      { id: 'instant-ramen', name: 'Instant Ramen', category: 'fast-carbs' },
    ],
  },
  {
    id: 'frozen-veg',
    name: 'Frozen Vegetables',
    description: 'Always ready, never wilted',
    ingredients: [
      // Core
      { id: 'frozen-peas', name: 'Peas', category: 'frozen-veg', isCore: true },
      { id: 'frozen-spinach', name: 'Spinach', category: 'frozen-veg', isCore: true },
      // Nice to have
      { id: 'frozen-mixed-veg', name: 'Mixed Vegetables', category: 'frozen-veg' },
      { id: 'frozen-green-beans', name: 'Green Beans', category: 'frozen-veg' },
      { id: 'frozen-broccoli', name: 'Broccoli', category: 'frozen-veg' },
      { id: 'frozen-edamame', name: 'Edamame', category: 'frozen-veg' },
    ],
  },
  {
    id: 'finishers',
    name: 'Finishers',
    description: 'Instantly improve flavour',
    ingredients: [
      // Core
      { id: 'lemon-juice', name: 'Lemon Juice', category: 'finishers', isCore: true },
      { id: 'lime-juice', name: 'Lime Juice', category: 'finishers', isCore: true },
      { id: 'sesame-oil', name: 'Sesame Oil', category: 'finishers', isCore: true },
      { id: 'cheese', name: 'Cheese', category: 'finishers', isCore: true },
      // Nice to have
      { id: 'spring-onions', name: 'Spring Onions', category: 'finishers' },
      { id: 'fresh-herbs', name: 'Fresh Herbs', category: 'finishers' },
      { id: 'yoghurt', name: 'Yoghurt', category: 'finishers' },
      { id: 'toasted-sesame-seeds', name: 'Toasted Sesame Seeds', category: 'finishers' },
      { id: 'crushed-peanuts', name: 'Crushed Peanuts', category: 'finishers' },
    ],
  },
]

export const allIngredients: Ingredient[] = pantryCategories.flatMap(
  (category) => category.ingredients
)

// Placeholder meals - will be replaced with template-based meals
export const meals: Meal[] = [
  // Barely Functioning (up to 5 mins, up to 3 steps)
  {
    id: 'miso-soup-egg',
    name: 'Miso Soup with Egg',
    time: '5 mins',
    minutes: 5,
    steps: 3,
    tags: ['one-bowl'],
    ingredients: ['miso-paste', 'eggs', 'spring-onions'],
    instructions: [
      'Boil water and dissolve miso paste',
      'Crack egg into soup and let it poach',
      'Top with sliced spring onions',
    ],
    energyLevel: 'barely-functioning',
  },
  {
    id: 'peanut-noodles',
    name: 'Peanut Noodles',
    time: '8 mins',
    minutes: 8,
    steps: 3,
    tags: ['one-bowl'],
    ingredients: ['noodles', 'peanut-butter', 'soy-sauce', 'chilli-crisp'],
    instructions: [
      'Cook noodles and drain, saving some water',
      'Mix peanut butter, soy sauce, and a splash of noodle water',
      'Toss noodles in sauce and top with chilli crisp',
    ],
    energyLevel: 'low-effort',
  },
  {
    id: 'egg-fried-rice',
    name: 'Simple Egg Fried Rice',
    time: '10 mins',
    minutes: 10,
    steps: 4,
    tags: ['one-pot'],
    ingredients: ['rice-pouches', 'eggs', 'frozen-peas', 'soy-sauce', 'sesame-oil'],
    instructions: [
      'Heat oil in a pan, scramble eggs and set aside',
      'Add rice to the pan and fry',
      'Add frozen peas and soy sauce',
      'Return eggs, mix and drizzle sesame oil',
    ],
    energyLevel: 'low-effort',
  },
  {
    id: 'beans-toast',
    name: 'Beans on Toast',
    time: '5 mins',
    minutes: 5,
    steps: 2,
    tags: [],
    ingredients: ['bread', 'canned-beans', 'cheese'],
    instructions: [
      'Toast bread, heat beans',
      'Top toast with beans and grated cheese',
    ],
    energyLevel: 'barely-functioning',
  },
  {
    id: 'peanut-butter-toast',
    name: 'Peanut Butter Toast',
    time: '2 mins',
    minutes: 2,
    steps: 1,
    tags: [],
    ingredients: ['bread', 'peanut-butter'],
    instructions: [
      'Toast bread and spread with peanut butter',
    ],
    energyLevel: 'barely-functioning',
  },
  {
    id: 'miso-pasta',
    name: 'Creamy Miso Pasta',
    time: '15 mins',
    minutes: 15,
    steps: 4,
    tags: ['one-pot'],
    ingredients: ['pasta', 'miso-paste', 'frozen-peas', 'garlic-granules', 'cheese'],
    instructions: [
      'Cook pasta with frozen peas',
      'Reserve pasta water before draining',
      'Mix miso paste with pasta water and garlic',
      'Toss pasta in sauce, top with cheese',
    ],
    energyLevel: 'some-energy',
  },
  {
    id: 'crispy-tofu-bowl',
    name: 'Crispy Tofu Rice Bowl',
    time: '20 mins',
    minutes: 20,
    steps: 5,
    tags: ['one-bowl'],
    ingredients: ['tofu', 'rice-pouches', 'soy-sauce', 'sesame-oil', 'frozen-broccoli', 'toasted-sesame-seeds'],
    instructions: [
      'Press and cube tofu',
      'Pan fry tofu until crispy on all sides',
      'Heat rice and steam broccoli',
      'Make quick sauce with soy sauce and sesame oil',
      'Assemble bowl and top with sesame seeds',
    ],
    energyLevel: 'some-energy',
  },
  {
    id: 'tahini-lentils',
    name: 'Tahini Lentil Bowl',
    time: '8 mins',
    minutes: 8,
    steps: 3,
    tags: ['one-bowl'],
    ingredients: ['canned-lentils', 'tahini', 'lemon-juice', 'garlic-granules'],
    instructions: [
      'Warm lentils in a pan',
      'Mix tahini with lemon juice and garlic',
      'Drizzle over lentils and serve',
    ],
    energyLevel: 'low-effort',
  },
  {
    id: 'curry-noodle-soup',
    name: 'Quick Curry Noodle Soup',
    time: '10 mins',
    minutes: 10,
    steps: 3,
    tags: ['one-pot'],
    ingredients: ['instant-ramen', 'curry-paste', 'frozen-spinach', 'eggs'],
    instructions: [
      'Boil water with curry paste and stock',
      'Add noodles and spinach',
      'Crack in an egg and let it poach',
    ],
    energyLevel: 'low-effort',
  },
  {
    id: 'gochujang-noodles',
    name: 'Spicy Gochujang Noodles',
    time: '10 mins',
    minutes: 10,
    steps: 3,
    tags: ['one-bowl'],
    ingredients: ['noodles', 'gochujang', 'sesame-oil', 'eggs', 'spring-onions'],
    instructions: [
      'Cook noodles and drain',
      'Mix gochujang with sesame oil and toss with noodles',
      'Top with a fried egg and spring onions',
    ],
    energyLevel: 'low-effort',
  },
  {
    id: 'harissa-chickpeas',
    name: 'Harissa Chickpeas with Yoghurt',
    time: '10 mins',
    minutes: 10,
    steps: 3,
    tags: ['one-pot'],
    ingredients: ['chickpeas', 'harissa', 'yoghurt', 'pitta'],
    instructions: [
      'Fry chickpeas with harissa until crispy',
      'Warm pitta bread',
      'Serve chickpeas with yoghurt and pitta',
    ],
    energyLevel: 'low-effort',
  },
  {
    id: 'pesto-gnocchi',
    name: 'Quick Pesto Gnocchi',
    time: '8 mins',
    minutes: 8,
    steps: 2,
    tags: ['one-pot'],
    ingredients: ['gnocchi', 'pesto', 'frozen-peas', 'cheese'],
    instructions: [
      'Boil gnocchi with peas until they float',
      'Drain and toss with pesto and cheese',
    ],
    energyLevel: 'low-effort',
  },
]

export const kitchenTips: KitchenTip[] = [
  { id: '1', tip: 'Freeze ginger whole and grate from frozen' },
  { id: '2', tip: 'Freeze chopped spring onions for quick garnish' },
  { id: '3', tip: 'Freeze tomato paste in teaspoon blobs' },
  { id: '4', tip: 'Freeze leftover coconut milk in cubes' },
  { id: '5', tip: 'Keep lemons in the freezer — they grate beautifully' },
  { id: '6', tip: 'Freeze herbs in olive oil in ice cube trays' },
]

export function getIngredientName(id: string): string {
  const ing = allIngredients.find((i) => i.id === id)
  return ing?.name ?? id
}

export function getMealsForIngredients(selectedIngredients: string[]): Meal[] {
  if (selectedIngredients.length === 0) return []
  
  // Show meals that use ANY of the selected ingredients, sorted by how many ingredients the user has
  const mealsWithMatches = meals.map((meal) => {
    const matchingCount = meal.ingredients.filter((ing) => selectedIngredients.includes(ing)).length
    const missingCount = meal.ingredients.length - matchingCount
    return { meal, matchingCount, missingCount }
  })
  
  // Filter to meals that have at least one matching ingredient, then sort by fewest missing
  return mealsWithMatches
    .filter(({ matchingCount }) => matchingCount > 0)
    .sort((a, b) => {
      // First by missing count (fewer missing = better)
      if (a.missingCount !== b.missingCount) return a.missingCount - b.missingCount
      // Then by matching count (more matches = better)
      return b.matchingCount - a.matchingCount
    })
    .map(({ meal }) => meal)
}

export function groupMealsByEnergy(meals: Meal[]): Record<string, Meal[]> {
  return {
    'barely-functioning': meals.filter((m) => m.energyLevel === 'barely-functioning'),
    'low-effort': meals.filter((m) => m.energyLevel === 'low-effort'),
    'some-energy': meals.filter((m) => m.energyLevel === 'some-energy'),
  }
}
