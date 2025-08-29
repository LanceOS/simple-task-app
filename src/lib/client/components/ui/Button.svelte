<script lang="ts">
	import { Button } from 'bits-ui';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	
	type Variant = 'neutral' | 'primary' | 'secondary' | 'custom';

	let {
		variant = 'primary',
		class: className = '',
		...rest
	} = $props<
		{
			variant: Variant;
			class?: string;
		} & HTMLButtonAttributes
	>();

	const variantClasses = {
		neutral:
			'flex neutral cursor-pointer active:translate-y-[1px] items-center gap-2 rounded-md border px-4 py-2 font-bold duration-200 hover:scale-[0.98]',
		primary:
			'flex primary cursor-pointer active:translate-y-[1px] items-center gap-2 rounded-md border px-4 py-2 font-bold duration-200 hover:scale-[0.98]',
		secondary:
			'flex secondary cursor-pointer active:translate-y-[1px] items-center gap-2 rounded-md border px-4 py-2 font-bold duration-200 hover:scale-[0.98]',
		custom: ''
	} satisfies Record<Variant, string>;

	// used "variant as Variant" to keep the svelte compiler from bitching
	const combinedClasses = `${variantClasses[(variant as Variant)]} ${className}`;
</script>

<Button.Root class={combinedClasses} {...rest}>
	<slot />
</Button.Root>
