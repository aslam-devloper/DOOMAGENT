import { useEffect, useRef, useState } from 'react'

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
          <a href="#showcase" data-cursor>In action</a>
          <a href="#install" data-cursor>Install</a>
          <a href="#premium" data-cursor>Premium</a>
          <a href="https://github.com/aslam-devloper/DOOMAGENT" className="nav-pill alt" data-cursor>GitHub</a>
          <a href="#premium" className="nav-pill" data-premium-cta data-cursor>Get OMNISCIENCE</a>
        </div>
      </div>
    </nav>
  )
}
