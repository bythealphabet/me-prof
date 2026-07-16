<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { getPalette, getTheme } from '$lib/state/theme.svelte';

	interface Props {
		bioParagraphs: string[];
	}

	interface ThemeColors {
		text: string;
		accent: string;
	}

	let { bioParagraphs }: Props = $props();

	let canvas = $state<HTMLCanvasElement | null>(null);
	let container = $state<HTMLElement | null>(null);
	let isDragging = $state(false);
	let isHovered = $state(false);

	let containerWidth = $state(0);
	let containerHeight = $state(0);
	let imgElement = $state<HTMLImageElement | null>(null);
	let fontSizeValue = $state(24);
	let lineHeightValue = $state(28);

	// Image coordinates and radius
	let imgCircle = $state({
		x: 169,
		y: 252,
		r: 140,
		dragOffset: { x: 0, y: 0 }
	});

	let gameCircle = $state({
		x: 1079,
		y: 379,
		r: 140,
		dragOffset: { x: 0, y: 0 }
	});

	// GSAP will animate these shadow/glow parameters
	let shadowProps = $state({
		blur: 4,
		opacity: 0.15
	});

	let getThemeColors: ThemeColors = $derived(updateThemeColors());

	function updateThemeColors() {
		getPalette();
		getTheme();
		if (container) {
			const style = window.getComputedStyle(container);

			return {
				text: style.getPropertyValue('--text-secondary').trim() || '#a0aec0',
				accent: style.getPropertyValue('--accent-terracotta').trim() || '#d35400'
			};
		}

		return { text: '#a0aec0', accent: '#d35400' };
	}

	onMount(() => {
		const img = new Image();
		img.src = '/profile-img/me-img.png';
		img.onload = () => {
			imgElement = img;
			render();
		};

		if (container) {
			lineHeightValue = fontSizeValue * 1.65;
		}
	});

	// Smooth GSAP tweens for the neon aura
	$effect(() => {
		let targetBlur = 4;
		let targetOpacity = 0.15;

		if (isDragging) {
			// Intense pulsing glow during drag
			targetBlur = 45;
			targetOpacity = 0.95;
		} else if (isHovered) {
			// Striking bright aura on hover
			targetBlur = 30;
			targetOpacity = 0.8;
		}

		gsap.to(shadowProps, {
			blur: targetBlur,
			opacity: targetOpacity,
			duration: 0.4,
			ease: 'power2.out',
			onUpdate: render // Force canvas frame redraws during the transition
		});
	});

	function render() {
		if (!canvas) return;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		const dpr = window.devicePixelRatio || 1;
		ctx.save();
		ctx.scale(dpr, dpr);

		// 1. Draw Wrapped Text
		ctx.fillStyle = getThemeColors.text;
		ctx.font = `${fontSizeValue}px sans-serif`;
		ctx.textBaseline = 'top';

		let cursorX = 10;
		let cursorY = 10;
		const padding = 17;
		const wrapBoundary = containerWidth - 10;
		const collisionRadius = imgCircle.r + padding;
		const gameCollisionRadius = gameCircle.r + padding;

		bioParagraphs.forEach((paragraph, pIdx) => {
			const words = paragraph.split(' ');

			for (let i = 0; i < words.length; i++) {
				let word = words[i] + ' ';
				let wordWidth = ctx.measureText(word).width;

				if (cursorX + wordWidth > wrapBoundary) {
					cursorX = 10;
					cursorY += lineHeightValue;
				}

				const dy = cursorY + lineHeightValue / 2 - imgCircle.y;

				if (Math.abs(dy) < collisionRadius) {
					const dx = Math.sqrt(collisionRadius * collisionRadius - dy * dy);
					const circleLeftBoundary = imgCircle.x - dx;
					const circleRightBoundary = imgCircle.x + dx;

					if (cursorX + wordWidth > circleLeftBoundary && cursorX < circleRightBoundary) {
						cursorX = circleRightBoundary;

						if (cursorX + wordWidth > wrapBoundary) {
							cursorX = 10;
							cursorY += lineHeightValue;
						}
					}
				}

				// if (Math.abs(dy) < gameCollisionRadius) {
				// 	const dx = Math.sqrt(gameCollisionRadius * gameCollisionRadius - dy * dy);
				// 	const circleLeftBoundary = gameCircle.x - dx;
				// 	const circleRightBoundary = gameCircle.x + dx;

				// 	if (cursorX + wordWidth > circleLeftBoundary && cursorX < circleRightBoundary) {
				// 		cursorX = circleRightBoundary;

				// 		if (cursorX + wordWidth > wrapBoundary) {
				// 			cursorX = 10;
				// 			cursorY += lineHeightValue;
				// 		}
				// 	}
				// }

				ctx.fillText(word, cursorX, cursorY);
				cursorX += wordWidth;
			}

			if (pIdx < bioParagraphs.length - 1) {
				cursorX = 10;
				cursorY += lineHeightValue * 1.6;
			}
		});

		// 2. Draw Draggable Profile Image with Neon Aura Glow
		if (imgElement) {
			ctx.save();

			// Use a high-vibrancy neon orange/terracotta for the glow
			// Adjust the hex code below to match whatever neon shade you prefer!
			ctx.shadowColor = `rgba(255, 102, 0, ${shadowProps.opacity})`;
			ctx.shadowBlur = shadowProps.blur;
			ctx.shadowOffsetX = 0; // Offsets at 0 create an even outer halo glow
			ctx.shadowOffsetY = 0;

			// Base circle backing to emit shadow
			ctx.fillStyle = '#000';
			ctx.beginPath();
			ctx.arc(imgCircle.x, imgCircle.y, imgCircle.r, 0, Math.PI * 2);
			ctx.fill();

			// Clip image inside circle
			ctx.save();
			ctx.beginPath();
			ctx.arc(imgCircle.x, imgCircle.y, imgCircle.r, 0, Math.PI * 2);
			ctx.clip();

			ctx.drawImage(
				imgElement,
				imgCircle.x - imgCircle.r,
				imgCircle.y - imgCircle.r,
				imgCircle.r * 2,
				imgCircle.r * 2
			);
			ctx.restore();

			// Solid Terracotta stroke border on top
			ctx.strokeStyle = getThemeColors.accent;
			ctx.lineWidth = 3;
			ctx.beginPath();
			ctx.arc(imgCircle.x, imgCircle.y, imgCircle.r - 1.5, 0, Math.PI * 2);
			ctx.stroke();

			ctx.restore();

			// Game circle
			ctx.fillStyle = '#000';
			ctx.beginPath();
			ctx.arc(gameCircle.x, gameCircle.y, gameCircle.r, 0, Math.PI * 2);
			ctx.fill();

			ctx.strokeStyle = getThemeColors.accent;
			ctx.lineWidth = 3;
			ctx.stroke();

			ctx.restore();
		}

		ctx.restore();
	}

	$inspect(imgCircle);
	// Svelte 5 Dynamic Dimension Effect
	$effect(() => {
		if (canvas && containerWidth > 0 && containerHeight > 0) {
			const dpr = window.devicePixelRatio || 1;
			canvas.width = containerWidth * dpr;
			canvas.height = containerHeight * dpr;
			render();
		}
	});

	function handleMouseDown(e: MouseEvent) {
		if (!canvas) return;
		const rect = canvas.getBoundingClientRect();
		const mouseX = e.clientX - rect.left;
		const mouseY = e.clientY - rect.top;

		const dx = mouseX - imgCircle.x;
		const dy = mouseY - imgCircle.y;
		const isInsideCircle = dx * dx + dy * dy <= imgCircle.r * imgCircle.r;

		if (isInsideCircle) {
			isDragging = true;
			imgCircle.dragOffset = {
				x: mouseX - imgCircle.x,
				y: mouseY - imgCircle.y
			};
		}
	}

	function handleMouseMove(e: MouseEvent) {
		if (!canvas) return;

		const rect = canvas.getBoundingClientRect();
		const mouseX = e.clientX - rect.left;
		const mouseY = e.clientY - rect.top;

		const dx = mouseX - imgCircle.x;
		const dy = mouseY - imgCircle.y;
		const isInsideCircle = dx * dx + dy * dy <= imgCircle.r * imgCircle.r;

		if (isInsideCircle !== isHovered) {
			isHovered = isInsideCircle;
		}

		if (isDragging) {
			imgCircle.x = Math.max(
				imgCircle.r,
				Math.min(containerWidth - imgCircle.r, mouseX - imgCircle.dragOffset.x)
			);
			imgCircle.y = Math.max(
				imgCircle.r,
				Math.min(containerHeight - imgCircle.r, mouseY - imgCircle.dragOffset.y)
			);
		}

		render();
	}

	function handleMouseUp() {
		isDragging = false;
	}
</script>

<svelte:document onmouseup={handleMouseUp} />

<div
	bind:this={container}
	class="canvas-container-wrap"
	bind:clientWidth={containerWidth}
	bind:clientHeight={containerHeight}
>
	<canvas
		bind:this={canvas}
		onmousedown={handleMouseDown}
		onmousemove={handleMouseMove}
		class:grabbing={isDragging}
		class:grabbable={isHovered && !isDragging}
	></canvas>
</div>

<style>
	.canvas-container-wrap {
		width: 100%;
		height: 100%;
		position: relative;
		font-size: clamp(1.6rem, 1.6vw, 1.9rem);
	}

	canvas {
		display: block;
		width: 100%;
		height: 100%;
		cursor: default;
	}

	canvas.grabbable {
		cursor: grab;
	}

	canvas.grabbing {
		cursor: grabbing;
	}
</style>
