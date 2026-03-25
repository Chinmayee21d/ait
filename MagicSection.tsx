'use client'

import { useEffect, useState } from 'react'

const steps = [
  {
    no: '01',
    title: 'You send a unique vendor link',
    desc: 'One click generates a vendor-specific, expiry-controlled URL. No app download, no registration required on their side.',
    tag: 'Vendor link created instantly',
    panel: {
      header: 'Invoice Submission - Magic Link',
      sub: 'Powered by All India Taxes - No account needed',
      url: 'ait.in/v/mlink_7Xk9p2qR',
      rows: [
        { label: 'Supplier GSTIN Active', status: 'Pass', kind: 'ok' },
        { label: 'Invoice date within window', status: 'Pass', kind: 'ok' },
        { label: 'HSN code valid for goods type', status: 'Pass', kind: 'ok' },
      ],
      note: 'Link shared. Vendor can submit immediately from browser.',
    },
  },
  {
    no: '02',
    title: 'Vendor submits - AI validates instantly',
    desc: '10 checks run in real-time: GSTIN active status, HSN vs tax rate match, calculation accuracy, duplicate detection, e-invoice IRN compliance.',
    tag: 'Errors rejected at source with explanation',
    panel: {
      header: 'Real-Time Validation',
      sub: '8 / 10 checks passed',
      url: 'ait.in/submit/INV-2024-vendor-xyz-aGt94k',
      rows: [
        { label: 'Tax calculation accurate', status: 'Pass', kind: 'ok' },
        { label: 'IGST / CGST split', status: 'Review', kind: 'warn' },
        { label: 'Invoice number duplicate detected', status: 'Rejected', kind: 'fail' },
      ],
      note: 'Vendor notified with exact error details. They fix and resubmit.',
    },
  },
  {
    no: '03',
    title: 'Only clean invoices reach you',
    desc: 'Validated invoices flow directly into AIT. Vendor gets their own free portal to track submission history and payment status.',
    tag: 'Near-zero GSTR-2B mismatches',
    panel: {
      header: 'Ready for Reconciliation',
      sub: 'Posted to your workspace',
      url: 'workspace.ait.in/recon/inbox',
      rows: [
        { label: 'Matched to purchase register', status: 'Matched', kind: 'ok' },
        { label: 'Mapped to filing period', status: 'Mapped', kind: 'ok' },
        { label: 'Queued for GSTR-2B reconciliation', status: 'Ready', kind: 'ok' },
      ],
      note: 'Clean invoice entered workflow. No amendment loop required.',
    },
  },
]

export default function MagicSection() {
  const [activeStep, setActiveStep] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const active = steps[activeStep]

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const sync = () => {
      const mobile = mq.matches
      setIsMobile(mobile)
      if (mobile) setActiveStep(2)
    }
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  const renderPanel = (panel: (typeof steps)[number]['panel']) => (
    <div className="magic-card">
      <div className="magic-url-bar">
        <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
          <rect x="1" y="3" width="12" height="9" rx="1.5" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" />
          <path d="M1 6h12" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" />
          <circle cx="3.5" cy="4.5" r=".5" fill="rgba(255,255,255,0.5)" />
          <circle cx="5.5" cy="4.5" r=".5" fill="rgba(255,255,255,0.5)" />
        </svg>
        <span>{panel.url}</span>
      </div>
      <div className="magic-card-body">
        <div className="magic-panel-head">
          <h3>{panel.header}</h3>
          <span>{panel.sub}</span>
        </div>
        {panel.rows.map((row) => (
          <div key={row.label} className="val-row">
            <span className="vr-check">{row.label}</span>
            <span className={`vbadge ${row.kind}`}>{row.status}</span>
          </div>
        ))}
        <div className="magic-note">{panel.note}</div>
      </div>
    </div>
  )

  return (
    <section className="magic-section magic-dark" id="magic" data-track-section="magic">
      <div className="section-wrap">
        <div className="section-tag reveal">Vendor Intelligence</div>
        <h2 className="reveal">Stop chasing vendors.<br /><em>Let errors fix themselves at source.</em></h2>
        <p className="section-sub reveal">Most GSTR-2B mismatches start with a vendor&apos;s wrong invoice. Magic Link places the validation checkpoint before the invoice enters your system.</p>
        {!isMobile ? (
          <div className="magic-grid">
            <div className="magic-steps reveal">
              {steps.map((step, idx) => (
                <button
                  key={step.no}
                  type="button"
                  className={`ms${idx === activeStep ? ' active' : ''}`}
                  onClick={() => setActiveStep(idx)}
                  onMouseEnter={() => setActiveStep(idx)}
                  onFocus={() => setActiveStep(idx)}
                >
                  <span className="ms-num">{step.no}</span>
                  <span className="ms-copy">
                    <span className="ms-title">{step.title}</span>
                    <span className="ms-desc">{step.desc}</span>
                    <span className="ms-tag">{step.tag}</span>
                  </span>
                </button>
              ))}
            </div>
            <div className="magic-visual reveal" style={{ transitionDelay: '0.2s' }}>
              {renderPanel(active.panel)}
            </div>
          </div>
        ) : (
          <div className="magic-mobile-visual">
            <div className="magic-mobile-step-switch">
              {steps.map((step, idx) => (
                <button
                  key={step.no}
                  type="button"
                  className={`magic-mobile-pill${idx === activeStep ? ' active' : ''}`}
                  onClick={() => setActiveStep(idx)}
                >
                  {step.no}
                </button>
              ))}
            </div>
            <div className="magic-visual magic-visual-inline">
              {renderPanel(active.panel)}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
