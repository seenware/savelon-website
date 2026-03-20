import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Footer } from '../shared/Footer'
import { NavBar } from '../shared/NavBar'
import { Section } from '../shared/Section'

export function TermsOfServicePage() {
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Savelon - Terms of Service'
  }, [])

  return (
    <div className="page-root">
      <NavBar
        onNavClick={(target) => {
          const SUPPORT_URL = 'https://tally.so/r/jaZKA6'

          if (target === 'support') {
            window.open(SUPPORT_URL, '_blank', 'noopener,noreferrer')
            return
          }

          if (target === 'top') {
            navigate('/')
            return
          }

          if (target === 'why') {
            navigate('/#why-it-matters')
            return
          }

          if (target === 'how') {
            navigate('/#how-it-works')
            return
          }

          if (target === 'faq') {
            navigate('/#faq')
            return
          }

          if (target === 'download') {
            navigate('/#final-cta')
          }
        }}
      />
      <main>
        <Section>
          <article className="legal-page">
            <h1>Terms of Use for Savelon: Private Contacts</h1>
            <p>Last updated: March 20, 2026</p>

            <h2>1. Acceptance</h2>
            <p>By using the App, you agree to these Terms. If not, do not use it.</p>

            <h2>2. App Description</h2>
            <p>
              Savelon: Private Contacts is a contact manager that stores data locally on your
              device and operates primarily offline.
            </p>

            <h2>3. Your Data &amp; Responsibility</h2>
            <ul>
              <li>Your data is stored only on your device</li>
              <li>If you forget your password, it cannot be recovered</li>
              <li>If you lose your device or delete the App, your data may be permanently lost</li>
              <li>The App currently does not provide backup or recovery</li>
            </ul>
            <p>You are fully responsible for maintaining access to your data.</p>

            <h2>4. No Warranty</h2>
            <p>
              The App is provided &quot;as is&quot; and &quot;as available&quot;, without warranties
              of any kind, including reliability, availability, or data integrity.
            </p>

            <h2>5. Limitation of Liability</h2>
            <p>To the maximum extent permitted by law, we are not liable for:</p>
            <ul>
              <li>loss of data or contacts</li>
              <li>loss of access (e.g. forgotten password)</li>
              <li>device loss or damage</li>
              <li>indirect or consequential damages</li>
            </ul>

            <h2>6. Purchases &amp; Subscriptions</h2>
            <ul>
              <li>The App may offer subscriptions and one-time purchases</li>
              <li>Payments are handled by platform providers (e.g. app stores)</li>
              <li>Subscriptions renew automatically unless canceled</li>
              <li>You manage subscriptions through your platform account</li>
              <li>We do not have access to your payment details</li>
            </ul>
            <p>Access to paid features depends on valid purchase status.</p>

            <h2>7. Third-Party Services</h2>
            <p>
              The App may use third-party services (e.g. RevenueCat, Tally). Their terms and
              policies apply when you use those services.
            </p>

            <h2>8. Support</h2>
            <p>
              Support is available via:{' '}
              <a href="https://tally.so/r/jaZKA6" target="_blank" rel="noreferrer">
                https://tally.so/r/jaZKA6
              </a>
            </p>
            <p>Information you provide is voluntary and used only to respond.</p>

            <h2>9. Acceptable Use</h2>
            <p>Do not misuse the App or use it for unlawful purposes.</p>

            <h2>10. Availability</h2>
            <p>The App may be modified or discontinued at any time.</p>

            <h2>11. Privacy</h2>
            <p>
              Privacy Policy:{' '}
              <a href="https://savelon.com/privacy" target="_blank" rel="noreferrer">
                https://savelon.com/privacy
              </a>
            </p>

            <h2>12. Changes</h2>
            <p>These Terms may be updated. Continued use means you accept the changes.</p>
          </article>
        </Section>
      </main>
      <Footer />
    </div>
  )
}

