'use client'

import { cn } from '@/lib/utils'

interface IngredientChipProps {
  name: string
  selected: boolean
  onToggle: () => void
}

export function IngredientChip({ name, selected, onToggle }: IngredientChipProps) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        'px-4 py-2.5 text-sm font-bold uppercase tracking-wide transition-all',
        'border-2 border-foreground touch-manipulation text-foreground',
        'hover:[background-color:var(--highlight-yellow)]',
        selected
          ? '[background-color:var(--highlight-yellow)]'
          : 'bg-card'
      )}
    >
      {name}
    </button>
  )
}
