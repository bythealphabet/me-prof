/* Blue Frame Digital — UI kit: page sections.
   Consumes the design-system primitives from the compiled bundle. */

const DS = window.BlueFrameDigitalDesignSystem_91c13d || {};
const { Button, ServiceCard, SectionHeading, Eyebrow, Badge, Card, Input } = DS;
const { Icon } = window;

const SERVICES = [
	{ icon: 'globe', title: 'Professional Websites', desc: 'A professional online presence that builds trust and turns visitors into clients.' },
	{ icon: 'sparkles', title: 'AI Business Assistant', desc: 'Custom AI agents trained on how you work — smarter quoting and website chat that save hours.' },
	{ icon: 'filter', title: 'Conversion Design', desc: 'Turn more visitors into inquiries with the right forms, CTAs, and trust signals.' },
	{ icon: 'plug', title: 'Custom Integrations', desc: 'Connect your site to CRM, calendar, payments, and WhatsApp — reliable automations, not copy-paste.' },
	{ icon: 'search', title: 'Local SEO', desc: "Show up in Google's map pack when people in Curaçao search for what you offer." },
	{ icon: 'bar-chart-2', title: 'Growth & Support', desc: 'Your website keeps improving after launch — monthly updates, reports, and new features.' }
];

const ABOUT = [
	'Most Curaçao businesses have a website. Very few have one that actually works. Keeping up with a fast-moving digital landscape isn’t realistic when you’re already running a business. That’s not a website problem — that’s a strategy problem. And it’s exactly the gap we fill.',
	'Over the past 8+ years we’ve dedicated ourselves to web development — including enterprise-level work in the Netherlands for clients like DPG Media, National Geographic, and SourceUp. We bring a blue-collar work ethic to every project: show up, do the work, and don’t leave until it’s done right.',
	'You need a digital presence that works as hard as you do — one that attracts quality leads, showcases your work, and positions you as the professional choice in your market. That’s exactly what we build.'
];

function Hero({ onNav }) {
	return (
		<section className="bfd-hero bfd-blueprint-grid" id="top">
			<div className="bfd-hero__panel">
				<img src="../../assets/images/hero-image.jpg" alt="" />
			</div>
			<div className="bfd-hero__content">
				<Eyebrow>Blue Wave Based</Eyebrow>
				<h1 className="bfd-hero__title">Blue<span>Frame</span><br />Digital.</h1>
				<p className="bfd-hero__tag">Your Curaçao business deserves a website that actually works.</p>
				<div className="bfd-hero__cta">
					<Button variant="secondary" onClick={() => onNav('services')}>Our Services</Button>
					<Button variant="ghost" onClick={() => onNav('about')}>Why Choose Us</Button>
					<Button variant="primary" iconRight={<Icon name="arrow-right" size={20} />} onClick={() => onNav('contact')}>Get Started</Button>
				</div>
			</div>
		</section>
	);
}

function Services({ onNav }) {
	return (
		<section className="bfd-section" id="services">
			<SectionHeading eyebrow="// What We Do" subtitle="Six ways we help Curaçao businesses win online — from the first impression to the leads that follow.">
				What We Do
			</SectionHeading>
			<div className="bfd-services-grid">
				{SERVICES.map((s) => (
					<ServiceCard
						key={s.title}
						icon={<Icon name={s.icon} size={24} />}
						title={s.title}
						description={s.desc}
						onClick={() => onNav('contact')}
					/>
				))}
			</div>
		</section>
	);
}

function About() {
	return (
		<section className="bfd-section bfd-section--alt" id="about">
			<div className="bfd-about">
				<SectionHeading align="left" size="h2" eyebrow="// Why Choose Us">
					Why Curaçao businesses choose Blue Frame Digital
				</SectionHeading>
				<div className="bfd-about__copy">
					{ABOUT.map((p, i) => <p key={i}>{p}</p>)}
					<div className="bfd-about__tags">
						<Badge variant="outline">EN · NL · ES · PAP</Badge>
						<Badge tone="gold">8+ years</Badge>
						<Badge tone="coral">Enterprise NL</Badge>
					</div>
				</div>
			</div>
		</section>
	);
}

const PACKAGES = [
	{
		name: 'Website Build', price: '$2,000', tagline: 'You provide content, we build',
		features: ['Custom SvelteKit website', 'Responsive design', '2 rounds of revisions', 'SEO optimization'],
		timeline: 'Timeline: 3–6 weeks*', note: '*Depends on your content delivery speed',
		bestFor: 'Clients with existing professional photos', popular: false
	},
	{
		name: 'Complete Package', price: '$3,500', tagline: 'We handle everything',
		features: ['Professional photoshoot (4 hours)', '20–30 edited photos', 'Professional copywriting', 'Everything from Website Build', 'Optional: Company video (+$300)'],
		timeline: 'Timeline: 3 weeks guaranteed', note: 'We control everything — no delays',
		bestFor: 'Busy professionals who want it done right, done fast', popular: true
	}
];

