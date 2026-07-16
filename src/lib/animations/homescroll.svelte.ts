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

	// Immediately hide — prevents flash before GSAP initialises
	// gsap.set(section, { opacity: 0 });

	// Fade in as section enters viewport
	// gsap.fromTo(
	// 	section,
	// 	{ opacity: 0 },
	// 	{
	// 		opacity: 1,
	// 		scrollTrigger: {
	// 			trigger: section,
	// 			start: fadeIn?.start ?? 'top 60%',
	// 			end: fadeIn?.end ?? 'top 40%',
	// 			scrub: 1,
	// 			markers: true
	// 		}
	// 	}
	// );

	// Fade out as section leaves viewport
	// immediateRender: false prevents this tween from snapping to opacity 1
	// (its "from" value) the moment the ScrollTrigger is registered.
	// gsap.fromTo(
	// 	section,
	// 	{ opacity: 1, immediateRender: false },
	// 	{
	// 		opacity: 0,
	// 		scrollTrigger: {
	// 			trigger: section,
	// 			start: fadeOut?.start ?? 'bottom 80%',
	// 			end: fadeOut?.end ?? 'bottom 20%',
	// 			scrub: 1
	// 		}
	// 	}
	// );
}

/** Hero-specific timing wrapper — called after intro animation completes. */
export function heroScroll(section: HTMLElement, options: SectionScrollOptions = {}) {
	sectionScroll(section, options);
}

/** @deprecated Use sectionScroll() directly */
export function aboutScroll(section: HTMLElement) {
	sectionScroll(section);
}
