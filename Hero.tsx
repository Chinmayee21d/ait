import { APP_SIGNUP_URL } from '@/lib/site-links'

const HERO_VIEW_DEMO_URL = '/view-demo'

export default function Hero() {
  return (
    <section className="hero" id="hero" data-track-section="hero">
      <div className="hero-canvas">
        <div className="hero-grid"></div>
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
        <div className="data-line" style={{ top: '30%', width: '40%', left: '-10%', animationDelay: '0s' }}></div>
        <div className="data-line" style={{ top: '55%', width: '35%', left: '20%', animationDelay: '1.5s' }}></div>
        <div className="data-line" style={{ top: '72%', width: '50%', left: '10%', animationDelay: '3s' }}></div>
      </div>
      <div className="hero-content">
        <div className="hero-text" style={{ animation: 'fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s both' }}>
          <div className="hero-eyebrow">Compliance Intelligence Infrastructure</div>
          <h1 className="hero-title">
            Stop managing<br />compliance.<br /><em>Start controlling it.</em>
          </h1>
          <p className="hero-subtitle">
            AIT is not a tax tool. It is the AI-powered control layer that unifies your GST, TDS, vendor network, and cash flow into a single intelligent system - recovering lakhs in lost ITC and eliminating compliance risk.
          </p>
          <div className="hero-ctas">
            <a
              href={APP_SIGNUP_URL}
              className="btn-hero-primary"
              data-track-event="cta_click"
              data-track-name="hero_sign_up"
              data-track-section="hero"
              data-track-destination={APP_SIGNUP_URL}
            >
              <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                <path d="M8 1l1.8 3.6 4 .6-2.9 2.8.7 4L8 10l-3.6 1.9.7-4L2.2 5.2l4-.6L8 1z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
              Sign Up
            </a>
            <span className="btn-nav-primary-wrap-demo hero-demo-wrap">
              <a
                href={HERO_VIEW_DEMO_URL}
                className="btn-nav btn-nav-primary btn-nav-primary-demo btn-hero-demo"
                data-track-event="cta_click"
                data-track-name="hero_view_demo"
                data-track-section="hero"
                data-track-destination={HERO_VIEW_DEMO_URL}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                View Demo
              </a>
            </span>
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-intel-card">
            <div className="hic-top">
              <div className="hic-lights"><span></span><span></span><span></span></div>
              <span className="hic-title">AIT - AI INTELLIGENCE LAYER</span>
              <span className="hic-live"><span className="hcc-dot"></span>Live</span>
            </div>

            <div className="hic-body">
              <div className="hic-chip hic-chip-score">
                <div className="hic-chip-label">VENDOR TRUST SCORE</div>
                <div className="hic-trust-row">
                  <div className="hic-score-badge">
                    <span>92</span>
                  </div>
                  <div className="hic-trust-copy">
                    <div className="hic-chip-main">Mehta Supplies</div>
                    <div className="hic-chip-sub">Excellent - Safe to transact</div>
                  </div>
                </div>
              </div>

              <div className="hcc-msg user">
                <div className="hcc-avatar">U</div>
                <div className="hcc-bubble">What is my actual ITC exposure for this quarter?</div>
              </div>

              <div className="hcc-msg ai hic-main-reply">
                <div className="hcc-avatar">AI</div>
                <div className="hcc-bubble">
                  Based on reconciled data against GSTR-2B, Here&apos;s your position:
                  <br />
                  <strong>Total ITC Claimed:</strong> ₹18.4L
                  <br />
                  <strong>Confirmed &amp; Matched:</strong> ₹15.1L✓
                  <br />
                  <strong>At Risk (3 vendors):</strong> ₹3.3L△
                  <br /><br />
                  Sharma Traders hasn&apos;t filed GSTR-1 in 3 months — your ₹1.8L claim could be denied. I&apos;ve drafted a Magic Link reminder. Approve to send?
                </div>
              </div>

              <div className="hic-actions">
                <button className="hic-btn">✓ Send reminder</button>
                <button className="hic-btn">View full report</button>
                <button className="hic-btn">Dispute ITC</button>
              </div>

              <div className="hcc-msg user">
                <div className="hcc-avatar">U</div>
                <div className="hcc-bubble">When&apos;s my next filing deadline and what&apos;s left to do?</div>
              </div>

              <div className="hcc-msg ai">
                <div className="hcc-avatar">AI</div>
                <div className="hcc-bubble">
                  <strong>⚡ GSTR-1 due in 4 days.</strong> 3 items need your attention before I can file:
                  <br />1. 2 vendor invoices flagged for HSN mismatch
                  <br />2. Challan payment for TDS 26Q pending
                  <br />3. Your authorised signatory DSC needs renewal
                  <br /><br />
                  I&apos;ve pre-filled everything else. Your return is 94% ready.
                </div>
              </div>

              <div className="hic-bottom-stats">
                <div><span>ITC Recovered</span><strong>₹3.1L</strong></div>
                <div><span>Return Accuracy</span><strong>99.2%</strong></div>
                <div><span>Penalties Avoided</span><strong>₹84K</strong></div>
              </div>

              <div className="hic-chip hic-chip-risk">
                <div className="hic-chip-label">VENDOR RISK ALERT</div>
                <div className="hic-chip-main hic-chip-main-risk">
                  <span className="hic-risk-badge">!</span>
                  <strong>Kumar Logistics</strong>
                </div>
                <div className="hic-chip-sub">Trust Score: 34 · ITC at risk: ₹84K</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="stats-bar">
        <div className="stat-item">
          <div className="stat-num"><span data-target="1.5">0</span>Cr</div>
          <div className="stat-label">Avg ITC Recovered / Client</div>
        </div>
        <div className="stat-item">
          <div className="stat-num"><span data-target="10">0</span>x</div>
          <div className="stat-label">Faster Reconciliation</div>
        </div>
        <div className="stat-item">
          <div className="stat-num"><span data-target="40">0</span>%</div>
          <div className="stat-label">Less Manual Finance Work</div>
        </div>
        <div className="stat-item">
          <div className="stat-num">100%</div>
          <div className="stat-label">Zero Missed Deadlines</div>
        </div>
        <div className="stat-item">
          <div className="stat-num">&lt;2h</div>
          <div className="stat-label">Reconciliation (was 3-5 days)</div>
        </div>
      </div>
    </section>
  )
}

