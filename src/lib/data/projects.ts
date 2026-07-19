import type { Component } from 'svelte';

export type ProjectMeta = {
	title: string;
	slug: string;
	summary: string;
	tags: string[];
	date: string;
	repo?: string;
	demo?: string;
	cover?: string;
	imgUrl?: string;
};

type ProjectModule = {
	default: Component;
	metadata: ProjectMeta;
};

const modules = import.meta.glob('/src/content/projects/*.md', { eager: true }) as Record<
	string,
	ProjectModule
>;

export const projects: { meta: ProjectMeta; content: Component }[] = Object.values(modules)
	.map((mod) => ({ meta: mod.metadata, content: mod.default }))
	.sort((a, b) => (a.meta.date < b.meta.date ? 1 : -1));

export function getProject(slug: string) {
	return projects.find((p) => p.meta.slug === slug);
}
