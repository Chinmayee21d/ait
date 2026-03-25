'use client'

import { useMemo, useState } from 'react'

type PeriodKey = 'q3' | 'q4'
type NavKey = 'dashboard' | 'returns' | 'recon' | 'tds' | 'vendors' | 'assistant'
type FilingStatus = 'Filed' | 'Draft' | 'Overdue'
type FilterKey = 'all' | FilingStatus

type FilingRow = {
  id: string
  label: string
  status: FilingStatus
  detail: string
}

type RiskRow = {
  id: string
  vendor: string
  amount: string
  detail: string
}

type InsightRow = {
  id: string
  title: string
  detail: string
  action: string
}

type DashboardData = {
  periodLabel: string
  kpis: Array<{ label: string; value: string; note: string; tone: 'up' | 'warn' }>
  filings: FilingRow[]
  risks: RiskRow[]
  insights: InsightRow[]
  trustVendor: { name: string; score: number; tag: string }
}

const navItems: Array<{ key: NavKey; label: string }> = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'returns', label: 'GST Returns' },
  { key: 'recon', label: 'Reconciliation' },
  { key: 'tds', label: 'TDS' },
  { key: 'vendors', label: 'Vendor Network' },
  { key: 'assistant', label: 'AI Assistant' },
]

const dataByPeriod: Record<PeriodKey, DashboardData> = {
  q3: {
    periodLabel: 'Oct-Dec 2025',
    kpis: [
      { label: 'ITC Balance', value: '₹18.4L', note: '+ ₹2.1L this quarter', tone: 'up' },
      { label: 'Tax Liability', value: '₹6.2L', note: '₹84K at risk', tone: 'warn' },
      { label: 'Recon Status', value: '94%', note: '42 invoices pending', tone: 'warn' },
      { label: 'Returns Due', value: '3', note: 'GSTR-1, GSTR-3B, 26Q', tone: 'warn' },
    ],
    filings: [
      {
        id: 'gstr1-sep',
        label: 'GSTR-1 - Sep 2025',
        status: 'Filed',
        detail: 'Filed on Oct 11 with 0 validation errors and 99.3% auto-match.',
      },
      {
        id: 'gstr3b-sep',
        label: 'GSTR-3B - Sep 2025',
        status: 'Filed',
        detail: 'Filed on Oct 20. ITC utilization optimized against cash outflow.',
      },
      {
        id: 'gstr1-oct',
        label: 'GSTR-1 - Oct 2025',
        status: 'Draft',
        detail: 'Draft is 91% complete. 2 invoices need HSN correction.',
      },
      {
        id: '26q-q2',
        label: '26Q - Q2 FY26',
        status: 'Overdue',
        detail: 'Challan mapping missing for 1 vendor. Estimated penalty starts in 2 days.',
      },
    ],
    risks: [
      {
        id: 'sharma',
        vendor: 'Sharma Traders',
        amount: '₹41,200',
        detail: 'No GSTR-1 for 3 months. Recommend payment hold + Magic Link reminder.',
      },
      {
        id: 'kumar',
        vendor: 'Kumar Logistics',
        amount: '₹27,800',
        detail: 'HSN mismatch repeated in 2 cycles. Flagged for manual review.',
      },
      {
        id: 'rapid',
        vendor: 'RapidSteel Components',
        amount: '₹15,000',
        detail: 'Short-filed inward invoice ledgers. Potential mismatch in next recon.',
      },
    ],
    insights: [
      {
        id: 'insight-sharma',
        title: "Sharma Traders hasn't filed GSTR-1 in 3 months.",
        detail: 'Your ₹41,200 ITC claim is at risk. Draft response and reminder ready.',
        action: 'Send reminder via Magic Link',
      },
      {
        id: 'insight-recon',
        title: '42 invoices are pending reconciliation checks.',
        detail: 'Most failures are HSN or GSTIN format mismatches from 6 vendors.',
        action: 'Open auto-fix workflow',
      },
    ],
    trustVendor: { name: 'Mehta Supplies', score: 82, tag: 'Low Risk' },
  },
  q4: {
    periodLabel: 'Jan-Mar 2026',
    kpis: [
      { label: 'ITC Balance', value: '₹21.1L', note: '+ ₹2.7L this quarter', tone: 'up' },
      { label: 'Tax Liability', value: '₹5.4L', note: '₹51K at risk', tone: 'warn' },
      { label: 'Recon Status', value: '97%', note: '18 invoices pending', tone: 'up' },
      { label: 'Returns Due', value: '2', note: 'GSTR-1, 26Q', tone: 'up' },
    ],
    filings: [
      {
        id: 'gstr3b-jan',
        label: 'GSTR-3B - Jan 2026',
        status: 'Filed',
        detail: 'Filed with zero exceptions; variance below 1.2%.',
      },
      {
        id: 'gstr1-jan',
        label: 'GSTR-1 - Jan 2026',
        status: 'Filed',
        detail: 'Filed successfully with auto-generated annexure.',
      },
      {
        id: 'gstr1-feb',
        label: 'GSTR-1 - Feb 2026',
        status: 'Draft',
        detail: 'Draft at 96%. Pending approval for one high-value invoice.',
      },
      {
        id: '26q-q4',
        label: '26Q - Q4 FY26',
        status: 'Draft',
        detail: 'Draft prepared. Challan references validated; ready for sign-off.',
      },
    ],
    risks: [
      {
        id: 'bluemango',
        vendor: 'BlueMango Textiles',
        amount: '₹21,400',
        detail: 'Invoice duplication detected in purchase register and GSTR-2B.',
      },
      {
        id: 'narmada',
        vendor: 'Narmada Tools Pvt Ltd',
        amount: '₹18,200',
        detail: 'Frequent amendments increased mismatch probability this quarter.',
      },
      {
        id: 'orbit',
        vendor: 'Orbit Linepack',
        amount: '₹11,600',
        detail: 'Delayed filing cadence impacted trust score and credit confidence.',
      },
    ],
    insights: [
      {
        id: 'insight-variance',
        title: 'Reconciliation variance reduced by 31% vs last quarter.',
        detail: 'Flow-level checks are catching errors before filing cut-off.',
        action: 'Review top performing workflows',
      },
      {
        id: 'insight-risk',
        title: 'Low-score vendor exposure is trending down.',
        detail: 'Payment holds and early alerts reduced at-risk ITC significantly.',
        action: 'Keep auto-hold policy active',
      },
    ],
    trustVendor: { name: 'Aster Components', score: 91, tag: 'Excellent' },
  },
}

