import React from 'react';

/**
 * Blue Frame Digital — Button
 * Brand buttons: a signature ink→navy gradient primary, a soft surface
 * secondary with an expanding radial ripple, a quiet ghost, and a monospace
 * "tertiary" text link with an underline that grows on hover.
 */

const css = `
.bfd-btn {
  --_ripple: rgba(30, 58, 138, 0.2);
  display: inline-flex; align-items: center; justify-content: center; gap: 0.6rem;
  font-family: var(--font-accent);
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-body);
  line-height: 1;
  border: none; cursor: pointer; text-decoration: none;
  border-radius: var(--radius-md);
  padding: 1.2rem 2.6rem;
  position: relative; overflow: hidden;
  transition: transform var(--duration-fast) var(--easing-ease-out),
              box-shadow var(--duration-fast) var(--easing-ease-out),
              background var(--duration-fast) var(--easing-ease-out);
  -webkit-tap-highlight-color: transparent;
}
.bfd-btn::before {
  content: ''; position: absolute; top: 50%; left: 50%;
  width: 0; height: 0; border-radius: 50%;
  background: var(--_ripple);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
  pointer-events: none;
}
.bfd-btn:hover::before { width: 320px; height: 320px; }
.bfd-btn > * { position: relative; z-index: 1; }
.bfd-btn:focus-visible { outline: 3px solid var(--primary-teal, var(--primary-blue-light)); outline-offset: 2px; }
.bfd-btn[aria-disabled="true"], .bfd-btn:disabled { opacity: 0.5; pointer-events: none; cursor: not-allowed; }

/* sizes */
.bfd-btn--sm { padding: 0.7rem 1.6rem; font-size: var(--font-size-small); }
.bfd-btn--lg { padding: 1.5rem 3.4rem; font-size: 1.9rem; }
.bfd-btn--block { display: flex; width: 100%; }

/* primary — the lithographic gradient */
.bfd-btn--primary {
  background: linear-gradient(135deg, var(--gradient-ink, #00236f) 0%, var(--primary-blue) 100%);
  color: var(--text-primary);
  box-shadow: 0 4px 16px rgba(11, 28, 48, 0.25);
}
.bfd-btn--primary:hover {
  background: linear-gradient(135deg, var(--primary-blue) 0%, var(--primary-blue-light) 100%);
  box-shadow: 0 8px 28px rgba(11, 28, 48, 0.35);
  transform: translateY(-2px);
}
.bfd-btn--primary:active { transform: translateY(0); }

/* secondary — soft surface */
.bfd-btn--secondary {
  background: color-mix(in srgb, var(--background-card) 80%, var(--primary-blue) 20%);
  color: var(--primary-teal-pale, var(--primary-blue-pale));
  box-shadow: 0 4px 16px rgba(11, 28, 48, 0.2);
}
.bfd-btn--secondary:hover {
  background: color-mix(in srgb, var(--background-card) 60%, var(--primary-blue) 40%);
  box-shadow: 0 8px 28px rgba(11, 28, 48, 0.35);
  transform: translateY(-2px) scale(1.04);
}

/* ghost — outline-free, surface tint on hover */
.bfd-btn--ghost { background: transparent; color: var(--text-secondary); }
.bfd-btn--ghost::before { --_ripple: transparent; }
.bfd-btn--ghost:hover { background: color-mix(in srgb, var(--background-card) 70%, transparent); color: var(--primary-teal-bright, var(--primary-blue-bright)); }

/* tertiary — monospace text link with growing underline */
.bfd-btn--tertiary {
  background: transparent; color: var(--accent-coral, var(--primary-blue-bright));
  font-family: var(--font-mono); font-weight: 600;
  padding: 0.4rem 0.2rem; border-radius: 0; overflow: visible;
}
.bfd-btn--tertiary::before { display: none; }
.bfd-btn--tertiary::after {
  content: ''; position: absolute; left: 0; bottom: 0; height: 2px; width: 0;
  background: currentColor; transition: width var(--duration-fast) var(--easing-ease-out);
}
.bfd-btn--tertiary:hover { color: var(--primary-teal-bright, var(--primary-blue-light)); }
.bfd-btn--tertiary:hover::after { width: 100%; }
`;

if (typeof document !== 'undefined' && !document.getElementById('bfd-button-css')) {
	const s = document.createElement('style');
	s.id = 'bfd-button-css';
	s.textContent = css;
	document.head.appendChild(s);
}

export function Button({
	variant = 'primary',
	size = 'md',
	as,
	href,
	fullWidth = false,
	disabled = false,
	iconLeft = null,
	iconRight = null,
	className = '',
	children,
	...rest
}) {
	const Tag = as || (href ? 'a' : 'button');
	const classes = [
		'bfd-btn',
		`bfd-btn--${variant}`,
		size !== 'md' ? `bfd-btn--${size}` : '',
		fullWidth ? 'bfd-btn--block' : '',
		className
	]
		.filter(Boolean)
		.join(' ');

	const tagProps = { className: classes, ...rest };
	if (Tag === 'a') {
		tagProps.href = disabled ? undefined : href;
		tagProps['aria-disabled'] = disabled ? 'true' : undefined;
	} else {
		tagProps.disabled = disabled;
	}

	return (
		<Tag {...tagProps}>
			{iconLeft ? <span className="bfd-btn__icon">{iconLeft}</span> : null}
			<span>{children}</span>
			{iconRight ? <span className="bfd-btn__icon">{iconRight}</span> : null}
		</Tag>
	);
}
