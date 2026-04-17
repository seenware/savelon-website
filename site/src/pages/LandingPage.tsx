import QRCodeStyling from 'qr-code-styling';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import downloadCurlyArrow from '../assets/download-curly-arrow.png';
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
	const [isMobileDownloadLayout, setIsMobileDownloadLayout] = useState(false);
	const qrContainerRef = useRef<HTMLDivElement | null>(null);
	const mobileQrContainerRef = useRef<HTMLDivElement | null>(null);
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

	useEffect(() => {
		if (typeof window === 'undefined') return;
		const mediaQuery = window.matchMedia('(max-width: 560px)');

		const syncMobileDownloadLayout = () => {
			setIsMobileDownloadLayout(mediaQuery.matches);
		};

		syncMobileDownloadLayout();
		mediaQuery.addEventListener('change', syncMobileDownloadLayout);
		return () => {
			mediaQuery.removeEventListener('change', syncMobileDownloadLayout);
		};
	}, []);

	const activeStoreUrl =
		activeDownloadTab === 'ios' ? APP_STORE_URL : GOOGLE_PLAY_URL;
	const activeStoreText =
		activeDownloadTab === 'ios' ? 'App Store' : 'Google Play';
	const qrSize = 156;

	useEffect(() => {
		const activeQrContainer = isMobileDownloadLayout
			? mobileQrContainerRef.current
			: qrContainerRef.current;
		if (!activeQrContainer) return;

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
		}

		activeQrContainer.innerHTML = '';
		qrInstanceRef.current.append(activeQrContainer);
		qrInstanceRef.current.update({
			data: activeStoreUrl,
			width: qrSize,
			height: qrSize,
		});
	}, [activeStoreUrl, qrSize, isMobileDownloadLayout]);

	return (
		<div className='page-root'>
			<main>
				<Section id='hero' className='hero-section'>
					<div className='hero-inner'>
						<div className='hero-copy'>
							<div className='hero-badges' aria-label='Key privacy features'>
								<div className='hero-badge-pill'>OPEN SOURCE</div>
								<div className='hero-badge-pill'>256 BIT ENCRYPTION</div>
								<div className='hero-badge-pill'>NO CLOUDS</div>
							</div>
							<div className='hero-brand-inline'>
								<img
									src={appLogo}
									alt=''
									className='site-brand-logo'
									aria-hidden='true'
								/>
								<h1 className='hero-brand-title'>Savelon: Private Contacts</h1>
							</div>
							<h2 className='hero-title'>
								Privacy-first contacts app
							</h2>
							{isMobileDownloadLayout ? (
								<div className='mobile-download-block'>
									<a
										className='mobile-download-qr-link'
										href={activeStoreUrl}
										target='_blank'
										rel='noreferrer'
										aria-label={`Open ${activeStoreText} download link`}
									>
										<div
											ref={mobileQrContainerRef}
											className='mobile-download-qr-image'
											role='img'
											aria-label={`QR code to download from ${activeStoreText}`}
										/>
									</a>
									<h3 className='download-cta-copy mobile-download-copy'>
										Tap or scan to download
									</h3>
								</div>
							) : (
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
											<a
												className='download-qr-link'
												href={activeStoreUrl}
												target='_blank'
												rel='noreferrer'
												aria-label={`Open ${activeStoreText} download link`}
											>
												<div
													ref={qrContainerRef}
													className='download-qr-image'
													role='img'
													aria-label={`QR code to download from ${activeStoreText}`}
												/>
											</a>
										</div>
										<div className='download-middle-arrow' aria-hidden='true'>
											<img
												src={downloadCurlyArrow}
												alt=''
												className='download-middle-arrow-icon'
											/>
										</div>
										<div className='download-copy'>
											<h3 className='download-cta-copy'>
												Tap or scan to download
											</h3>
										</div>
									</div>
								</div>
							)}
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
										target='_blank'
										rel='noreferrer'
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
					<div className='text-block privacy-simple-content'>
						<h2>Privacy, made simple</h2>
						<p>No more complicated setups. Just one app.</p>
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
								<h3>👀 Take back control from Big Tech</h3>
							</div>
							<p>
								Your contacts shouldn’t end up in surveillance systems you don’t
								really control. Savelon keeps them on your device, not in the
								cloud.
							</p>
						</article>
						<article className='benefit-card'>
							<div className='benefit-head'>
								<h3>🤐 Protect what’s truly confidential</h3>
							</div>
							<p>
								Some contacts are sensitive by nature. Savelon encrypts them on
								your device and lets you lock them with a password.
							</p>
						</article>
						<article className='benefit-card'>
							<div className='benefit-head'>
								<h3>🤙 Have a second private phonebook</h3>
							</div>
							<p>
								Not every contact belongs in your main list. Savelon gives you a
								separate space for important or rarely used contacts, kept out
								of sync and away from other apps.
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