export default function DashboardShowcase() {
  const [activeNav, setActiveNav] = useState<NavKey>('dashboard')
  const [period, setPeriod] = useState<PeriodKey>('q3')
  const [filingFilter, setFilingFilter] = useState<FilterKey>('all')
  const [selectedId, setSelectedId] = useState<string>('insight-sharma')

  const periodData = dataByPeriod[period]

  const filteredFilings = useMemo(() => {
    if (filingFilter === 'all') return periodData.filings
    return periodData.filings.filter((item) => item.status === filingFilter)
  }, [periodData.filings, filingFilter])

  const detailLookup = useMemo(() => {
    const entries = [
      ...periodData.filings.map((f) => ({
        id: f.id,
        title: f.label,
        detail: f.detail,
        type: 'Filing' as const,
      })),
      ...periodData.risks.map((r) => ({
        id: r.id,
        title: r.vendor,
        detail: `${r.amount} at risk. ${r.detail}`,
        type: 'Vendor Risk' as const,
      })),
      ...periodData.insights.map((i) => ({
        id: i.id,
        title: i.title,
        detail: `${i.detail} ${i.action}.`,
        type: 'AI Insight' as const,
      })),
    ]
    return new Map(entries.map((entry) => [entry.id, entry]))
  }, [periodData])

  const activeDetail =
    detailLookup.get(selectedId) ??
    detailLookup.get(periodData.insights[0]?.id) ??
    Array.from(detailLookup.values())[0]

  const filedCount = periodData.filings.filter((f) => f.status === 'Filed').length

  return (
    <section className="dashboard-showcase" id="dashboard-showcase" data-track-section="dashboard_showcase">
      <div className="section-wrap">
        <div className="section-tag reveal">Operations Dashboard</div>
        <h2 className="reveal">
          Run compliance from one
          <br />
          <em>live command center.</em>
        </h2>
        <p className="section-sub reveal">
          A single view for ITC exposure, returns health, filing status, and vendor risk, so your
          team acts earlier and closes faster.
        </p>

        <div className="dash-window reveal">
          <div className="dash-topbar">
            <div className="dash-lights">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="dash-head">AIT PLATFORM · FY 2025-26</div>
            <div className="dash-sync">
              <span className="dash-sync-dot" aria-hidden="true"></span>
              GST Portal Connected
            </div>
          </div>

          <div className="dash-body">
            <aside className="dash-nav">
              <div className="dash-nav-title">NAVIGATION</div>
              {navItems.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  className={`dash-nav-item${activeNav === item.key ? ' active' : ''}`}
                  onClick={() => setActiveNav(item.key)}
                >
                  {item.label}
                </button>
              ))}
            </aside>

            <div className="dash-main">
              <div className="dash-main-head">
                <h3>
                  {activeNav === 'dashboard'
                    ? 'Compliance Overview'
                    : navItems.find((i) => i.key === activeNav)?.label}
                </h3>
                <div className="dash-periods">
                  <button
                    type="button"
                    className={`dash-period${period === 'q3' ? ' active' : ''}`}
                    onClick={() => {
                      setPeriod('q3')
                      setSelectedId('insight-sharma')
                    }}
                  >
                    Oct-Dec 2025
                  </button>
                  <button
                    type="button"
                    className={`dash-period${period === 'q4' ? ' active' : ''}`}
                    onClick={() => {
                      setPeriod('q4')
                      setSelectedId('insight-variance')
                    }}
                  >
                    Jan-Mar 2026
                  </button>
                </div>
              </div>

              <div className="dash-kpis">
                {periodData.kpis.map((kpi) => (
                  <div className="dash-kpi" key={kpi.label}>
                    <label>{kpi.label}</label>
                    <strong>{kpi.value}</strong>
                    <small className={kpi.tone === 'warn' ? 'warn' : ''}>{kpi.note}</small>
                  </div>
                ))}
              </div>

              <div className="dash-grids">
                <div className="dash-card">
                  <div className="dash-card-title">
                    Recent Filings <span>{filedCount} Filed</span>
                  </div>
                  <div className="dash-filters">
                    {(['all', 'Filed', 'Draft', 'Overdue'] as FilterKey[]).map((filter) => (
                      <button
                        key={filter}
                        type="button"
                        className={`dash-filter${filingFilter === filter ? ' active' : ''}`}
                        onClick={() => setFilingFilter(filter)}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>

                  {filteredFilings.map((filing) => (
                    <button
                      key={filing.id}
                      type="button"
                      className={`dash-row dash-row-btn${selectedId === filing.id ? ' active' : ''}`}
                      onClick={() => setSelectedId(filing.id)}
                    >
                      <span>{filing.label}</span>
                      <em className={filing.status === 'Filed' ? 'ok' : filing.status === 'Draft' ? 'warn' : 'bad'}>
                        {filing.status}
                      </em>
                    </button>
                  ))}
                </div>

                <div className="dash-card">
                  <div className="dash-card-title">ITC At Risk</div>
                  {periodData.risks.map((risk) => (
                    <button
                      key={risk.id}
                      type="button"
                      className={`dash-row dash-row-btn${selectedId === risk.id ? ' active' : ''}`}
                      onClick={() => setSelectedId(risk.id)}
                    >
                      <span>{risk.vendor}</span>
                      <strong>{risk.amount}</strong>
                    </button>
                  ))}
                </div>

                <div className="dash-card dash-card-wide">
                  <div className="dash-card-title">Live Insight Feed</div>
                  {periodData.insights.map((insight) => (
                    <button
                      key={insight.id}
                      type="button"
                      className={`dash-insight${selectedId === insight.id ? ' active' : ''}`}
                      onClick={() => setSelectedId(insight.id)}
                    >
                      <strong>{insight.title}</strong>
                      <span>{insight.action}</span>
                    </button>
                  ))}
                </div>

                {activeDetail && (
                  <div className="dash-card dash-detail">
                    <div className="dash-detail-tag">{activeDetail.type}</div>
                    <h4>{activeDetail.title}</h4>
                    <p>{activeDetail.detail}</p>
                    <button type="button" className="dash-detail-cta">
                      Open detailed view
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="dash-float trust">
            <div className="dash-float-title">Vendor Trust Score</div>
            <div className="dash-trust-row">
              <div className="dash-score-ring">
                <span>{periodData.trustVendor.score}</span>
              </div>
              <div className="dash-trust-copy">
                <strong>{periodData.trustVendor.name}</strong>
                <span>{periodData.trustVendor.tag}</span>
              </div>
            </div>
          </div>

          <div className="dash-float insight">
            <div className="dash-float-title dash-float-title-ai">
              <span className="dash-ai-icon" aria-hidden="true">*</span>
              AI Insight
            </div>
            <strong>{periodData.insights[0].title}</strong>
            <span>{periodData.insights[0].action} -&gt;</span>
          </div>
        </div>
      </div>
    </section>
  )
}

