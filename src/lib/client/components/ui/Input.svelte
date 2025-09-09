<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	let {
		maxlength,
		title,
		input = $bindable(),
		...rest
	} = $props<
		{
			title: string;
			input: string;
			maxlength?: number;
		} & HTMLInputAttributes
	>();
</script>

<div class="flex w-full flex-col gap-2">
	<div class="flex w-full items-center justify-between">
		<label for={title} class="text-md font-bold">{title}</label>
		{#if maxlength}
			<p>{input.length}/{maxlength}</p>
		{/if}
	</div>
	<input
		{...rest}
		name={title}
		id={title}
		bind:value={input}
		{maxlength}
		class="bg-base-100 text-md rounded-md border border-[var(--color-neutral)] p-3 focus:outline-0"
	/>
</div>
