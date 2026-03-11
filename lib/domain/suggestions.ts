import type {
  Ingredient,
  IngredientRole,
  EnergyLevel,
  MealTemplate,
  TemplateMatchDetail,
  ScoredSuggestion,
} from './types'

import { MEAL_TEMPLATES } from './meals'

export function getAvailableIngredients(
  pantryIds: string[],
  selectedIds: string[],
): string[] {
  const set = new Set<string>([...pantryIds, ...selectedIds])
  return Array.from(set)
}

export function matchTemplateToIngredients(
  template: MealTemplate,
  availableIds: string[],
  allIngredients: Ingredient[],
): TemplateMatchDetail {
  const availableSet = new Set(availableIds)

  const allTemplateIngredientIds = Object.values(template.ingredientsByRole)
    .filter((ids): ids is string[] => Array.isArray(ids))
    .flat()

  const matchedIngredientIds = allTemplateIngredientIds.filter((id) =>
    availableSet.has(id),
  )

  const missingIngredientIds = allTemplateIngredientIds.filter(
    (id) => !availableSet.has(id),
  )

  const matchedRoles = new Set<IngredientRole>()
  const missingRequiredRoles = new Set<IngredientRole>()

  for (const requirement of template.roleRequirements) {
    const roleIngredients = allIngredients.filter((ingredient) =>
      ingredient.roles.includes(requirement.role),
    )

    const availableForRole = roleIngredients.filter((ingredient) =>
      availableSet.has(ingredient.id),
    )

    if (
      requirement.required &&
      availableForRole.length < (requirement.min ?? 1)
    ) {
      missingRequiredRoles.add(requirement.role)
    } else if (availableForRole.length > 0) {
      matchedRoles.add(requirement.role)
    }
  }

  return {
    template,
    matchedIngredientIds,
    missingIngredientIds,
    matchedRoles: Array.from(matchedRoles),
    missingRequiredRoles: Array.from(missingRequiredRoles),
  }
}

export function scoreMatch(detail: TemplateMatchDetail): number {
  if (detail.missingRequiredRoles.length > 0) {
    return Number.NEGATIVE_INFINITY
  }

  const matchedCount = detail.matchedIngredientIds.length
  const missingCount = detail.missingIngredientIds.length

  return matchedCount * 10 - missingCount * 2
}

const ENERGY_LEVEL_ORDER: EnergyLevel[] = [
  'barely-functioning',
  'low-effort',
  'some-energy',
]

function compareEnergyLevels(a: EnergyLevel, b: EnergyLevel): number {
  return ENERGY_LEVEL_ORDER.indexOf(a) - ENERGY_LEVEL_ORDER.indexOf(b)
}

export interface SuggestionParams {
  pantryIds: string[]
  selectedIds: string[]
  allIngredients: Ingredient[]
  templates?: MealTemplate[]
  allowedEnergyLevels?: EnergyLevel[]
}

export function getSuggestionsForIngredients({
  pantryIds,
  selectedIds,
  allIngredients,
  templates = MEAL_TEMPLATES,
  allowedEnergyLevels,
}: SuggestionParams): ScoredSuggestion[] {
  const availableIds = getAvailableIngredients(pantryIds, selectedIds)

  const allowedSet = allowedEnergyLevels
    ? new Set<EnergyLevel>(allowedEnergyLevels)
    : null

  const suggestions: ScoredSuggestion[] = []

  for (const template of templates) {
    if (allowedSet && !allowedSet.has(template.energyLevel)) continue

    const detail = matchTemplateToIngredients(
      template,
      availableIds,
      allIngredients,
    )

    const score = scoreMatch(detail)
    if (!Number.isFinite(score) || score <= 0) continue

    suggestions.push({ template, score, detail })
  }

  suggestions.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score
    return compareEnergyLevels(a.template.energyLevel, b.template.energyLevel)
  })

  return suggestions
}

export function groupSuggestionsByEnergy(
  suggestions: ScoredSuggestion[],
): Record<EnergyLevel, ScoredSuggestion[]> {
  const byEnergy: Record<EnergyLevel, ScoredSuggestion[]> = {
    'barely-functioning': [],
    'low-effort': [],
    'some-energy': [],
  }

  for (const suggestion of suggestions) {
    byEnergy[suggestion.template.energyLevel].push(suggestion)
  }

  return byEnergy
}

