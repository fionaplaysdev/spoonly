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
  anchorIngredientIds?: string[]
}

export interface SuggestedReplacement {
  missingId: string
  replacementIds: string[]
}

export interface TemplateMatchDetail {
  template: MealTemplate
  matchedIngredientIds: string[]
  /**
   * Template ingredient ids that are not present directly and not satisfied via
   * an approved substitution. These are the ingredients the user truly lacks.
   */
  missingIngredientIds: string[]
  /**
   * Roles that have at least one satisfying ingredient (directly or via substitution).
   */
  matchedRoles: IngredientRole[]
  /**
   * Roles that are required by the template but not satisfied by any available
   * ingredient or approved substitute.
   */
  missingRequiredRoles: IngredientRole[]
  selectedMatchIds: string[]
  pantryMatchIds: string[]
  missingCoreIngredientIds: string[]
  missingOptionalIngredientIds: string[]
  /**
   * Anchor ingredients that are neither present nor satisfied by an approved
   * substitute. If this is non-empty, the suggestion is considered invalid.
   */
  missingAnchorIngredientIds: string[]
  /**
   * High-level classification of suggestion quality:
   * - 'make-now': all required roles and anchors satisfied, nothing missing
   * - 'almost-there': all required roles and anchors satisfied, some non-core missing
   * - 'invalid': required role or anchor missing – suggestion is filtered out
   */
  confidenceTier: 'make-now' | 'almost-there' | 'invalid'
  suggestedReplacements: SuggestedReplacement[]
}

export interface ScoredSuggestion {
  template: MealTemplate
  score: number
  detail: TemplateMatchDetail
}

