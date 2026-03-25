'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { pushAnalyticsEvent } from '@/lib/analytics'
import { CONSENT_EVENT_NAME, CONSENT_STORAGE_KEY } from '@/lib/consent'

function getSafeText(el: Element) {
  return (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 120)
}

function hasAnalyticsConsent(): boolean {
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY)
    if (!raw) return false
    const parsed = JSON.parse(raw) as { analytics?: boolean }
    return parsed.analytics === true
  } catch {
    return false
  }
}

export default function AnalyticsTracker() {
  const pathname = usePathname()
  const router = useRouter()
  const currentPathRef = useRef<string>('/')

  // ─── Page view ────────────────────────────────────────────────────────────
  useEffect(() => {
    const query = typeof window !== 'undefined' ? window.location.search.replace(/^\?/, '') : ''
    const pagePath = query ? `${pathname}?${query}` : pathname
    currentPathRef.current = pagePath

    const firePageView = () => {
      pushAnalyticsEvent('page_view', {
        page_path: pagePath,
        page_title: document.title,
        page_location: window.location.href,
      })
    }

    if (hasAnalyticsConsent()) {
      firePageView()
      return
    }

    const onConsent = () => {
      if (hasAnalyticsConsent()) firePageView()
    }

    window.addEventListener(CONSENT_EVENT_NAME, onConsent)
    return () => window.removeEventListener(CONSENT_EVENT_NAME, onConsent)
  }, [pathname])

  // ─── Click tracking ───────────────────────────────────────────────────────
  useEffect(() => {
    const onClick = (ev: MouseEvent) => {
      const target = ev.target as HTMLElement | null
      if (!target) return
      const el = target.closest<HTMLElement>('[data-track-event]')
      if (!el) return
      const eventName = el.dataset.trackEvent
      if (!eventName) return

      const href = el instanceof HTMLAnchorElement ? el.href : undefined
      const destination = el.dataset.trackDestination || href || ''
      const isInternalLink = el instanceof HTMLAnchorElement && destination.startsWith('/')

      // Push the analytics event
      pushAnalyticsEvent(eventName, {
        cta_name: el.dataset.trackName || '',
        cta_section: el.dataset.trackSection || '',
        cta_destination: destination,
        cta_label: el.dataset.trackLabel || getSafeText(el),
        page_path: currentPathRef.current,
      })

      // For internal Next.js links, prevent default navigation briefly
      // so the dataLayer push has time to complete before the page unloads.
      // We then navigate programmatically after a short delay.
      if (isInternalLink && !ev.metaKey && !ev.ctrlKey && !ev.shiftKey) {
        ev.preventDefault()
        const path = new URL(href!).pathname
        setTimeout(() => router.push(path), 150)
      }
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [router])

  // ─── Section engagement tracking (homepage only) ──────────────────────────
  useEffect(() => {
    if (pathname !== '/') return
    const sections = Array.from(document.querySelectorAll<HTMLElement>('section[data-track-section]'))
    if (!sections.length) return
    const ratioMap = new Map<string, number>()
    const viewed = new Set<string>()
    const engaged = new Set<string>()
    let activeSection: string | null = null
    let engageTimer: number | undefined

    const setActiveSection = (nextId: string | null) => {
      if (activeSection === nextId) return
      if (engageTimer) window.clearTimeout(engageTimer)
      activeSection = nextId
      if (!nextId) return
      if (!viewed.has(nextId)) {
        viewed.add(nextId)
        pushAnalyticsEvent('section_view', {
          section_id: nextId,
          page_path: currentPathRef.current,
        })
      }
      engageTimer = window.setTimeout(() => {
        if (activeSection !== nextId || engaged.has(nextId)) return
        engaged.add(nextId)
        pushAnalyticsEvent('section_engaged_15s', {
          section_id: nextId,
          page_path: currentPathRef.current,
          engaged_seconds: 15,
        })
      }, 15000)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('data-track-section')
          if (!id) return
          ratioMap.set(id, entry.isIntersecting ? entry.intersectionRatio : 0)
        })
        let candidate: string | null = null
        let best = 0
        ratioMap.forEach((ratio, id) => {
          if (ratio > best) {
            best = ratio
            candidate = id
          }
        })
        setActiveSection(best >= 0.5 ? candidate : null)
      },
      { threshold: [0.25, 0.5, 0.75] }
    )

    sections.forEach((section) => observer.observe(section))
    return () => {
      observer.disconnect()
      if (engageTimer) window.clearTimeout(engageTimer)
    }
  }, [pathname])

  return null
}
