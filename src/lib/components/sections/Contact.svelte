<script lang="ts">
	import Mail from '@lucide/svelte/icons/mail';
	import MapPin from '@lucide/svelte/icons/map-pin';
	import Phone from '@lucide/svelte/icons/phone';
	import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import profile from '$lib/data/profile.json';

	let name = $state('');
	let email = $state('');
	let message = $state('');

	// No backend on a static site — hand off to the visitor's mail client.
	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		const body = encodeURIComponent(`From: ${name} <${email}>\n\n${message}`);
		window.location.href = `mailto:${profile.contact.email}?subject=Portfolio contact&body=${body}`;
	}
</script>

<section class="bfd-section" id="contact">
	<SectionHeading eyebrow="// Get In Touch" align="center">Contact</SectionHeading>
	<div class="bfd-contact">
		<div>
			<p class="bfd-contact__lede">
				Have a project in mind, a question, or just want to say hi? I'd love to hear from you.
			</p>
			<ul class="bfd-contact__info" role="list">
				<li>
					<Mail size={20} />
					<div>
						<span class="bfd-contact__label">Email</span>
						{profile.contact.email}
					</div>
				</li>
				<!-- profile.contact.phoneHref/mapsUrl are always external (tel:/https:) links. -->
				<!-- eslint-disable svelte/no-navigation-without-resolve -->
				<li>
					<Phone size={20} />
					<div>
						<span class="bfd-contact__label">Phone</span>
						<a href={profile.contact.phoneHref}>{profile.contact.phone}</a>
					</div>
				</li>
				<li>
					<MapPin size={20} />
					<div>
						<span class="bfd-contact__label">Location</span>
						<a href={profile.contact.mapsUrl}>{profile.contact.location}</a>
					</div>
				</li>
				<!-- eslint-enable svelte/no-navigation-without-resolve -->
			</ul>
		</div>
		<form class="bfd-contact__form" onsubmit={handleSubmit}>
			<Input label="Name" bind:value={name} required />
			<Input label="Email" type="email" bind:value={email} required />
			<Input label="Message" multiline bind:value={message} required />
			<Button variant="primary" type="submit">Send message</Button>
		</form>
	</div>
</section>

<style>
	.bfd-section {
		padding: clamp(8rem, 12vw, 15rem) clamp(2rem, 5vw, 8rem);
		background: var(--background-dark);

		grid-column: 1 / -1;
	}
	.bfd-contact {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: clamp(3rem, 6vw, 8rem);
		max-width: 110rem;
		margin: var(--spacing-3xl) auto 0;
		align-items: start;
	}
	.bfd-contact__lede {
		font-size: 1.7rem;
		color: var(--text-tertiary);
		line-height: var(--line-height-relaxed);
		margin: 0 0 var(--spacing-xl);
	}
	.bfd-contact__info {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
	}
	.bfd-contact__info li {
		display: flex;
		align-items: flex-start;
		gap: 1.4rem;
		color: var(--text-secondary);
		font-size: 1.5rem;
	}
	.bfd-contact__info :global(svg) {
		color: var(--primary-teal-bright);
		flex: none;
		margin-top: 0.2rem;
	}
	.bfd-contact__label {
		display: block;
		font-family: var(--font-accent);
		font-size: 1.1rem;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--text-light);
		margin-bottom: 0.2rem;
	}
	.bfd-contact__form {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
		background: var(--background-card);
		padding: var(--spacing-2xl);
		border-radius: var(--radius-md);
		box-shadow: var(--shadow-card);
	}
	@media (max-width: 820px) {
		.bfd-contact {
			grid-template-columns: 1fr;
		}
	}
</style>
