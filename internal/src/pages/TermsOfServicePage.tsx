import { useNavigate } from 'react-router-dom'
import { Footer } from '../shared/Footer'
import { NavBar } from '../shared/NavBar'
import { Section } from '../shared/Section'

export function TermsOfServicePage() {
  const navigate = useNavigate()

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
            <h1>Terms of Service for Savelon: Private Contacts</h1>
            <p>Last updated: March 11, 2026</p>
            <p>
              App name: Savelon: Private Contacts. Contact:{' '}
              <a href="https://tally.so/r/jaZKA6" target="_blank" rel="noreferrer">
                https://tally.so/r/jaZKA6
              </a>
              .
            </p>
            <p>
              By downloading, accessing, or using Savelon: Private Contacts (&quot;the App&quot;),
              you agree to these Terms of Service.
            </p>

            <h2>1) Use of the App</h2>
            <p>You may use the App only in compliance with applicable laws.</p>
            <p>
              You are responsible for your use of the App and for the data you choose to store in
              it.
            </p>

            <h2>2) Your data</h2>
            <p>The App is designed to store your data locally on your device.</p>
            <p>
              You are responsible for keeping your device, passwords, recovery information, and
              backups secure.
            </p>
            <p>
              If you lose access to your device or recovery information, we may not be able to
              restore your data.
            </p>

            <h2>3) Purchases</h2>
            <p>The App may offer paid features or subscriptions.</p>
            <p>
              Payments, renewals, cancellations, and refunds are handled by the relevant platform
              provider, such as Apple App Store or Google Play, under their terms and policies.
            </p>

            <h2>4) Ownership and limits</h2>
            <p>
              The App, including its code, design, branding, and related content, is owned by us or
              our licensors.
            </p>
            <p>
              The App is provided on an &quot;as is&quot; and &quot;as available&quot; basis to the
              extent permitted by law, and we do not guarantee uninterrupted or error-free
              operation.
            </p>
            <p>
              To the extent permitted by law, we are not liable for indirect, incidental, special,
              or consequential damages, or for loss of data resulting from use of the App.
            </p>

            <h2>5) Changes and contact</h2>
            <p>We may update these Terms from time to time by updating the &quot;Last updated&quot; date above.</p>
            <p>If you continue using the App after changes take effect, you agree to the updated Terms.</p>
            <p>
              If you have questions about these Terms, contact us at:{' '}
              <a href="https://tally.so/r/jaZKA6" target="_blank" rel="noreferrer">
                https://tally.so/r/jaZKA6
              </a>
              .
            </p>
          </article>
        </Section>
      </main>
      <Footer />
    </div>
  )
}

