/**
 * Post-build script: generates static legal pages for GitHub Pages.
 * - Generates canonical pretty URLs: /privacy and /terms.
 * - Generates compatibility files /privacy.html and /terms.html.
 * - Copies favicon manifest files to docs for stable metadata assets.
 *
 * Run after `vite build`. Reads built docs/index.html for asset paths,
 * writes canonical legal pages and compatibility redirects in docs/.
 *
 * Legal text source of truth lives in this script (privacyArticle / termsArticle).
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const docsDir = path.join(__dirname, '..', '..', 'docs');
const indexPath = path.join(docsDir, 'index.html');
const faviconSourceDir = path.join(__dirname, '..', 'public', 'favicon');

function getAssetPaths() {
	const html = fs.readFileSync(indexPath, 'utf8');
	const linkMatch = html.match(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/);
	return {
		css: linkMatch ? linkMatch[1] : '/assets/index.css',
	};
}

function ensureDir(dirPath) {
	fs.mkdirSync(dirPath, { recursive: true });
}

function writeFile(relativePath, contents) {
	const absolutePath = path.join(docsDir, relativePath);
	ensureDir(path.dirname(absolutePath));
	fs.writeFileSync(absolutePath, contents, 'utf8');
}

function copyFaviconAssets() {
	const destination = path.join(docsDir, 'favicon');
	fs.cpSync(faviconSourceDir, destination, { recursive: true });
}

function buildStructuredData(pageName, pageUrl) {
	return JSON.stringify(
		{
			'@context': 'https://schema.org',
			'@type': 'WebPage',
			name: pageName,
			url: pageUrl,
			isPartOf: {
				'@type': 'WebSite',
				name: 'Savelon',
				url: 'https://savelon.com',
			},
		},
		null,
		2,
	);
}

function layout(title, description, canonicalPath, assetPaths, bodyContent) {
	const canonicalUrl = `https://savelon.com${canonicalPath}`;
	return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/x-icon" href="/favicon/favicon.ico" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
    <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" />
    <link rel="manifest" href="/favicon/site.webmanifest" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${description}" />
    <meta name="robots" content="index,follow,max-image-preview:large" />
    <link rel="canonical" href="${canonicalUrl}" />
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="Savelon" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:image" content="https://savelon.com/favicon/android-chrome-512x512.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="https://savelon.com/favicon/android-chrome-512x512.png" />
    <title>${title}</title>
    <link rel="stylesheet" href="${assetPaths.css}">
    <script type="application/ld+json">${buildStructuredData(title, canonicalUrl)}</script>
  </head>
  <body>
    <div id="root">
      <div class="page-root">
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
                <a href="/privacy" target="_blank" rel="noreferrer">Privacy Policy</a>
                <a href="/terms" target="_blank" rel="noreferrer">Terms of Service</a>
                <a href="https://tally.so/r/jaZKA6" target="_blank" rel="noreferrer">Contact Us</a>
              </div>
              <div style="margin-top: 0.5rem;">© Savelon. All rights reserved.</div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  </body>
</html>
`;
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
`;

const termsArticle = `
<article class="legal-page">
  <h1>TERMS OF USE FOR SAVELON: PRIVATE CONTACTS</h1>
  <p>Last updated: March 20, 2026</p>

  <p>
    These Terms of Use ("Terms") govern your use of the Savelon: Private Contacts application.
  </p>

  <p>
    Please read these Terms carefully. By downloading, installing, accessing, or using the App, you agree to be bound by these Terms. If you do not agree, do not use the App.
  </p>

  <h2>Provider Information</h2>
  <p>
    Support form:
    <a href="https://tally.so/r/jaZKA6" target="_blank" rel="noreferrer">https://tally.so/r/jaZKA6</a>
  </p>
  <p>
    Privacy Policy:
    <a href="https://savelon.com/privacy" target="_blank" rel="noreferrer">https://savelon.com/privacy</a>
  </p>

  <h2>1. The App</h2>
  <p>
    Savelon: Private Contacts ("App") is a contact-management application designed to help users store and manage contact information with a focus on privacy and local device storage. Depending on the version and features you use, the App may operate primarily offline and may offer paid features and subscriptions.
  </p>

  <h2>2. Eligibility and Acceptable Use</h2>
  <p>
    You may use the App only if you have legal capacity to enter into a binding agreement and only in compliance with applicable law and platform rules. You may not:
  </p>
  <p>(a) use the App for unlawful, fraudulent, abusive, or harmful purposes;</p>
  <p>(b) interfere with or disrupt the App or related systems;</p>
  <p>(c) attempt to bypass security, access controls, or purchase restrictions;</p>
  <p>(d) copy, modify, reverse engineer, decompile, disassemble, or create derivative works from the App, except to the extent such restriction is prohibited by mandatory law;</p>
  <p>(e) resell, sublicense, rent, lease, or commercially exploit the App except as expressly authorized by us.</p>

  <h2>3. License Grant</h2>
  <p>
    Subject to these Terms and your compliance with them, we grant you a limited, non-exclusive, non-transferable, non-sublicensable, revocable license to download, install, and use the App on devices you own or control, solely for your personal or internal lawful use and only in accordance with these Terms and the rules of the applicable app marketplace or platform.
  </p>
  <p>
    All rights not expressly granted to you are reserved by us and our licensors.
  </p>

  <h2>4. Accounts, Access Credentials, and Device Security</h2>
  <p>
    The App may rely on passwords, passcodes, biometrics, operating-system security, encryption keys, recovery material, or other credentials or device-level protections. You are solely responsible for:
  </p>
  <p>(a) maintaining the confidentiality and security of your device, password, passcode, seed phrase, recovery information, and any other credentials;</p>
  <p>(b) ensuring that only authorized persons can access your device or App;</p>
  <p>(c) keeping any recovery information accurate, secure, and available to you if applicable.</p>
  <p>
    You understand and agree that, depending on the App's design and your settings:
  </p>
  <p>(a) if you forget your password or lose access credentials, your data may become permanently inaccessible;</p>
  <p>(b) we may be technically unable to recover your password, decrypt your data, restore your local database, or otherwise provide access to your information;</p>
  <p>(c) if your device is lost, damaged, wiped, reset, replaced, or compromised, your data may be permanently lost;</p>
  <p>(d) if you delete the App or its local data, your information may be permanently deleted unless you created a separate backup or export.</p>

  <h2>5. User Data and Your Responsibility</h2>
  <p>
    You retain responsibility for the content, accuracy, legality, and use of any contact information, notes, files, images, or other data you store, import, export, sync, or process through the App ("User Data"). You represent and warrant that you have all rights and permissions necessary to store and process User Data using the App and that doing so does not violate applicable law, third-party rights, confidentiality duties, or contractual obligations.
  </p>
  <p>You are solely responsible for:</p>
  <p>(a) reviewing whether it is lawful for you to store another person's information in the App;</p>
  <p>(b) maintaining your own backups, exports, and recovery methods where offered or available;</p>
  <p>(c) verifying the accuracy, completeness, and suitability of your User Data;</p>
  <p>(d) deciding whether the App is appropriate for sensitive, business-critical, legal, medical, emergency, or high-risk use cases.</p>
  <p>
    The App is not intended to be a guaranteed archival, backup, disaster recovery, emergency communications, regulated records, or mission-critical system.
  </p>

  <h2>6. Privacy and Data Handling</h2>
  <p>
    Our Privacy Policy explains how we handle personal data and related information:
    <a href="https://savelon.com/privacy" target="_blank" rel="noreferrer">https://savelon.com/privacy</a>
  </p>
  <p>
    By using the App, you acknowledge that certain technical and operational data may be processed as described in the Privacy Policy. You are responsible for reviewing the Privacy Policy before using the App.
  </p>

  <h2>7. Purchases, Subscriptions, and Billing</h2>
  <p>
    The App may offer paid subscriptions, non-consumable purchases, one-time purchases, or other paid features. If you purchase a subscription or other digital product through Apple App Store, Google Play, or another third-party marketplace, billing, payment processing, renewals, cancellations, refund handling, taxes, and related payment administration are handled by the applicable platform and are subject to that platform's terms and policies.
  </p>
  <p>If you purchase an automatically renewing subscription:</p>
  <p>(a) your subscription renews automatically unless canceled before the end of the current billing period in accordance with the platform's rules;</p>
  <p>(b) you must manage or cancel the subscription through your Apple ID, Google Play account, or other applicable platform account;</p>
  <p>(c) we do not receive or store your full payment card details;</p>
  <p>(d) access to paid features may be suspended, limited, or terminated if your payment fails, your subscription expires, your purchase is reversed, refunded, revoked, or canceled, or if the platform reports that no valid entitlement exists.</p>
  <p>
    Prices, available plans, feature sets, trial offers, introductory pricing, and availability may vary by country, platform, device, campaign, or time and may change as permitted by applicable law and platform rules.
  </p>

  <h2>8. Third-Party Services and Platforms</h2>
  <p>
    The App may rely on, integrate with, or link to third-party platforms, tools, SDKs, APIs, hosting providers, analytics tools, support tools, payment processors, or external websites, including without limitation app marketplaces and service providers such as Apple, Google, RevenueCat, Tally, hosting providers, and other third parties. Your use of third-party services may be subject to separate third-party terms, privacy policies, and technical limitations. We are not responsible for third-party products or services that we do not control, including their availability, security, legality, content, performance, or data practices.
  </p>

  <h2>9. Updates, Changes, and Availability</h2>
  <p>
    We may release updates, patches, bug fixes, security improvements, compatibility changes, feature changes, or new versions of the App. Certain features may require you to install updates to continue functioning properly. We may modify, suspend, discontinue, remove, or restrict access to any part of the App at any time, temporarily or permanently, for technical, legal, security, operational, or business reasons.
  </p>
  <p>
    Nothing in these Terms limits any mandatory rights you may have under applicable consumer law in relation to required updates or the legal conformity of digital products.
  </p>

  <h2>10. Intellectual Property</h2>
  <p>
    The App, including its software, design, text, graphics, logos, trademarks, databases, and other content, is owned by us or our licensors and is protected by intellectual property laws. Except for the limited license expressly granted under these Terms, no rights, title, or interest in the App or related intellectual property are transferred to you.
  </p>

  <h2>11. Feedback</h2>
  <p>
    If you provide suggestions, ideas, improvements, bug reports, feature requests, or other feedback, you grant us a worldwide, non-exclusive, royalty-free, perpetual, irrevocable, transferable, sublicensable right to use, reproduce, modify, adapt, publish, implement, and otherwise exploit that feedback without restriction or compensation, unless prohibited by mandatory law.
  </p>

  <h2>12. Suspension and Termination</h2>
  <p>
    These Terms apply from the first time you access or use the App and continue until terminated. We may suspend or terminate your right to use the App, in whole or in part, with immediate effect if:
  </p>
  <p>(a) you materially or repeatedly violate these Terms;</p>
  <p>(b) we are required to do so for legal, security, fraud-prevention, or platform-compliance reasons;</p>
  <p>(c) your use of the App creates risk, harm, or liability for us, users, third parties, or platforms.</p>
  <p>
    You may stop using the App at any time by uninstalling it and discontinuing use. Upon termination, the license granted to you ends immediately. Sections that by their nature should survive termination will survive, including provisions on intellectual property, liability, disclaimers, dispute resolution, and general provisions.
  </p>

  <h2>13. Disclaimer of Warranties</h2>
  <p>
    To the maximum extent permitted by applicable law, the App and related services are provided "as is" and "as available." We do not warrant that the App will be uninterrupted, error-free, secure, always available, compatible with every device, free from defects, or suitable for your specific needs. We do not warrant that User Data will never be lost, corrupted, delayed, inaccessible, or unrecoverable. You acknowledge that software, local storage, encryption systems, mobile operating systems, third-party platforms, device hardware, and network services can fail or behave unpredictably.
  </p>
  <p>
    Nothing in these Terms excludes any non-waivable statutory rights or mandatory warranties that cannot lawfully be excluded or limited.
  </p>

  <h2>14. Limitation of Liability</h2>
  <p>
    To the maximum extent permitted by applicable law, we shall be liable for damages only in accordance with this Section. We are liable without limitation for:
  </p>
  <p>(a) intent and gross negligence;</p>
  <p>(b) injury to life, body, or health;</p>
  <p>(c) claims under the German Product Liability Act, where applicable;</p>
  <p>(d) liability expressly required by mandatory law;</p>
  <p>(e) liability arising from any guarantee expressly assumed by us.</p>
  <p>
    In cases of ordinary negligence, we are liable only for the breach of an essential contractual obligation (cardinal duty), and in that case liability is limited to the foreseeable damage typical for the contract at the time the contract was entered into.
  </p>
  <p>
    Otherwise, to the maximum extent permitted by applicable law, we are not liable for:
  </p>
  <p>(a) loss of profits, revenue, business, goodwill, or opportunity;</p>
  <p>(b) indirect, incidental, special, exemplary, punitive, or consequential damages;</p>
  <p>(c) loss, corruption, or unavailability of User Data, contacts, notes, settings, files, or access credentials;</p>
  <p>(d) damage resulting from forgotten passwords, lost devices, deleted local data, device compromise, unsupported modifications, third-party failures, app marketplace actions, internet outages, force majeure events, or your failure to maintain backups or recovery materials.</p>
  <p>
    Any limitation of liability also applies in favor of our legal representatives, employees, contractors, and agents.
  </p>

  <h2>15. Indemnification</h2>
  <p>
    To the extent permitted by applicable law, you agree to indemnify and hold us harmless from third-party claims, damages, losses, liabilities, costs, and expenses arising out of or related to:
  </p>
  <p>(a) your unlawful use of the App;</p>
  <p>(b) your violation of these Terms;</p>
  <p>(c) your User Data;</p>
  <p>(d) your infringement of third-party rights.</p>
  <p>
    This section does not apply to consumers to the extent prohibited by mandatory law.
  </p>

  <h2>16. Consumer Rights</h2>
  <p>
    If you are a consumer, you may have mandatory rights under the laws of your country of residence, including within the European Union. Nothing in these Terms excludes, restricts, or limits any consumer rights that cannot lawfully be excluded or limited.
  </p>

  <h2>17. Export and Sanctions Compliance</h2>
  <p>
    You may not use, export, or re-export the App except as authorized by applicable export control and sanctions laws. You represent that you are not located in, under the control of, or a resident of any country or person subject to applicable trade restrictions that would prohibit your lawful use of the App.
  </p>

  <h2>18. Governing Law and Dispute Resolution</h2>
  <p>
    If you are a consumer residing in the European Union, these Terms are governed by German law, excluding conflict-of-law rules, provided that you also retain the protection of mandatory provisions of the law of the country in which you have your habitual residence. If you are not a consumer, these Terms are governed by German law, excluding conflict-of-law rules and excluding the UN Convention on Contracts for the International Sale of Goods (CISG), and the courts of Munich, Germany shall have exclusive jurisdiction, to the extent legally permitted. We are not obligated and do not agree to participate in dispute resolution proceedings before a consumer arbitration board unless required by law.
  </p>

  <h2>19. Changes to These Terms</h2>
  <p>
    We may update these Terms from time to time for legal, technical, operational, or business reasons. The current version will be made available through the App, the app listing, or our website. Your continued use of the App after updated Terms become effective constitutes acceptance of the updated Terms, unless applicable law requires a different form of consent.
  </p>

  <h2>20. App Marketplace Terms</h2>
  <p>
    If you downloaded the App from Apple App Store, Google Play, or another marketplace, you acknowledge that the relevant marketplace operator is not a party to these Terms and is not responsible for the App except as required by applicable law or platform rules. You also acknowledge that your use of the App must comply with the applicable marketplace terms and device usage rules.
  </p>

  <h2>21. Severability and General Provisions</h2>
  <p>
    If any provision of these Terms is held invalid, illegal, or unenforceable, the remaining provisions remain in effect to the fullest extent permitted by law. Our failure to enforce any provision is not a waiver of that provision. These Terms constitute the entire agreement between you and us regarding the App, except where separate terms expressly apply to a specific feature or service.
  </p>
</article>
`;

const assetPaths = getAssetPaths();
copyFaviconAssets();
writeFile(
	'privacy/index.html',
	layout(
		'Savelon: Privacy Policy',
		'Privacy Policy for Savelon: Private Contacts.',
		'/privacy',
		assetPaths,
		privacyArticle,
	),
);
writeFile(
	'terms/index.html',
	layout(
		'Savelon: Terms of Service',
		'Terms of Service for Savelon: Private Contacts.',
		'/terms',
		assetPaths,
		termsArticle,
	),
);
writeFile(
	'privacy.html',
	layout(
		'Savelon: Privacy Policy',
		'Privacy Policy for Savelon: Private Contacts.',
		'/privacy',
		assetPaths,
		privacyArticle,
	),
);
writeFile(
	'terms.html',
	layout(
		'Savelon: Terms of Service',
		'Terms of Service for Savelon: Private Contacts.',
		'/terms',
		assetPaths,
		termsArticle,
	),
);
console.log('Generated legal pages and favicon assets in docs/');
