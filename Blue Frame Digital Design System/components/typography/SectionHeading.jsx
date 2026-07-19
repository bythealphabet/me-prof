import React from 'react';

/**
 * Blue Frame Digital — SectionHeading
 * The centered, glowing section title (Courier 700). Optional eyebrow above.
 */

const css = `
.bfd-heading { margin: 0; }
.bfd-heading__title {
  font-family: var(--font-heading);
  font-weight: var(--font-weight-bold);
  color: var(--primary-teal-pale, var(--primary-blue-pale));
  line-height: var(--line-height-tight);
  margin: 0;
  text-wrap: balance;
}
.bfd-heading--glow .bfd-heading__title { text-shadow: 0 0 20px rgba(96, 165, 250, 0.3); }
.bfd-heading--center { text-align: center; }
.bfd-heading--center .bfd-heading__eyebrow { display: block; }
.bfd-heading__eyebrow {
  font-family: var(--font-mono);
  font-size: var(--font-size-small);
  letter-spacing: var(--tracking-label);
  color: var(--primary-teal-bright, var(--primary-blue-bright));
  margin: 0 0 var(--spacing-md);
}
.bfd-heading__sub {
  font-family: var(--font-accent);
  font-weight: 400;
  font-size: var(--font-size-body);
  color: var(--text-secondary);
  line-height: var(--line-height-relaxed);
  margin: var(--spacing-md) 0 0;
  max-width: 60ch;
}
.bfd-heading--center .bfd-heading__sub { margin-left: auto; margin-right: auto; }
.bfd-heading--size-h1 .bfd-heading__title { font-size: var(--font-size-h1); }
.bfd-heading--size-h2 .bfd-heading__title { font-size: var(--font-size-h2); }
.bfd-heading--size-h3 .bfd-heading__title { font-size: var(--font-size-h3); }
`;

if (typeof document !== 'undefined' && !document.getElementById('bfd-heading-css')) {
	const s = document.createElement('style');
	s.id = 'bfd-heading-css';
	s.textContent = css;
	document.head.appendChild(s);
}

export function SectionHeading({
	as = 'h2',
	size = 'h2',
	align = 'center',
	glow = true,
	eyebrow = null,
	subtitle = null,
	className = '',
	children,
	...rest
}) {
	const Tag = as;
	const classes = [
		'bfd-heading',
		`bfd-heading--size-${size}`,
		`bfd-heading--${align}`,
		glow ? 'bfd-heading--glow' : '',
		className
	]
		.filter(Boolean)
		.join(' ');
	return (
		<div className={classes} {...rest}>
			{eyebrow ? <span className="bfd-heading__eyebrow">{eyebrow}</span> : null}
			<Tag className="bfd-heading__title">{children}</Tag>
			{subtitle ? <p className="bfd-heading__sub">{subtitle}</p> : null}
		</div>
	);
}
