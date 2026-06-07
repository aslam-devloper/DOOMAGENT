import { founder } from '../data/skills'

export default function Footer() {
  return (
    <footer className="foot-v2">
      <div className="wrap foot-v2-r">
        <div className="foot-v2-credit">
          <div className="foot-v2-by">
            Built by <b>ASLAM</b> ·{' '}
            <a
              href="https://www.instagram.com/aslam.unfiltered"
              target="_blank"
              rel="noopener noreferrer"
              className="foot-ig"
              data-cursor
              aria-label="@aslam.unfiltered on Instagram"
            >
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
              <span>@aslam.unfiltered</span>
            </a>
          </div>
          <div className="foot-v2-omni">
            <span className="dot-o" aria-hidden /> designed with{' '}
            <a href="#premium" data-cursor className="foot-v2-omni-link">
              OMNISCIENCE
            </a>{' '}
            · 20 cognitive lenses
          </div>
          <div className="foot-v2-funder">
            <span className="dot-funder" aria-hidden /> Founder cohort ·{' '}
            {founder.claimed}/{founder.cap} seats ·{' '}
            <a href="#waitlist" data-open-waitlist data-cursor>
              closes {new Date(founder.closesOn).toUTCString().slice(0, 16)}
            </a>
          </div>
        </div>
        <div className="foot-v2-links">
          <a href="https://github.com/aslam-devloper/DOOMAGENT" data-cursor>GitHub</a>
          <a href="https://razorpay.me/@mohammadibraheem" data-cursor>Donate</a>
          <a href="#waitlist" data-open-waitlist data-cursor className="foot-cta">Claim founder seat</a>
        </div>
      </div>
    </footer>
  )
}
