'use client'

import { useEffect, useState } from 'react'
import { APP_SIGNIN_URL, APP_SIGNUP_URL } from '@/lib/site-links'

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <nav className={scrolled ? 'nav-scrolled' : ''}>
      <a className="nav-logo" href="/" onClick={closeMenu}>
        <span className="nav-logo-ait">AIT</span>
        <span className="nav-logo-sub">All India Taxes</span>
      </a>

      <ul className="nav-links">
        <li><a href="/#how" onClick={closeMenu}>How It Works</a></li>
        <li><a href="/#ai" onClick={closeMenu}>AI Intelligence</a></li>
        <li><a href="/#network" onClick={closeMenu}>Your Ecosystem</a></li>
        <li><a href="/#pricing" onClick={closeMenu}>Pricing</a></li>
      </ul>

      <div className="nav-ctas">
        <a
          href={APP_SIGNIN_URL}
          className="btn-nav btn-nav-ghost"
          data-track-event="cta_click"
          data-track-name="nav_sign_in"
          data-track-section="nav"
          data-track-destination={APP_SIGNIN_URL}
        >
          Sign in
        </a>
        <div className="btn-nav-primary-wrap">
          <a
            href={APP_SIGNUP_URL}
            className="btn-nav btn-nav-primary"
            data-track-event="cta_click"
            data-track-name="nav_sign_up"
            data-track-section="nav"
            data-track-destination={APP_SIGNUP_URL}
          >
            Sign Up
          </a>
        </div>
      </div>

      <button
        className="nav-toggle"
        type="button"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(prev => !prev)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`mobile-nav${menuOpen ? ' open' : ''}`}>
        <div className="mobile-nav-links">
          <a href="/#how" onClick={closeMenu}>How It Works</a>
          <a href="/#ai" onClick={closeMenu}>AI Intelligence</a>
          <a href="/#network" onClick={closeMenu}>Your Ecosystem</a>
          <a href="/#pricing" onClick={closeMenu}>Pricing</a>
        </div>
        <div className="mobile-nav-ctas">
          <a
            href={APP_SIGNIN_URL}
            className="btn-nav btn-nav-ghost"
            data-track-event="cta_click"
            data-track-name="mobile_nav_sign_in"
            data-track-section="mobile_nav"
            data-track-destination={APP_SIGNIN_URL}
          >
            Sign in
          </a>
          <a
            href={APP_SIGNUP_URL}
            className="btn-nav btn-nav-primary"
            data-track-event="cta_click"
            data-track-name="mobile_nav_sign_up"
            data-track-section="mobile_nav"
            data-track-destination={APP_SIGNUP_URL}
          >
            Sign Up
          </a>
        </div>
      </div>

      {menuOpen && (
        <button className="mobile-nav-backdrop" aria-label="Close menu" onClick={closeMenu} />
      )}
    </nav>
  )
}
