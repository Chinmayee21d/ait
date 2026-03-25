'use client'

import { useEffect, useState } from 'react'

type PrivacyRequestStatus = 'submitted' | 'in_review' | 'completed' | 'rejected'
type PrivacyRequestRecord = {
  requestId: string
  requestType: string
  fullName: string
  email: string
  status: PrivacyRequestStatus
  createdAt: string
  updatedAt: string
  adminNote?: string
}

export default function PrivacyAdminClient({ adminKey }: { adminKey: string }) {
  const [items, setItems] = useState<PrivacyRequestRecord[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`/api/privacy/requests/admin?key=${encodeURIComponent(adminKey)}`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to load requests.')
      setItems(data.requests || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load requests.')
    }
    setLoading(false)
  }

  useEffect(() => {
    void load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const update = async (requestId: string, status: PrivacyRequestStatus, adminNote: string) => {
    try {
      const res = await fetch('/api/privacy/requests/admin', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: adminKey, requestId, status, adminNote }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to update.')
      setItems((prev) => prev.map((item) => (item.requestId === requestId ? data.request : item)))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update.')
    }
  }

  return (
    <main className="legal-page">
      <div className="section-wrap legal-wrap">
        <div className="section-tag" style={{ justifyContent: 'center' }}>Admin</div>
        <h1 className="legal-title">Privacy Requests Admin</h1>
        <div className="legal-doc">
          {loading ? <p>Loading...</p> : null}
          {error ? <div className="lead-error">{error}</div> : null}
          {!loading && !items.length ? <p>No requests yet.</p> : null}
          {items.map((item) => (
            <div key={item.requestId} style={{ border: '1px solid rgba(15,30,61,0.14)', borderRadius: 10, padding: 12 }}>
              <p><strong>{item.requestType.toUpperCase()}</strong> · {item.requestId}</p>
              <p>{item.fullName} · {item.email}</p>
              <p>Created: {new Date(item.createdAt).toLocaleString()}</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr auto', gap: 8 }}>
                <select
                  className="lead-input"
                  defaultValue={item.status}
                  onChange={(e) => update(item.requestId, e.target.value as PrivacyRequestStatus, item.adminNote || '')}
                >
                  <option value="submitted">submitted</option>
                  <option value="in_review">in_review</option>
                  <option value="completed">completed</option>
                  <option value="rejected">rejected</option>
                </select>
                <input
                  className="lead-input"
                  defaultValue={item.adminNote || ''}
                  onBlur={(e) => update(item.requestId, item.status, e.target.value)}
                  placeholder="Admin note"
                />
                <button className="btn-cta-g" type="button" onClick={() => void load()}>Refresh</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
