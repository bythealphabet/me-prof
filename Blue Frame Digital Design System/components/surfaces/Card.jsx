import React from 'react';

/**
 * Blue Frame Digital — Card
 * The base surface: a faint top-lit gradient over background-card, the 45° draft
 * hatch, a navy-tinted ambient shadow, and an optional hover lift + shimmer.
 * No divider lines — the brand defines edges with surface, never 1px borders.
 */

const css = `
.bfd-card {
  position: relative;
  background: linear-gradient(160deg, color-mix(in srgb, var(--background-card) 88%, white 12%) 0%, var(--background-card) 55%);
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-card);
  overflow: hidden;
  transition: box-shadow var(--duration-slow) var(--easing-ease-out),
              transform var(--duration-slow) var(--easing-ease-out);
}
.bfd-card__body { position: relative; z-index: 2; }
.bfd-card--pad-md .bfd-card__body { padding: var(--spacing-xl); }
.bfd-card--pad-lg .bfd-card__body { padding: var(--spacing-2xl); }
.bfd-card--pad-none .bfd-card__body { padding: 0; }

/* 45° draft hatch */
.bfd-card::before {
  content: ''; position: absolute; inset: 0; z-index: 1; pointer-events: none;
  background: repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(30,58,138,0.03) 10px, rgba(30,58,138,0.03) 20px);
  opacity: 1; transition: opacity var(--duration-fast) ease;
}
/* shimmer sweep */
.bfd-card::after {
  content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; z-index: 1; pointer-events: none;
  background: linear-gradient(90deg, transparent, rgba(96,165,250,0.1), transparent);
  transform: translateX(-100%);
  transition: transform 0.8s var(--easing-ease-out);
}
.bfd-card--hover:hover {
  box-shadow: var(--shadow-card-hover);
  transform: translateY(-6px);
}
.bfd-card--hover:hover::before { opacity: 0; }
.bfd-card--hover:hover::after { transform: translateX(100%); }
`;

if (typeof document !== 'undefined' && !document.getElementById('bfd-card-css')) {
	const s = document.createElement('style');
	s.id = 'bfd-card-css';
	s.textContent = css;
	document.head.appendChild(s);
}

export function Card({
	as = 'div',
	padding = 'md',
	hover = false,
	className = '',
	children,
	...rest
}) {
	const Tag = as;
	const classes = [
		'bfd-card',
		`bfd-card--pad-${padding}`,
		hover ? 'bfd-card--hover' : '',
		className
	]
		.filter(Boolean)
		.join(' ');
	return (
		<Tag className={classes} {...rest}>
			<div className="bfd-card__body">{children}</div>
		</Tag>
	);
}
