'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { readConsent, writeConsent } from '@/lib/consent-client'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)
  const [showManage, setShowManage] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)
  const [aiTraining, setAiTraining] = useState(false)

  useEffect(() => {
    const existing = readConsent()
    if (!existing) {
      setVisible(true)
      return
    }
    setAnalytics(existing.analytics)
    setMarketing(existing.marketing)
    setAiTraining(existing.ai_training)
  }, [])

  const save = (next: { analytics: boolean; marketing: boolean; ai_training: boolean }) => {
    writeConsent(next)
    setVisible(false)
    setShowManage(false)
  }

  const summary = useMemo(() => {
    if (analytics || marketing || aiTraining) return 'Preferences saved'
    return 'Only essential cookies enabled'
  }, [aiTraining, analytics, marketing])

  if (!visible && !showManage) return null

  return (
    <>
      {visible && (
        <div className="consent-banner" role="dialog" aria-live="polite">
          <div className="consent-copy">
            <strong>Privacy and cookies</strong>
            <p>
              We use essential cookies to run the website and optional cookies for analytics and product improvement.
              Read our <Link href="/privacy">Privacy Policy</Link> and <Link href="/cookie-policy">Cookie Policy</Link>.
            </p>
            <small>{summary}</small>
          </div>
          <div className="consent-actions">
            <button type="button" className="consent-btn consent-btn-ghost" onClick={() => setShowManage(true)}>
              Manage
            </button>
            <button type="button" className="consent-btn consent-btn-ghost" onClick={() => save({ analytics: false, marketing: false, ai_training: false })}>
              Reject Optional
            </button>
            <button type="button" className="consent-btn consent-btn-primary" onClick={() => save({ analytics: true, marketing: true, ai_training: true })}>
              Accept All
            </button>
          </div>
        </div>
      )}

      {showManage && (
        <div className="consent-modal-backdrop" onClick={() => setShowManage(false)}>
          <div className="consent-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <h3>Manage cookie preferences</h3>
            <p>Essential cookies are always on. Optional categories are off unless you opt in.</p>
            <label className="consent-toggle">
              <input type="checkbox" checked readOnly />
              <span>
                <strong>Essential</strong>
                <em>Required for core website functionality.</em>
              </span>
            </label>
            <label className="consent-toggle">
              <input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} />
              <span>
                <strong>Analytics</strong>
                <em>Anonymous measurement and product performance.</em>
              </span>
            </label>
            <label className="consent-toggle">
              <input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} />
              <span>
                <strong>Marketing</strong>
                <em>Campaign attribution and ad measurement.</em>
              </span>
            </label>
            <label className="consent-toggle">
              <input type="checkbox" checked={aiTraining} onChange={(e) => setAiTraining(e.target.checked)} />
              <span>
                <strong>AI Training</strong>
                <em>Use of opt-in data for model and workflow improvements.</em>
              </span>
            </label>
            <div className="consent-modal-actions">
              <button type="button" className="consent-btn consent-btn-ghost" onClick={() => setShowManage(false)}>
                Cancel
              </button>
              <button
                type="button"
                className="consent-btn consent-btn-primary"
                onClick={() => save({ analytics, marketing, ai_training: aiTraining })}
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
