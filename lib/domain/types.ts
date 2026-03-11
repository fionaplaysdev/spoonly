export type EnergyLevel = 'barely-functioning' | 'low-effort' | 'some-energy'

export type IngredientSection =
  | 'flavour-engine'
  | 'protein'
  | 'fast-carb'
  | 'veg'
  | 'finisher'

export type IngredientPriority = 'core' | 'nice-to-have'

export type IngredientRole = 'carb' | 'protein' | 'flavour' | 'veg' | 'finisher'

export interface Ingredient {
  id: string
  name: string
  section: IngredientSection
  priority: IngredientPriority
  roles: IngredientRole[]
}

export type MealArchetype =
  | 'noodle-bowl'
  | 'rice-bowl'
  | 'pasta-bowl'
  | 'soup'
  | 'toast-plate'

export interface IngredientRoleRequirement {
  role: IngredientRole
  required: boolean
  min?: number
  max?: number
}

export interface MealTemplate {
  id: string
  name: string
  archetype: MealArchetype
  energyLevel: EnergyLevel
  minutes: number
  steps: number
  tags: string[]
  ingredientsByRole: Partial<Record<IngredientRole, string[]>>
  roleRequirements: IngredientRoleRequirement[]
  instructions: string[]
}

export interface TemplateMatchDetail {
  template: MealTemplate
  matchedIngredientIds: string[]
  missingIngredientIds: string[]
  matchedRoles: IngredientRole[]
  missingRequiredRoles: IngredientRole[]
}

export interface ScoredSuggestion {
  template: MealTemplate
  score: number
  detail: TemplateMatchDetail
}

