'use client'

import { useState } from 'react'
import type { Meal } from '@/lib/types'
import { getIngredientName } from '@/lib/domain/ingredients'
import { SpoonIcon } from './spoon-icon'

type MealWithAvailability = Meal & {
  availableIngredientIds?: string[]
  missingIngredientIds?: string[]
  confidenceTier?: 'make-now' | 'almost-there' | 'invalid'
  substitutionMatches?: {
    requiredIngredientId: string
    substituteIngredientId: string
  }[]
}

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
              <span className="inline-flex items-center px-2 py-0.5 rounded-full border border-foreground bg-energy-some text-[10px] font-bold uppercase tracking-wider text-foreground">
                Make now
              </span>
            )}
            {meal.confidenceTier === 'almost-there' && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full border border-border bg-[color:var(--highlight-yellow)] text-[10px] font-bold uppercase tracking-wider text-foreground">
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
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
              Ingredients
            </h4>
            <ul className="space-y-1">
              {meal.ingredients.map((ing) => {
                const hasIngredient = availableSet.has(ing)
                const substituteId = substitutionMap.get(ing)

                const iconChar = hasIngredient ? '✓' : substituteId ? '↺' : '○'
                const iconClasses = hasIngredient
                  ? 'border-foreground bg-foreground text-card'
                  : substituteId
                    ? 'border-foreground text-foreground'
                    : 'border-muted-foreground text-muted-foreground'

                return (
                  <li
                    key={ing}
                    className="flex items-center gap-2 text-sm text-foreground"
                  >
                    <span
                      className={`inline-flex items-center justify-center w-4 h-4 rounded-full border text-[10px] ${iconClasses}`}
                    >
                      {iconChar}
                    </span>
                    <div className="flex flex-col">
                      <span>{getIngredientName(ing)}</span>
                      {substituteId && (
                        <span className="text-[11px] text-muted-foreground">
                          using {getIngredientName(substituteId)}
                        </span>
                      )}
                    </div>
                  </li>
                )
              })}
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
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
              Instructions
            </h4>
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
