import React from 'react';

/**
 * Blue Frame Digital — Input / Field
 * The "fill-in-the-blank" form control: a filled surface that lightens on focus
 * and gains a single primary bottom-border — like writing on an architectural form.
 * Handles single-line inputs and (via `multiline`) textareas.
 */

const css = `
.bfd-field { display: flex; flex-direction: column; gap: 0.7rem; }
.bfd-field__label {
  font-family: var(--font-accent); font-weight: 600;
  font-size: var(--font-size-small);
  color: var(--text-secondary);
  letter-spacing: 0.02em;
}
.bfd-field__req { color: var(--accent-coral); margin-left: 0.3ch; }
.bfd-field__control {
  font-family: var(--font-body);
  font-size: var(--font-size-body);
  color: var(--text-primary);
  background: color-mix(in srgb, var(--background-dark) 70%, var(--background-card) 30%);
  border: none;
  border-bottom: 1px solid transparent;
  border-radius: var(--radius-sm) var(--radius-sm) 0 0;
  padding: 1.2rem 1.4rem;
  width: 100%;
  transition: background var(--duration-fast) ease, border-color var(--duration-fast) ease, box-shadow var(--duration-fast) ease;
}
.bfd-field__control::placeholder { color: var(--text-light); }
.bfd-field__control:hover { background: color-mix(in srgb, var(--background-dark) 55%, var(--background-card) 45%); }
.bfd-field__control:focus {
  outline: none;
  background: var(--background-card);
  border-bottom-color: var(--primary-teal, var(--primary-blue-light));
  box-shadow: 0 1px 0 0 var(--primary-teal, var(--primary-blue-light));
}
.bfd-field__control--area { min-height: 12rem; resize: vertical; line-height: var(--line-height-normal); }
.bfd-field__control[aria-invalid="true"] { border-bottom-color: var(--accent-coral); box-shadow: 0 1px 0 0 var(--accent-coral); }
.bfd-field__hint { font-family: var(--font-accent); font-size: 1.2rem; color: var(--text-light); }
.bfd-field__hint--error { color: var(--accent-coral); }
`;

if (typeof document !== 'undefined' && !document.getElementById('bfd-field-css')) {
	const s = document.createElement('style');
	s.id = 'bfd-field-css';
	s.textContent = css;
	document.head.appendChild(s);
}

export function Input({
	label,
	id,
	multiline = false,
	required = false,
	hint = null,
	error = null,
	className = '',
	...rest
}) {
	const autoId = React.useId();
	const fieldId = id || autoId;
	const Control = multiline ? 'textarea' : 'input';
	const controlClass = ['bfd-field__control', multiline ? 'bfd-field__control--area' : '']
		.filter(Boolean)
		.join(' ');
	return (
		<div className={['bfd-field', className].filter(Boolean).join(' ')}>
			{label ? (
				<label className="bfd-field__label" htmlFor={fieldId}>
					{label}
					{required ? <span className="bfd-field__req">*</span> : null}
				</label>
			) : null}
			<Control
				id={fieldId}
				className={controlClass}
				aria-invalid={error ? 'true' : undefined}
				required={required}
				{...rest}
			/>
			{error ? (
				<span className="bfd-field__hint bfd-field__hint--error">{error}</span>
			) : hint ? (
				<span className="bfd-field__hint">{hint}</span>
			) : null}
		</div>
	);
}
