'use client'

import { useEffect, useRef, useState } from 'react'

type Feature = {
  id: string
  title: string
  desc: string
  prompt: string
  answerLead: string
  answerBullets: string[]
  answerAction: string
  icon: JSX.Element
}

const features: Feature[] = [
  {
    id: 'recon',
    title: 'AI Reconciliation Engine',
    desc: 'Auto-matches purchase register rows against GSTR-2B using fuzzy logic. Classifies each mismatch and sends only exceptions for review.',
    prompt: "Show me anomalies in this month's ITC claims.",
    answerLead: '🔎 Anomaly scan complete. Two items need immediate review.',
    answerBullets: [
      'Narmada Tools Pvt Ltd: ITC claim +340% vs last quarter (INR 2.1L -> INR 9.3L).',
      'BlueMango Textiles: duplicate invoice INV-2024-4421 appears twice (INR 84,000).',
      'Potential impact: over-claim risk + audit attention in current filing cycle.',
    ],
    answerAction: '✅ Suggested next step: move both vendors to review queue before GSTR-3B lock.',
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <rect x="3" y="4" width="18" height="14" rx="3" stroke="currentColor" strokeWidth="1.9" />
        <path d="M7 9h10M7 13h6M16.5 18.5l2.8 2.8" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
        <circle cx="15.5" cy="17.5" r="3.2" stroke="currentColor" strokeWidth="1.9" />
      </svg>
    ),
  },
  {
    id: 'trust',
    title: 'Vendor Trust Score (0-100)',
    desc: 'Every vendor gets a live compliance score based on filing consistency, amendment behavior, GSTIN status, and ITC reliability.',
    prompt: 'What is our vendor compliance score distribution?',
    answerLead: '📊 Vendor health distribution updated for this return period.',
    answerBullets: [
      '142 active vendors total.',
      'Score 90-100: 89 vendors (safe for immediate payment).',
      'Score 40-89: 38 vendors (monitor + conditional approvals).',
      'Score <40: 15 vendors (payment hold recommended).',
      'At-risk ITC from low-score bucket: INR 14.8L.',
    ],
    answerAction: '🛡️ Policy tip: auto-hold below 40, manual approval for 40-55.',
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6l7-3z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
        <path d="M8.4 12.2l2.1 2.1 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'nlq',
    title: 'Natural Language Queries',
    desc: 'Ask your compliance data in plain English and get responses grounded in live filings, ledgers, and reconciliation status.',
    prompt: 'What deadlines are at risk this month?',
    answerLead: '⏰ Deadline monitor flagged three upcoming risk points.',
    answerBullets: [
      'GST payment due in 4 days; e-way reconciliation pending for 2 entities.',
      'TDS filing due in 6 days; 11 challan mappings still unapproved.',
      'Late-fee exposure if delayed: INR 2.4L to INR 3.1L.',
    ],
    answerAction: '✅ Recommended today: lock challans and start maker-checker workflow.',
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <path d="M5 5h14a2 2 0 012 2v8a2 2 0 01-2 2h-7l-4.5 3V17H5a2 2 0 01-2-2V7a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
        <path d="M8 9h8M8 12h5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'notice',
    title: 'Notice Interpretation & Response',
    desc: 'Upload GSTN/TRACES notices and get discrepancy analysis, liability estimate, and a draft response for CA review.',
    prompt: 'Summarize this GST notice and draft a response.',
    answerLead: '📩 Notice parser completed and prepared a response-ready summary.',
    answerBullets: [
      'Issue: ITC mismatch for Jul-Sep across 3 vendors.',
      'Estimated exposure: INR 6.8L + interest if unresolved in 15 days.',
      'Root cause: short-filing (2 vendors), invoice mismatch (1 vendor).',
      'Evidence pack attached: GSTR-2B extracts, purchase register, vendor trail.',
    ],
    answerAction: '✅ Draft response is ready for CA sign-off and one-click submission.',
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <path d="M6 3h8l4 4v14H6V3z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
        <path d="M14 3v4h4M9 11h6M9 14h5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
        <path d="M15.5 17.5l1.2 1.2 2.3-2.3" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'forecast',
    title: 'Cash Flow Forecasting',
    desc: 'Predictive models estimate GST liability and ITC position 30-90 days ahead using historical filings and payment behavior.',
    prompt: 'Forecast next quarter GST outflow and ITC availability.',
    answerLead: '📈 Quarter-ahead forecast generated from filing and payment trends.',
    answerBullets: [
      'Projected GST outflow: INR 2.9 Cr.',
      'Projected ITC availability: INR 2.1 Cr under current vendor behavior.',
      'Net payable trend: +12% vs last quarter.',
      'Variance driver: 18 high-risk vendors contribute 63% of uncertainty.',
    ],
    answerAction: '💡 Scenario insight: improving low-score vendors by 20% may reduce payable by ~INR 22L.',
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <path d="M4 19V6M9 19v-5M14 19v-8M19 19v-11" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
        <path d="M4 14l5-3 5 2 6-6" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18 7h3v3" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      </svg>
    ),
  },
]

