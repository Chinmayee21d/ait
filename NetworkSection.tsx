'use client'
import { useEffect, useRef } from 'react'

type Point = { x: number; y: number }

const LOOP_MS = 28000

const S = {
  vendorUpload: [0, 3500],
  vendorToAit: [3500, 5200],
  aitValidate: [5200, 8600],
  aitToCustomer: [8600, 10100],
  customerApprove: [10100, 12200],
  customerToAit: [12200, 13700],
  aitBatch: [13700, 16000],
  aitToCa: [16000, 17600],
  caReview: [17600, 19800],
  caToAit: [19800, 21400],
  gstSync: [21400, 25200],
  collapse: [25200, 28000]
} as const

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v))
}

function seg(now: number, span: readonly [number, number]) {
  const [a, b] = span
  return clamp01((now - a) / (b - a))
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

function roundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  const rr = Math.min(r, w * 0.5, h * 0.5)
  ctx.beginPath()
  ctx.moveTo(x + rr, y)
  ctx.arcTo(x + w, y, x + w, y + h, rr)
  ctx.arcTo(x + w, y + h, x, y + h, rr)
  ctx.arcTo(x, y + h, x, y, rr)
  ctx.arcTo(x, y, x + w, y, rr)
  ctx.closePath()
}

function drawArrowFlow(ctx: CanvasRenderingContext2D, a: Point, b: Point, color: string, width: number, flow: number, intensity = 1) {
  const dx = b.x - a.x
  const dy = b.y - a.y
  const len = Math.hypot(dx, dy)
  if (len < 1) return
  const ux = dx / len
  const uy = dy / len

  ctx.save()
  ctx.lineWidth = width
  ctx.strokeStyle = `rgba(36,72,124,${0.13 * intensity})`
  ctx.beginPath()
  ctx.moveTo(a.x, a.y)
  ctx.lineTo(b.x, b.y)
  ctx.stroke()

  const glow = ctx.createLinearGradient(a.x, a.y, b.x, b.y)
  glow.addColorStop(0, 'rgba(255,255,255,0)')
  glow.addColorStop(0.25, color)
  glow.addColorStop(0.8, color)
  glow.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.strokeStyle = glow
  ctx.lineWidth = width + 0.6
  ctx.beginPath()
  ctx.moveTo(a.x, a.y)
  ctx.lineTo(b.x, b.y)
  ctx.stroke()

  for (let i = 0; i < 3; i++) {
    const p = (flow + i * 0.32) % 1
    const x = a.x + dx * p
    const y = a.y + dy * p
    const r = 4.2 - i * 0.55

    const g = ctx.createRadialGradient(x, y, 0, x, y, r * 2.5)
    g.addColorStop(0, 'rgba(255,255,255,0.95)')
    g.addColorStop(0.45, color)
    g.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = g
    ctx.beginPath()
    ctx.arc(x, y, r * 2.5, 0, Math.PI * 2)
    ctx.fill()
  }

  const ahx = b.x - ux * 16
  const ahy = b.y - uy * 16
  const nx = -uy
  const ny = ux
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.moveTo(b.x, b.y)
  ctx.lineTo(ahx + nx * 6, ahy + ny * 6)
  ctx.lineTo(ahx - nx * 6, ahy - ny * 6)
  ctx.closePath()
  ctx.fill()

  ctx.restore()
}

