'use client'

import { useState } from 'react'

export default function HowItWorks() {
  const [hovered, setHovered] = useState<number | null>(null)

  const steps = [
    {
      num: '01',
      title: 'Ingest',
      sub: 'Vendor Magic Link, ERP connectors (SAP, Oracle, Tally, Zoho), or Excel. Data flows in clean. Supports bulk upload and scheduled syncs.',
      tag: 'Vendor Magic Link · ERP',
    },
    {
      num: '02',
      title: 'Validate',
      sub: 'Real-time tax logic checks GSTIN status, HSN vs rate, duplicate detection, e-invoice IRN verification. Errors rejected at source.',
      tag: 'AI-Powered Pre-filing Checks',
    },
    {
      num: '03',
      title: 'Reconcile',
      sub: 'AI auto-matches purchase register against GSTR-2B. Fuzzy matching, mismatch classification, ITC risk scoring in under 2 hours.',
      tag: 'Purchase vs GSTR-2B · <2 Hrs',
    },
    {
      num: '04',
      title: 'Execute',
      sub: 'File GSTR-1, 3B, 9, 9C and TDS returns (24Q, 26Q, 27Q, 27EQ) directly. Automated challan reconciliation and Form 16/16A generation.',
      tag: 'GST Filing · TDS Returns',
    },
    {
      num: '05',
      title: 'Monitor',
      sub: 'Ongoing risk dashboard, vendor trust score tracking, notice management, and immutable audit trail. Never reactive again.',
      tag: 'Risk Dashboard · Audit Trail',
    },
  ]

  return (
    <section className="how-section" id="how" data-track-section="how">
      <div className="section-wrap">
        <div className="section-tag reveal">How It Works</div>
        <h2 className="reveal">From invoice ingestion to<br /><em>regulatory submission</em> one governed flow.</h2>
        <p className="section-sub reveal">AIT performs the execution so your team can focus on the exception. Every step is governed by the AI intelligence layer.</p>
        <div className="process-flow reveal" style={{ transitionDelay: '0.2s' }}>
          {steps.map((step, idx) => {
            const isHov = hovered === idx
            return (
              <div
                key={step.num}
                className="proc-step"
                onMouseEnter={() => setHovered(idx)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Number circle fills on hover */}
                <div className={`proc-num${isHov ? ' proc-num-filled' : ''}`}>
                  {step.num}
                </div>

                <div className="proc-step-content">
                  {/* Title underline sweeps in on hover */}
                  <div className={`proc-title${isHov ? ' proc-title-hov' : ''}`}>
                    {step.title}
                  </div>

                  <div className="proc-sub">{step.sub}</div>

                  {/* Tag brightens on hover */}
                  <div className={`proc-tag${isHov ? ' proc-tag-hov' : ''}`}>
                    {step.tag}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <div className="ai-layer-label reveal" style={{ transitionDelay: '0.4s' }}>Governed by AIT Intelligence Layer throughout</div>
      </div>
    </section>
  )
}