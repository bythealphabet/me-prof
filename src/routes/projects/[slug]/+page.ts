import { error } from '@sveltejs/kit';
import { getProject, projects } from '$lib/data/projects';
import type { EntryGenerator } from './$types';

export const entries: EntryGenerator = () => projects.map((p) => ({ slug: p.meta.slug }));

export function load({ params }: { params: { slug: string } }) {
	const project = getProject(params.slug);
	if (!project) error(404, 'Project not found');
	return { project };
}
