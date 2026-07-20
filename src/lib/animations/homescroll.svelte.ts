import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

interface SectionScrollOptions {
	start?: string;
	end?: string;
}

/**
 * Reusable scroll-fade for any section: fades in as it enters the viewport,
 * fades out as it leaves.
 *
 * Key: the fade-out tween uses immediateRender: false so it doesn't snap
 * the element to opacity 1 when the ScrollTrigger is first registered.
 * gsap.set() also ensures the element starts invisible before any trigger fires.
 */
export function sectionScroll(section: HTMLElement, options: SectionScrollOptions = {}) {
	const { start, end } = options;

	gsap.fromTo(
		section,
		{ opacity: 0 },
		{
			opacity: 1,
			duration: 0.3,
			ease: 'power3.inOut',
			scrollTrigger: {
				trigger: section,
				start: start ?? 'top 60%',
				end: end ?? 'bottom 40%',
				toggleActions: 'play reverse play reverse'
			}
		}
	);
}

/** Hero-specific timing wrapper — called after intro animation completes. */
export function heroScroll(section: HTMLElement, options: SectionScrollOptions = {}) {
	sectionScroll(section, options);
}

/// Experience section animation

export function experienceScroll(
	container: HTMLElement | undefined,
	items: (HTMLElement | undefined)[]
) {
	if (!container || !items?.length) return;

	// 1. Animate the main vertical progress line
	const progressLine = container.querySelector('.bfd-timeline__line-progress');
	if (progressLine) {
		gsap.fromTo(
			progressLine,
			{ scaleY: 0 },
			{
				scaleY: 1,
				ease: 'none', // Critical for smooth matching with scroll speed
				scrollTrigger: {
					trigger: container,
					start: 'top 60%', // Adjust where the growth starts
					end: 'bottom 60%', // Adjust where the growth ends
					scrub: true // Syncs the animation directly to the scrollbar movement
				}
			}
		);
	}

	// 2. Animate each dot individually as it crosses the threshold
	items.forEach((item) => {
		if (!item) return;

		const dot = item.querySelector('.bfd-timeline__dot');
		if (!dot) return;

		gsap.fromTo(
			dot,
			{ scale: 1 },
			{
				scale: 1.4, // Scale up slightly
				duration: 0.4,
				ease: 'back.out(2)',
				yoyo: true, // Optional: shrinks back if you scroll past/back
				scrollTrigger: {
					trigger: item,
					start: 'top 60%', // Fires when the item top hits 60% of the viewport
					end: 'top 40%',
					toggleActions: 'play reverse play reverse' // Scales down when scrolling back up
				}
			}
		);
	});
}

/// Projects Preview section animation

interface CardFromVars {
	opacity: number;
	/** GSAP rotation in degrees */
	rotation?: number;
	x?: string;
	y?: string;
}

interface CardAnimationOptions extends CardFromVars {
	start?: string;
	end?: string;
	markers?: boolean;
}

// Left card rotates up from bottom-left, right card from bottom-right,
// center card drops in from above.
const cardAnimationOptions: CardAnimationOptions[] = [
	{ opacity: 0, rotation: -45, x: '-50%', y: '50%', start: 'top 75%', end: 'bottom 75%' },
	{ opacity: 0, y: '-30%', start: 'top 40%', end: 'bottom 10%' },
	{
		opacity: 0,
		rotation: 45,
		x: '50%',
		y: '50%',
		start: 'top 75%',
		end: 'bottom 75%'
	}
];
export function projectCardsScroll(cardRefs: (HTMLElement | undefined)[]) {
	if (!cardRefs?.length) return;

	cardRefs.forEach((ref, index) => {
		if (!ref) return;

		const { start, end, ...fromVars } = cardAnimationOptions[index] ?? { opacity: 0 };

		gsap.fromTo(ref, fromVars, {
			opacity: 1,
			rotation: 0,
			x: '0%',
			y: '0%',
			duration: 0.7,
			ease: 'power3.out',
			scrollTrigger: {
				trigger: ref,
				start: start ?? 'top 75%',
				end: end ?? 'bottom 40%'
				// toggleActions: 'play reset play reverse'
			}
		});
	});
}
