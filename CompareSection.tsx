'use client'
import { useEffect, useRef } from 'react'

interface Feat { label: string; status: 'yes' | 'no' | 'gold' }
interface CardData {
  type: string; name: string; verdict: string
  score: number; total: number; feats: Feat[]; featured: boolean
}

const CARDS: CardData[] = [
  {
    type: 'Traditional Software', name: 'Filing Tools',
    verdict: 'Basic filing only', score: 2, total: 9, featured: false,
    feats: [
      { label: 'Filing & Returns', status: 'yes' },
      { label: 'Real-time Data Flow', status: 'no' },
      { label: 'AI Reconciliation', status: 'no' },
      { label: 'Vendor Trust Score', status: 'no' },
      { label: 'Magic Link Portal', status: 'no' },
      { label: 'Natural Language AI', status: 'no' },
      { label: 'CA Collaboration', status: 'no' },
      { label: 'Cash Flow Forecast', status: 'no' },
      { label: 'Notice Response', status: 'yes' },
    ],
  },
  {
    type: 'AIT Infrastructure', name: 'All India Taxes',
    verdict: 'Complete compliance OS', score: 9, total: 9, featured: true,
    feats: [
      { label: 'Execution + Intelligence', status: 'gold' },
      { label: 'API-First & Real-time', status: 'gold' },
      { label: 'AI-automated, <2 hours', status: 'gold' },
      { label: 'Predictive Trust Score', status: 'gold' },
      { label: 'Magic Link Portal', status: 'gold' },
      { label: 'Ask anything, live data', status: 'gold' },
      { label: 'Scoped access & ownership', status: 'gold' },
      { label: 'AI predictive models', status: 'gold' },
      { label: 'AI-drafted, CA-reviewed', status: 'gold' },
    ],
  },
  {
    type: 'ERP Modules', name: 'SAP / Oracle',
    verdict: 'Accounting-first, GST bolt-on', score: 3, total: 9, featured: false,
    feats: [
      { label: 'Accounting Focus', status: 'yes' },
      { label: 'ERP Data Sync', status: 'yes' },
      { label: 'GST Reconciliation', status: 'no' },
      { label: 'Vendor Trust Score', status: 'no' },
      { label: 'Magic Link Portal', status: 'no' },
      { label: 'Natural Language AI', status: 'no' },
      { label: 'CA Access (Limited)', status: 'yes' },
      { label: 'Cash Flow Forecast', status: 'no' },
      { label: 'Notice Response', status: 'no' },
    ],
  },
]

const CIRCUMFERENCE = 2 * Math.PI * 40

function ScoreRing({ score, total, featured }: { score: number; total: number; featured: boolean }) {
  const fillRef = useRef<SVGCircleElement>(null)

  useEffect(() => {
    const el = fillRef.current
    if (!el) return
    const offset = CIRCUMFERENCE * (1 - score / total)
    el.style.strokeDasharray = String(CIRCUMFERENCE)
    el.style.strokeDashoffset = String(CIRCUMFERENCE)
    const t = setTimeout(() => { el.style.strokeDashoffset = String(offset) }, 400)
    return () => clearTimeout(t)
  }, [score, total])

  return (
    <div className="sc-ring-wrap">
      <svg className="sc-ring-svg" viewBox="0 0 108 108">
        <circle className="sc-ring-bg" cx="54" cy="54" r="40" />
        <circle ref={fillRef} className={`sc-ring-fill${featured ? ' gold' : ''}`} cx="54" cy="54" r="40" />
      </svg>
      <div className={`sc-score${featured ? ' gold' : ''}`}>{score}/{total}</div>
    </div>
  )
}

function FeatRow({ feat }: { feat: Feat }) {
  return (
    <div className="sc-feat">
      <span className={`feat-icon ${feat.status}`}>{feat.status === 'no' ? '×' : '✓'}</span>
      {feat.label}
    </div>
  )
}

export default function CompareSection() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    // Only activate scroll observer on mobile
    if (window.innerWidth > 640) return

    const observers: IntersectionObserver[] = []

    cardRefs.current.forEach((el) => {
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add('in-view')
            obs.unobserve(el) // stop watching once opened
          }
        },
        { threshold: 0.35 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <section className="compare-section" id="compare" data-track-section="compare">
      <div className="section-wrap">

        <div className="sc-section-tag">Why AIT</div>
        <h2 className="sc-heading">
          AIT is structurally different<br />
          <em>from filing utilities and ERPs.</em>
        </h2>
        <p className="sc-sub">
          Built ground-up for India&apos;s compliance complexity — not adapted from a foreign accounting suite.
        </p>

        <div className="sc-grid">
          {CARDS.map((card, i) => (
            <div
              key={card.name}
              className={`sc-card${card.featured ? ' ait' : ' dim'}`}
              ref={(el) => { cardRefs.current[i] = el }}
            >

              {/* Head */}
              <div className="sc-head">
                <ScoreRing score={card.score} total={card.total} featured={card.featured} />
                <div className="sc-type">{card.type}</div>
                <div className="sc-name">{card.name}</div>
                <div className="sc-verdict">{card.verdict}</div>
              </div>

              {/* Body */}
              <div className="sc-body">
                <div className="sc-hint">
                  <div className="hint-dot" />
                  Hover to see details
                </div>
                <div className="sc-feats">
                  {card.feats.map((f) => <FeatRow key={f.label} feat={f} />)}
                </div>
              </div>

            </div>
          ))}
        </div>

        <p className="sc-note">
          &ldquo;We cut compliance overhead by <em>60%</em> in Q1. Our CA finally stopped calling on weekends.&rdquo;
          <br />— CFO, 3,000 Cr FMCG company
        </p>

      </div>
    </section>
  )
}