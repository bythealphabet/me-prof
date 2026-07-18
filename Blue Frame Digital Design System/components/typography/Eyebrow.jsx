import React from 'react';

/**
 * Blue Frame Digital — Eyebrow
 * The monospace "// kicker" that sits above headings. Wide tracking, glow accent.
 */

const css = `
.bfd-eyebrow {
  display: inline-block;
  font-family: var(--font-mono);
  font-size: var(--font-size-small);
  letter-spacing: var(--tracking-label);
  color: var(--primary-teal-bright, var(--primary-blue-bright));
  margin: 0 0 var(--spacing-sm);
}
.bfd-eyebrow__prefix { opacity: 0.7; margin-right: 0.5ch; }
`;

if (typeof document !== 'undefined' && !document.getElementById('bfd-eyebrow-css')) {
	const s = document.createElement('style');
	s.id = 'bfd-eyebrow-css';
	s.textContent = css;
	document.head.appendChild(s);
}

export function Eyebrow({ prefix = '//', className = '', children, ...rest }) {
	return (
		<p className={['bfd-eyebrow', className].filter(Boolean).join(' ')} {...rest}>
			{prefix ? <span className="bfd-eyebrow__prefix">{prefix}</span> : null}
			{children}
		</p>
	);
}
