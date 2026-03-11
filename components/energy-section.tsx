'use client'

import { useState } from 'react'
import { usePostHog } from 'posthog-js/react'
import { MealCard } from './meal-card'
import { Zap, Flame } from 'lucide-react'
import type { MealWithAvailability } from '@/lib/ui/types'

interface EnergySectionProps {
  level: 'barely-functioning' | 'low-effort' | 'some-energy'
  meals: MealWithAvailability[]
  selectedIngredients: string[]
}

const levelConfig = {
  'barely-functioning': {
    title: 'Barely Functioning',
    iconBg: 'bg-energy-barely',
    icon: Zap,
  },
  'low-effort': {
    title: 'Low Effort',
    iconBg: 'bg-energy-low',
    icon: Flame,
  },
  'some-energy': {
    title: 'Some Energy',
    iconBg: 'bg-energy-some',
    icon: Flame,
  },
}

export function EnergySection({ level, meals, selectedIngredients }: EnergySectionProps) {
  const [expanded, setExpanded] = useState(false)
  const posthog = usePostHog()
  const config = levelConfig[level]

  if (meals.length === 0) return null

  const topMeal = meals[0]
  const remainingMeals = meals.slice(1)
  const hasMore = remainingMeals.length > 0

  const handleToggleExpand = () => {
    if (!expanded) {
      posthog.capture('more_meals_expanded', {
        energy_level: level,
        additional_meals_count: remainingMeals.length,
      })
    }
    setExpanded(!expanded)
  }

  return (
    <div className="space-y-3">
      {/* Energy level pill */}
      <div className="inline-block bg-primary text-primary-foreground px-4 py-2 text-xs font-bold uppercase tracking-wider">
        {config.title}
      </div>

      {/* Top meal card */}
      <MealCard
        meal={topMeal}
        selectedIngredients={selectedIngredients}
        energyLevel={level}
      />

      {/* Expandable remaining meals */}
      {hasMore && (
        <>
          {expanded && (
            <div className="space-y-3">
              {remainingMeals.map((meal) => (
                <MealCard
                  key={meal.id}
                  meal={meal}
                  selectedIngredients={selectedIngredients}
                  energyLevel={level}
                />
              ))}
            </div>
          )}
          <button
            onClick={handleToggleExpand}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {expanded ? 'Show less' : `+${remainingMeals.length} more`}
          </button>
        </>
      )}
    </div>
  )
}
