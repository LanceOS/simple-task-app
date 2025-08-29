<script lang="ts">
    import type { HTMLInputAttributes } from "svelte/elements"; 

    let { title, input = $bindable(), ...rest } = $props<{
        title: string,
        input: string
    } & HTMLInputAttributes>()
</script>

<div class="flex flex-col gap-2">
	<label for={title} class="text-xl font-bold">{title}</label>
	<input
		{...rest}
		name={title}
		id={title}
		bind:value={input}
		class="rounded-md border border-[var(--color-neutral)] p-2 text-lg focus:outline-0"
	/>
</div>