function Pricing({ onNav }) {
	return (
		<section className="bfd-section" id="pricing">
			<SectionHeading eyebrow="// Pricing" subtitle="Two clear packages. No surprises.">Choose Your Package</SectionHeading>
			<div className="bfd-pricing">
				{PACKAGES.map((p) => (
					<div key={p.name} className={'bfd-pkg' + (p.popular ? ' bfd-pkg--popular' : '')}>
						{p.popular ? <span className="bfd-pkg__badge"><Badge variant="solid">Most Popular</Badge></span> : null}
						<h3 className="bfd-pkg__name">{p.name}</h3>
						<p className="bfd-pkg__price">{p.price}</p>
						<p className="bfd-pkg__tagline">{p.tagline}</p>
						<ul className="bfd-pkg__features">
							{p.features.map((f) => (
								<li key={f}><Icon name="check" size={20} /><span>{f}</span></li>
							))}
						</ul>
						<div className="bfd-pkg__timeline">
							<strong>{p.timeline}</strong>
							<span>{p.note}</span>
						</div>
						<p className="bfd-pkg__bestfor"><strong>Best for:</strong> {p.bestFor}</p>
						<Button variant={p.popular ? 'primary' : 'secondary'} fullWidth
							iconRight={<Icon name="arrow-right" size={20} />} onClick={() => onNav('contact')}>
							Get Started
						</Button>
					</div>
				))}
			</div>
		</section>
	);
}

function Contact() {
	const [sent, setSent] = React.useState(false);
	const submit = (e) => {
		e.preventDefault();
		setSent(true);
		setTimeout(() => setSent(false), 3200);
	};
	return (
		<section className="bfd-section bfd-section--alt" id="contact">
			<div className="bfd-contact">
				<div className="bfd-contact__intro">
					<SectionHeading align="left" size="h2" eyebrow="// Get Started">Let’s build something that works</SectionHeading>
					<p className="bfd-contact__lede">Tell us about your business. We’ll start with a conversation, not a contract.</p>
					<ul className="bfd-contact__info">
						<li><Icon name="map-pin" size={20} /><div><span className="bfd-contact__label">Location</span>Willemstad, Curaçao</div></li>
						<li><Icon name="mail" size={20} /><div><span className="bfd-contact__label">Email</span>hello@blueframe.digital</div></li>
						<li><Icon name="message-circle" size={20} /><div><span className="bfd-contact__label">WhatsApp</span>Message us — Curaçao runs on WhatsApp</div></li>
					</ul>
				</div>
				<form className="bfd-contact__form" onSubmit={submit}>
					<Input label="Your name" placeholder="Jane Doe" required />
					<Input label="Email" type="email" placeholder="you@business.cw" required />
					<Input label="What do you need?" multiline placeholder="A new site, AI quoting, better SEO…" />
					<Button variant="primary" fullWidth type="submit" iconRight={<Icon name="send" size={20} />}>
						{sent ? 'Thanks — we’ll be in touch!' : 'Send message'}
					</Button>
				</form>
			</div>
		</section>
	);
}

function SiteFooter() {
	return (
		<footer className="bfd-footer">
			<div className="bfd-footer__grid">
				<div className="bfd-footer__brand">
					<p className="bfd-footer__logo">Blue<span>Frame</span> Digital</p>
					<p className="bfd-footer__tag">Websites and digital marketing for businesses in Curaçao — built to convert.</p>
				</div>
				<div className="bfd-footer__col">
					<h4>Services</h4>
					<ul>{SERVICES.map((s) => <li key={s.title}>{s.title}</li>)}</ul>
				</div>
				<div className="bfd-footer__col">
					<h4>Explore</h4>
					<ul><li>Home</li><li>All services</li><li>Pricing</li><li>Contact</li></ul>
				</div>
				<div className="bfd-footer__col">
					<h4>Contact</h4>
					<ul>
						<li><span className="bfd-contact__label">Location</span>Willemstad, Curaçao</li>
						<li><span className="bfd-contact__label">Email</span>hello@blueframe.digital</li>
					</ul>
				</div>
			</div>
			<p className="bfd-footer__legal">© {new Date().getFullYear()} Blue Frame Digital. All rights reserved.</p>
		</footer>
	);
}

Object.assign(window, { Hero, Services, About, Pricing, Contact, SiteFooter });
