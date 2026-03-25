'use client'
import { useRef } from 'react'

function ShimmerCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    card.style.setProperty('--mouse-x', `${x}px`)
    card.style.setProperty('--mouse-y', `${y}px`)
  }

  return (
    <div
      ref={cardRef}
      className={`persona-card ${className}`}
      onMouseMove={handleMouseMove}
    >
      {children}
    </div>
  )
}

export default function PersonaSection() {
  const businessViewDemoUrl = 'https://allindiataxes.com/view-demo?role=business'
  const caViewDemoUrl = 'https://allindiataxes.com/view-demo?role=ca'
  const enterpriseViewDemoUrl = 'https://allindiataxes.com/view-demo?role=enterprise'

  return (
    <section className="persona-section" id="personas" data-track-section="personas">
      <div className="section-wrap">
        <div className="section-tag reveal" style={{ justifyContent: 'center' }}>Who It&apos;s Built For</div>
        <h2 className="reveal" style={{ textAlign: 'center' }}>AIT transforms compliance for<br /><em>every stakeholder in the chain.</em></h2>
        <div className="persona-grid">

          <ShimmerCard>
            <div className="pc-hero">
              <div className="pc-role">SMB Owner / CFO</div>
              <div className="pc-name">The Business Owner</div>
              <div className="pc-job">Rs10-500 Cr revenue, 1-5 GSTINs</div>
              <div className="pc-pain-label">Their reality today</div>
              <div className="pc-pain">&quot;My CA sends me a panic message every quarter about vendor mismatches. I have no idea what ITC I&apos;ve actually lost until it&apos;s too late to fix it.&quot;</div>
            </div>
            <div className="pc-body">
              <div className="pc-before-after">
                <div className="pc-ba-item pc-ba-before">Before: 3-5 day reconciliation</div>
                <div className="pc-ba-item pc-ba-after">After: &lt;2 hour close</div>
              </div>
              <ul className="pc-features">
                <li><span className="pc-check">&#10003;</span>Single dashboard: GST + TDS + Vendors + Cash flow</li>
                <li><span className="pc-check">&#10003;</span>Proactive vendor risk alerts before ITC is lost</li>
                <li><span className="pc-check">&#10003;</span>Natural language queries - ask your data anything</li>
                <li><span className="pc-check">&#10003;</span>Magic Link: vendors submit invoices that validate themselves</li>
                <li><span className="pc-check">&#10003;</span>Automated GSTR-1, 3B filing with pre-filing validation</li>
              </ul>
              <div className="pc-actions">
                <span className="btn-nav-primary-wrap btn-nav-primary-wrap-demo pc-demo-wrap">
                  <a
                    className="pc-demo-btn"
                    href={enterpriseViewDemoUrl}
                    data-track-event="cta_click"
                    data-track-name="persona_enterprise_view_demo"
                    data-track-section="personas"
                    data-track-destination={enterpriseViewDemoUrl}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>View Demo</span>
                  </a>
                </span>
              </div>
            </div>
          </ShimmerCard>

          <ShimmerCard className="featured">
            <div className="pc-hero">
              <div className="pc-role">Chartered Accountant Firm</div>
              <div className="pc-name">The CA Firm</div>
              <div className="pc-job">20-250+ client entities</div>
              <div className="pc-pain-label">Their reality today</div>
              <div className="pc-pain">&quot;Each of my 60 clients is a separate Excel circus. My team spends 3 weeks a month just on GSTR-2B matching. I can&apos;t grow because I can&apos;t scale.&quot;</div>
            </div>
            <div className="pc-body">
              <div className="pc-before-after">
                <div className="pc-ba-item pc-ba-before">Before: 15 clients/staff</div>
                <div className="pc-ba-item pc-ba-after">After: 40+ clients/staff</div>
              </div>
              <ul className="pc-features">
                <li><span className="pc-check">&#10003;</span>Multi-client dashboard - all clients in one view</li>
                <li><span className="pc-check">&#10003;</span>Scoped client access: you work in their data, they retain ownership</li>
                <li><span className="pc-check">&#10003;</span>Bulk filing across all entities - one action, 50 returns</li>
                <li><span className="pc-check">&#10003;</span>White-label portal - present as your own branded platform</li>
                <li><span className="pc-check">&#10003;</span>AI handles reconciliation - your team handles exceptions only</li>
                <li><span className="pc-check">&#10003;</span>Volume pricing: from Rs500/entity/month at scale</li>
              </ul>
              <div className="pc-actions">
                <span className="btn-nav-primary-wrap btn-nav-primary-wrap-demo pc-demo-wrap">
                  <a
                    className="pc-demo-btn"
                    href={enterpriseViewDemoUrl}
                    data-track-event="cta_click"
                    data-track-name="persona_enterprise_view_demo"
                    data-track-section="personas"
                    data-track-destination={enterpriseViewDemoUrl}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>View Demo</span>
                  </a>
                </span>
              </div>
            </div>
          </ShimmerCard>

          <ShimmerCard>
            <div className="pc-hero">
              <div className="pc-role">Enterprise / Group Companies</div>
              <div className="pc-name">The Enterprise CFO</div>
              <div className="pc-job">Rs500 Cr+, multiple GSTINs, complex structure</div>
              <div className="pc-pain-label">Their reality today</div>
              <div className="pc-pain">&quot;We have 12 GSTINs, 3 ERP systems, and 400 vendors. Every month-end is a coordination nightmare. We&apos;ve been penalised twice this year for errors that shouldn&apos;t happen.&quot;</div>
            </div>
            <div className="pc-body">
              <div className="pc-before-after">
                <div className="pc-ba-item pc-ba-before">Before: Fragmented, reactive</div>
                <div className="pc-ba-item pc-ba-after">After: Unified, predictive</div>
              </div>
              <ul className="pc-features">
                <li><span className="pc-check">&#10003;</span>Multi-entity workspace - HQ view with entity drill-down</li>
                <li><span className="pc-check">&#10003;</span>SAP, Oracle, Tally, Zoho API connectors - live data sync</li>
                <li><span className="pc-check">&#10003;</span>Maker-checker workflows with role-based approvals</li>
                <li><span className="pc-check">&#10003;</span>Immutable audit trail - every action logged, every change tracked</li>
                <li><span className="pc-check">&#10003;</span>SSO integration + dedicated implementation manager</li>
              </ul>
              <div className="pc-actions">
                <span className="btn-nav-primary-wrap btn-nav-primary-wrap-demo pc-demo-wrap">
                  <a
                    className="pc-demo-btn"
                    href={enterpriseViewDemoUrl}
                    data-track-event="cta_click"
                    data-track-name="persona_enterprise_view_demo"
                    data-track-section="personas"
                    data-track-destination={enterpriseViewDemoUrl}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>View Demo</span>
                  </a>
                </span>
              </div>
            </div>
          </ShimmerCard>

        </div>
      </div>
    </section>
  )
}
