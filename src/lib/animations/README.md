# Intro animations

GSAP-driven entrance animation for the site header (logo, nav links, palette
swatches, dark-mode switch). Lives in `intro.svelte.ts`.

## How it works

There is **one** timeline, built in **one** place, in a component that owns
every element the animation touches: `SiteNav.svelte`.

```
SiteNav.svelte (owns: leftBracket, nameEl, rightBracket, targetLinks)
  └─ PaletteControl.svelte (owns: targetPalletes, darkmodeSwitch)
       exposes its elements upward via bind: props
```

`PaletteControl` does **not** animate itself. It only exposes its DOM
elements to its parent via `$bindable` props:

```svelte
let {
  targetPalletes = $bindable(),
  darkmodeSwitch = $bindable()
}: { targetPalletes?: HTMLElement; darkmodeSwitch?: HTMLElement } = $props();
```

`SiteNav` binds to them (`<PaletteControl bind:targetPalletes
bind:darkmodeSwitch />`), and in its own `onMount` — once every element it
needs (its own + the child's) is guaranteed to exist — calls a single
factory function that builds and plays the whole timeline:

```ts
onMount(() => {
	if (!targetPalletes || !darkmodeSwitch) return;
	buildIntroTimeline({
		logo: [leftBracket, rightBracket, nameEl],
		navLinks: targetLinks.children,
		palette: Array.from(targetPalletes.children) as HTMLElement[],
		themeSwitch: darkmodeSwitch
	});
});
```

### Why not just call an intro function from each component's own `onMount`?

That was the original setup, and it silently broke ordering control:

- Svelte mounts **children before parents**. `PaletteControl` is nested
  inside `SiteNav`, so its `onMount` fires first — meaning the palette/switch
  animation always started before the logo/nav animation, regardless of
  which functions were called in which file.
- GSAP position strings like `'<'` and `'>0.2'` are relative to "whatever
  was added to the timeline most recently." With calls coming from multiple
  components' `onMount` hooks, "most recently" depends on mount order, not
  on anything declared explicitly.

Lifting the elements up to one parent and building the timeline in one
function call removes both problems — ordering is now just the order of
statements in `buildIntroTimeline`.

## `intro.svelte.ts`

```ts
export function buildIntroTimeline(refs: IntroRefs): GSAPTimeline {
	const tl = gsap.timeline();

	addPalette(tl, refs.palette, 0);
	addThemeSwitch(tl, refs.themeSwitch, '<');
	addLogo(tl, refs.logo, '+=0.2');
	addNavigation(tl, refs.navLinks, '+=0.1');

	return tl;
}
```

- `addPalette`, `addThemeSwitch`, `addLogo`, `addNavigation` are small,
  independent helpers. Each just adds its own `fromTo` tween(s) to whatever
  timeline it's given, at whatever `position` it's given. They don't know
  about each other and don't know what order they'll run in.
- `buildIntroTimeline` is the **only** place that decides order and timing.
  To change what animates first, reorder these four lines. To change gaps
  between segments, change the `position` argument on each line.
- A fresh `gsap.timeline()` is created per call — no shared/module-level
  timeline, so remounting the component (HMR, navigation, etc.) can't leave
  a stale timeline lying around.

### GSAP position values, quick reference

- `0` — an absolute point in time (seconds) from the start of the timeline.
- `'<'` — start at the same time as the previous tween/segment started.
- `'+=0.2'` — start 0.2s after the previous segment **ends**.
- `'-=0.2'` — start 0.2s before the previous segment ends (overlap).
- A string label (e.g. `'palette'`) added via `tl.addLabel('palette')` — jump
  to a named point instead of counting offsets. Prefer labels over chained
  `'<'`/`'+='` once the timeline has more than 3–4 segments; they don't
  silently shift if you reorder or add a segment above them.

## Adding a new element to the intro

1. Make sure the owning component exposes the element(s) it needs animated
   — either directly (if it's `SiteNav` itself) or via a `$bindable` prop
   (if it's a child component, following the `PaletteControl` pattern).
2. Add an `add<Thing>(tl, elements, position)` helper in `intro.svelte.ts`
   that only knows how to animate that one thing.
3. Add one line calling it inside `buildIntroTimeline`, in the position in
   the sequence you want it to play, with the `position` argument that
   describes its timing relative to the rest.
4. Extend `IntroRefs` and the object passed into `buildIntroTimeline` in
   `SiteNav.svelte`'s `onMount`.

## Changing the order/timing (today's config)

Current sequence inside the nav timeline: **logo → nav links → palette
swatches → theme switch**, one after another with small gaps. To change it,
edit the four lines inside `buildIntroTimeline` — nothing else needs to
change.

## Chaining a later section onto the nav intro (e.g. Hero)

Some sections outside the header (e.g. `Hero.svelte`) should only start
animating once the whole nav intro timeline has finished. `Hero` isn't a
descendant of `SiteNav`, so it can't just be added as another segment inside
`buildIntroTimeline` — there's no shared parent already wiring up refs
between them.

Instead, `intro.svelte.ts` exposes a tiny completion hook:

```ts
export function onIntroComplete(callback: () => void) {
	if (introComplete) {
		callback();
	} else {
		introCompleteCallbacks.push(callback);
	}
}
```

`buildIntroTimeline` registers `notifyIntroComplete` as the nav timeline's
`onComplete`, which flips `introComplete` and flushes any queued callbacks.
Any component can call `onIntroComplete(fn)` in its own `onMount` — if the
nav intro already finished by the time it's called, `fn` runs immediately
(no race condition regardless of mount order); otherwise it's queued and
runs when the nav timeline completes.

`Hero.svelte` uses this to start its own tween only after the nav intro:

```ts
onMount(() => {
	onIntroComplete(() => heroIntro(section));
});
```

`heroIntro` is just another small, independent animation helper in
`intro.svelte.ts` (same shape as `addLogo`/`addPalette`/etc.), it just isn't
added to the nav `GSAPTimeline` — it plays as its own tween once triggered.

This deliberately uses a plain callback registry, not a Svelte store: the
nav-intro-finished signal only ever fires once, so there's no ongoing
reactive state to track — GSAP already knows when its own timeline
completes, so the completion signal is sourced from GSAP's `onComplete`
rather than duplicated into a separate piece of Svelte state.
