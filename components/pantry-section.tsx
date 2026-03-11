'use client'

import { useState, useMemo } from 'react'
import { Lightbulb } from 'lucide-react'
import { usePostHog } from 'posthog-js/react'
import { useStock } from '@/lib/stock-context'
import { cn } from '@/lib/utils'
import type { PantrySectionMeta } from '@/lib/domain/ingredients'
import { getIngredientById } from '@/lib/domain/ingredients'
import { MEAL_TEMPLATES } from '@/lib/domain/meals'
import { toast } from '@/hooks/use-toast'

interface PantrySectionProps {
  section: PantrySectionMeta
}

export function PantrySection({ section }: PantrySectionProps) {
  const { isInStock, toggleStock } = useStock()
  const posthog = usePostHog()

  const [expanded, setExpanded] = useState(true)

  const ingredients = useMemo(
    () =>
      section.ingredientIds
        .map((id) => getIngredientById(id))
        .filter(
          (ing): ing is NonNullable<ReturnType<typeof getIngredientById>> =>
            !!ing,
        ),
    [section.ingredientIds],
  )

  const stockedCount = useMemo(
    () => ingredients.filter((ingredient) => isInStock(ingredient.id)).length,
    [ingredients, isInStock],
  )

  const GENERIC_STOCK_TITLE_TEMPLATES = [
    'Nice. You got {ingredient}.',
    'Good call. {ingredient} added.',
    'Perfect. {ingredient} in the pantry.',
    'Solid choice. {ingredient} stocked.',
    'Lovely. {ingredient} is in play.',
    'Nice one. {ingredient} ready to go.',
  ] as const

  const INGREDIENT_STOCK_TITLES: Record<string, string[]> = {
    'miso-paste': [
      'Nice. You got miso paste. Tiny tub, huge potential.',
      'Good call. Miso paste is in. Broth awaits.',
      'Excellent. Miso paste added. Soup energy unlocked.',
    ],
    'chilli-crisp': [
      'Nice. You got chilli crisp. Immediate upgrade.',
      'Good. Chilli crisp is in play. Things just got more interesting.',
      'Lovely. Chilli crisp added. Crunch, heat, joy.',
    ],
    'peanut-butter': [
      'Nice. You got peanut butter. Sauce in seconds.',
      'Good call. Peanut butter added. Noodles are looking likely.',
      'Perfect. Peanut butter is in. A strong pantry move.',
    ],
    tahini: [
      'Nice. You got tahini. Very useful, very smug.',
      'Good call. Tahini added. Sauces sorted.',
      'Lovely. Tahini is in. Creamy things ahead.',
    ],
    'stock-cubes': [
      'Nice. You got stock cubes. Instant soup potential.',
      'Good. Stock cubes added. Water has options now.',
      'Excellent. Stock cubes are in. Emergency broth secured.',
    ],
    ginger: [
      'Nice. You got ginger. Freeze it, grate it, feel clever.',
      'Good call. Ginger added. Future you says thanks.',
      'Lovely. Ginger is in. Tiny root, big impact.',
    ],
    'sesame-oil': [
      'Nice. You got sesame oil. Finish strong.',
      'Good. Sesame oil added. Tiny drizzle, major effect.',
      'Perfect. Sesame oil is in. A little goes a long way.',
    ],
    'curry-paste': [
      'Nice. You got curry paste. Dinner got easier.',
      'Good call. Curry paste added. Big flavour, low effort.',
      'Excellent. Curry paste is in. Bowl food incoming.',
    ],
    feta: [
      'Nice. You got feta. Salty little hero.',
      'Good. Feta added. Crumble potential rising.',
      'Lovely. Feta is in. That’ll improve a lot of things.',
    ],
    halloumi: [
      'Nice. You got halloumi. Excellent behaviour.',
      'Good call. Halloumi added. That’s a real meal starter.',
      'Lovely. Halloumi is in. Things just got more substantial.',
    ],
    'spring-onions': [
      'Nice. You got spring onions. Instant finishing touch.',
      'Good. Spring onions added. A garnish with ambition.',
      'Lovely. Spring onions are in. Surprisingly useful, actually.',
    ],
    avocado: [
      'Nice. You got avocado. Very strong energy.',
      'Good call. Avocado added. Soft, useful, smug.',
      'Lovely. Avocado is in. That’ll carry a meal.',
    ],
  }

  const getStockTitle = (ingredientId: string, ingredientName: string) => {
    const templates =
      INGREDIENT_STOCK_TITLES[ingredientId] ?? GENERIC_STOCK_TITLE_TEMPLATES
    const index = Math.floor(Math.random() * templates.length)
    return templates[index].replace('{ingredient}', ingredientName)
  }

  const showStockToast = (ingredientId: string) => {
    const ingredient = getIngredientById(ingredientId)
    if (!ingredient) return
    const ingredientName = ingredient.name

    const templates = MEAL_TEMPLATES.filter((template) => {
      const allIds = Object.values(template.ingredientsByRole)
        .filter((ids): ids is string[] => Array.isArray(ids))
        .flat()
      return allIds.includes(ingredientId)
    }).slice(0, 3)

    if (templates.length === 0) {
      toast({
        title: getStockTitle(ingredientId, ingredientName),
        description: 'Nice. A great base for future low-effort meals.',
        duration: 2500,
      })
      return
    }

    const lines = templates.map((t) => `• ${t.name}`)

    toast({
      title: getStockTitle(ingredientId, ingredientName),
      description: (
        <div className="space-y-1">
          <p>Great for:</p>
          <div className="flex flex-col">
            {lines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </div>
        </div>
      ),
      duration: 3000,
    })
  }


  const handleClearSection = () => {
    const clearedCount = ingredients.filter((ing) => isInStock(ing.id)).length
    ingredients.forEach((ingredient) => {
      if (isInStock(ingredient.id)) {
        toggleStock(ingredient.id)
      }
    })
    posthog.capture('pantry_section_cleared', {
      section_id: section.id,
      section_name: section.name,
      ingredients_cleared: clearedCount,
    })
  }

  return (
    <div className="bg-card border-2 border-foreground p-4 space-y-4">
      {/* Header row */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className="text-left"
          >
            <h3 className="font-bold text-sm uppercase tracking-wider text-foreground">
              {section.name}
            </h3>
            <p className="text-xs text-muted-foreground">
              {section.description}
            </p>
          </button>
          <p className="text-xs text-muted-foreground">
            {stockedCount} of {ingredients.length} stocked
          </p>

          {/* Progress bar */}
          <div className="mt-1 h-2 w-full rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-energy-low"
              style={{
                width:
                  ingredients.length === 0
                    ? '0%'
                    : `${Math.round(
                        (stockedCount / ingredients.length) * 100,
                      )}%`,
              }}
            />
          </div>
          {ingredients.length > 0 && stockedCount === ingredients.length && (
            <p className="text-xs text-foreground mt-1">
              Nice. You&apos;re fully stocked here.
            </p>
          )}
        </div>
        <div className="flex flex-col items-end gap-2">
          <button
            type="button"
            onClick={handleClearSection}
            className="text-xs font-medium text-muted-foreground hover:text-foreground underline-offset-2 hover:underline"
          >
            Clear section
          </button>
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            {expanded ? 'Hide' : 'Show'}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="space-y-3">
          {section.tip && (
            <div className="flex items-start gap-2 rounded-md border border-border bg-[color:var(--highlight-yellow)] px-3 py-2 text-xs text-foreground">
              <span className="mt-[1px]">
                <Lightbulb className="w-4 h-4" />
              </span>
              <div className="space-y-1">
                <p className="font-semibold text-[11px] uppercase tracking-wide">
                  Kitchen tip
                </p>
                <p>{section.tip.text}</p>
              </div>
            </div>
          )}

          <div className="space-y-2">
            {ingredients.map((ingredient) => {
              const inStock = isInStock(ingredient.id)
              return (
                <button
                  key={ingredient.id}
                  onClick={() => {
                    const wasInStock = isInStock(ingredient.id)
                    toggleStock(ingredient.id)
                    posthog.capture('stock_ingredient_toggled', {
                      ingredient_id: ingredient.id,
                      ingredient_name: ingredient.name,
                      section_id: section.id,
                      section_name: section.name,
                      action: wasInStock ? 'removed' : 'added',
                    })
                    if (!wasInStock) {
                      showStockToast(ingredient.id)
                    }
                  }}
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
                  <span className="text-base text-foreground">
                    {ingredient.name}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