export default function AISection() {
  const [activeId, setActiveId] = useState(features[0].id)
  const [mobileOpenId, setMobileOpenId] = useState<string | null>(null)
  const chatScrollRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const isProgrammaticScroll = useRef(false)

  const handleFeatClick = (id: string) => {
    // On mobile: toggle open/close. On desktop: scroll chat panel.
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setMobileOpenId((prev) => (prev === id ? null : id))
    } else {
      scrollToSection(id)
    }
  }

  const scrollToSection = (id: string) => {
    const container = chatScrollRef.current
    const section = sectionRefs.current[id]
    if (!container || !section) return
    isProgrammaticScroll.current = true
    setActiveId(id)
    const containerTop = container.getBoundingClientRect().top
    const sectionTop = section.getBoundingClientRect().top
    const nextTop = container.scrollTop + (sectionTop - containerTop) - 8
    container.scrollTo({ top: nextTop, behavior: 'smooth' })
    window.setTimeout(() => {
      isProgrammaticScroll.current = false
    }, 700)
  }

  useEffect(() => {
    const container = chatScrollRef.current
    if (!container) return
    container.scrollTop = 0

    const onScroll = () => {
      if (isProgrammaticScroll.current) return
      const top = container.scrollTop + 24
      let closest = features[0].id
      let best = Number.POSITIVE_INFINITY

      features.forEach((feature) => {
        const el = sectionRefs.current[feature.id]
        if (!el) return
        const delta = Math.abs(el.offsetTop - top)
        if (delta < best) {
          best = delta
          closest = feature.id
        }
      })

      setActiveId((prev) => (prev === closest ? prev : closest))
    }

    container.addEventListener('scroll', onScroll, { passive: true })
    return () => container.removeEventListener('scroll', onScroll)
  }, [])

  const renderInlineChat = (feature: Feature) => (
    <span className="ai-feat-inline-chat">
      <span className="ai-feat-chat-header">
        <span className="afc-title">AIT Intelligence - Live</span>
        <span className="acd-dot"></span>
      </span>
      <span className="acm user">
        <span className="acm-av">🙂</span>
        <span className="acm-b">{feature.prompt}</span>
      </span>
      <span className="acm ai">
        <span className="acm-av">🤖</span>
        <span className="acm-b">
          <span className="ai-answer-lead">{feature.answerLead}</span>
          <ul className="ai-answer-list">
            {feature.answerBullets.map((line, idx) => (
              <li key={`mob-${feature.id}-${idx}`}>
                {line.includes(':') ? (
                  <>
                    <strong>{line.split(':')[0]}:</strong>{' '}
                    {line.split(':').slice(1).join(':').trim()}
                  </>
                ) : line}
              </li>
            ))}
          </ul>
          <span className="ai-answer-action">{feature.answerAction}</span>
        </span>
      </span>
    </span>
  )

  return (
    <section className="ai-section" id="ai" data-track-section="ai">
      <div className="section-wrap">
        <div className="section-tag">Intelligence Layer</div>
        <h2>AI prepares the data.<br /><em>Humans approve the decision.</em></h2>
        <p className="section-sub">AIT&apos;s intelligence layer is not a chatbot bolted onto filing software. It is the core engine running continuously, flagging exceptions before they become problems, and surfacing insights your finance team can act on.</p>
        <div className="ai-grid">
          <div className="ai-features">
            {features.map((feature) => (
              <button
                key={feature.id}
                type="button"
                className={`ai-feat${activeId === feature.id ? ' active' : ''}${mobileOpenId === feature.id ? ' mob-open' : ''}`}
                onClick={() => handleFeatClick(feature.id)}
              >
                <span className="ai-feat-icon">{feature.icon}</span>
                <span className="ai-feat-copy">
                  <span className="ai-feat-title">{feature.title}</span>{' '}
                  <span className="ai-feat-desc">{feature.desc}</span>
                </span>
                {mobileOpenId === feature.id && renderInlineChat(feature)}
              </button>
            ))}
          </div>
          <div className="ai-chat-demo">
            <div className="acd-header">
              <span className="acd-title">AIT Intelligence - Live</span>
              <span className="acd-dot"></span>
            </div>
            <div className="ai-chat-messages" ref={chatScrollRef}>
              {features.map((feature) => (
                <div
                  key={feature.id}
                  className={`ai-chat-block${activeId === feature.id ? ' active' : ''}`}
                  ref={(el) => {
                    sectionRefs.current[feature.id] = el
                  }}
                >
                  <div className="ai-chat-block-title">{feature.title}</div>
                  <div className="acm user">
                    <div className="acm-av">🙂</div>
                    <div className="acm-b">{feature.prompt}</div>
                  </div>
                  <div className="acm ai">
                    <div className="acm-av">🤖</div>
                    <div className="acm-b">
                      <div className="ai-answer-lead">{feature.answerLead}</div>
                      <ul className="ai-answer-list">
                        {feature.answerBullets.map((line, idx) => (
                          <li key={`${feature.id}-${idx}`}>
                            {line.includes(':') ? (
                              <>
                                <strong>{line.split(':')[0]}:</strong>{' '}
                                {line.split(':').slice(1).join(':').trim()}
                              </>
                            ) : (
                              line
                            )}
                          </li>
                        ))}
                      </ul>
                      <div className="ai-answer-action">{feature.answerAction}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="acd-footer">
              <input className="acd-input" placeholder="Ask anything about your compliance..." readOnly />
              <button className="acd-send">
                <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
                  <path d="M12 7L2 2l2 5-2 5 10-5z" fill="white" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}