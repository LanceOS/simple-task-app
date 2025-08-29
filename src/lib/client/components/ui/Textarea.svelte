<script lang="ts">
	import type { HTMLTextareaAttributes } from 'svelte/elements';

	let {
		title,
		input = $bindable(),
		...rest
	} = $props<
		{
			title: string;
			input: string;
		} & HTMLTextareaAttributes
	>();
</script>

<div>
	<label for={title} class="text-content text-md mb-2 block font-semibold">{title}</label>
	<textarea
		name={title}
		id={title}
		class="bg-base-100 border-base-300 focus:ring-primary text-content w-full resize-none rounded-lg border px-4 py-3 focus:ring-2 focus:outline-none"
		bind:value={input}
		{...rest}
	></textarea>
</div>
