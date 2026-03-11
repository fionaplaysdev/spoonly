'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useMemo, Suspense } from 'react'
import Link from 'next/link'
import { getMealsForIngredients, groupMealsByEnergy } from '@/lib/data'
import { EnergySection } from '@/components/energy-section'
import { BottomNav } from '@/components/bottom-nav'
import { ArrowLeft } from 'lucide-react'

function SuggestionsContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const selectedIds = useMemo(() => {
    const ids = searchParams.get('ingredients')
    return ids ? ids.split(',') : []
  }, [searchParams])

  const matchingMeals = getMealsForIngredients(selectedIds)
  const groupedMeals = groupMealsByEnergy(matchingMeals)
  const hasResults = matchingMeals.length > 0

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-lg mx-auto px-4 py-6 pb-24 space-y-8">
        {/* Header */}
        <div className="flex items-start gap-4">
          <Link href="/" className="mt-2">
            <ArrowLeft className="w-6 h-6 text-foreground" strokeWidth={2.5} />
          </Link>
          <h1 className="font-display text-4xl font-black uppercase leading-none tracking-tight text-foreground">
            Quick<br />cook inspo
          </h1>
        </div>

        {hasResults ? (
          <div className="space-y-8">
            <EnergySection
              level="barely-functioning"
              meals={groupedMeals['barely-functioning']}
              selectedIngredients={selectedIds}
            />
            <EnergySection
              level="low-effort"
              meals={groupedMeals['low-effort']}
              selectedIngredients={selectedIds}
            />
            <EnergySection
              level="some-energy"
              meals={groupedMeals['some-energy']}
              selectedIngredients={selectedIds}
            />
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No meal ideas for those ingredients yet.
            </p>
            <Link href="/" className="inline-block mt-4 px-4 py-2 border-2 border-foreground font-bold uppercase text-sm tracking-wider hover:bg-foreground hover:text-card transition-colors">
              Try different ingredients
            </Link>
          </div>
        )}
      </div>
      <BottomNav activeTab="cook" onTabChange={() => router.push('/')} />
    </div>
  )
}

export default function SuggestionsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    }>
      <SuggestionsContent />
    </Suspense>
  )
}
