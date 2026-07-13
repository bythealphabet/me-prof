<script lang="ts">
	let {
		label,
		id,
		multiline = false,
		required = false,
		hint,
		error,
		class: className = '',
		value = $bindable(''),
		type = 'text',
		...rest
	}: {
		label?: string;
		id?: string;
		multiline?: boolean;
		required?: boolean;
		hint?: string;
		error?: string;
		class?: string;
		value?: string;
		type?: string;
		[key: string]: unknown;
	} = $props();

	const autoId = $props.id();
	const fieldId = $derived(id || autoId);
	const controlClass = $derived(
		['bfd-field__control', multiline ? 'bfd-field__control--area' : ''].filter(Boolean).join(' ')
	);
</script>

<div class={['bfd-field', className].filter(Boolean).join(' ')}>
	{#if label}
		<label class="bfd-field__label" for={fieldId}>
			{label}
			{#if required}<span class="bfd-field__req">*</span>{/if}
		</label>
	{/if}
	{#if multiline}
		<textarea
			id={fieldId}
			class={controlClass}
			aria-invalid={error ? 'true' : undefined}
			{required}
			bind:value
			{...rest}></textarea>
	{:else}
		<input
			id={fieldId}
			{type}
			class={controlClass}
			aria-invalid={error ? 'true' : undefined}
			{required}
			bind:value
			{...rest}
		/>
	{/if}
	{#if error}
		<span class="bfd-field__hint bfd-field__hint--error">{error}</span>
	{:else if hint}
		<span class="bfd-field__hint">{hint}</span>
	{/if}
</div>

<style>
	.bfd-field {
		display: flex;
		flex-direction: column;
		gap: 0.7rem;
	}
	.bfd-field__label {
		font-family: var(--font-accent);
		font-weight: 600;
		font-size: var(--font-size-small);
		color: var(--text-secondary);
		letter-spacing: 0.02em;
	}
	.bfd-field__req {
		color: var(--accent-coral);
		margin-left: 0.3ch;
	}
	.bfd-field__control {
		font-family: var(--font-body);
		font-size: var(--font-size-body);
		color: var(--text-primary);
		background: color-mix(in srgb, var(--background-dark) 70%, var(--background-card) 30%);
		border: none;
		border-bottom: 1px solid transparent;
		border-radius: var(--radius-sm) var(--radius-sm) 0 0;
		padding: 1.2rem 1.4rem;
		width: 100%;
		transition:
			background var(--duration-fast) ease,
			border-color var(--duration-fast) ease,
			box-shadow var(--duration-fast) ease;
	}
	.bfd-field__control::placeholder {
		color: var(--text-light);
	}
	.bfd-field__control:hover {
		background: color-mix(in srgb, var(--background-dark) 55%, var(--background-card) 45%);
	}
	.bfd-field__control:focus {
		outline: none;
		background: var(--background-card);
		border-bottom-color: var(--primary-teal, var(--primary-blue-light));
		box-shadow: 0 1px 0 0 var(--primary-teal, var(--primary-blue-light));
	}
	.bfd-field__control--area {
		min-height: 12rem;
		resize: vertical;
		line-height: var(--line-height-normal);
	}
	.bfd-field__control[aria-invalid='true'] {
		border-bottom-color: var(--accent-coral);
		box-shadow: 0 1px 0 0 var(--accent-coral);
	}
	.bfd-field__hint {
		font-family: var(--font-accent);
		font-size: 1.2rem;
		color: var(--text-light);
	}
	.bfd-field__hint--error {
		color: var(--accent-coral);
	}
</style>
