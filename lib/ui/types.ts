import type { Meal } from '@/lib/types'

export type ConfidenceTier = 'make-now' | 'almost-there' | 'invalid'

export interface SubstitutionMatch {
  requiredIngredientId: string
  substituteIngredientId: string
}

export interface MealWithAvailability extends Meal {
  availableIngredientIds?: string[]
  missingIngredientIds?: string[]
  confidenceTier?: ConfidenceTier
  substitutionMatches?: SubstitutionMatch[]
  displayIngredientLines?: {
    ids: string[]
    role?: string
  }[]
}

