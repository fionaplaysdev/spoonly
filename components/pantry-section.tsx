'use client'

import { useStock } from '@/lib/stock-context'
import { cn } from '@/lib/utils'
import type { PantrySectionMeta } from '@/lib/domain/ingredients'
import { getIngredientById } from '@/lib/domain/ingredients'

interface PantrySectionProps {
  section: PantrySectionMeta
}

export function PantrySection({ section }: PantrySectionProps) {
  const { isInStock, toggleStock } = useStock()

  const ingredients = section.ingredientIds
    .map((id) => getIngredientById(id))
    .filter((ing): ing is NonNullable<ReturnType<typeof getIngredientById>> => !!ing)

  return (
    <div className="space-y-3">
      <h3 className="font-bold text-sm uppercase tracking-wider text-foreground">
        {section.name}
      </h3>
      <div className="space-y-2">
        {ingredients.map((ingredient) => {
          const inStock = isInStock(ingredient.id)
          return (
            <button
              key={ingredient.id}
              onClick={() => toggleStock(ingredient.id)}
              className={cn(
                'w-full flex items-center gap-3 p-4 border-2 border-foreground transition-all touch-manipulation text-left',
                'hover:[background-color:var(--highlight-yellow)]',
                'bg-card',
              )}
            >
              {/* Checkbox */}
              <div
                className={cn(
                  'w-5 h-5 border-2 border-foreground flex items-center justify-center shrink-0',
                  inStock && '[background-color:var(--highlight-pink)]',
                )}
              >
                {inStock && (
                  <svg
                    className="w-3 h-3 text-foreground"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
              <span className="text-base text-foreground">{ingredient.name}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
