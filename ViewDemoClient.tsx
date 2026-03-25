'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AITRequestDemo from '@/design/AITRequestDemo'
import AITLogo from '@/design/AITLogo'
import { globalStyles, injectStyles } from '@/design/aitAuthUtils'
import { DemoRole, getDemoUrlForRole } from '@/lib/site-links'

const roleOptions: Array<{ role: DemoRole; label: string; desc: string }> = [
  {
    role: 'business',
    label: 'Business Owner',
    desc: 'For SMB operators and finance owners managing day-to-day compliance.',
  },
  {
    role: 'enterprise',
    label: 'Enterprise User',
    desc: 'For enterprise teams running multi-entity and cross-system operations.',
  },
  {
    role: 'ca',
    label: 'CA / CA Firm',
    desc: 'For chartered accountant firms managing multiple client entities.',
  },
]

const leftFeatures = [
  {
    title: 'OTP verified access',
    desc: 'Your email is verified before the role-specific demo is unlocked.',
  },
  {
    title: 'Role-specific walkthrough',
    desc: 'Demo screens are tailored to your operating context and decision needs.',
  },
  {
    title: 'Reply email for custom deep-dive',
    desc: 'Reply to the confirmation email if you want a detailed customised session.',
  },
]

export default function ViewDemoClient({ role }: { role: DemoRole | null }) {
  const router = useRouter()
  useEffect(() => injectStyles('ait-auth-styles', globalStyles), [])

  if (!role) {
    return (
      <div style={pageStyle}>
        <BackgroundDecor />

        <div
          style={{
            width: '100%',
            maxWidth: 880,
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Logo */}
          <div style={{ marginBottom: 16 }}>
            <AITLogo size="md" />
          </div>

          {/* Two-column card — identical shell to AITRequestDemo */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 0,
              width: '100%',
              maxWidth: 840,
              background: 'linear-gradient(145deg, #111d35 0%, #0d1829 100%)',
              border: '1px solid rgba(198,168,94,0.18)',
              borderRadius: 24,
              overflow: 'hidden',
              boxShadow: '0 40px 80px rgba(0,0,0,0.6)',
            }}
          >
            {/* ── Left panel ── */}
            <div style={{ padding: '36px 30px', borderRight: '1px solid rgba(198,168,94,0.1)', position: 'relative' }}>
              <div
                style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0,
                  height: '1px',
                  background: 'linear-gradient(90deg, transparent, rgba(198,168,94,0.4), transparent)',
                }}
              />

              <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, color: '#f0ece4', margin: '0 0 8px', lineHeight: 1.3 }}>
                View Your Guided Demo
              </p>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: '#8A9AB0', marginBottom: 24, lineHeight: 1.6 }}>
                Choose your profile first. We will ask you to register and verify your email before opening the role-specific demo.
              </p>

              {/* Feature bullets — identical to AITRequestDemo */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {leftFeatures.map((item) => (
                  <div key={item.title} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    <div
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: 10,
                        background: 'rgba(198,168,94,0.1)',
                        border: '1px solid rgba(198,168,94,0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 18,
                        flexShrink: 0,
                        color: '#C6A85E',
                        fontWeight: 700,
                      }}
                    >
                      +
                    </div>
                    <div>
                      <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 600, color: '#f0ece4', margin: '0 0 2px' }}>
                        {item.title}
                      </p>
                      <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, color: '#8A9AB0', margin: 0, lineHeight: 1.5 }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Outcome box — identical to AITRequestDemo */}
              <div style={{ marginTop: 24, padding: '14px', background: 'rgba(198,168,94,0.06)', borderRadius: 12, border: '1px solid rgba(198,168,94,0.12)' }}>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, color: '#C6A85E', fontWeight: 600, margin: '0 0 4px' }}>ACCESS FLOW</p>
                <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: '#f0ece4', margin: '0 0 4px' }}>Select → Register → View Demo</p>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, color: '#8A9AB0', margin: 0 }}>Takes about 60 seconds</p>
              </div>
            </div>

            {/* ── Right panel ── */}
            <div style={{ padding: '36px 30px' }}>
              {/* Step tag */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 11,
                  fontWeight: 600,
                  color: '#C6A85E',
                  letterSpacing: '1.2px',
                  textTransform: 'uppercase',
                  background: 'rgba(198,168,94,0.08)',
                  border: '1px solid rgba(198,168,94,0.18)',
                  borderRadius: 20,
                  padding: '4px 12px',
                  marginBottom: 16,
                }}
              >
                Step 1 of 2
              </div>

              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 18, fontWeight: 600, color: '#f0ece4', margin: '0 0 6px' }}>
                Select your profile
              </h2>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: '#8A9AB0', margin: '0 0 20px', lineHeight: 1.6 }}>
                Pick the option that best matches your organization and workflow.
              </p>

              {/* Role buttons */}
              <div style={{ display: 'grid', gap: 10, marginBottom: 20 }}>
                {roleOptions.map((opt) => (
                  <button
                    key={opt.role}
                    type="button"
                    data-track-event="cta_click"
                    data-track-name={`view_demo_select_${opt.role}`}
                    data-track-section="view_demo"
                    data-track-destination={`/view-demo?role=${opt.role}`}
                    onClick={() => router.push(`/view-demo?role=${opt.role}`)}
                    style={{
                      textAlign: 'left',
                      borderRadius: 12,
                      padding: '14px 16px',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(198,168,94,0.15)',
                      cursor: 'pointer',
                      transition: 'border-color 0.15s, background 0.15s',
                      width: '100%',
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget
                      el.style.background = 'rgba(198,168,94,0.07)'
                      el.style.borderColor = 'rgba(198,168,94,0.35)'
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget
                      el.style.background = 'rgba(255,255,255,0.03)'
                      el.style.borderColor = 'rgba(198,168,94,0.15)'
                    }}
                  >
                    <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: 14, color: '#f0ece4', marginBottom: 3 }}>
                      {opt.label}
                    </div>
                    <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, color: '#8A9AB0', lineHeight: 1.5 }}>
                      {opt.desc}
                    </div>
                  </button>
                ))}
              </div>

              {/* Footer link */}
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, color: 'rgba(138,154,176,0.5)', textAlign: 'center', margin: 0 }}>
                <a
                  href="/request-demo"
                  data-track-event="cta_click"
                  data-track-name="view_demo_prefer_scheduled"
                  data-track-section="view_demo"
                  data-track-destination="/request-demo"
                  style={{ color: '#C6A85E', textDecoration: 'none', fontWeight: 500 }}
                >
                  Prefer a scheduled sales demo instead?
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ── Role selected: hand off to AITRequestDemo (unchanged) ──────────────────
  const redirectUrl = getDemoUrlForRole(role)

  return (
    <AITRequestDemo
      mode="view"
      selectedRole={role}
      autoRedirectUrl={redirectUrl}
      onBack={() => router.push('/view-demo')}
      onSuccess={() => {
        window.location.href = redirectUrl
      }}
      onSignInClick={() => router.push('/sign-in')}
    />
  )
}

// ── Shared style helpers (identical to AITRequestDemo) ────────────────────────
function BackgroundDecor() {
  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', zIndex: 0, pointerEvents: 'none' }}>
      <div style={{ position: 'absolute', top: '5%', right: '-5%', width: '55vw', height: '55vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(21,59,111,0.35) 0%, transparent 70%)' }} />
      <div style={{ position: 'absolute', bottom: '0%', left: '0%', width: '45vw', height: '45vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(198,168,94,0.05) 0%, transparent 70%)' }} />
    </div>
  )
}

const pageStyle: React.CSSProperties = {
  minHeight: '100vh',
  background: '#080e1c',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px 16px',
  position: 'relative',
}
