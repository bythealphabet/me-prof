import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

// iOS Safari fires resize events when the address bar collapses/expands on scroll.
// Without this, ScrollTrigger treats that as a real resize, recalculates trigger
// positions mid-scroll, and can flip a fade-in tween's toggleActions into "reverse",
// snapping sections back to opacity: 0 and leaving them stuck invisible.
ScrollTrigger.config({ ignoreMobileResize: true });

interface SectionScrollOptions {
	start?: string;
	end?: string;
	duration?: number;
	/** Overrides for viewports narrower than 768px — falls back to sensible mobile defaults. */
	mobile?: {
		start?: string;
		end?: string;
		duration?: number;
	};
}

const MOBILE_QUERY = '(max-width: 767px)';
const DESKTOP_QUERY = '(min-width: 768px)';

/**
 * Reusable scroll-fade for any section: fades in as it enters the viewport,
 * fades out as it leaves.
 *
 * Uses ScrollTrigger.matchMedia so mobile can trigger earlier and finish
 * faster than desktop — without `scrub`, a fixed-duration tween triggered at
 * the same viewport percentage as desktop finishes well after a fast mobile
 * flick-scroll has already carried the section's top edge off-screen.
 * matchMedia also reverts/rebuilds the trigger if the viewport crosses the
 * breakpoint (e.g. device rotation), so there's no stale trigger left behind.
 */
export function sectionScroll(section: HTMLElement, options: SectionScrollOptions = {}) {
	const { start = 'top 60%', end = 'bottom 40%', duration = 0.3 } = options;
	const mobile = {
		start: options.mobile?.start ?? 'top 90%',
		end: options.mobile?.end ?? 'bottom 20%',
		duration: options.mobile?.duration ?? 0.2
	};

	const buildTween = (triggerStart: string, triggerEnd: string, tweenDuration: number) =>
		gsap.fromTo(
			section,
			{ opacity: 0 },
			{
				opacity: 1,
				duration: tweenDuration,
				ease: 'power3.inOut',
				scrollTrigger: {
					trigger: section,
					start: triggerStart,
					end: triggerEnd,
					toggleActions: 'play reverse play reverse'
				}
			}
		);

	ScrollTrigger.matchMedia({
		[DESKTOP_QUERY]: () => buildTween(start, end, duration),
		[MOBILE_QUERY]: () => buildTween(mobile.start, mobile.end, mobile.duration)
	});
}

/** Hero-specific timing wrapper — called after intro animation completes. */
export function heroScroll(section: HTMLElement, options: SectionScrollOptions = {}) {
	sectionScroll(section, options);
}

/// Experience section animation

/**
 * Same lateness problem as sectionScroll/projectCardsScroll: on mobile, a fast
 * flick-scroll blows past the desktop trigger points before the tween (or, for
 * the progress line, the scrub range) has caught up. matchMedia lets mobile
 * trigger earlier for both pieces — kept roughly in sync with each other so a
 * dot doesn't pop before the growing line has even reached it.
 */
export function experienceScroll(
	container: HTMLElement | undefined,
	items: (HTMLElement | undefined)[]
) {
	if (!container || !items?.length) return;

	// 1. Animate the main vertical progress line
	const progressLine = container.querySelector('.bfd-timeline__line-progress');
	if (progressLine) {
		const buildLineScrub = (start: string, end: string) =>
			gsap.fromTo(
				progressLine,
				{ scaleY: 0 },
				{
					scaleY: 1,
					ease: 'none', // Critical for smooth matching with scroll speed
					scrollTrigger: {
						trigger: container,
						start, // Adjust where the growth starts
						end, // Adjust where the growth ends
						scrub: true // Syncs the animation directly to the scrollbar movement
					}
				}
			);

		ScrollTrigger.matchMedia({
			[DESKTOP_QUERY]: () => buildLineScrub('top 60%', 'bottom 60%'),
			[MOBILE_QUERY]: () => buildLineScrub('top 85%', 'bottom 70%')
		});
	}

	// 2. Animate each dot individually as it crosses the threshold
	items.forEach((item) => {
		if (!item) return;

		const dot = item.querySelector('.bfd-timeline__dot');
		if (!dot) return;

		const buildDotTween = (start: string, end: string, duration: number) =>
			gsap.fromTo(
				dot,
				{ scale: 1 },
				{
					scale: 1.4, // Scale up slightly
					duration,
					ease: 'back.out(2)',
					yoyo: true, // Optional: shrinks back if you scroll past/back
					scrollTrigger: {
						trigger: item,
						start, // Fires when the item top hits the given viewport percentage
						end,
						toggleActions: 'play reverse play reverse' // Scales down when scrolling back up
					}
				}
			);

		ScrollTrigger.matchMedia({
			[DESKTOP_QUERY]: () => buildDotTween('top 60%', 'top 40%', 0.4),
			[MOBILE_QUERY]: () => buildDotTween('top 90%', 'top 70%', 0.25)
		});
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
	/** Overrides for viewports narrower than 768px — falls back to sensible mobile defaults. */
	mobile?: {
		start?: string;
		end?: string;
	};
}

// Left card rotates up from bottom-left, right card from bottom-right,
// center card drops in from above.
const cardAnimationOptions: CardAnimationOptions[] = [
	{
		opacity: 0,
		rotation: -45,
		x: '-50%',
		y: '50%',
		start: 'top 75%',
		end: 'bottom 75%',
		mobile: { start: 'top 95%', end: 'bottom 55%' }
	},
	{
		opacity: 0,
		y: '-30%',
		start: 'top 40%',
		end: 'bottom 10%',
		mobile: { start: 'top 90%', end: 'bottom 20%' }
	},
	{
		opacity: 0,
		rotation: 45,
		x: '50%',
		y: '50%',
		start: 'top 75%',
		end: 'bottom 75%',
		mobile: { start: 'top 95%', end: 'bottom 55%' }
	}
];

/**
 * Same lateness problem as sectionScroll: on desktop each card triggers at a
 * generous viewport percentage and has time to finish its 0.7s tween before
 * it's scrolled past. On mobile the same trigger point is reached and blown
 * past much faster, so the card is still mid-tween (or hasn't started) once
 * it's already off-screen. matchMedia lets mobile trigger earlier and settle
 * in less time.
 */
export function projectCardsScroll(cardRefs: (HTMLElement | undefined)[]) {
	if (!cardRefs?.length) return;

	cardRefs.forEach((ref, index) => {
		if (!ref) return;

		const { start, end, mobile, ...fromVars } = cardAnimationOptions[index] ?? { opacity: 0 };

		const buildTween = (triggerStart: string, triggerEnd: string, duration: number) =>
			gsap.fromTo(ref, fromVars, {
				opacity: 1,
				rotation: 0,
				x: '0%',
				y: '0%',
				duration,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: ref,
					start: triggerStart,
					end: triggerEnd
					// toggleActions: 'play reset play reverse'
				}
			});

		ScrollTrigger.matchMedia({
			[DESKTOP_QUERY]: () => buildTween(start ?? 'top 75%', end ?? 'bottom 40%', 0.7),
			[MOBILE_QUERY]: () => buildTween(mobile?.start ?? 'top 90%', mobile?.end ?? 'bottom 20%', 0.4)
		});
	});
}
