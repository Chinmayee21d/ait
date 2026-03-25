'use client'

import AITHubV3 from '@/design/ait-hub-v3'

export default function AITHubSection() {
  return (
    <section className="network-section aithub-section" id="network" data-track-section="network">
      <div className="section-wrap">
        <div className="section-tag reveal">AIT Compliance Engine</div>
        <h2 className="reveal">
          One invoice. Zero friction.
          <br />
          <em>AIT orchestrates the entire chain.</em>
        </h2>
        <p className="section-sub reveal">
          From vendor upload to GST filing - watch the compliance flow happen automatically.
        </p>
        <div style={{ marginTop: '24px' }}>
          <AITHubV3 hideHeader />
        </div>
      </div>
    </section>
  )
}