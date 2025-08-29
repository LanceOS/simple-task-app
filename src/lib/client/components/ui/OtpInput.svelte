<script lang="ts">
	import Icon from '@iconify/svelte';
	import { PinInput, REGEXP_ONLY_DIGITS, type PinInputRootSnippetProps } from 'bits-ui';
	import cn from 'clsx';

	let { confirmFn, input = $bindable() } = $props();

	let disableInput: boolean = $state(true);

	$effect(() => {
		if (input.length === 6) {
			disableInput = true;
		} else {
			disableInput = false;
		}
	});

	type CellProps = PinInputRootSnippetProps['cells'][0];
</script>

<PinInput.Root
	bind:value={input}
	class="group/pininput text-foreground flex items-center has-disabled:opacity-30"
	maxlength={6}
	onComplete={confirmFn}
	pattern={REGEXP_ONLY_DIGITS}
>
	{#snippet children({ cells })}
		<div class="flex w-full justify-between">
			{#each cells as cell, i (i)}
				{@render Cell(cell)}
			{/each}
		</div>
	{/snippet}
</PinInput.Root>
{#snippet Cell(cell: CellProps)}
	<PinInput.Cell
		{cell}
		class={cn(
			'focus-override',
			'relative h-14 w-10 text-[2rem]',
			'flex items-center justify-center',
			'transition-all duration-75',
			'rounded-md border',
			'text-foreground group-focus-within/pininput:border-foreground/40 group-hover/pininput:border-foreground/40',
			'outline-0',
			'data-active:border-2 data-active:border-[var(--color-primary)]'
		)}
	>
		{#if cell.char !== null}
			<div>
				{cell.char}
			</div>
		{/if}
		{#if cell.hasFakeCaret}
			<div
				class="animate-caret-blink pointer-events-none absolute inset-0 flex items-center justify-center"
			>
				<div class="h-8 w-px bg-white"></div>
			</div>
		{/if}
	</PinInput.Cell>
{/snippet}
