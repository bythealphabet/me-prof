import gsap from 'gsap';

export const introTimeline = gsap.timeline({});

export const menuTimeline = gsap.timeline({
	paused: true,
	defaults: {
		ease: 'power3.out',
		duration: 0.8
	}
});
