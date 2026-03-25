'use client'

import { FormEvent, useMemo, useState } from 'react'

type Mode = 'demo' | 'pitch'

type Props = {
  mode: Mode
  title: string
  subtitle: string
}

export default function OtpLeadGate({ mode, title, subtitle }: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [company, setCompany] = useState('')
  const [message, setMessage] = useState('')
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState<'form' | 'otp' | 'done'>('form')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [downloadUrl, setDownloadUrl] = useState('')
  const [debugOtp, setDebugOtp] = useState('')

  const canSubmit = useMemo(() => name.trim() && email.trim(), [name, email])

  async function sendOtp(e: FormEvent) {
    e.preventDefault()
    if (!canSubmit) return
    setLoading(true)
    setError('')
    setSuccess('')
    try {
      const res = await fetch('/api/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, purpose: mode })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to send OTP.')
      setDebugOtp(data.debugOtp || '')
      setStep('otp')
      setSuccess('OTP sent to your email.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send OTP.')
    } finally {
      setLoading(false)
    }
  }

  async function verifyOtp(e: FormEvent) {
    e.preventDefault()
    if (!otp.trim()) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          code: otp,
          purpose: mode,
          payload: { name, email, phone, company, message }
        })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'OTP verification failed.')
      if (mode === 'pitch') setDownloadUrl(data.downloadUrl || '')
      setStep('done')
      setSuccess(mode === 'pitch' ? 'Access granted. Download is ready.' : 'Thanks. Our sales team will contact you shortly.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'OTP verification failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="lead-page-wrap">
      <div className="lead-shell">
        <div className="lead-aside">
          <div className="lead-brand">AIT</div>
          <h2>{mode === 'demo' ? 'Book a Guided Demo' : 'Secure Deck Access'}</h2>
          <p>{mode === 'demo' ? 'See invoice-to-filing orchestration live with your use case context.' : 'Access the AIT Compliance Infrastructure deck after OTP verification.'}</p>
          <div className="lead-points">
            <span>OTP-gated access flow</span>
            <span>Sales follow-up with full lead context</span>
            <span>Fast onboarding for finance and CA teams</span>
          </div>
        </div>

        <div className="lead-card">
          <div className="lead-tag">{mode === 'demo' ? 'Request Demo' : 'Pitch Deck Access'}</div>
          <h1>{title}</h1>
          <p>{subtitle}</p>

          {step === 'form' && (
            <form onSubmit={sendOtp} className="lead-form">
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" required />
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Work Email" required />
              <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone (optional)" />
              <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company (optional)" />
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Message (optional)" rows={4} />
              <button type="submit" disabled={loading || !canSubmit}>{loading ? 'Sending OTP...' : 'Send OTP'}</button>
            </form>
          )}

          {step === 'otp' && (
            <form onSubmit={verifyOtp} className="lead-form">
              <input value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter 6-digit OTP" required />
              <button type="submit" disabled={loading}>{loading ? 'Verifying...' : 'Verify OTP'}</button>
              <button type="button" className="lead-secondary" onClick={() => setStep('form')}>Back</button>
              {debugOtp && <small>Dev OTP: {debugOtp}</small>}
            </form>
          )}

          {step === 'done' && (
            <div className="lead-done">
              <div className="lead-check">OK</div>
              <p>{success}</p>
              {mode === 'pitch' && downloadUrl && (
                <a className="lead-download" href={downloadUrl} download>
                  Download Pitch Deck
                </a>
              )}
            </div>
          )}

          {error && <div className="lead-error">{error}</div>}
          {success && step !== 'done' && <div className="lead-success">{success}</div>}
        </div>
      </div>
    </div>
  )
}
