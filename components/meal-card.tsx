'use client'

import { useState } from 'react'
import type { Meal } from '@/lib/types'
import { allIngredients } from '@/lib/data'
import { SpoonIcon } from './spoon-icon'

interface MealCardProps {
  meal: Meal
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
  
  const getIngredientName = (id: string) => {
    return allIngredients.find((i) => i.id === id)?.name || id
  }

  const config = levelConfig[energyLevel]

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
        
        {/* Title and time */}
        <div className="flex-1 p-4">
          <h3 className="font-display text-lg font-black uppercase leading-tight">
            {meal.name}
          </h3>
          <span className="text-sm text-muted-foreground">
            {meal.time}
          </span>
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
              {meal.ingredients.map((ing) => (
                <li key={ing} className="text-sm text-foreground">
                  {getIngredientName(ing)}
                </li>
              ))}
            </ul>
          </div>

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
