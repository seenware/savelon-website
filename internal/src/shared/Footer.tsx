import { Link } from 'react-router-dom'

const APP_STORE_URL =
  'https://apps.apple.com/de/app/savelon-private-contacts/id6755902938?l=en-GB'
const SUPPORT_URL = 'https://tally.so/r/jaZKA6'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div>Savelon</div>
          <div>Available on iPhone, iPad, and macOS</div>
          <div>Android coming soon</div>
        </div>
        <div>
          <div className="footer-links">
            <a href={APP_STORE_URL} target="_blank" rel="noreferrer">
              Download on the App Store
            </a>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <a href={SUPPORT_URL} target="_blank" rel="noreferrer">
              Support
            </a>
          </div>
          <div style={{ marginTop: '0.5rem' }}>© Savelon. All rights reserved.</div>
        </div>
      </div>
    </footer>
  )
}

