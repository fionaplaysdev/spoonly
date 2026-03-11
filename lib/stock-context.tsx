'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

import { normalizeLegacyIngredientId } from './domain/ingredients'

interface StockContextType {
  inStock: Set<string>
  toggleStock: (ingredientId: string) => void
  isInStock: (ingredientId: string) => boolean
}

const StockContext = createContext<StockContextType | undefined>(undefined)

const STORAGE_KEY = 'pantry-stock'

export function StockProvider({ children }: { children: ReactNode }) {
  const [inStock, setInStock] = useState<Set<string>>(new Set())
  const [isLoaded, setIsLoaded] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        const ids: string[] = Array.isArray(parsed) ? parsed : []
        const normalized = ids
          .map((id) => normalizeLegacyIngredientId(id))
          .filter((id): id is string => !!id)
        setInStock(new Set(normalized))
      } catch {
        // Invalid data, start fresh
      }
    }
    setIsLoaded(true)
  }, [])

  // Save to localStorage when stock changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...inStock]))
    }
  }, [inStock, isLoaded])

  const toggleStock = (ingredientId: string) => {
    setInStock((prev) => {
      const next = new Set(prev)
      if (next.has(ingredientId)) {
        next.delete(ingredientId)
      } else {
        next.add(ingredientId)
      }
      return next
    })
  }

  const isInStock = (ingredientId: string) => inStock.has(ingredientId)

  return (
    <StockContext.Provider value={{ inStock, toggleStock, isInStock }}>
      {children}
    </StockContext.Provider>
  )
}

export function useStock() {
  const context = useContext(StockContext)
  if (!context) {
    throw new Error('useStock must be used within a StockProvider')
  }
  return context
}
