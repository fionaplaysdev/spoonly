import { StockProvider } from '@/lib/stock-context'
import { AppShell } from '@/components/app-shell'

export default function Home() {
  return (
    <StockProvider>
      <AppShell />
    </StockProvider>
  )
}
