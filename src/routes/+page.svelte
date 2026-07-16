<script lang="ts">
	import Hero from '$lib/components/sections/Hero.svelte';
	import About from '$lib/components/sections/About.svelte';
	// import Skills from '$lib/components/sections/Skills.svelte';
	import Experience from '$lib/components/sections/Experience.svelte';
	import ProjectsPreview from '$lib/components/sections/ProjectsPreview.svelte';
	import Contact from '$lib/components/sections/Contact.svelte';
	import profile from '$lib/data/profile.json';
</script>

<svelte:head>
	<title>{profile.name} — {profile.role}</title>
	<meta name="description" content={profile.seo.defaultDescription} />
</svelte:head>

<Hero />
<About />
<Experience />
<ProjectsPreview />
<!-- <Skills /> -->
<Contact />
