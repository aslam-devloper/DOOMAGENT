export default function Footer() {
  return (
    <footer>
      <div className="wrap foot-r">
        <div className="credit">
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
        <div className="links">
          <a href="https://github.com/aslam-devloper/DOOMAGENT" data-cursor>GitHub</a>
          <a href="https://razorpay.me/@mohammadibraheem" data-cursor>Donate</a>
          <a href="#premium" data-cursor>Premium</a>
          <a href="#buy" data-cursor>Get it</a>
        </div>
      </div>
    </footer>
  )
}
