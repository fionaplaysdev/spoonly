import type {
  Ingredient,
  IngredientRole,
  EnergyLevel,
  MealTemplate,
  TemplateMatchDetail,
  ScoredSuggestion,
  SuggestedReplacement,
} from './types'

import { MEAL_TEMPLATES } from './meals'
import { SUBSTITUTIONS } from './substitutions'

// Weighting constants to keep scoring deterministic and readable
const SELECTED_MATCH_WEIGHT = 10
const PANTRY_MATCH_WEIGHT = 4
const ROLE_MATCH_WEIGHT = 1
const MISSING_INGREDIENT_PENALTY = 3

export function getAvailableIngredients(
  pantryIds: string[],
  selectedIds: string[],
): string[] {
  const set = new Set<string>([...pantryIds, ...selectedIds])
  return Array.from(set)
}

export function matchTemplateToIngredients(
  template: MealTemplate,
  pantryIds: string[],
  selectedIds: string[],
  allIngredients: Ingredient[],
): TemplateMatchDetail {
  const selectedSet = new Set(selectedIds)
  const pantrySet = new Set(pantryIds)
  const availableSet = new Set<string>([
    ...Array.from(selectedSet),
    ...Array.from(pantrySet),
  ])

  const allTemplateIngredientIds = Object.values(template.ingredientsByRole)
    .filter((ids): ids is string[] => Array.isArray(ids))
    .flat()

  const finisherIds = template.ingredientsByRole.finisher ?? []
  const finisherSet = new Set(finisherIds)

  const selectedMatchIds: string[] = []
  const pantryMatchIds: string[] = []
  const matchedIngredientIds: string[] = []
  const missingIngredientIds: string[] = []
  const suggestedReplacements: SuggestedReplacement[] = []

  for (const id of allTemplateIngredientIds) {
    const substitutions = SUBSTITUTIONS[id] ?? []
    const hasDirect = availableSet.has(id)
    const replacementIds = substitutions.filter((subId) => availableSet.has(subId))
    const hasSubstitute = replacementIds.length > 0

    if (hasDirect) {
      matchedIngredientIds.push(id)
      if (selectedSet.has(id)) {
        selectedMatchIds.push(id)
      } else if (pantrySet.has(id)) {
        pantryMatchIds.push(id)
      }
    } else if (hasSubstitute) {
      // Required roles can be satisfied via substitutes; record for messaging.
      suggestedReplacements.push({ missingId: id, replacementIds })
    } else {
      missingIngredientIds.push(id)
    }
  }

  const missingCoreIngredientIds = missingIngredientIds.filter(
    (id) => !finisherSet.has(id),
  )
  const missingOptionalIngredientIds = missingIngredientIds.filter((id) =>
    finisherSet.has(id),
  )

  const matchedRoles = new Set<IngredientRole>()
  const missingRequiredRoles = new Set<IngredientRole>()

  for (const requirement of template.roleRequirements) {
    const templateRoleIds = template.ingredientsByRole[requirement.role] ?? []
    let availableForRole = 0

    for (const id of templateRoleIds) {
      const substitutions = SUBSTITUTIONS[id] ?? []
      const hasDirect = availableSet.has(id)
      const hasSubstitute = substitutions.some((subId) => availableSet.has(subId))
      if (hasDirect || hasSubstitute) {
        availableForRole++
      }
    }

    if (
      requirement.required &&
      availableForRole.length < (requirement.min ?? 1)
    ) {
      missingRequiredRoles.add(requirement.role)
    } else if (availableForRole.length > 0) {
      matchedRoles.add(requirement.role)
    }
  }

  // Classify confidence based purely on required roles:
  // - invalid: any required role is missing
  // - make-now: all required roles satisfied and no ingredients missing
  // - almost-there: all required roles satisfied but some (optional) ingredients missing
  let confidenceTier: 'make-now' | 'almost-there' | 'invalid'
  if (missingRequiredRoles.size > 0) {
    confidenceTier = 'invalid'
  } else if (missingIngredientIds.length === 0) {
    confidenceTier = 'make-now'
  } else {
    confidenceTier = 'almost-there'
  }

  return {
    template,
    matchedIngredientIds,
    missingIngredientIds,
    matchedRoles: Array.from(matchedRoles),
    missingRequiredRoles: Array.from(missingRequiredRoles),
    selectedMatchIds,
    pantryMatchIds,
    missingCoreIngredientIds,
    missingOptionalIngredientIds,
    confidenceTier,
    suggestedReplacements,
  }
}

export function scoreMatch(detail: TemplateMatchDetail): number {
  if (
    detail.missingRequiredRoles.length > 0 ||
    detail.confidenceTier === 'invalid'
  ) {
    return Number.NEGATIVE_INFINITY
  }

  const selectedCount = detail.selectedMatchIds.length
  const pantryCount = detail.pantryMatchIds.length
  const roleCount = detail.matchedRoles.length
  const missingCount = detail.missingIngredientIds.length

  return (
    selectedCount * SELECTED_MATCH_WEIGHT +
    pantryCount * PANTRY_MATCH_WEIGHT +
    roleCount * ROLE_MATCH_WEIGHT -
    missingCount * MISSING_INGREDIENT_PENALTY
  )
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
      pantryIds,
      selectedIds,
      allIngredients,
    )

    const score = scoreMatch(detail)
    if (!Number.isFinite(score) || score <= 0) continue

    suggestions.push({ template, score, detail })
  }

  suggestions.sort((a, b) => {
    // 1. Prefer templates that use more selected ingredients
    const aSelected = a.detail.selectedMatchIds.length
    const bSelected = b.detail.selectedMatchIds.length
    if (aSelected !== bSelected) return bSelected - aSelected

    // 2. Then prefer templates that use more pantry-only ingredients
    const aPantry = a.detail.pantryMatchIds.length
    const bPantry = b.detail.pantryMatchIds.length
    if (aPantry !== bPantry) return bPantry - aPantry

    // 3. Then prefer fewer missing ingredients
    const aMissing = a.detail.missingIngredientIds.length
    const bMissing = b.detail.missingIngredientIds.length
    if (aMissing !== bMissing) return aMissing - bMissing

    // 4. Fall back to overall score (includes role matches)
    if (b.score !== a.score) return b.score - a.score

    // 5. Finally, prefer lower-energy suggestions first
    return compareEnergyLevels(a.template.energyLevel, b.template.energyLevel)
  })

  return suggestions
}

export interface TieredSuggestions {
  makeNow: ScoredSuggestion[]
  almostThere: ScoredSuggestion[]
}

export function getTieredSuggestionsForIngredients(
  params: SuggestionParams,
): TieredSuggestions {
  const flat = getSuggestionsForIngredients(params)
  return {
    makeNow: flat.filter(
      (s) => s.detail.confidenceTier === 'make-now',
    ),
    almostThere: flat.filter(
      (s) => s.detail.confidenceTier === 'almost-there',
    ),
  }
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

