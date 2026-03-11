'use client'

import { PANTRY_SECTIONS } from '@/lib/domain/ingredients'
import { PantrySection } from './pantry-section'
import { KitchenTips } from './kitchen-tips'

export function StockTab() {
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
        {PANTRY_SECTIONS.map((section) => (
          <PantrySection key={section.id} section={section} />
        ))}
      </div>

      <div className="pt-6 border-t-3 border-foreground">
        <KitchenTips />
      </div>
    </div>
  )
}
