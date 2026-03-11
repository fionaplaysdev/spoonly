export interface Ingredient {
  id: string
  name: string
  category: string
  isCore?: boolean
}

export interface Meal {
  id: string
  name: string
  time: string
  minutes: number
  steps: number
  tags: string[]
  ingredients: string[]
  instructions: string[]
  energyLevel: 'barely-functioning' | 'low-effort' | 'some-energy'
}

export interface PantryCategory {
  id: string
  name: string
  description: string
  ingredients: Ingredient[]
}

export interface KitchenTip {
  id: string
  tip: string
}
