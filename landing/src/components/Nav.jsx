import { useEffect, useRef, useState } from 'react'
import { downloads } from '../data/skills'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav ref={ref} className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="wrap nav-r">
        <a href="#top" className="brand" data-cursor>
          <span className="dot"></span> DOOMAGENT <span className="v">/ SKILLS LIBRARY</span>
        </a>
        <div className="nav-links">
          <a href="#library" data-cursor>Library</a>
          <a href="#cascade" data-cursor>Cascade</a>
          <a href="#showcase" data-cursor>In action</a>
          <a href="#install" data-cursor>Install</a>
          <a href="#premium" data-cursor>Premium</a>
          <a
            href="https://www.instagram.com/aslam.unfiltered"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-ig"
            data-cursor
            aria-label="Follow @aslam.unfiltered on Instagram"
            title="@aslam.unfiltered on Instagram"
          >
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
            <span>@aslam.unfiltered</span>
          </a>
          <a href={downloads.freeLibraryRepo} className="nav-pill alt" data-cursor>GitHub</a>
          <a
            href={downloads.omniscience}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-pill nav-pill-pro"
            data-cursor
            aria-label="Download OMNISCIENCE (free)"
          >
            <span>↓ Download OMNISCIENCE</span>
            <span className="nav-pill-badge">free</span>
          </a>
        </div>
      </div>
    </nav>
  )
}
