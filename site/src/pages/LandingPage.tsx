import QRCodeStyling from 'qr-code-styling';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import heroImage from '../assets/hero-screenshot.png';
import appLogo from '../assets/logo.png';
import '../LandingLayout.css';
import { PrimaryButton, SecondaryButton } from '../shared/Button';
import { FAQAccordion } from '../shared/FAQAccordion';
import { Footer } from '../shared/Footer';
import { Section } from '../shared/Section';

const APP_STORE_URL = 'https://apps.apple.com/app/id6755902938';
const GOOGLE_PLAY_URL =
	'https://play.google.com/store/apps/details?id=com.seenware.encryptedcontacts';
const SUPPORT_URL = 'https://tally.so/r/jaZKA6';
const GITHUB_URL = 'https://github.com/seenware/savelon-app';

type DownloadTab = 'ios' | 'android';

function detectInitialTab(): DownloadTab {
	if (typeof navigator === 'undefined') return 'ios';

	const userAgent = navigator.userAgent.toLowerCase();
	const platform = (navigator.platform || '').toLowerCase();
	const isAndroid = userAgent.includes('android');
	const isIos = /iphone|ipad|ipod/.test(userAgent);
	const isMac = platform.includes('mac') || userAgent.includes('mac os');
	const isSupportedDesktop =
		platform.includes('win') ||
		platform.includes('linux') ||
		userAgent.includes('cros');

	if (isAndroid || isSupportedDesktop) return 'android';
	if (isIos || isMac) return 'ios';
	return 'ios';
}

const faqItems = [
	{
		question: 'What is Savelon?',
		answer:
			'Savelon is a private contacts app for storing important or sensitive contacts.',
	},
	{
		question: 'Why not just use the default contacts app?',
		answer:
			'Default contacts apps are made for general use. Savelon is for people who want stronger privacy and more control over important contacts.',
	},
	{
		question: 'Are my contacts encrypted?',
		answer:
			'Savelon is designed to protect contacts with on-device encryption.',
	},
	{
		question: 'Which devices are supported?',
		answer: 'Savelon is available on Android, iPhone, iPad, and mac.',
	},
	{
		question: 'Who is Savelon for?',
		answer:
			'Savelon is for anyone who wants a more private way to store important contacts, especially privacy-conscious people who want more control over personal data.',
	},
];

