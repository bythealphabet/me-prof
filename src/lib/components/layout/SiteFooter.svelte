<script lang="ts">
	import { resolve, asset } from '$app/paths';
	import Mail from '@lucide/svelte/icons/mail';
	import profile from '$lib/data/profile.json';
</script>

<footer class="main-footer bfd-footer">
	<div class="bfd-footer__grid">
		<div class="bfd-footer__brand">
			<p class="bfd-footer__logo">&lt;{profile.firstName}<span>{profile.lastName}</span>/&gt;</p>
			<p class="bfd-footer__tag">{profile.role} · {profile.location}</p>
		</div>
		<div class="bfd-footer__col">
			<h4>Explore</h4>
			<ul role="list">
				<li><a href="{resolve('/')}#about">About</a></li>
				<li><a href="{resolve('/')}#skills">Skills</a></li>
				<li><a href="{resolve('/')}#experience">Experience</a></li>
				<li><a href={resolve('/projects')}>Projects</a></li>
			</ul>
		</div>
		<div class="bfd-footer__col">
			<h4>Connect</h4>
			<!-- profile.socials entries are always external URLs. -->
			<!-- eslint-disable svelte/no-navigation-without-resolve -->
			<ul role="list">
				{#each profile.socials as social (social.href)}
					<li><a href={social.href}>{social.label}</a></li>
				{/each}
				<li><a href="mailto:{profile.contact.email}">Email</a></li>
			</ul>
			<!-- eslint-enable svelte/no-navigation-without-resolve -->
		</div>
		<div class="bfd-footer__col">
			<h4>Resume</h4>
			<ul role="list">
				<li>
					<a href={asset('/resume.pdf')} target="_blank" rel="noopener">
						<Mail size={14} /> Download CV
					</a>
				</li>
			</ul>
		</div>
	</div>
	<p class="bfd-footer__legal">
		&copy; {new Date().getFullYear()}
		{profile.name}. All rights reserved.
	</p>
</footer>

<style>
	.bfd-footer {
		background: var(--background-dark-alt);
		border-top: 2px solid var(--primary-teal);
		padding: var(--spacing-3xl) clamp(2rem, 5vw, 8rem) var(--spacing-lg);
	}
	.bfd-footer__grid {
		max-width: 120rem;
		margin: 0 auto;
		display: grid;
		grid-template-columns: 1.4fr repeat(3, 1fr);
		gap: var(--spacing-xl);
	}
	.bfd-footer__logo {
		font-family: var(--font-heading);
		font-weight: 700;
		font-size: var(--font-size-h3);
		color: var(--primary-teal-bright);
		margin: 0 0 var(--spacing-sm);
	}
	.bfd-footer__logo span {
		color: var(--primary-teal-pale);
	}
	.bfd-footer__tag {
		color: var(--text-secondary);
		font-size: 1.4rem;
		line-height: var(--line-height-relaxed);
		max-width: 28ch;
	}
	.bfd-footer__col h4 {
		font-family: var(--font-accent);
		font-size: 1.4rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--text-secondary);
		margin: 0 0 var(--spacing-sm);
	}
	.bfd-footer__col ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.7rem;
	}
	.bfd-footer__col li {
		font-family: var(--font-accent);
		font-size: 1.4rem;
		color: var(--text-secondary);
	}
	.bfd-footer__col a {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		color: inherit;
	}
	.bfd-footer__col a:hover {
		color: var(--primary-teal-bright);
	}
	.bfd-footer__legal {
		text-align: center;
		margin: var(--spacing-xl) 0 0;
		padding-top: var(--spacing-lg);
		border-top: 1px solid rgba(148, 163, 184, 0.2);
		font-family: var(--font-accent);
		font-size: 1.2rem;
		color: var(--text-light);
	}
	@media (max-width: 820px) {
		.bfd-footer__grid {
			grid-template-columns: 1fr 1fr;
		}
		.bfd-footer__brand {
			grid-column: 1 / -1;
		}
	}
</style>
