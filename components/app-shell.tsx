'use client'

import { useState } from 'react'
import { usePostHog } from 'posthog-js/react'
import { BottomNav } from './bottom-nav'
import { CookTab } from './cook-tab'
import { StockTab } from './stock-tab'

export function AppShell() {
  const [activeTab, setActiveTab] = useState<'cook' | 'stock'>('cook')
  const posthog = usePostHog()

  const handleTabChange = (tab: 'cook' | 'stock') => {
    posthog.capture('tab_changed', {
      tab,
      previous_tab: activeTab,
    })
    setActiveTab(tab)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Brand header */}
      <header className="bg-card px-4 pt-4 pb-3">
        <div className="max-w-lg mx-auto">
          <span className="font-serif text-2xl text-foreground">Spoonly</span>
        </div>
      </header>

      {/* Divider line */}
      <div className="border-t-3 border-foreground" />

      <main className="pb-24 px-4 pt-6 max-w-lg mx-auto">
        {activeTab === 'cook' ? <CookTab /> : <StockTab />}
      </main>
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  )
}
