import { APP_SIGNUP_URL } from '@/lib/site-links'

export default function CTASection() {
  return (
    <section className="cta-section" id="cta" data-track-section="cta">
      <div className="section-wrap">
        <div className="cta-box">

          {/* Animated blobs */}
          <div className="cta-blob cta-blob-1" />
          <div className="cta-blob cta-blob-2" />
          <div className="cta-blob cta-blob-3" />

          {/* Left content */}
          <div>
            <div className="cta-tag">Get Started</div>
            <h2>Stop managing compliance.<br /><em>Start controlling it.</em></h2>
            <p>AIT is not a tax tool. It is your compliance intelligence infrastructure. Deploy in 30 days. Recover ITC in 60. Zero missed deadlines, ever.</p>
          </div>

          {/* Right buttons */}
          <div className="cta-actions">
            <a
              href={APP_SIGNUP_URL}
              className="btn-cta-w"
              data-track-event="cta_click"
              data-track-name="cta_sign_up"
              data-track-section="cta"
              data-track-destination={APP_SIGNUP_URL}
            >
              <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                <path d="M8 1l1.8 3.6 4 .6-2.9 2.8.7 4L8 10l-3.6 1.9.7-4L2.2 5.2l4-.6L8 1z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
              Sign Up
            </a>
            <a
              href="/request-demo"
              className="btn-cta-gold"
              data-track-event="cta_click"
              data-track-name="cta_request_demo"
              data-track-section="cta"
              data-track-destination="/request-demo"
            >
              Request a Demo
            </a>
            <a
              href="/pitch-deck"
              className="btn-cta-g btn-cta-pitch"
              data-track-event="cta_click"
              data-track-name="cta_pitch_deck"
              data-track-section="cta"
              data-track-destination="/pitch-deck"
            >
              <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
                <path d="M7 1v8M3.5 6l3.5 3.5L10.5 6M2 11h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Download Pitch Deck
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}
