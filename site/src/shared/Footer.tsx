const GITHUB_URL = 'https://github.com/seenware/savelon-app'
const SUPPORT_URL = 'https://tally.so/r/jaZKA6'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div>
          <div className="footer-links">
            <a href={GITHUB_URL} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href="/privacy">
              Privacy Policy
            </a>
            <a href="/terms">
              Terms of Service
            </a>
            <a href={SUPPORT_URL} target="_blank" rel="noreferrer">
              Contact Us
            </a>
          </div>
          <div style={{ marginTop: '0.5rem' }}>© Savelon. All rights reserved.</div>
        </div>
      </div>
    </footer>
  )
}

