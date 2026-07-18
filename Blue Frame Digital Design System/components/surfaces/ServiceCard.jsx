import React from 'react';

/**
 * Blue Frame Digital — ServiceCard
 * The signature offer card: monospace title, body, and a coral "Learn more →".
 * Subtle 3D mouse-tilt on hover (disabled for touch / reduced-motion), plus the
 * shared hatch + shimmer surface. Optional Lucide icon node in the top corner.
 */

const css = `
.bfd-service {
  position: relative;
  display: flex; flex-direction: column;
  height: 100%; min-height: var(--card-size-h, 38rem);
  text-align: left;
  background: linear-gradient(160deg, color-mix(in srgb, var(--background-card) 88%, white 12%) 0%, var(--background-card) 55%);
  border: none; border-radius: var(--radius-sm);
  box-shadow: var(--shadow-card);
  padding: var(--spacing-xl);
  overflow: hidden; cursor: pointer;
  font-family: inherit; color: inherit;
  transform: perspective(1000px);
  transform-style: preserve-3d;
  transition: box-shadow 800ms var(--easing-ease-out), transform 250ms var(--easing-ease-out);
}
.bfd-service::before {
  content: ''; position: absolute; inset: 0; z-index: 1; pointer-events: none;
  background: repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(30,58,138,0.03) 10px, rgba(30,58,138,0.03) 20px);
  transition: opacity var(--duration-fast) ease;
}
.bfd-service::after {
  content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; z-index: 1; pointer-events: none;
  background: linear-gradient(90deg, transparent, rgba(96,165,250,0.1), transparent);
  transform: translateX(-100%); transition: transform 0.8s var(--easing-ease-out);
}
.bfd-service:hover { box-shadow: var(--shadow-card-hover); }
.bfd-service:hover::before { opacity: 0; }
.bfd-service:hover::after { transform: translateX(100%); }
.bfd-service:focus-visible { outline: 3px solid var(--primary-teal, var(--primary-blue-light)); outline-offset: 3px; }

.bfd-service > * { position: relative; z-index: 2; }
.bfd-service__icon {
  display: inline-flex; align-items: center; justify-content: center;
  width: 4.4rem; height: 4.4rem; margin-bottom: var(--spacing-md);
  border-radius: var(--radius-md);
  background: color-mix(in srgb, var(--primary-blue) 28%, transparent);
  color: var(--primary-teal-bright, var(--primary-blue-bright));
}
.bfd-service__title {
  font-family: var(--font-heading); font-weight: 700;
  font-size: clamp(2.4rem, 2.5vw, 3rem);
  color: var(--text-secondary);
  margin: 0 0 var(--spacing-md);
  transform: translateZ(10px);
}
.bfd-service__desc {
  font-family: var(--font-body);
  color: var(--text-tertiary);
  line-height: var(--line-height-relaxed);
  font-size: var(--font-size-body);
  margin: 0; flex: 1;
  transform: translateZ(5px);
}
.bfd-service__more {
  margin-top: var(--spacing-lg);
  font-family: var(--font-mono); font-size: 1.4rem; font-weight: 600;
  color: var(--accent-coral, var(--primary-blue-bright));
  transition: color var(--duration-fast) ease;
}
.bfd-service:hover .bfd-service__more { color: var(--primary-teal-bright, var(--primary-blue-light)); }
@media (prefers-reduced-motion: reduce) {
  .bfd-service { transform: none !important; }
}
`;

if (typeof document !== 'undefined' && !document.getElementById('bfd-service-css')) {
	const s = document.createElement('style');
	s.id = 'bfd-service-css';
	s.textContent = css;
	document.head.appendChild(s);
}

export function ServiceCard({
	title,
	description,
	icon = null,
	href,
	cta = 'Learn more →',
	tilt = true,
	className = '',
	onClick,
	...rest
}) {
	const ref = React.useRef(null);
	const [transform, setTransform] = React.useState('perspective(1000px)');

	const handleMove = (e) => {
		if (!tilt || !ref.current) return;
		const r = ref.current.getBoundingClientRect();
		const rx = ((e.clientY - r.top - r.height / 2) / (r.height / 2)) * 3;
		const ry = ((r.width / 2 - (e.clientX - r.left)) / (r.width / 2)) * 3;
		setTransform(`perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`);
	};
	const reset = () => setTransform('perspective(1000px)');

	const Tag = href ? 'a' : 'button';
	return (
		<Tag
			ref={ref}
			href={href}
			type={href ? undefined : 'button'}
			className={['bfd-service', className].filter(Boolean).join(' ')}
			style={{ transform }}
			onMouseMove={handleMove}
			onMouseLeave={reset}
			onClick={onClick}
			{...rest}
		>
			{icon ? <span className="bfd-service__icon">{icon}</span> : null}
			<h3 className="bfd-service__title">{title}</h3>
			<p className="bfd-service__desc">{description}</p>
			<span className="bfd-service__more">{cta}</span>
		</Tag>
	);
}
