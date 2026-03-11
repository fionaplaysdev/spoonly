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

// v1 domain layer: concrete meal templates will be moved here from lib/data.ts
export const MEAL_TEMPLATES: MealTemplate[] = []

export function getTemplatesByEnergy(level: EnergyLevel): MealTemplate[] {
  return MEAL_TEMPLATES.filter((template) => template.energyLevel === level)
}

export function getTemplateById(id: string): MealTemplate | undefined {
  return MEAL_TEMPLATES.find((template) => template.id === id)
}

