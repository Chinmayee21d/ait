'use client'

import { useEffect } from 'react'
import { CONSENT_EVENT_NAME, CONSENT_STORAGE_KEY, type ConsentState } from '@/lib/consent'

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
    gtag?: (...args: unknown[]) => void
  }
}

function updateConsentSignal(analytics: boolean, marketing: boolean) {
  window.dataLayer = window.dataLayer || []
  ;(window.dataLayer as unknown[]).push(function (this: unknown) {
    // @ts-ignore
    gtag('consent', 'update', {
      analytics_storage: analytics ? 'granted' : 'denied',
      ad_storage: marketing ? 'granted' : 'denied',
      ad_user_data: marketing ? 'granted' : 'denied',
      ad_personalization: marketing ? 'granted' : 'denied',
    })
  })
}

function readAnalyticsConsent(): { analytics: boolean; marketing: boolean } | null {
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as { analytics?: boolean; marketing?: boolean }
    if (typeof parsed?.analytics !== 'boolean') return null
    return { analytics: parsed.analytics, marketing: parsed.marketing ?? false }
  } catch {
    return null
  }
}

export default function GtmConsentLoader({ gtmId: _ }: { gtmId: string }) {
  // GTM is now loaded directly in layout.tsx <head> — this component
  // only handles sending consent update signals to an already-loaded GTM.
  useEffect(() => {
    // Fire consent update as early as possible — this runs before
    // GTM processes its queue because useEffect fires synchronously
    // after the first paint, within the wait_for_update window.
    const saved = readAnalyticsConsent()

    if (saved) {
      // Returning visitor — update consent immediately
      updateConsentSignal(saved.analytics, saved.marketing)
    }

    // Listen for banner interactions
    const onConsentUpdate = (e: CustomEvent<ConsentState>) => {
      updateConsentSignal(e.detail.analytics, e.detail.marketing)
    }

    window.addEventListener(CONSENT_EVENT_NAME, onConsentUpdate as EventListener)
    return () => {
      window.removeEventListener(CONSENT_EVENT_NAME, onConsentUpdate as EventListener)
    }
  }, [])

  return null
}
