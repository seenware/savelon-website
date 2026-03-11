import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import heroImage from '../assets/hero.png';
import '../LandingLayout.css';
import {
	PrimaryButton,
	SecondaryButton,
	TextLinkButton,
} from '../shared/Button';
import { FAQAccordion } from '../shared/FAQAccordion';
import { Footer } from '../shared/Footer';
import { NavBar } from '../shared/NavBar';
import { Section } from '../shared/Section';

const APP_STORE_URL =
	'https://apps.apple.com/de/app/savelon-private-contacts/id6755902938?l=en-GB';
const SUPPORT_URL = 'https://tally.so/r/jaZKA6';

const faqItems = [
	{
		question: 'What is Savelon?',
		answer:
			'Savelon is a private contacts app for storing important or sensitive contacts outside your default contacts app.',
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
		answer:
			'Savelon is available on iPhone, iPad, and macOS through the App Store. Android is coming soon.',
	},
	{
		question: 'Who is Savelon for?',
		answer:
			'Savelon is for anyone who wants a more private way to store important contacts, especially privacy-conscious people who want more control over personal data.',
	},
	{
		question: 'How do I contact support?',
		answer:
			'You can reach support through the contact form linked on this page.',
	},
];

export function LandingPage() {
	const scrollToId = (id: string) => {
		const el = document.getElementById(id);
		if (!el) return;
		el.scrollIntoView({ behavior: 'smooth', block: 'start' });
	};

	const location = useLocation();

	useEffect(() => {
		if (!location.hash) return;
		const id = location.hash.replace('#', '');
		// Defer until after initial render so sections exist
		window.setTimeout(() => {
			scrollToId(id);
		}, 0);
	}, [location.hash]);

	return (
		<div className='page-root'>
			<NavBar
				onNavClick={(target) => {
					if (target === 'top') {
						window.scrollTo({ top: 0, behavior: 'smooth' });
						return;
					}
					if (target === 'support') {
						window.open(SUPPORT_URL, '_blank', 'noopener,noreferrer');
						return;
					}
					if (target === 'download') {
						scrollToId('final-cta');
						return;
					}
					if (target === 'why') {
						scrollToId('why-it-matters');
						return;
					}
					if (target === 'how') {
						scrollToId('how-it-works');
						return;
					}
					if (target === 'faq') {
						scrollToId('faq');
					}
				}}
			/>
			<main>
				<Section id='hero' className='hero-section'>
					<div className='hero-inner'>
						<div className='hero-copy'>
							<p className='eyebrow'>Savelon</p>
							<h1>Private contacts, under your control</h1>
							<p className='hero-subheadline'>
								Savelon is a private contacts app for people who want important
								contacts stored outside default platform systems.
							</p>
							<div className='hero-ctas'>
								<PrimaryButton
									as='a'
									href={APP_STORE_URL}
									target='_blank'
									rel='noreferrer'
									aria-label='Download Savelon on the App Store'
									className='app-store-button'
								>
									Download on the App Store
								</PrimaryButton>
								<SecondaryButton onClick={() => scrollToId('why-it-matters')}>
									Why private contacts matter
								</SecondaryButton>
							</div>
							<p className='availability'>
								Available on iPhone, iPad, and macOS. Android coming soon.
							</p>
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

				<Section id='why-it-matters'>
					<div className='text-block'>
						<h2>Your contacts are private</h2>
						<p>
							Who you know is part of your private life. Contacts can reveal
							relationships, trust, history, and the people closest to you.
							Savelon gives you a dedicated place to keep important contacts
							more private and under your control.
						</p>
					</div>
				</Section>

				<Section id='private-alternative'>
					<div className='two-column'>
						<div className='two-column-text'>
							<h2>A safer place for important contacts</h2>
							<p>
								Default contacts apps are made for convenience. Savelon is made
								for privacy-conscious people who want important contacts kept
								separate, protected, and easier to control.
							</p>
						</div>
						<div className='two-column-supporting' aria-hidden='true'>
							<div className='pill'>Separate from default contacts</div>
							<div className='pill'>Designed for sensitive information</div>
							<div className='pill'>Calm, focused interface</div>
						</div>
					</div>
				</Section>

				<Section id='benefits'>
					<div className='section-header'>
						<h2>Why people use Savelon</h2>
					</div>
					<div className='benefits-grid'>
						<article className='benefit-card'>
							<div className='benefit-icon' aria-hidden='true'>
								◦
							</div>
							<h3>Keep private contacts separate</h3>
							<p>
								Store important contacts away from your default contacts app.
							</p>
						</article>
						<article className='benefit-card'>
							<div className='benefit-icon' aria-hidden='true'>
								◦
							</div>
							<h3>Protect who you know</h3>
							<p>Keep your personal network in a more private space.</p>
						</article>
						<article className='benefit-card'>
							<div className='benefit-icon' aria-hidden='true'>
								◦
							</div>
							<h3>Stay in control of your data</h3>
							<p>Your sensitive contact data should belong to you.</p>
						</article>
						<article className='benefit-card'>
							<div className='benefit-icon' aria-hidden='true'>
								◦
							</div>
							<h3>Encrypted on your device</h3>
							<p>
								Savelon is designed to protect your contacts with on-device
								encryption.
							</p>
						</article>
					</div>
				</Section>

				<Section id='how-it-works'>
					<div className='section-header'>
						<h2>How it works</h2>
					</div>
					<div className='steps-grid'>
						<div className='step-card'>
							<div className='step-number'>1</div>
							<h3>Add or import contacts</h3>
							<p>
								Save important contacts in Savelon and keep them separate from
								your everyday address book.
							</p>
						</div>
						<div className='step-card'>
							<div className='step-number'>2</div>
							<h3>Keep them protected</h3>
							<p>
								Store contacts in a dedicated private space built for sensitive
								information.
							</p>
						</div>
						<div className='step-card'>
							<div className='step-number'>3</div>
							<h3>Access them when you need them</h3>
							<p>
								Use Savelon as your secure place for the contacts you want kept
								private.
							</p>
						</div>
					</div>
				</Section>

				<Section id='trust'>
					<div className='text-block'>
						<h2>Built for privacy-conscious people</h2>
						<p>
							Savelon was built from a simple belief: contacts are private
							information and deserve private storage. It was created for people
							who want a truly usable way to protect important contacts without
							giving up control.
						</p>
						<ul className='trust-list'>
							<li>Built with privacy as the core principle</li>
							<li>On-device encryption</li>
							<li>Clear policies</li>
							<li>Direct support</li>
						</ul>
						<div className='trust-links'>
							<TextLinkButton to='/privacy'>Privacy Policy</TextLinkButton>
							<TextLinkButton to='/terms'>Terms of Service</TextLinkButton>
							<TextLinkButton
								as='a'
								href={SUPPORT_URL}
								target='_blank'
								rel='noreferrer'
							>
								Support
							</TextLinkButton>
						</div>
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
							<PrimaryButton
								as='a'
								href={APP_STORE_URL}
								target='_blank'
								rel='noreferrer'
								className='app-store-button'
							>
								Download on the App Store
							</PrimaryButton>
							<SecondaryButton
								as='a'
								href={SUPPORT_URL}
								target='_blank'
								rel='noreferrer'
							>
								Contact Support
							</SecondaryButton>
						</div>
					</div>
				</Section>
			</main>
			<Footer />
		</div>
	);
}
