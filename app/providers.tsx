'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import posthog from 'posthog-js'
import { PostHogProvider as PHProvider, usePostHog } from 'posthog-js/react'

function PostHogPageView() {
  const pathname = usePathname()
  const posthogClient = usePostHog()

  useEffect(() => {
    if (pathname && posthogClient) {
      posthogClient.capture('$pageview', { $current_url: window.location.href })
    }
  }, [pathname, posthogClient])

  return null
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST

    if (key && typeof window !== 'undefined') {
      posthog.init(key, {
        api_host: host ?? 'https://us.i.posthog.com',
        capture_pageview: false,
      })
    }
  }, [])

  return (
    <PHProvider client={posthog}>
      <PostHogPageView />
      {children}
    </PHProvider>
  )
}