export default function NetworkSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const c = canvas
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const motion = reduceMotion ? 0.5 : 1

    function resize() {
      const wrap = c.parentElement
      if (!wrap) return
      const w = wrap.offsetWidth
      const h = wrap.offsetHeight || 430
      c.width = Math.floor(w * dpr)
      c.height = Math.floor(h * dpr)
      c.style.width = `${w}px`
      c.style.height = `${h}px`
    }

    resize()
    window.addEventListener('resize', resize)

    const ctx = c.getContext('2d') as CanvasRenderingContext2D

    let raf = 0
    let time = 0

    function pt(rx: number, ry: number) {
      return { x: (c.width / dpr) * rx, y: (c.height / dpr) * ry }
    }

    function drawCard(center: Point, w: number, h: number, title: string, subtitle: string, active: boolean, kind: 'default' | 'ait' | 'success', alpha = 1) {
      const x = center.x - w * 0.5
      const y = center.y - h * 0.5

      ctx.save()
      ctx.globalAlpha = alpha

      const fill =
        kind === 'ait' ? '#0f1e3d' :
          kind === 'success' ? '#edf9f2' :
            '#f7faff'

      const border =
        kind === 'ait' ? 'rgba(198,168,94,0.75)' :
          kind === 'success' ? 'rgba(28,128,84,0.35)' :
            'rgba(36,72,124,0.2)'

      ctx.shadowColor = active ? 'rgba(15,30,61,0.18)' : 'rgba(15,30,61,0.08)'
      ctx.shadowBlur = active ? 24 : 12

      roundedRect(ctx, x, y, w, h, 14)
      ctx.fillStyle = fill
      ctx.fill()

      ctx.shadowBlur = 0
      ctx.lineWidth = active ? 1.8 : 1.2
      ctx.strokeStyle = border
      ctx.stroke()

      ctx.fillStyle = kind === 'ait' ? '#f2f6ff' : '#153b6f'
      ctx.font = `700 ${kind === 'ait' ? 13 : 12}px Outfit,sans-serif`
      ctx.textAlign = 'left'
      ctx.textBaseline = 'top'
      ctx.fillText(title, x + 12, y + 10)

      ctx.fillStyle = kind === 'ait' ? 'rgba(240,248,255,0.82)' : 'rgba(44,70,110,0.86)'
      ctx.font = `500 11px Outfit,sans-serif`
      ctx.fillText(subtitle, x + 12, y + 30)

      ctx.restore()
    }

    function drawFrame() {
      raf = requestAnimationFrame(drawFrame)
      time += 16.67 * motion
      const now = time % LOOP_MS

      const pCollapseRaw = seg(now, S.collapse)
      const pCollapse = easeOut(pCollapseRaw)

      const w = c.width / dpr
      const h = c.height / dpr
      const center = pt(0.5, 0.5)

      ctx.clearRect(0, 0, c.width, c.height)

      const bg = ctx.createRadialGradient(center.x * dpr, center.y * dpr, 10, center.x * dpr, center.y * dpr, Math.max(w, h) * 0.72 * dpr)
      bg.addColorStop(0, 'rgba(247,251,255,0.95)')
      bg.addColorStop(1, 'rgba(255,255,255,0.72)')
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, c.width, c.height)

      const vendor = pt(0.16, 0.53)
      const customer = pt(0.5, 0.16)
      const ca = pt(0.84, 0.5)
      const gst = pt(0.77, 0.82)
      const ait = center

      const collapsePoint = center
      const mix = (p: Point) => ({
        x: lerp(p.x, collapsePoint.x, pCollapse),
        y: lerp(p.y, collapsePoint.y, pCollapse)
      })

      const v = mix(vendor)
      const cst = mix(customer)
      const cc = mix(ca)
      const gp = mix(gst)
      const ap = mix(ait)

      const dimAlpha = 1 - pCollapse

      if (dimAlpha > 0.02) {
        drawArrowFlow(ctx, v, ap, 'rgba(36,72,124,0.42)', 1.4, 0, 0.4)
        drawArrowFlow(ctx, ap, cst, 'rgba(36,72,124,0.42)', 1.4, 0, 0.4)
        drawArrowFlow(ctx, ap, cc, 'rgba(36,72,124,0.42)', 1.4, 0, 0.4)
        drawArrowFlow(ctx, ap, gp, 'rgba(36,72,124,0.34)', 1.2, 0, 0.35)
      }

      const flowVendorToAit = seg(now, S.vendorToAit)
      const flowAitToCustomer = seg(now, S.aitToCustomer)
      const flowCustomerToAit = seg(now, S.customerToAit)
      const flowAitToCa = seg(now, S.aitToCa)
      const flowCaToAit = seg(now, S.caToAit)
      const flowGst = seg(now, S.gstSync)

      if (flowVendorToAit > 0 && pCollapse < 1) drawArrowFlow(ctx, v, ap, 'rgba(29,123,84,0.9)', 2.5, flowVendorToAit, 1)
      if (flowAitToCustomer > 0 && pCollapse < 1) drawArrowFlow(ctx, ap, cst, 'rgba(36,72,124,0.92)', 2.5, flowAitToCustomer, 1)
      if (flowCustomerToAit > 0 && pCollapse < 1) drawArrowFlow(ctx, cst, ap, 'rgba(186,150,72,0.92)', 2.5, flowCustomerToAit, 1)
      if (flowAitToCa > 0 && pCollapse < 1) drawArrowFlow(ctx, ap, cc, 'rgba(36,72,124,0.92)', 2.5, flowAitToCa, 1)
      if (flowCaToAit > 0 && pCollapse < 1) drawArrowFlow(ctx, cc, ap, 'rgba(29,123,84,0.92)', 2.5, flowCaToAit, 1)

      if (flowGst > 0 && pCollapse < 1) {
        const cyc = (flowGst * 3.2) % 1
        drawArrowFlow(ctx, ap, gp, 'rgba(49,92,156,0.9)', 2.2, cyc, 1)
        drawArrowFlow(ctx, gp, ap, 'rgba(186,150,72,0.88)', 2.2, (cyc + 0.45) % 1, 1)
      }

      const vendorActive = now >= S.vendorUpload[0] && now < S.vendorUpload[1]
      const customerActive = now >= S.customerApprove[0] && now < S.customerApprove[1]
      const caActive = now >= S.caReview[0] && now < S.caReview[1]
      const aitValidation = now >= S.aitValidate[0] && now < S.aitValidate[1]
      const aitBatch = now >= S.aitBatch[0] && now < S.aitBatch[1]
      const aitGst = now >= S.gstSync[0] && now < S.gstSync[1]

      const smallW = lerp(132, 20, pCollapse)
      const smallH = lerp(54, 20, pCollapse)
      const aitW = lerp(188, 26, pCollapse)
      const aitH = lerp(116, 26, pCollapse)

      drawCard(v, vendorActive ? lerp(200, 132, seg(now, [S.vendorUpload[0], S.vendorUpload[1] - 400])) : smallW, vendorActive ? lerp(108, 54, seg(now, [S.vendorUpload[0], S.vendorUpload[1] - 400])) : smallH, 'Vendor', vendorActive ? 'Uploading invoice data' : 'Invoice uploaded', vendorActive, vendorActive ? 'default' : 'success', dimAlpha)

      drawCard(cst, customerActive ? 196 : smallW, customerActive ? 96 : smallH, 'Customer', customerActive ? 'Reviewing invoice copy' : 'Customer approved', customerActive, customerActive ? 'default' : 'success', dimAlpha)

      drawCard(cc, caActive ? 196 : smallW, caActive ? 96 : smallH, 'CA Compliance', caActive ? 'Compliance review in progress' : 'Compliance confirmed', caActive, caActive ? 'default' : 'success', dimAlpha)

      drawCard(gp, aitGst ? 208 : smallW, aitGst ? 98 : smallH, 'GST Portal', aitGst ? 'Reconciling + filing returns' : 'Returns accepted', aitGst, aitGst ? 'default' : 'success', dimAlpha)

      let aitSubtitle = 'Awaiting vendor document'
      if (aitValidation) aitSubtitle = 'Running 6-point validation'
      else if (now >= S.aitToCustomer[0] && now < S.customerToAit[1]) aitSubtitle = 'Routing for customer confirmation'
      else if (aitBatch) aitSubtitle = 'Adding approved invoice to month-end batch'
      else if (now >= S.aitToCa[0] && now < S.caToAit[1]) aitSubtitle = 'Coordinating CA compliance'
      else if (aitGst) aitSubtitle = 'Filing and reconciling with GST portal'
      else if (now >= S.collapse[0]) aitSubtitle = 'Workflow complete'

      drawCard(ap, aitW, aitH, 'AIT Orchestration Hub', aitSubtitle, true, 'ait', dimAlpha)

      if (vendorActive && pCollapse < 1) {
        const p = seg(now, S.vendorUpload)
        const x = v.x - 82
        const y = v.y + 16
        const bw = 148
        ctx.save()
        ctx.globalAlpha = dimAlpha
        roundedRect(ctx, x, y, bw, 8, 4)
        ctx.fillStyle = 'rgba(36,72,124,0.12)'
        ctx.fill()
        roundedRect(ctx, x, y, bw * p, 8, 4)
        ctx.fillStyle = 'rgba(29,123,84,0.82)'
        ctx.fill()
        ctx.restore()
      }

      if (aitValidation && pCollapse < 1) {
        const p = seg(now, S.aitValidate)
        const checks = ['Format', 'GSTIN', 'Duplicate', 'Tax calc', 'ITC', 'Risk flags']
        for (let i = 0; i < checks.length; i++) {
          const t = clamp01(p * checks.length - i)
          const y = ap.y - 16 + i * 12
          ctx.save()
          ctx.globalAlpha = (0.35 + t * 0.65) * dimAlpha
          ctx.fillStyle = t > 0.98 ? 'rgba(33,126,83,0.92)' : 'rgba(92,106,132,0.86)'
          ctx.font = '500 9.5px Outfit,sans-serif'
          ctx.textAlign = 'left'
          ctx.textBaseline = 'middle'
          const prefix = t > 0.98 ? '[OK] ' : '[..] '
          ctx.fillText(prefix + checks[i], ap.x - 80, y)
          ctx.restore()
        }
      }

      if (aitBatch && pCollapse < 1) {
        const p = seg(now, S.aitBatch)
        const count = Math.floor(lerp(41, 42, easeOut(p)))
        const bx = ap.x - 84
        const by = ap.y + 36
        ctx.save()
        ctx.globalAlpha = dimAlpha
        roundedRect(ctx, bx, by, 168, 22, 11)
        ctx.fillStyle = 'rgba(198,168,94,0.16)'
        ctx.fill()
        ctx.strokeStyle = 'rgba(198,168,94,0.35)'
        ctx.lineWidth = 1
        ctx.stroke()
        ctx.fillStyle = 'rgba(102,80,35,0.95)'
        ctx.font = '600 10px Outfit,sans-serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(`Month-end batch: ${count} invoices`, ap.x, by + 11)
        ctx.restore()
      }

      if (pCollapse > 0.01) {
        const r = lerp(4, 34, pCollapse)
        ctx.save()
        ctx.globalAlpha = pCollapse
        ctx.beginPath()
        ctx.arc(center.x, center.y, r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(29,123,84,0.96)'
        ctx.fill()

        ctx.strokeStyle = 'white'
        ctx.lineWidth = 3
        ctx.lineCap = 'round'
        ctx.beginPath()
        ctx.moveTo(center.x - r * 0.34, center.y)
        ctx.lineTo(center.x - r * 0.08, center.y + r * 0.28)
        ctx.lineTo(center.x + r * 0.4, center.y - r * 0.3)
        ctx.stroke()

        ctx.fillStyle = 'rgba(17,49,84,0.9)'
        ctx.font = '600 11px Outfit,sans-serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'top'
        ctx.fillText('Completed', center.x, center.y + r + 10)
        ctx.restore()
      }
    }

    drawFrame()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <section className="network-section" id="network">
      <div className="section-wrap">
        <div className="section-tag reveal">AIT Workflow</div>
        <h2 className="reveal">Invoice to Filing<br /><em>in one orchestrated flow.</em></h2>
        <p className="section-sub reveal">Vendor upload, AIT validation, customer confirmation, CA compliance, GST filing, and final closure - all visible in a single operational timeline.</p>
        <div className="network-grid workflow-grid">
          <div className="network-visual fullwidth reveal">
            <div className="network-canvas-wrap">
              <canvas ref={canvasRef} />
            </div>
          </div>
          <div className="net-features">
            <div className="net-feat reveal">
              <div className="net-feat-icon">
                <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M3 5h14M3 10h14M3 15h14" stroke="#153B6F" strokeWidth="1.5" strokeLinecap="round" /></svg>
              </div>
              <div>
                <div className="net-feat-title">Step-by-step directional flow</div>
                <div className="net-feat-desc">Each arrow is explicit, directional, and timed so teams can see exactly where the invoice is and who acts next.</div>
              </div>
            </div>
            <div className="net-feat reveal" style={{ transitionDelay: '0.08s' }}>
              <div className="net-feat-icon">
                <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M10 3v14M3 10h14" stroke="#153B6F" strokeWidth="1.5" strokeLinecap="round" /></svg>
              </div>
              <div>
                <div className="net-feat-title">Month-end batch context</div>
                <div className="net-feat-desc">AIT adds this invoice into an existing month-end queue before CA review, not as an isolated one-off action.</div>
              </div>
            </div>
            <div className="net-feat reveal" style={{ transitionDelay: '0.16s' }}>
              <div className="net-feat-icon">
                <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M4 10l4 4 8-8" stroke="#153B6F" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <div>
                <div className="net-feat-title">Single-point completion</div>
                <div className="net-feat-desc">The network collapses into one final completion mark, signaling the invoice lifecycle is fully closed.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