export function LandingPage() {
	const [activeDownloadTab, setActiveDownloadTab] =
		useState<DownloadTab>(detectInitialTab);
	const qrContainerRef = useRef<HTMLDivElement | null>(null);
	const qrInstanceRef = useRef<QRCodeStyling | null>(null);

	const scrollToId = (id: string) => {
		const el = document.getElementById(id);
		if (!el) return;
		el.scrollIntoView({ behavior: 'smooth', block: 'start' });
	};

	const location = useLocation();

	useEffect(() => {
		document.title = 'Savelon: private contacts';
	}, []);

	useEffect(() => {
		if (!location.hash) return;
		const id = location.hash.replace('#', '');
		// Defer until after initial render so sections exist
		window.setTimeout(() => {
			scrollToId(id);
		}, 0);
	}, [location.hash]);

	const activeStoreUrl =
		activeDownloadTab === 'ios' ? APP_STORE_URL : GOOGLE_PLAY_URL;
	const activeStoreText =
		activeDownloadTab === 'ios' ? 'App Store' : 'Google Play';
	const qrSize = 156;

	useEffect(() => {
		if (!qrContainerRef.current) return;

		if (!qrInstanceRef.current) {
			qrInstanceRef.current = new QRCodeStyling({
				width: qrSize,
				height: qrSize,
				data: activeStoreUrl,
				margin: 0,
				type: 'svg',
				qrOptions: {
					errorCorrectionLevel: 'H',
				},
				dotsOptions: {
					type: 'dots',
					color: '#0f172a',
				},
				cornersSquareOptions: {
					type: 'extra-rounded',
					color: '#0f172a',
				},
				cornersDotOptions: {
					type: 'dot',
					color: '#0f172a',
				},
				backgroundOptions: {
					color: '#ffffff',
				},
			});

			qrContainerRef.current.innerHTML = '';
			qrInstanceRef.current.append(qrContainerRef.current);
		}

		qrInstanceRef.current.update({
			data: activeStoreUrl,
			width: qrSize,
			height: qrSize,
		});
	}, [activeStoreUrl, qrSize]);

	return (
		<div className='page-root'>
			<div className='site-brand'>
				<div className='site-brand-inner'>
					<img src={appLogo} alt='' className='site-brand-logo' aria-hidden='true' />
					<h1>Savelon: Private Contacts</h1>
				</div>
			</div>
			<main>
				<Section id='hero' className='hero-section'>
					<div className='hero-inner'>
						<div className='hero-copy'>
							<h2 className='hero-title'>
								Your second phonebook, fully private
							</h2>
							<p className='hero-subheadline'>
								Open source, privacy-first contacts app
							</p>
							<div className='encryption-pill'>256bit encryption</div>
							<div className='download-tabs-card'>
								<div
									className='download-tabs'
									role='tablist'
									aria-label='Download platform tabs'
								>
									<button
										type='button'
										role='tab'
										aria-selected={activeDownloadTab === 'ios'}
										className={`download-tab ${activeDownloadTab === 'ios' ? 'is-active' : ''}`}
										onClick={() => setActiveDownloadTab('ios')}
									>
										iOS, MacOS
									</button>
									<button
										type='button'
										role='tab'
										aria-selected={activeDownloadTab === 'android'}
										className={`download-tab ${activeDownloadTab === 'android' ? 'is-active' : ''}`}
										onClick={() => setActiveDownloadTab('android')}
									>
										Android
									</button>
								</div>
								<div className='download-card-body'>
									<div className='download-qr-wrap'>
										<div
											ref={qrContainerRef}
											className='download-qr-image'
											role='img'
											aria-label={`QR code to download from ${activeStoreText}`}
										/>
									</div>
									<div className='download-copy'>
										<h3>Scan to download</h3>
										<p>
											Or go to the{' '}
											<a href={activeStoreUrl} target='_blank' rel='noreferrer'>
												{activeStoreText}
											</a>
										</p>
									</div>
								</div>
							</div>
						</div>
						<div className='hero-visual' aria-hidden='true'>
							<img
								src={heroImage}
								alt=''
								className='hero-image'
								loading='lazy'
							/>
						</div>
					</div>
				</Section>

				<Section id='privacy-design'>
					<div className='privacy-design-content'>
						<h2>Privacy, by design</h2>
						<ul className='feature-list'>
							<li>
								<strong>Zero-trust architecture</strong>
								<p>No servers. No cloud. Your contacts stay on your device.</p>
							</li>
							<li>
								<strong>Open source</strong>
								<p>
									Fully transparent. Review the code anytime on{' '}
									<a
										className='inline-link'
										href={GITHUB_URL}
										target='_blank'
										rel='noreferrer'
									>
										GitHub
									</a>
									.
								</p>
							</li>
							<li>
								<strong>Strong encryption</strong>
								<p>
									Your contacts are always encrypted, never stored in plain
									text.
								</p>
							</li>
							<li>
								<strong>Clear policies</strong>
								<p>
									Simple, readable{' '}
									<a
										className='inline-link'
										href='/privacy'
									>
										Privacy Policy
									</a>
									. No surprises.
								</p>
							</li>
						</ul>
					</div>
				</Section>
				<Section id='privacy-simple'>
					<div className='text-block'>
						<h2>Privacy, made simple</h2>
						<div className='pill-stack' aria-hidden='true'>
							<div className='pill'>Contact photos</div>
							<div className='pill'>Easy import &amp; export</div>
							<div className='pill'>Password-protected backups</div>
							<div className='pill'>Call directly from the app</div>
						</div>
					</div>
				</Section>

				<Section id='benefits'>
					<div className='section-header'>
						<h2>Why people use Savelon</h2>
					</div>
					<div className='benefits-grid'>
						<article className='benefit-card'>
							<div className='benefit-head'>
								<div className='benefit-icon' aria-hidden='true'>
									<svg viewBox='0 0 24 24' focusable='false'>
										<rect x='4' y='7' width='10' height='10' rx='2' />
										<rect x='10' y='5' width='10' height='10' rx='2' />
									</svg>
								</div>
								<h3>Keep private contacts separate</h3>
							</div>
							<p>
								Store important contacts away from your default contacts app.
							</p>
						</article>
						<article className='benefit-card'>
							<div className='benefit-head'>
								<div className='benefit-icon' aria-hidden='true'>
									<svg viewBox='0 0 24 24' focusable='false'>
										<path d='M12 3l7 3v5c0 5-3.2 8.7-7 10-3.8-1.3-7-5-7-10V6l7-3z' />
									</svg>
								</div>
								<h3>Protect who you know</h3>
							</div>
							<p>Keep your personal network in a more private space.</p>
						</article>
						<article className='benefit-card'>
							<div className='benefit-head'>
								<div className='benefit-icon' aria-hidden='true'>
									<svg viewBox='0 0 24 24' focusable='false'>
										<path d='M4 7h10M4 12h16M4 17h12' />
										<circle cx='16' cy='7' r='2' />
										<circle cx='12' cy='17' r='2' />
									</svg>
								</div>
								<h3>Stay in control of your data</h3>
							</div>
							<p>Your sensitive contact data should belong to you.</p>
						</article>
						<article className='benefit-card'>
							<div className='benefit-head'>
								<div className='benefit-icon' aria-hidden='true'>
									<svg viewBox='0 0 24 24' focusable='false'>
										<rect x='5' y='11' width='14' height='10' rx='2' />
										<path d='M8 11V8a4 4 0 018 0v3' />
									</svg>
								</div>
								<h3>Encrypted on your device</h3>
							</div>
							<p>
								Savelon is designed to protect your contacts with on-device
								encryption.
							</p>
						</article>
					</div>
				</Section>

				<Section id='faq'>
					<div className='section-header'>
						<h2>FAQ</h2>
					</div>
					<FAQAccordion items={faqItems} />
				</Section>

				<Section id='final-cta'>
					<div className='final-cta'>
						<h2>Take control of your private contacts</h2>
						<p>Store the people that matter in a more private, secure place.</p>
						<div className='hero-ctas'>
							<PrimaryButton onClick={() => scrollToId('hero')}>
								Download
							</PrimaryButton>
							<SecondaryButton
								as='a'
								href={SUPPORT_URL}
								target='_blank'
								rel='noreferrer'
							>
								Contact Us
							</SecondaryButton>
						</div>
					</div>
				</Section>
			</main>
			<Footer />
		</div>
	);
}
