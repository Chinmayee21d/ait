'use client'

import { useState } from 'react'
import { PRIVACY_SLA } from '@/lib/privacy-sla'

type StatusResponse = {
  requestId: string
  requestType: string
  status: string
  createdAt: string
  updatedAt: string
  adminNote?: string
}

export default function DataRightsStatus() {
  const [requestId, setRequestId] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState<StatusResponse | null>(null)

  const checkStatus = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setResult(null)
    try {
      const res = await fetch('/api/privacy/requests/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestId, email }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Could not fetch status.')
      setResult(data.request)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not fetch status.')
    }
    setLoading(false)
  }

  return (
    <main className="legal-page">
      <div className="section-wrap legal-wrap">
        <div className="section-tag" style={{ justifyContent: 'center' }}>Privacy</div>
        <h1 className="legal-title">Track Request Status</h1>
        <div className="legal-doc">
          <p>Enter your request ID and contact email used at submission.</p>
          <p>
            SLA maximums: acknowledgment in {PRIVACY_SLA.humanAcknowledgementHours} hours, first update in{' '}
            {PRIVACY_SLA.firstSubstantiveUpdateDays} days, final resolution in {PRIVACY_SLA.finalResolutionDays} days.
          </p>
          <form className="lead-form" onSubmit={checkStatus}>
            <label>
              Request ID
              <input className="lead-input" value={requestId} onChange={(e) => setRequestId(e.target.value)} required />
            </label>
            <label>
              Contact Email
              <input className="lead-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>
            <button className="btn-cta-w" type="submit" disabled={loading}>
              {loading ? 'Checking...' : 'Check Status'}
            </button>
          </form>

          {error ? <div className="lead-error">{error}</div> : null}
          {result ? (
            <div className="lead-success">
              <div><strong>Request ID:</strong> {result.requestId}</div>
              <div><strong>Type:</strong> {result.requestType}</div>
              <div><strong>Status:</strong> {result.status}</div>
              <div><strong>Submitted:</strong> {new Date(result.createdAt).toLocaleString()}</div>
              <div><strong>Updated:</strong> {new Date(result.updatedAt).toLocaleString()}</div>
              {result.adminNote ? <div style={{ marginTop: 8 }}><strong>Note:</strong> {result.adminNote}</div> : null}
            </div>
          ) : null}
        </div>
      </div>
    </main>
  )
}
