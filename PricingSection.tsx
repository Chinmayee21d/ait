'use client'
import { useRef, useState } from 'react'
import { APP_SIGNUP_URL } from '@/lib/site-links'

function PricingCard({
  featured = false,
  popular = false,
  tier,
  price,
  isCustom = false,
  period,
  entities,
  features,
  ctaLabel,
  ctaHref,
  delay = 0,
}: {
  featured?: boolean
  popular?: boolean
  tier: string
  price: string
  isCustom?: boolean
  period: string
  entities: string
  features: string[]
  ctaLabel: string
  ctaHref: string
  delay?: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    const glow = glowRef.current
    if (!card || !glow) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    const rotX = ((y - cy) / cy) * -6
    const rotY = ((x - cx) / cx) * 6
    card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px) scale(1.01)`
    card.style.transition = 'box-shadow 0.2s ease'
    glow.style.left = x + 'px'
    glow.style.top = y + 'px'
    glow.style.opacity = '1'
  }

  const handleMouseLeave = () => {
    const card = cardRef.current
    const glow = glowRef.current
    if (!card || !glow) return
    card.style.transform = ''
    card.style.transition = 'transform 0.5s cubic-bezier(0.23,1,0.32,1), box-shadow 0.35s cubic-bezier(0.23,1,0.32,1)'
    glow.style.opacity = '0'
  }

  return (
    <div
      ref={cardRef}
      className={`prc-card reveal${featured ? ' prc-featured' : ''}${popular ? ' prc-featured-wrap' : ''}`}
      style={{ transitionDelay: `${delay}s` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={glowRef} className="prc-glow" />
      <div className="prc-inner" />
      {popular && <div className="prc-popular-badge">Most Popular</div>}

      <div className="prc-body">
        <div className="prc-tier-label">{tier}</div>

        <div className="prc-price-wrap">
          {!isCustom && <span className="prc-currency">₹</span>}
          <span className={isCustom ? 'prc-amount-custom' : 'prc-amount'}>{price}</span>
        </div>
        <div className="prc-period">{period}</div>
        <div className="prc-entities">{entities}</div>
        <div className="prc-divider" />

        <ul className="prc-feats">
          {features.map((feat, i) => (
            <li key={i}>
              <span className="prc-check-icon">✓</span>
              {feat}
            </li>
          ))}
        </ul>

        <a
          href={ctaHref}
          className={`prc-cta ${featured ? 'prc-cta-gold' : 'prc-cta-outline'}`}
          data-track-event="cta_click"
          data-track-name={`pricing_${tier.toLowerCase().replace(/\s+/g, '_')}_${ctaLabel.toLowerCase().replace(/\s+/g, '_')}`}
          data-track-label={ctaLabel}
          data-track-section="pricing"
          data-track-destination={ctaHref}
        >
          {ctaLabel}
        </a>
      </div>
    </div>
  )
}

const bizPlans = [
  {
    tier: 'Starter',
    price: '10,000',
    period: 'per month',
    entities: '1–2 GSTINs / TANs · Unlimited Users · Unlimited Vendors',
    features: [
      'GST Filing (GSTR-1, 3B, 9, 9C)',
      'Basic GSTR-2B Reconciliation',
      'TDS Returns (24Q, 26Q, 27Q)',
      'Vendor Magic Link',
      'ITC Risk Dashboard',
      '1 Year Data Retention',
      'Email Support',
    ],
    ctaLabel: 'Sign Up',
    ctaHref: APP_SIGNUP_URL,
  },
  {
    featured: true,
    popular: true,
    tier: 'Growth',
    price: '20,000',
    period: 'per month',
    entities: 'Up to 5 GSTINs / TANs · Unlimited Users · Unlimited Vendors',
    features: [
      'Everything in Starter',
      'Advanced AI Reconciliation (fuzzy matching)',
      'Vendor Trust Score',
      'Natural Language Queries',
      'API Access & ERP Connectors',
      'Workflow Engine & Approvals',
      '3 Year Data Retention',
      'Priority Support',
    ],
    ctaLabel: 'Sign Up',
    ctaHref: APP_SIGNUP_URL,
  },
  {
    tier: 'Enterprise',
    price: 'Custom',
    isCustom: true,
    period: 'contact for pricing',
    entities: '6+ GSTINs / TANs · Unlimited everything',
    features: [
      'Everything in Growth',
      'Full AI Suite (Anomaly, Forecasting, Simulation)',
      'Notice Interpretation & Response',
      'SSO / SAML Integration',
      'White-label Option',
      'Custom Data Retention',
      'Dedicated Implementation Manager',
      'SLA-backed Support',
    ],
    ctaLabel: 'Talk to Sales',
    ctaHref: '/request-demo',
  },
]

const caPlans = [
  {
    tier: 'CA Starter',
    price: '10,000',
    period: 'per month',
    entities: 'Up to 20 client entities · Unlimited CA staff',
    features: [
      'Multi-client dashboard',
      'Client portal (scoped access)',
      'GST + TDS filing for all clients',
      'Basic reconciliation tools',
      'Email support',
    ],
    ctaLabel: 'Sign Up',
    ctaHref: APP_SIGNUP_URL,
  },
  {
    featured: true,
    popular: true,
    tier: 'CA Growth',
    price: '20,000',
    period: 'per month',
    entities: 'Up to 75 client entities · Unlimited CA staff',
    features: [
      'Everything in CA Starter',
      'Bulk filing across all clients',
      'AI reconciliation per client',
      'White-label client portal',
      'API access',
      'Priority support',
    ],
    ctaLabel: 'Sign Up',
    ctaHref: APP_SIGNUP_URL,
  },
  {
    tier: 'CA Enterprise',
    price: 'Custom',
    isCustom: true,
    period: 'contact for pricing',
    entities: 'Unlimited client entities',
    features: [
      'Everything in CA Growth',
      'Full AI suite per client',
      'Custom branding & domain',
      'Dedicated account manager',
      'Volume discounts',
    ],
    ctaLabel: 'Talk to Sales',
    ctaHref: '/request-demo',
  },
]

const volTiers = [
  { range: '1–25 Entities', price: '₹1,500', unit: 'per entity / month' },
  { range: '26–100 Entities', price: '₹1,000', unit: 'per entity / month' },
  { range: '101–250 Entities', price: '₹500', unit: 'per entity / month' },
  { range: '250+ Entities', price: 'Custom', unit: 'talk to us' },
]

export default function PricingSection() {
  const [activeTab, setActiveTab] = useState<'biz' | 'ca'>('biz')

  return (
    <section className="pricing-section" id="pricing" data-track-section="pricing">
      <div className="section-wrap">
        <div className="section-tag reveal" style={{ justifyContent: 'center' }}>Pricing</div>
        <h2 className="reveal" style={{ textAlign: 'center' }}>
          Simple, transparent,<br /><em>growth-aligned pricing.</em>
        </h2>
        <p className="section-sub reveal" style={{ textAlign: 'center', margin: '0 auto' }}>
          Unlimited users. Unlimited vendors. Pricing based on your scale (Entities), not seats.
        </p>

        {/* Tabs */}
        <div className="prc-tabs">
          <button className={`prc-tab${activeTab === 'biz' ? ' active' : ''}`} onClick={() => setActiveTab('biz')}>
            For Businesses
          </button>
          <button className={`prc-tab${activeTab === 'ca' ? ' active' : ''}`} onClick={() => setActiveTab('ca')}>
            For CA Firms
          </button>
        </div>

        {/* Business pane */}
        <div className={`prc-pane${activeTab === 'biz' ? ' active' : ''}`}>
          <div className="prc-grid">
            {bizPlans.map((plan, i) => (
              <PricingCard key={plan.tier} {...plan} delay={i * 0.1} />
            ))}
          </div>
          <p className="prc-note reveal">
            Annual commitment: <strong>2 months free (17% off)</strong> · No per-seat pricing · No vendor limits
          </p>
        </div>

        {/* CA pane */}
        <div className={`prc-pane${activeTab === 'ca' ? ' active' : ''}`}>
          <div className="prc-grid">
            {caPlans.map((plan, i) => (
              <PricingCard key={plan.tier} {...plan} delay={i * 0.1} />
            ))}
          </div>

          <div className="vol-section">
            <div className="vol-label">Volume Pricing — Pay only for what you use</div>
            <div className="ca-vol-grid">
              {volTiers.map((v, i) => (
                <div key={v.range} className="vol-card reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
                  <div className="vol-range">{v.range}</div>
                  <div className="vol-price">{v.price}</div>
                  <div className="vol-unit">{v.unit}</div>
                </div>
              ))}
            </div>
          </div>

          <p className="prc-note reveal" style={{ marginTop: '24px' }}>
            Annual commitment: <strong>2 months free (17% off)</strong> · Unlimited staff users always included
          </p>
        </div>
      </div>
    </section>
  )
}
