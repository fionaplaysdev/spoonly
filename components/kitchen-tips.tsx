'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Lightbulb } from 'lucide-react'
import { kitchenTips } from '@/lib/data'

export function KitchenTips() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Lightbulb className="w-5 h-5 text-accent" />
        <h2 className="font-semibold text-foreground">Kitchen Tips</h2>
      </div>
      <div className="grid gap-2">
        {kitchenTips.map((tip) => (
          <Card key={tip.id} className="border border-border/50 bg-accent/10">
            <CardContent className="p-3">
              <p className="text-sm text-foreground">{tip.tip}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
