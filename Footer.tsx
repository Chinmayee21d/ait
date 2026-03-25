export default function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div>
          <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: '22px', color: '#C6A85E' }}>AIT</span>
            <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.4)', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 500 }}>All India Taxes</span>
          </div>
          <p className="footer-tagline">All India Taxes (AIT) - Compliance Intelligence Infrastructure. GST, TDS, Reconciliation, Vendor Network, AI Layer.</p>
          <div className="footer-badges">
            <div className="fbadge">AES-256 Encrypted</div>
            <div className="fbadge">GSTN Compliant</div>
            <div className="fbadge">API-First</div>
            <div className="fbadge">ISO 27001</div>
          </div>
        </div>
        <div>
          <div className="footer-col-title">Platform</div>
          <ul className="footer-links">
            <li><a href="/#how">GST Filing</a></li>
            <li><a href="/#how">TDS Management</a></li>
            <li><a href="/#ai">AI Reconciliation</a></li>
            <li><a href="/#ai">Vendor Trust Score</a></li>
            <li><a href="/#network">Magic Link</a></li>
            <li><a href="/request-demo">Notice Management</a></li>
          </ul>
        </div>
        <div>
          <div className="footer-col-title">Solutions</div>
          <ul className="footer-links">
            <li><a href="/#pricing">For Businesses</a></li>
            <li><a href="/#pricing">For CA Firms</a></li>
            <li><a href="/request-demo">For Enterprises</a></li>
            <li><a href="/request-demo">Integrations</a></li>
            <li><a href="/request-demo">API Docs</a></li>
          </ul>
        </div>
        <div>
          <div className="footer-col-title">Company</div>
          <ul className="footer-links">
            <li><a href="/#network">About AIT</a></li>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/pitch-deck">Blog</a></li>
            <li><a href="/request-demo">Careers</a></li>
            <li><a href="mailto:sales@allindiataxes.com">Contact</a></li>
          </ul>
        </div>
        <div>
          <div className="footer-col-title">Legal</div>
          <ul className="footer-links">
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms of Service</a></li>
            <li><a href="/cookie-policy">Cookie Policy</a></li>
            <li><a href="/data-rights">Data Rights</a></li>
            <li><a href="/legal">Legal Centre</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span className="footer-copy">Copyright 2025 All India Taxes (AIT). All rights reserved.</span>
        <span className="footer-contact">sales@allindiataxes.com</span>
      </div>
    </footer>
  )
}