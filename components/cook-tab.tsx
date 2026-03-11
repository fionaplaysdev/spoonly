'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useStock } from '@/lib/stock-context'
import { INGREDIENTS } from '@/lib/domain/ingredients'
import { toast } from '@/hooks/use-toast'
import { ChevronDown, ChevronUp, X, ArrowRight } from 'lucide-react'

export function CookTab() {
  const router = useRouter()
  const { inStock, isInStock, toggleStock } = useStock()
  const [selectedIngredients, setSelectedIngredients] = useState<Set<string>>(new Set())
  const [searchQuery, setSearchQuery] = useState('')
  const [showStockDetails, setShowStockDetails] = useState(false)
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Get ingredients that are in stock
  const stockedIngredients = useMemo(() => {
    return INGREDIENTS.filter((ing) => isInStock(ing.id))
  }, [isInStock])

  // Get ingredients that are NOT in stock and NOT already selected
  const availableIngredients = useMemo(() => {
    return INGREDIENTS.filter((ing) => !isInStock(ing.id) && !selectedIngredients.has(ing.id))
  }, [isInStock, selectedIngredients])

  // Filter available ingredients by search
  const filteredIngredients = useMemo(() => {
    if (searchQuery === '') return availableIngredients
    return availableIngredients.filter((ing) =>
      ing.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [availableIngredients, searchQuery])

  const addIngredient = (id: string) => {
    const ingredient = INGREDIENTS.find((ing) => ing.id === id)
    setSelectedIngredients((prev) => new Set(prev).add(id))
    setSearchQuery('')
    
    if (ingredient) {
      toast({
        description: `Added ${ingredient.name}`,
        duration: 1500,
      })
    }
  }

  const removeIngredient = (id: string) => {
    setSelectedIngredients((prev) => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }

  // Get selected ingredient objects for display
  const selectedIngredientObjects = useMemo(() => {
    return INGREDIENTS.filter((ing) => selectedIngredients.has(ing.id))
  }, [selectedIngredients])

  // Total selected = stocked + manually selected
  const allSelected = [...inStock, ...selectedIngredients]
  const hasSelection = allSelected.length > 0

  const handleFindMeals = () => {
    const ingredientIds = allSelected.join(',')
    router.push(`/suggestions?ingredients=${encodeURIComponent(ingredientIds)}`)
  }

  return (
    <div className="space-y-6">
      {/* Bold headline */}
      <h1 className="font-display text-5xl font-black uppercase leading-none tracking-tight text-foreground">
        What's in<br />the<br />cupboard?
      </h1>

      {/* Search input with dropdown */}
      <div ref={searchRef} className="relative">
        <div className="relative">
          <input
            type="text"
            placeholder="SEARCH FOR INGREDIENTS..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            className="w-full bg-transparent border-b-3 border-foreground pb-2 pr-8 text-sm font-medium uppercase tracking-wider placeholder:text-muted-foreground focus:outline-none"
          />
          {isSearchFocused && (
            <button
              onClick={() => {
                setIsSearchFocused(false)
                setSearchQuery('')
              }}
              className="absolute right-0 top-0 p-1 text-foreground hover:opacity-70 transition-opacity"
            >
              <X className="w-5 h-5" strokeWidth={2.5} />
            </button>
          )}
        </div>
        
        {/* Dropdown results */}
        {isSearchFocused && filteredIngredients.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-card border-2 border-foreground max-h-64 overflow-y-auto z-10">
            {filteredIngredients.map((ing) => (
              <button
                key={ing.id}
                onClick={() => addIngredient(ing.id)}
                className="w-full px-4 py-3 text-left text-sm font-medium uppercase tracking-wide border-b border-border last:border-b-0 hover:[background-color:var(--highlight-yellow)] transition-colors"
              >
                {ing.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Let's cook button - below search */}
      {hasSelection && (
        <button
          onClick={handleFindMeals}
          className="w-full flex items-center justify-center gap-3 py-4 px-6 border-3 border-foreground bg-card font-display text-xl font-black uppercase tracking-tight text-foreground hover:[background-color:var(--highlight-yellow)] transition-colors"
        >
          Let's Cook
          <ArrowRight className="w-5 h-5" strokeWidth={3} />
        </button>
      )}

      {/* Selected ingredients as tags */}
      {selectedIngredientObjects.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedIngredientObjects.map((ing) => (
            <button
              key={ing.id}
              onClick={() => removeIngredient(ing.id)}
              className="flex items-center gap-2 px-3 py-2 border-2 border-foreground text-sm font-bold uppercase tracking-wide [background-color:var(--highlight-yellow)] hover:opacity-80 transition-opacity"
            >
              {ing.name}
              <X className="w-3.5 h-3.5" strokeWidth={3} />
            </button>
          ))}
        </div>
      )}

      {/* In stock summary - small text line */}
      {stockedIngredients.length > 0 && (
        <div className="space-y-2">
          <button
            onClick={() => setShowStockDetails(!showStockDetails)}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            <span>+ {stockedIngredients.length} ingredient{stockedIngredients.length !== 1 ? 's' : ''} from your stock</span>
            {showStockDetails ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </button>
          
          {showStockDetails && (
            <div className="flex flex-wrap gap-2">
              {stockedIngredients.map((ing) => (
                <button
                  key={ing.id}
                  onClick={() => toggleStock(ing.id)}
                  className="flex items-center gap-2 px-3 py-2 border-2 border-foreground text-sm font-bold uppercase tracking-wide bg-card hover:[background-color:var(--highlight-yellow)] transition-colors"
                >
                  {ing.name}
                  <X className="w-3.5 h-3.5" strokeWidth={3} />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {!hasSelection && (
        <p className="text-sm text-muted-foreground">
          Search and add ingredients, or add some from your Stock tab
        </p>
      )}
    </div>
  )
}
