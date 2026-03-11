type NavTarget = 'top' | 'why' | 'how' | 'faq' | 'support' | 'download'

interface NavBarProps {
  onNavClick?: (target: NavTarget) => void
}

export function NavBar({ onNavClick }: NavBarProps) {
  return (
    <header className="top-nav">
      <div className="nav-inner">
        <button
          type="button"
          className="brand brand-button"
          onClick={() => onNavClick?.('top')}
        >
          Savelon
        </button>
        <nav className="nav-links" aria-label="Main">
          <button type="button" onClick={() => onNavClick?.('why')}>
            Why it matters
          </button>
          <button type="button" onClick={() => onNavClick?.('how')}>
            How it works
          </button>
          <button type="button" onClick={() => onNavClick?.('faq')}>
            FAQ
          </button>
          <button type="button" onClick={() => onNavClick?.('support')}>
            Support
          </button>
          <button type="button" className="download-link" onClick={() => onNavClick?.('download')}>
            Download
          </button>
        </nav>
      </div>
    </header>
  )
}

