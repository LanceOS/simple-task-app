<script lang="ts">
	import type { HTMLTextareaAttributes } from 'svelte/elements';

	let {
		maxlength,
		title,
		input = $bindable(),
		...rest
	} = $props<
		{
			maxlength?: number;
			title: string;
			input: string;
		} & HTMLTextareaAttributes
	>();
</script>

<div>
	<div class="flex w-full items-center justify-between">
		<label for={title} class="text-content text-md mb-2 block font-semibold">{title}</label>
		{#if maxlength}
			<p>{input.length}/{maxlength}</p>
		{/if}
	</div>
	<textarea
		name={title}
		id={title}
		{maxlength}
		class="bg-base-100 border-base-300 focus:ring-primary text-content w-full resize-none rounded-lg border p-3 focus:ring-2 focus:outline-none"
		bind:value={input}
		{...rest}
	></textarea>
</div>
