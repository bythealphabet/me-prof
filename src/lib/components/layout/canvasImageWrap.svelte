<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import confetti from 'canvas-confetti';
	import { getPalette, getTheme } from '$lib/state/theme.svelte';

	interface Props {
		bioParagraphs: string[];
		onTargetReached?: (matched: boolean) => void;
	}

	interface ThemeColors {
		text: string;
		accent: string;
	}
	let { bioParagraphs, onTargetReached }: Props = $props();

	let canvas = $state<HTMLCanvasElement | null>(null);
	let container = $state<HTMLElement | null>(null);
	let isDragging = $state(false);
	let isHovered = $state(false);
	let isSnapped = $state(false);

	let containerWidth = $state(0);
	let containerHeight = $state(0);
	let imgElement = $state<HTMLImageElement | null>(null);

	const canvasPadding = 40;
	// Any gap smaller than 130px will be forced completely empty
	const minTextGap = 130;

	// Image coordinates and radius
	let imgCircle = $state({
		x: 180,
		y: 250,
		r: 140,
		dragOffset: { x: 0, y: 0 }
	});

	// Stationary Target Circle
	let gameCircle = $state({
		x: 1080,
		y: 340,
		r: 140
	});

	let shadowProps = $state({
		blur: 4,
		opacity: 0.15
	});

	let fontSizeValue = $state(24);
	let lineHeightValue = $state(28);

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

	let getThemeColors: ThemeColors = $derived(updateThemeColors());

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

	$effect(() => {
		let targetBlur = 4;
		let targetOpacity = 0.15;

		if (isDragging) {
			targetBlur = 45;
			targetOpacity = 0.95;
		} else if (isHovered) {
			targetBlur = 30;
			targetOpacity = 0.8;
		}

		gsap.to(shadowProps, {
			blur: targetBlur,
			opacity: targetOpacity,
			duration: 0.4,
			ease: 'power2.out',
			onUpdate: render
		});
	});

	function render() {
		if (!canvas) return;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;
		// Container is hidden (e.g. below the desktop breakpoint) — wrapBoundary would go
		// negative and the word-wrap loop below would spin on the same word forever.
		if (containerWidth <= 0 || containerHeight <= 0) return;

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		const dpr = window.devicePixelRatio || 1;
		ctx.save();
		ctx.scale(dpr, dpr);

		// 1. Draw Wrapped Text
		ctx.fillStyle = getThemeColors.text;
		ctx.font = `${fontSizeValue}px sans-serif`;
		ctx.textBaseline = 'top';

		let cursorX = canvasPadding;
		let cursorY = canvasPadding;
		const padding = 22; // Slightly larger padding cushion to prevent clipping
		const wrapBoundary = containerWidth - canvasPadding;

		const imgCollisionRadius = imgCircle.r + padding;
		const gameCollisionRadius = gameCircle.r + padding;

		bioParagraphs.forEach((paragraph, pIdx) => {
			const words = paragraph.split(' ');

			for (let i = 0; i < words.length; i++) {
				let word = words[i] + ' ';
				let wordWidth = ctx.measureText(word).width;

				// Collision evaluation per word based on line midpoint
				const textLineMidpointY = cursorY + lineHeightValue / 2;

				// 1. Calculate active horizontal collision boundaries for the current line
				let activeLeftBound = canvasPadding;
				let activeRightBound = wrapBoundary;

				// Check draggable circle collision bounds
				const dyImg = textLineMidpointY - imgCircle.y;
				if (Math.abs(dyImg) < imgCollisionRadius) {
					const dx = Math.sqrt(imgCollisionRadius * imgCollisionRadius - dyImg * dyImg);
					const circleLeft = imgCircle.x - dx;
					const circleRight = imgCircle.x + dx;

					// If the left gap is too narrow, block text on the left entirely
					if (circleLeft - canvasPadding < minTextGap) {
						activeLeftBound = Math.max(activeLeftBound, circleRight);
					} else if (wrapBoundary - circleRight < minTextGap) {
						// If the right gap is too narrow, block text on the right entirely
						activeRightBound = Math.min(activeRightBound, circleLeft);
					} else {
						// If both sides have space, treat the circle as a middle block
						if (cursorX < circleRight && cursorX + wordWidth > circleLeft) {
							cursorX = circleRight;
						}
					}
				}

				// Check stationary target circle collision bounds (only if unsnapped)
				if (!isSnapped) {
					const dyGame = textLineMidpointY - gameCircle.y;
					if (Math.abs(dyGame) < gameCollisionRadius) {
						const dx = Math.sqrt(gameCollisionRadius * gameCollisionRadius - dyGame * dyGame);
						const circleLeft = gameCircle.x - dx;
						const circleRight = gameCircle.x + dx;

						if (circleLeft - canvasPadding < minTextGap) {
							activeLeftBound = Math.max(activeLeftBound, circleRight);
						} else if (wrapBoundary - circleRight < minTextGap) {
							activeRightBound = Math.min(activeRightBound, circleLeft);
						} else {
							if (cursorX < circleRight && cursorX + wordWidth > circleLeft) {
								cursorX = circleRight;
							}
						}
					}
				}

				// Adjust the cursor position if it is currently forced inside a blocked left boundary
				if (cursorX < activeLeftBound) {
					cursorX = activeLeftBound;
				}

				// Wrap checks against our dynamic active boundaries
				if (cursorX + wordWidth > activeRightBound) {
					cursorX = activeLeftBound;
					cursorY += lineHeightValue;

					// Decrement index to re-evaluate the same word on the new line height context
					i--;
					continue;
				}

				// Render the word safely
				ctx.fillText(word, cursorX, cursorY);
				cursorX += wordWidth;
			}

			if (pIdx < bioParagraphs.length - 1) {
				cursorX = canvasPadding;
				cursorY += lineHeightValue * 1.6;
			}
		});

		// 2. Draw Target Circle
		if (!isSnapped) {
			ctx.save();
			ctx.strokeStyle = getThemeColors.accent;
			ctx.lineWidth = 3;
			ctx.setLineDash([8, 6]);
			ctx.beginPath();
			ctx.arc(gameCircle.x, gameCircle.y, gameCircle.r - 1.5, 0, Math.PI * 2);
			ctx.stroke();

			ctx.fillStyle = getThemeColors.accent;
			ctx.font = 'bold 16px sans-serif';
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			ctx.fillText('DROP PROFILE HERE', gameCircle.x, gameCircle.y - 12);
			ctx.fillText('TO SEE HOBBIES', gameCircle.x, gameCircle.y + 12);
			ctx.restore();
		}

		// 3. Draw Draggable Profile Image
		if (imgElement) {
			ctx.save();

			ctx.shadowColor = `rgba(255, 102, 0, ${shadowProps.opacity})`;
			ctx.shadowBlur = shadowProps.blur;
			ctx.shadowOffsetX = 0;
			ctx.shadowOffsetY = 0;

			ctx.fillStyle = '#000';
			ctx.beginPath();
			ctx.arc(imgCircle.x, imgCircle.y, imgCircle.r, 0, Math.PI * 2);
			ctx.fill();

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

			ctx.strokeStyle = getThemeColors.accent;
			ctx.lineWidth = 3;
			ctx.beginPath();
			ctx.arc(imgCircle.x, imgCircle.y, imgCircle.r - 1.5, 0, Math.PI * 2);
			ctx.stroke();

			ctx.restore();
		}

		ctx.restore();
	}

	$effect(() => {
		if (canvas && containerWidth > 0 && containerHeight > 0) {
			const dpr = window.devicePixelRatio || 1;
			canvas.width = containerWidth * dpr;
			canvas.height = containerHeight * dpr;

			gameCircle.x = containerWidth - gameCircle.r - canvasPadding;
			gameCircle.y = containerHeight / 2;

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
				imgCircle.r + canvasPadding,
				Math.min(containerWidth - imgCircle.r - canvasPadding, mouseX - imgCircle.dragOffset.x)
			);
			imgCircle.y = Math.max(
				imgCircle.r + canvasPadding,
				Math.min(containerHeight - imgCircle.r - canvasPadding, mouseY - imgCircle.dragOffset.y)
			);

			const distToTargetX = imgCircle.x - gameCircle.x;
			const distToTargetY = imgCircle.y - gameCircle.y;
			const distance = Math.sqrt(distToTargetX * distToTargetX + distToTargetY * distToTargetY);

			if (distance < 60) {
				if (!isSnapped) {
					isSnapped = true;
					isDragging = false;

					gsap.to(imgCircle, {
						x: gameCircle.x,
						y: gameCircle.y,
						duration: 0.3,
						ease: 'back.out(1.7)',
						onUpdate: render,
						onComplete: () => {
							confetti({
								particleCount: 150,
								spread: 80,
								origin: { y: 0.6 }
							});
							onTargetReached?.(true);
						}
					});
				}
			} else if (isSnapped) {
				isSnapped = false;
				onTargetReached?.(false);
			}
		}

		render();
	}

	function handleMouseUp() {
		isDragging = false;
	}

	export function resetGame() {
		if (isSnapped) {
			isSnapped = false;
			onTargetReached?.(false);
			gsap.to(imgCircle, {
				x: 180,
				y: 250,
				duration: 0.6,
				ease: 'power3.out',
				onUpdate: render
			});
		}
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
