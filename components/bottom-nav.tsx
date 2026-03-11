'use client'

import { cn } from '@/lib/utils'
import { ChefHat } from 'lucide-react'
import { CupboardIcon } from './cupboard-icon'

interface BottomNavProps {
  activeTab: 'cook' | 'stock'
  onTabChange: (tab: 'cook' | 'stock') => void
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t-3 border-foreground safe-area-pb z-50 bg-card">
      <div className="flex">
        <button
          onClick={() => onTabChange('cook')}
          className={cn(
            'flex-1 flex flex-col items-center gap-1 py-4 px-4 transition-colors touch-manipulation text-foreground',
            'hover:[background-color:var(--highlight-yellow)]',
            activeTab === 'cook'
              ? '[background-color:var(--highlight-pink)]'
              : 'bg-card'
          )}
        >
          <ChefHat className="w-6 h-6" />
          <span className="text-xs font-bold uppercase tracking-wider">Cook</span>
        </button>
        <button
          onClick={() => onTabChange('stock')}
          className={cn(
            'flex-1 flex flex-col items-center gap-1 py-4 px-4 transition-colors touch-manipulation text-foreground',
            'hover:[background-color:var(--highlight-yellow)]',
            activeTab === 'stock'
              ? '[background-color:var(--highlight-pink)]'
              : 'bg-card'
          )}
        >
          <CupboardIcon className="w-6 h-6" />
          <span className="text-xs font-bold uppercase tracking-wider">Stock</span>
        </button>
      </div>
    </nav>
  )
}
