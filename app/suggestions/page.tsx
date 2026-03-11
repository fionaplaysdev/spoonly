'use client'

import { Suspense, useEffect, useMemo, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

import { EnergySection } from '@/components/energy-section'
import { BottomNav } from '@/components/bottom-nav'
import {
  INGREDIENTS,
  normalizeLegacyIngredientId,
} from '@/lib/domain/ingredients'
import {
  getSuggestionsForIngredients,
  groupSuggestionsByEnergy,
} from '@/lib/domain/suggestions'
import type { EnergyLevel, ScoredSuggestion } from '@/lib/domain/types'
import type { ConfidenceTier, SubstitutionMatch } from '@/lib/ui/types'
import { buildDisplayIngredientLines } from '@/lib/domain/presentation'

type DisplayMeal = {
  id: string
  name: string
  time: string
  minutes: number
  steps: number
  tags: string[]
  ingredients: string[]
  instructions: string[]
  energyLevel: EnergyLevel
  availableIngredientIds: string[]
  missingIngredientIds: string[]
  confidenceTier?: ConfidenceTier
  substitutionMatches?: SubstitutionMatch[]
  displayIngredientLines?: {
    ids: string[]
    role?: string
  }[]
}

function toDisplayMeal(suggestion: ScoredSuggestion): DisplayMeal {
  const { template, detail } = suggestion

  const flatIngredients = Object.values(template.ingredientsByRole)
    .filter((ids): ids is string[] => Array.isArray(ids))
    .flat()

  const substitutionMatches =
    detail.suggestedReplacements?.flatMap((rep) =>
      (rep.replacementIds ?? []).length > 0
        ? [
            {
              requiredIngredientId: rep.missingId,
              substituteIngredientId: rep.replacementIds[0],
            },
          ]
        : [],
    ) ?? []

  const displayIngredientLines = buildDisplayIngredientLines(template)

  return {
    id: template.id,
    name: template.name,
    time: `${template.minutes} mins`,
    minutes: template.minutes,
    steps: template.steps,
    tags: template.tags,
    ingredients: flatIngredients,
    instructions: template.instructions,
    energyLevel: template.energyLevel,
    availableIngredientIds: detail.matchedIngredientIds,
    missingIngredientIds: detail.missingIngredientIds,
    confidenceTier: detail.confidenceTier,
    substitutionMatches,
    displayIngredientLines,
  }
}

function SuggestionsContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [pantryIds, setPantryIds] = useState<string[]>([])

  // IDs passed from Cook tab (union of stock + manual selections, using legacy ids)
  const rawSelectedIds = useMemo(() => {
    const ids = searchParams.get('ingredients')
    return ids ? ids.split(',') : []
  }, [searchParams])

  // Load pantry stock from localStorage (uses same legacy ids as StockProvider)
  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const stored = window.localStorage.getItem('pantry-stock')
      if (!stored) return
      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed)) {
        setPantryIds(parsed as string[])
      }
    } catch {
      // Ignore malformed storage and fall back to treating all ids as selected-only
    }
  }, [])

  // Derive which ids are truly "selected" vs already in pantry, using legacy ids
  const legacyPantrySet = useMemo(() => new Set(pantryIds), [pantryIds])
  const legacySelectedOnlyIds = useMemo(
    () => rawSelectedIds.filter((id) => !legacyPantrySet.has(id)),
    [rawSelectedIds, legacyPantrySet],
  )

  // Normalize to domain ingredient ids for the suggestion engine
  const domainPantryIds = useMemo(
    () =>
      Array.from(
        new Set(
          pantryIds
            .map(normalizeLegacyIngredientId)
            .filter((id): id is string => id !== null),
        ),
      ),
    [pantryIds],
  )

  const domainSelectedIds = useMemo(
    () =>
      Array.from(
        new Set(
          legacySelectedOnlyIds
            .map(normalizeLegacyIngredientId)
            .filter((id): id is string => id !== null),
        ),
      ),
    [legacySelectedOnlyIds],
  )

  const suggestions = useMemo(() => {
    if (domainSelectedIds.length === 0 && domainPantryIds.length === 0) {
      return []
    }

    return getSuggestionsForIngredients({
      pantryIds: domainPantryIds,
      selectedIds: domainSelectedIds,
      allIngredients: INGREDIENTS,
    })
  }, [domainPantryIds, domainSelectedIds])

  const groupedDisplayMeals = useMemo(() => {
    const grouped = groupSuggestionsByEnergy(suggestions)

    return {
      'barely-functioning': grouped['barely-functioning'].map((s) =>
        toDisplayMeal(s),
      ),
      'low-effort': grouped['low-effort'].map((s) => toDisplayMeal(s)),
      'some-energy': grouped['some-energy'].map((s) =>
        toDisplayMeal(s),
      ),
    }
  }, [suggestions])

  const hasResults =
    suggestions.length > 0 &&
    (groupedDisplayMeals['barely-functioning'].length > 0 ||
      groupedDisplayMeals['low-effort'].length > 0 ||
      groupedDisplayMeals['some-energy'].length > 0)

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-lg mx-auto px-4 py-6 pb-24 space-y-8">
        {/* Header */}
        <div className="flex items-start gap-4">
          <Link href="/" className="mt-2">
            <ArrowLeft className="w-6 h-6 text-foreground" strokeWidth={2.5} />
          </Link>
          <h1 className="font-display text-4xl font-black uppercase leading-none tracking-tight text-foreground">
            Quick<br />
            cook inspo
          </h1>
        </div>

        {hasResults ? (
          <div className="space-y-8">
            <EnergySection
              level="barely-functioning"
              meals={groupedDisplayMeals['barely-functioning']}
              selectedIngredients={domainSelectedIds}
            />
            <EnergySection
              level="low-effort"
              meals={groupedDisplayMeals['low-effort']}
              selectedIngredients={domainSelectedIds}
            />
            <EnergySection
              level="some-energy"
              meals={groupedDisplayMeals['some-energy']}
              selectedIngredients={domainSelectedIds}
            />
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No meal ideas for those ingredients yet.
            </p>
            <Link
              href="/"
              className="inline-block mt-4 px-4 py-2 border-2 border-foreground font-bold uppercase text-sm tracking-wider hover:bg-foreground hover:text-card transition-colors"
            >
              Try different ingredients
            </Link>
          </div>
        )}
      </div>
      <BottomNav activeTab="cook" onTabChange={() => router.push('/')} />
    </div>
  )
}

/** Static shell shown during prerender / until searchParams and client state are ready. */
function SuggestionsFallback() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-lg mx-auto px-4 py-6 pb-24 space-y-8">
        <div className="flex items-start gap-4">
          <Link href="/" className="mt-2">
            <ArrowLeft className="w-6 h-6 text-foreground" strokeWidth={2.5} />
          </Link>
          <h1 className="font-display text-4xl font-black uppercase leading-none tracking-tight text-foreground">
            Quick<br />
            cook inspo
          </h1>
        </div>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading…</p>
        </div>
      </div>
    </div>
  )
}

export default function SuggestionsPage() {
  return (
    <Suspense fallback={<SuggestionsFallback />}>
      <SuggestionsContent />
    </Suspense>
  )
}
