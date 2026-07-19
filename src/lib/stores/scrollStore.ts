import { writable } from 'svelte/store';

// Store for scroll position
export const scrollY = writable(0);

// Store for scroll direction (true = scrolling down, false = scrolling up)
export const scrollingDown = writable(true);

// Store for header visibility
export const showHeader = writable(true);

let lastScrollY = 0;

// Update scroll stores on scroll
if (typeof window !== 'undefined') {
	window.addEventListener('scroll', () => {
		const currentScrollY = window.scrollY;
		scrollY.set(currentScrollY);

		// Determine scroll direction
		const isScrollingDown = currentScrollY > lastScrollY;
		scrollingDown.set(isScrollingDown);

		// Update header visibility
		showHeader.set(!isScrollingDown || currentScrollY < 50);

		lastScrollY = currentScrollY;
	});
}
