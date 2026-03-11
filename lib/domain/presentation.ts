import type { IngredientRole, MealTemplate } from './types'

export interface DisplayIngredientLine {
  ids: string[]
  role?: IngredientRole
}

const ROLE_ORDER: IngredientRole[] = [
  'carb',
  'protein',
  'veg',
  'flavour',
  'finisher',
]

export function buildDisplayIngredientLines(
  template: MealTemplate,
): DisplayIngredientLine[] {
  const lines: DisplayIngredientLine[] = []

  for (const role of ROLE_ORDER) {
    const idsForRole = template.ingredientsByRole[role]
    if (!idsForRole || idsForRole.length === 0) continue

    if (role === 'carb' && idsForRole.length > 1) {
      lines.push({ ids: idsForRole, role })
    } else {
      for (const id of idsForRole) {
        lines.push({ ids: [id], role })
      }
    }
  }

  return lines
}

