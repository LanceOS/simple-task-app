<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	type Variant = 'neutral' | 'primary' | 'secondary' | 'custom';
	type Sizes = 'big' | 'medium' | 'small' | 'custom';

	let {
		variant = 'primary',
		class: className = '',
		size = 'custom',
		children,
		...rest
	} = $props<
		{
			variant?: Variant;
			sizes?: string;
			class?: string;
			children: Snippet;
		} & HTMLButtonAttributes
	>();

	const variantClasses = {
		neutral:
			'flex neutral  justify-center cursor-pointer active:translate-y-[1px] items-center gap-2 rounded-md border px-4 py-2 font-bold duration-200 hover:scale-[0.98]',
		primary:
			'flex primary  justify-center cursor-pointer active:translate-y-[1px] items-center gap-2 rounded-md border px-4 py-2 font-bold duration-200 hover:scale-[0.98]',
		secondary:
			'flex secondary  justify-center cursor-pointer active:translate-y-[1px] items-center gap-2 rounded-md border px-4 py-2 font-bold duration-200 hover:scale-[0.98]',
		custom: ''
	} satisfies Record<Variant, string>;

	const btnSizes = {
		big: 'h-18',
		medium: 'h-12',
		small: 'h-8',
		custom: ''
	} satisfies Record<Sizes, string>;

	// used "variant as Variant" to keep the svelte compiler from bitching
	const combinedClasses = `${variantClasses[variant as Variant]} ${btnSizes[size as Sizes]} ${className}`;
</script>

<button class={combinedClasses} {...rest}>
	{@render children()}
</button>
