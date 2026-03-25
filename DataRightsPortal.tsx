'use client'

import { useMemo, useState } from 'react'
import { PRIVACY_SLA } from '@/lib/privacy-sla'

type RequestType = 'access' | 'portability' | 'correction' | 'erasure' | 'grievance'

const REQUEST_LABELS: Record<RequestType, string> = {
  access: 'Access my data',
  portability: 'Export my data',
  correction: 'Correct my data',
  erasure: 'Request erasure',
  grievance: 'Privacy grievance',
}

export default function DataRightsPortal() {
  const [requestType, setRequestType] = useState<RequestType>('access')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [accountEmail, setAccountEmail] = useState('')
  const [company, setCompany] = useState('')
  const [jurisdiction, setJurisdiction] = useState('India')
  const [details, setDetails] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [requestId, setRequestId] = useState('')

  const placeholder = useMemo(() => {
    if (requestType === 'erasure') return 'Specify what data should be erased. Note: statutory tax records may be retained as required by law.'
    if (requestType === 'grievance') return 'Describe your grievance, dates, and any prior communication.'
    if (requestType === 'correction') return 'Describe what is inaccurate and what the corrected value should be.'
    if (requestType === 'portability') return 'Specify scope of export (workspace/entities/date range).'
    return 'Describe what data access summary you need.'
  }, [requestType])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setRequestId('')
    setLoading(true)
    try {
      const res = await fetch('/api/privacy/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requestType,
          fullName,
          email,
          accountEmail,
          company,
          jurisdiction,
          details,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to submit request.')
      setSuccess(data.message || 'Request submitted.')
      setRequestId(data.requestId || '')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit request.')
    }
    setLoading(false)
  }

  return (
    <main className="legal-page">
      <div className="section-wrap legal-wrap">
        <div className="section-tag" style={{ justifyContent: 'center' }}>Privacy</div>
        <h1 className="legal-title">Data Rights Portal</h1>
        <div className="legal-doc">
          <p>
            Submit access, portability, correction, erasure, or grievance requests.
            For urgent privacy matters, email <a href="mailto:info@allindiataxes.com">info@allindiataxes.com</a>.
          </p>
          <div className="lead-success" style={{ marginTop: 0 }}>
            <div><strong>SLA maximums</strong></div>
            <div>Human acknowledgment: within {PRIVACY_SLA.humanAcknowledgementHours} hours.</div>
            <div>First substantive update: within {PRIVACY_SLA.firstSubstantiveUpdateDays} calendar days.</div>
            <div>Final resolution: within {PRIVACY_SLA.finalResolutionDays} calendar days.</div>
            <div>Marketing unsubscribe processing: within {PRIVACY_SLA.marketingUnsubscribeBusinessDays} business days.</div>
          </div>
          <form className="lead-form" onSubmit={submit}>
            <label>
              Request Type
              <select value={requestType} onChange={(e) => setRequestType(e.target.value as RequestType)} className="lead-input">
                {Object.entries(REQUEST_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </label>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <label>
                Full Name
                <input className="lead-input" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
              </label>
              <label>
                Contact Email
                <input className="lead-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </label>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <label>
                Account Email (if different)
                <input className="lead-input" type="email" value={accountEmail} onChange={(e) => setAccountEmail(e.target.value)} />
              </label>
              <label>
                Company / Workspace
                <input className="lead-input" value={company} onChange={(e) => setCompany(e.target.value)} />
              </label>
            </div>

            <label>
              Jurisdiction
              <select value={jurisdiction} onChange={(e) => setJurisdiction(e.target.value)} className="lead-input">
                <option value="India">India (DPDP)</option>
                <option value="EU/EEA">EU/EEA (GDPR)</option>
                <option value="UK">UK (UK GDPR)</option>
                <option value="Other">Other</option>
              </select>
            </label>

            <label>
              Request Details
              <textarea
                className="lead-input"
                rows={6}
                minLength={20}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder={placeholder}
                required
              />
            </label>

            <button className="btn-cta-w" type="submit" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Request'}
            </button>
          </form>

          {error && <div className="lead-error">{error}</div>}
          {success && (
            <div className="lead-success">
              {success}
              {requestId ? <div style={{ marginTop: 6 }}><strong>Request ID:</strong> {requestId}</div> : null}
              {requestId ? <div style={{ marginTop: 6 }}>Track status: <a href="/data-rights/status">/data-rights/status</a></div> : null}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
