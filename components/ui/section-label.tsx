'use client'

interface SectionLabelProps {
  children: React.ReactNode
}

export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
      {children}
    </h4>
  )
}

