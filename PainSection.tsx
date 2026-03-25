'use client'

import { useEffect, useRef, useState } from 'react'

const CARDS = [
  {
    num: '01',
    title: 'The Data Gap',
    desc: 'Critical compliance data lives in disconnected silos - ERP, government portals, and CA files. The truth exists only in offline sheets that nobody fully trusts.',
    stat: '3-5 days/month in reconciliation',
    statKind: 'red',
    accentColor: 'rgba(192,57,43,0.12)',
    glareColor: 'rgba(192,57,43,0.08)',
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
        <ellipse cx="12" cy="5" rx="9" ry="3" stroke="currentColor" strokeWidth="1.6" />
        <path d="M3 5v5c0 1.66 4.03 3 9 3s9-1.34 9-3V5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M3 10v5c0 1.66 4.03 3 9 3s9-1.34 9-3v-5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M3 15v4c0 1.66 4.03 3 9 3s9-1.34 9-3v-4" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'The Vendor Blindspot',
    desc: 'ITC eligibility depends on whether vendors file returns. You discover non-filers only after GSTR-2B is published, when recovery options are already limited.',
    stat: '1-3% ITC leakage annually',
    statKind: 'yellow',
    accentColor: 'rgba(160,96,10,0.1)',
    glareColor: 'rgba(198,168,94,0.1)',
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" />
        <path d="M11 8v3l2 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M16 16l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M11 8v0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'The Manual Drag',
    desc: 'High-skilled finance professionals still spend days in row-level GST reconciliation and TDS lookup work. That is data entry effort, not strategic finance output.',
    stat: '₹20L-₹35L/year in salary savings',
    statKind: 'blue',
    accentColor: 'rgba(44,90,176,0.1)',
    glareColor: 'rgba(44,90,176,0.08)',
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
        <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M7 8h10M7 12h7M7 16h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M17 15l1.5 1.5L21 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

const TILT_MAX = 14        // max degrees of tilt
const GLARE_OPACITY = 0.18 // max glare opacity

function TiltedPainCard({ card, delay, visible }: {
  card: typeof CARDS[0]
  delay: number
  visible: boolean
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 })
  const [isHovered, setIsHovered] = useState(false)

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const card = cardRef.current
    if (!card) return
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      const rect = card.getBoundingClientRect()
      // Normalized -1 to 1 from center
      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2
      setTilt({ x: -ny * TILT_MAX, y: nx * TILT_MAX })
      // Glare position as % from top-left
      const gx = ((e.clientX - rect.left) / rect.width) * 100
      const gy = ((e.clientY - rect.top) / rect.height) * 100
      setGlare({ x: gx, y: gy, opacity: GLARE_OPACITY })
    })
  }

  function onMouseLeave() {
    cancelAnimationFrame(rafRef.current)
    setIsHovered(false)
    setTilt({ x: 0, y: 0 })
    setGlare(g => ({ ...g, opacity: 0 }))
  }

  function onMouseEnter() {
    setIsHovered(true)
  }

  useEffect(() => () => cancelAnimationFrame(rafRef.current), [])

  const transform = isHovered
    ? `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.04,1.04,1.04)`
    : 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)'

  return (
    <div
      className={`pain-tilt-wrap reveal${visible ? ' visible' : ''}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <div
        ref={cardRef}
        className="pain-card-tilted"
        style={{ transform, transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s cubic-bezier(0.23,1,0.32,1)' }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onMouseEnter={onMouseEnter}
      >
        {/* Glare overlay */}
        <div
          className="pain-tilt-glare"
          style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity * 2}) 0%, transparent 60%)`,
            opacity: glare.opacity > 0 ? 1 : 0,
            transition: isHovered ? 'opacity 0.15s' : 'opacity 0.4s',
          }}
        />

        {/* Accent glow at bottom */}
        <div
          className="pain-tilt-glow"
          style={{
            background: card.accentColor,
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.4s ease',
          }}
        />

        {/* Card content */}
        <div className="pain-tilt-inner">
          {/* Top row: num + icon */}
          <div className="pain-tilt-top">
            <div className="pain-tilt-num">{card.num}</div>
            <div className="pain-tilt-icon" style={{ color: card.statKind === 'red' ? '#c0392b' : card.statKind === 'yellow' ? '#a0600a' : '#2c5ab0' }}>
              {card.icon}
            </div>
          </div>

          <div className="pain-title">{card.title}</div>
          <div className="pain-desc">{card.desc}</div>

          {/* Stat badge that floats up on hover */}
          <div
            className={`pain-stat ${card.statKind} pain-tilt-stat`}
            style={{
              transform: isHovered ? 'translateY(0px)' : 'translateY(6px)',
              opacity: isHovered ? 1 : 0.7,
              transition: 'transform 0.4s cubic-bezier(0.23,1,0.32,1), opacity 0.3s ease',
            }}
          >
            {card.stat}
          </div>
        </div>

        {/* Shine line that sweeps across on hover */}
        <div
          className="pain-tilt-shine"
          style={{
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? 'translateX(200%)' : 'translateX(-100%)',
            transition: isHovered
              ? 'transform 0.6s cubic-bezier(0.23,1,0.32,1), opacity 0.1s'
              : 'opacity 0.3s, transform 0s',
          }}
        />
      </div>
    </div>
  )
}

export default function PainSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="pain-section" id="pain" data-track-section="pain">
      <div className="section-wrap" ref={sectionRef}>
        <div className={`section-tag reveal${visible ? ' visible' : ''}`}>The Problem</div>
        <h2 className={`reveal${visible ? ' visible' : ''}`} style={{ transitionDelay: '0.05s' }}>
          Indian compliance is
          <br />
          <em>fragmented, manual, and reactive.</em>
        </h2>
        <p className={`section-sub reveal${visible ? ' visible' : ''}`} style={{ transitionDelay: '0.1s' }}>
          Every Indian business is haemorrhaging ITC, paying unnecessary penalties, and burning
          skilled finance hours - not because the people are not good, but because the system is not
          built for them.
        </p>
        <div className="pain-grid">
          {CARDS.map((card, i) => (
            <TiltedPainCard key={card.num} card={card} delay={0.15 + i * 0.1} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  )
}
