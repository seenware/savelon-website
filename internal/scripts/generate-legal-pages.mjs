/**
 * Post-build script: generates static privacy.html and terms.html for GitHub Pages.
 * - Fixes 404 on direct /privacy and /terms (required for bots and link checks).
 * - Avoids loading the SPA on legal pages (no "access other apps" permission from app JS).
 *
 * Run after `vite build`. Reads built docs/index.html for asset paths, writes docs/privacy.html and docs/terms.html.
 *
 * When updating legal text, update both:
 * - src/pages/PrivacyPolicyPage.tsx and TermsOfServicePage.tsx (SPA routes)
 * - the privacyArticle / termsArticle strings in this file (static pages).
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const docsDir = path.join(__dirname, '..', '..', 'docs')
const indexPath = path.join(docsDir, 'index.html')

function getAssetPaths() {
  const html = fs.readFileSync(indexPath, 'utf8')
  const linkMatch = html.match(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/)
  const iconMatch = html.match(/<link[^>]+rel="icon"[^>]+href="([^"]+)"/)
  return {
    css: linkMatch ? linkMatch[1] : '/assets/index.css',
    icon: iconMatch ? iconMatch[1] : '/vite.svg',
  }
}

function layout(title, assetPaths, bodyContent) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="${assetPaths.icon}" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <link rel="stylesheet" href="${assetPaths.css}">
  </head>
  <body>
    <div id="root">
      <div class="page-root">
        <header class="top-nav">
          <div class="nav-inner">
            <a href="/" class="brand brand-button">Savelon</a>
            <nav class="nav-links" aria-label="Main">
              <a href="/#why-it-matters">Why it matters</a>
              <a href="/#how-it-works">How it works</a>
              <a href="/#faq">FAQ</a>
              <a href="https://tally.so/r/jaZKA6" target="_blank" rel="noreferrer">Support</a>
              <a href="/#final-cta" class="download-link">Download</a>
            </nav>
          </div>
        </header>
        <main>
          <section class="section">
            <div class="section-inner">
              ${bodyContent}
            </div>
          </section>
        </main>
        <footer class="site-footer">
          <div class="footer-inner">
            <div class="footer-top">
              <div>Savelon</div>
              <div>Available on iPhone, iPad, and macOS</div>
              <div>Android coming soon</div>
            </div>
            <div>
              <div class="footer-links">
                <a href="https://apps.apple.com/de/app/savelon-private-contacts/id6755902938?l=en-GB" target="_blank" rel="noreferrer">Download on the App Store</a>
                <a href="/privacy">Privacy Policy</a>
                <a href="/terms">Terms of Service</a>
                <a href="https://tally.so/r/jaZKA6" target="_blank" rel="noreferrer">Support</a>
              </div>
              <div style="margin-top: 0.5rem;">© Savelon. All rights reserved.</div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  </body>
</html>
`
}

const privacyArticle = `
<article class="legal-page">
  <h1>Privacy Policy for Savelon: Private Contacts</h1>
  <p>Last updated: March 11, 2026</p>
  <p>
    This Privacy Policy explains how Savelon: Private Contacts ("the App", "we",
    "us", or "our") handles information when you use it.
  </p>

  <h2>1) Summary</h2>
  <p>
    The App is designed to work primarily offline. We do not transmit your contacts or
    encrypted contact data off your device.
  </p>
  <p>The only situations where information may leave your device are:</p>
  <ul>
    <li>
      If you choose to send us a message through the optional in-app support form.
    </li>
    <li>
      If you make or restore an in-app purchase, which is processed through the platform
      app store and RevenueCat to manage purchase status and entitlements.
    </li>
  </ul>

  <h2>2) Information the App does not collect during normal contact use</h2>
  <p>
    We do not collect, transmit, sell, or share the following from the App as part of
    normal contact storage and use:
  </p>
  <ul>
    <li>Your contacts list or contact details stored in the App.</li>
    <li>
      Names, phone numbers, email addresses, postal addresses, notes, or other contact
      fields you save in the App.
    </li>
    <li>Encryption keys, passwords, recovery phrases, or encrypted contact contents.</li>
    <li>Location data.</li>
    <li>Advertising identifiers for ad targeting.</li>
    <li>Analytics about your contacts or their contents.</li>
  </ul>

  <h2>3) Optional support messages</h2>
  <p>The App includes an optional support feature that allows you to contact us.</p>
  <p>
    If you submit a support request, we may collect the information you voluntarily
    provide, such as:
  </p>
  <ul>
    <li>Message content.</li>
    <li>Email address, if you want a reply.</li>
    <li>Any other information you choose to include in your message.</li>
  </ul>
  <p>We use this information only to respond to your request and provide support.</p>

  <h2>4) Support form provider (Tally)</h2>
  <p>
    Support requests submitted through the App are collected using Tally:
    <a href="https://tally.so" target="_blank" rel="noreferrer">https://tally.so</a>.
  </p>
  <p>
    When you submit the support form, the data you enter is sent to and stored by Tally,
    then accessed by us for support purposes.
  </p>
  <p>
    Tally acts as a service provider that helps us receive and manage support
    submissions. Tally's handling of your data is governed by its own terms and
    privacy practices.
  </p>

  <h2>5) In-app purchases and RevenueCat</h2>
  <p>
    The App offers optional in-app purchases. Purchases are processed by the relevant app
    store, such as Apple App Store or Google Play, and purchase status is managed through
    RevenueCat:
    <a href="https://www.revenuecat.com" target="_blank" rel="noreferrer">https://www.revenuecat.com</a>.
  </p>
  <p>
    When you make, restore, or check an in-app purchase, certain purchase-related and
    technical information may be processed by RevenueCat and the app store, such as:
  </p>
  <ul>
    <li>Subscription or purchase status.</li>
    <li>Transaction and receipt information.</li>
    <li>Anonymous or app-scoped identifiers used to manage entitlements.</li>
    <li>
      Device, app, and technical information necessary to validate purchases and prevent
      fraud.
    </li>
  </ul>
  <p>
    We do not use RevenueCat to access your contacts, encrypted contact data, or
    passwords. We do not require you to create an account in the App to make purchases.
  </p>
  <p>
    RevenueCat and the app store providers process purchase-related information according
    to their own privacy policies:
  </p>
  <ul>
    <li>RevenueCat: <a href="https://www.revenuecat.com/privacy" target="_blank" rel="noreferrer">https://www.revenuecat.com/privacy</a></li>
    <li>Apple: <a href="https://www.apple.com/legal/privacy" target="_blank" rel="noreferrer">https://www.apple.com/legal/privacy</a></li>
    <li>Google: <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">https://policies.google.com/privacy</a></li>
  </ul>

  <h2>6) Legal bases (EEA/UK users)</h2>
  <p>
    If you are located in the European Economic Area or the UK, we process personal data
    only where we have a valid legal basis.
  </p>
  <p>For support submissions, our legal bases are:</p>
  <ul>
    <li>Consent, when you choose to submit the support form and optionally provide your email address.</li>
    <li>Legitimate interests, namely responding to inquiries and maintaining the App.</li>
  </ul>
  <p>For in-app purchases and purchase restoration, our legal bases are:</p>
  <ul>
    <li>Performance of a contract, to provide purchased features or subscriptions.</li>
    <li>Legitimate interests, namely fraud prevention, purchase validation, and maintaining access to paid features.</li>
    <li>Legal obligations, where applicable for financial, tax, accounting, or consumer law compliance.</li>
  </ul>

  <h2>7) Data retention</h2>
  <p>
    We retain support submissions only as long as reasonably necessary to respond to you
    and resolve the issue and maintain records of support interactions for quality and
    continuity.
  </p>
  <p>We do not store your contacts or encrypted contact database on our servers.</p>
  <p>
    Purchase records may be retained by RevenueCat, Apple, Google, or other
    payment-related providers for entitlement management, fraud prevention, accounting,
    legal, or operational purposes, according to their own retention practices.
  </p>
  <p>
    If you want us to delete a support submission you sent to us, contact us using the
    details in Section 12.
  </p>

  <h2>8) Sharing of information</h2>
  <p>We do not sell your personal information.</p>
  <p>We share information only as needed for the following purposes:</p>
  <ul>
    <li>Tally, to receive and store support form submissions.</li>
    <li>RevenueCat, to manage purchase validation and entitlements.</li>
    <li>Apple, Google, or other platform payment providers, to process in-app purchases.</li>
    <li>Other service providers only if necessary to operate support workflows or comply with legal obligations.</li>
  </ul>

  <h2>9) International transfers</h2>
  <p>
    Because our service providers, including Tally, RevenueCat, and app store providers,
    may process data on servers located in different countries, your information may be
    transferred to and processed outside your country of residence.
  </p>
  <p>
    Where applicable, we rely on reasonable safeguards provided by those service providers
    for cross-border data transfers.
  </p>

  <h2>10) Children's privacy</h2>
  <p>
    The App is not directed to children under 13, or under the age defined by local law.
    We do not knowingly collect personal information from children through the App except
    where a child voluntarily submits a support message or a purchase is processed by the
    platform provider.
  </p>
  <p>
    If you believe a child has provided personal data through the support form, contact us
    and we will take reasonable steps to delete it where possible.
  </p>

  <h2>11) Your rights and choices</h2>
  <p>Depending on your location, you may have rights to:</p>
  <ul>
    <li>Request access to personal data concerning you.</li>
    <li>Request correction or deletion.</li>
    <li>Object to or restrict certain processing.</li>
    <li>Withdraw consent where processing is based on consent.</li>
    <li>Lodge a complaint with a data protection authority.</li>
  </ul>
  <p>
    Because we generally do not collect personal data during normal use of the App, these
    rights mainly apply to information voluntarily submitted through the support form or
    purchase-related data processed by our service providers.
  </p>
  <p>
    For purchase-related requests, you may also need to contact the relevant provider
    directly, such as RevenueCat, Apple, or Google.
  </p>

  <h2>12) Contact</h2>
  <p>
    If you have questions or requests about this Privacy Policy or your support submission
    data, contact us at:
    <a href="https://tally.so/r/jaZKA6" target="_blank" rel="noreferrer">https://tally.so/r/jaZKA6</a>.
  </p>

  <h2>13) Changes to this Privacy Policy</h2>
  <p>
    We may update this Privacy Policy from time to time. If we make changes, we will
    update the "Last updated" date above. Continued use of the App after an
    update means you accept the updated policy.
  </p>
</article>
`

const termsArticle = `
<article class="legal-page">
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
    The App is provided "as is" and "as available", without warranties
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
    Support is available via:
    <a href="https://tally.so/r/jaZKA6" target="_blank" rel="noreferrer">https://tally.so/r/jaZKA6</a>
  </p>
  <p>Information you provide is voluntary and used only to respond.</p>

  <h2>9. Acceptable Use</h2>
  <p>Do not misuse the App or use it for unlawful purposes.</p>

  <h2>10. Availability</h2>
  <p>The App may be modified or discontinued at any time.</p>

  <h2>11. Privacy</h2>
  <p>
    Privacy Policy:
    <a href="https://savelon.com/privacy" target="_blank" rel="noreferrer">https://savelon.com/privacy</a>
  </p>

  <h2>12. Changes</h2>
  <p>These Terms may be updated. Continued use means you accept the changes.</p>
</article>
`

const assetPaths = getAssetPaths()
fs.writeFileSync(
  path.join(docsDir, 'privacy.html'),
  layout('Savelon - Privacy Policy', assetPaths, privacyArticle),
  'utf8'
)
fs.writeFileSync(
  path.join(docsDir, 'terms.html'),
  layout('Savelon - Terms of Service', assetPaths, termsArticle),
  'utf8'
)
console.log('Generated docs/privacy.html and docs/terms.html')
