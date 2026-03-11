'use client'

import { pantryCategories } from '@/lib/data'
import { PantrySection } from './pantry-section'
import { KitchenTips } from './kitchen-tips'
import { useStock } from '@/lib/stock-context'

export function StockTab() {
  const { inStock } = useStock()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-4xl text-foreground leading-tight">
          Stock your pantry.
        </h1>
        <p className="text-muted-foreground mt-2">
          Keep these staples handy for low-energy cooking.
        </p>
      </div>

      <div className="space-y-8">
        {pantryCategories.map((category) => (
          <PantrySection key={category.id} category={category} />
        ))}
      </div>

      <div className="pt-6 border-t-3 border-foreground">
        <KitchenTips />
      </div>
    </div>
  )
}
