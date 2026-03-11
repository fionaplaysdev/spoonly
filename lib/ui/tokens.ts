export const STATUS_TAG_CLASSES = {
  'make-now':
    'inline-flex items-center px-2 py-0.5 rounded-full border border-foreground bg-energy-some text-[10px] font-bold uppercase tracking-wider text-foreground',
  'almost-there':
    'inline-flex items-center px-2 py-0.5 rounded-full border border-border bg-[color:var(--highlight-yellow)] text-[10px] font-bold uppercase tracking-wider text-foreground',
} as const

export const INGREDIENT_ICON_CLASSES = {
  available: 'border-foreground bg-foreground text-card',
  substitute: 'border-foreground text-foreground',
  missing: 'border-muted-foreground text-muted-foreground',
} as const

