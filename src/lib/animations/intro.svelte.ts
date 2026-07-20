import gsap from 'gsap';

export type IntroRefs = {
	logo: HTMLElement[];
	navLinks: HTMLElement[] | HTMLCollection;
	palette: HTMLElement[];
	themeSwitch: HTMLElement;
};

let introComplete = $state(false);
const introCompleteCallbacks: (() => void)[] = [];

function notifyIntroComplete() {
	introComplete = true;
	introCompleteCallbacks.forEach((callback) => callback());
	introCompleteCallbacks.length = 0;
}

/**
 * Runs `callback` once the nav intro timeline finishes. If it has already
 * finished by the time this is called, runs immediately.
 */
export function onIntroComplete(callback: () => void) {
	if (introComplete) {
		callback();
	} else {
		introCompleteCallbacks.push(callback);
	}
}

/**
 * Single source of truth for intro ordering/timing. Called once, after every
 * element it needs has mounted, so ordering never depends on component nesting.
 */
export function buildIntroTimeline(refs: IntroRefs): GSAPTimeline {
	const tl = gsap.timeline({ onComplete: notifyIntroComplete });

	addLogo(tl, refs.logo);
	addNavigation(tl, refs.navLinks, '+=0.1');
	addPalette(tl, refs.palette, '+=0.1');
	addThemeSwitch(tl, refs.themeSwitch, '+=0.1');

	return tl;
}

//Elements Animations functions

function addLogo(tl: GSAPTimeline, elements: HTMLElement[], position?: gsap.Position) {
	const [first, second, third] = elements;

	tl.fromTo(first, { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8 }, position)
		.fromTo(second, { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8 }, '<')
		.fromTo(
			third,
			{ transformPerspective: 600, scale: 1.3, opacity: 0 },
			{ scale: 1, opacity: 1, duration: 0.1, ease: 'power2.inOut' }
		);
}

function addNavigation(
	tl: GSAPTimeline,
	elements: HTMLElement[] | HTMLCollection,
	position?: gsap.Position
) {
	tl.fromTo(
		elements,
		{ y: -10, opacity: 0 },
		{ y: 0, opacity: 1, duration: 0.1, ease: 'power3.inOut', stagger: 0.05 },
		position
	);
}

function addPalette(tl: GSAPTimeline, elements: HTMLElement[], position?: gsap.Position) {
	tl.fromTo(
		elements,
		{ y: -20, opacity: 0 },
		{ y: 0, opacity: 1, duration: 0.2, ease: 'power3.inOut', stagger: 0.2 },
		position
	);
}

function addThemeSwitch(tl: GSAPTimeline, element: HTMLElement, position?: gsap.Position) {
	tl.fromTo(
		element,
		{ x: 20, opacity: 0, rotate: '45deg' },
		{ x: 0, opacity: 1, duration: 0.5, ease: 'power1.inOut', rotate: '0deg' },
		position
	);
}

const MOBILE_QUERY = '(max-width: 767px)';
const DESKTOP_QUERY = '(min-width: 768px)';

/**
 * On mobile the user is usually already scrolling by the time this plays, so
 * the desktop timing (0.5s scale-in + 0.2s gap + 0.2s content fade, ~0.9s
 * total) reads as sluggish. matchMedia keeps desktop untouched and gives
 * mobile a snappier version of the same reveal.
 */
export function heroIntro(element: Element[]) {
	const [first, ...rest] = element;

	const buildTimeline = (firstDuration: number, gap: number, restDuration: number) =>
		gsap
			.timeline({ onComplete: notifyIntroComplete })
			.fromTo(
				first,
				{ opacity: 0, scale: 1.2 },
				{ opacity: 1, scale: 1, duration: firstDuration, ease: 'expo.inOut' }
			)
			.fromTo(
				rest,
				{ opacity: 0 },
				{
					opacity: 1,
					duration: restDuration,
					ease: 'bounce.inOut'
					// stagger: (a) => {
					// 	return a * 0.08;
					// }
				},
				`+=${gap}`
			);

	gsap.matchMedia({
		[DESKTOP_QUERY]: () => buildTimeline(0.5, 0.2, 0.2),
		[MOBILE_QUERY]: () => buildTimeline(0.25, 0.05, 0.12)
	});
}
