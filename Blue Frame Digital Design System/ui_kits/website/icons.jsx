/* Blue Frame Digital — UI kit: inline Lucide icons (ISC licensed).
   A React-safe icon set — no DOM replacement, renders as real SVG children. */

const LUCIDE = {
	'arrow-right': ['M5 12h14', 'm12 5 7 7-7 7'],
	globe: ['M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20', 'M2 12h20', { circle: { cx: 12, cy: 12, r: 10 } }],
	sparkles: [
		'M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .962 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.962 0z',
		'M20 3v4', 'M22 5h-4', 'M4 17v2', 'M5 18H3'
	],
	filter: [{ polygon: { points: '22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3' } }],
	plug: ['M12 22v-5', 'M9 8V2', 'M15 8V2', 'M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z'],
	search: ['m21 21-4.3-4.3', { circle: { cx: 11, cy: 11, r: 8 } }],
	'bar-chart-2': [
		{ line: { x1: 18, x2: 18, y1: 20, y2: 10 } },
		{ line: { x1: 12, x2: 12, y1: 20, y2: 4 } },
		{ line: { x1: 6, x2: 6, y1: 20, y2: 14 } }
	],
	check: ['M20 6 9 17l-5-5'],
	'map-pin': ['M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0', { circle: { cx: 12, cy: 10, r: 3 } }],
	mail: ['m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7', { rect: { width: 20, height: 16, x: 2, y: 4, rx: 2 } }],
	'message-circle': ['M7.9 20A9 9 0 1 0 4 16.1L2 22Z'],
	send: ['M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z', 'm21.854 2.147-10.94 10.939'],
	moon: ['M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z'],
	sun: [
		'M12 2v2', 'M12 20v2', 'm4.93 4.93 1.41 1.41', 'm17.66 17.66 1.41 1.41',
		'M2 12h2', 'M20 12h2', 'm6.34 17.66-1.41 1.41', 'm19.07 4.93-1.41 1.41',
		{ circle: { cx: 12, cy: 12, r: 4 } }
	],
	menu: ['M4 12h16', 'M4 6h16', 'M4 18h16']
};

function Icon({ name, size = 24, className = '', ...rest }) {
	const parts = LUCIDE[name] || [];
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
			aria-hidden="true"
			{...rest}
		>
			{parts.map((p, i) => {
				if (typeof p === 'string') return <path key={i} d={p} />;
				const tag = Object.keys(p)[0];
				return React.createElement(tag, { key: i, ...p[tag] });
			})}
		</svg>
	);
}

Object.assign(window, { Icon });
