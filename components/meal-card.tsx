'use client'

import { useState } from 'react'
import { getIngredientName } from '@/lib/domain/ingredients'
import { SpoonIcon } from './spoon-icon'
import { STATUS_TAG_CLASSES, INGREDIENT_ICON_CLASSES, INGREDIENT_ROW_CLASSES } from '@/lib/ui/tokens'
import type { MealWithAvailability } from '@/lib/ui/types'
import { SectionLabel } from './ui/section-label'

interface MealCardProps {
  meal: MealWithAvailability
  selectedIngredients: string[]
  energyLevel?: 'barely-functioning' | 'low-effort' | 'some-energy'
}

const levelConfig = {
  'barely-functioning': { spoons: 1, bg: 'bg-energy-barely' },
  'low-effort': { spoons: 2, bg: 'bg-energy-low' },
  'some-energy': { spoons: 3, bg: 'bg-energy-some' },
}

export function MealCard({ meal, selectedIngredients, energyLevel = 'low-effort' }: MealCardProps) {
  const [expanded, setExpanded] = useState(false)

  const config = levelConfig[energyLevel]
  const availableSet = new Set(meal.availableIngredientIds ?? [])
  const substitutionMap = new Map(
    (meal.substitutionMatches ?? []).map((m) => [
      m.requiredIngredientId,
      m.substituteIngredientId,
    ]),
  )

  return (
    <div 
      className="bg-card border-3 border-foreground overflow-hidden cursor-pointer"
      onClick={() => setExpanded(!expanded)}
    >
      {/* Header row - always visible */}
      <div className="flex">
        {/* Colored icon strip */}
        <div className={`${config.bg} w-20 shrink-0 flex items-center justify-center -space-x-1 py-4`}>
          {Array.from({ length: config.spoons }).map((_, i) => (
            <SpoonIcon key={i} className="w-4 h-8 text-foreground/80" />
          ))}
        </div>
        
        {/* Title, time, and status */}
        <div className="flex-1 p-4">
          <h3 className="font-display text-lg font-black uppercase leading-tight">
            {meal.name}
          </h3>
          <div className="mt-1 space-y-1">
            <span className="block text-sm text-muted-foreground">
              {meal.time}
            </span>
            {meal.confidenceTier === 'make-now' && (
              <span className={STATUS_TAG_CLASSES['make-now']}>
                Make now
              </span>
            )}
            {meal.confidenceTier === 'almost-there' && (
              <span className={STATUS_TAG_CLASSES['almost-there']}>
                Almost there
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Expanded content - full width below header */}
      {expanded && (
        <div className="border-t-3 border-foreground p-4 space-y-4">
          {/* Ingredients */}
          <div>
            <SectionLabel>Ingredients</SectionLabel>
            <ul className="space-y-1">
              {(meal.displayIngredientLines ??
                meal.ingredients.map((id) => ({ ids: [id] }))).map(
                (line, index) => {
                  const ids = line.ids
                  const hasDirect = ids.some((id) => availableSet.has(id))
                  const substituteIdForLine =
                    ids.length === 1 ? substitutionMap.get(ids[0]) : undefined

                  const state = hasDirect
                    ? 'exact'
                    : substituteIdForLine
                      ? 'substituted'
                      : 'missing'

                  const iconChar =
                    state === 'exact'
                      ? '✓'
                      : state === 'substituted'
                        ? '↺'
                        : '○'

                  const iconClasses =
                    state === 'exact'
                      ? INGREDIENT_ICON_CLASSES.available
                      : state === 'substituted'
                        ? INGREDIENT_ICON_CLASSES.substitute
                        : INGREDIENT_ICON_CLASSES.missing

                  const rowClasses = INGREDIENT_ROW_CLASSES[state]

                  const names = ids.map((id) => getIngredientName(id))
                  const label =
                    names.length === 1
                      ? names[0]
                      : names.length === 2
                        ? `${names[0]} or ${names[1]}`
                        : `${names.slice(0, -1).join(', ')} or ${
                            names[names.length - 1]
                          }`

                  const displayText =
                    state === 'substituted' && substituteIdForLine
                      ? `${label} — using ${getIngredientName(substituteIdForLine)}`
                      : label

                  return (
                    <li
                      key={`${label}-${index}`}
                      className={`flex items-center gap-2 rounded px-2 py-0.5 text-sm ${rowClasses}`}
                    >
                      <span
                        className={`inline-flex shrink-0 items-center justify-center w-4 h-4 rounded-full border text-[10px] ${iconClasses}`}
                      >
                        {iconChar}
                      </span>
                      <span className="min-w-0">{displayText}</span>
                    </li>
                  )
                },
              )}
            </ul>
          </div>

          {/* Missing ingredient summary */}
          {meal.missingIngredientIds && meal.missingIngredientIds.length > 0 && (
            <p className="text-xs text-muted-foreground">
              Missing:{' '}
              {meal.missingIngredientIds
                .map((id) => getIngredientName(id))
                .join(', ')}
            </p>
          )}

          {/* Substitution summary */}
          {meal.substitutionMatches && meal.substitutionMatches.length > 0 && (
            <p className="text-xs text-muted-foreground">
              {meal.substitutionMatches
                .map(
                  (m) =>
                    `Using ${getIngredientName(
                      m.substituteIngredientId,
                    )} instead of ${getIngredientName(m.requiredIngredientId)}`,
                )
                .join('. ')}
            </p>
          )}

          {/* Instructions */}
          <div>
            <SectionLabel>Instructions</SectionLabel>
            <ol className="space-y-2">
              {meal.instructions.map((step, index) => (
                <li key={index} className="text-sm text-foreground flex gap-3">
                  <span className="font-bold text-muted-foreground shrink-0">{index + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  )
}
