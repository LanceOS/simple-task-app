<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	type Variant = 'neutral' | 'primary' | 'secondary' | 'danger' | 'custom';

	let {
		variant = 'primary',
		class: className = '',
		children,
		...rest
	} = $props<
		{
			variant?: Variant;
			sizes?: string;
			class?: string;
			children?: Snippet;
		} & HTMLButtonAttributes
	>();

	const baseClasses =
		'flex items-center justify-center cursor-pointer active:translate-y-[1px] gap-2 rounded-md border font-bold duration-200 ' +
		'min-h-[44px] min-w-[44px] ' +
		'px-3 py-2 sm:px-4 sm:py-2 ' +
		'text-sm sm:text-base ' +
		'hover:scale-[0.98]';

	const variantClasses = {
		neutral: `${baseClasses} neutral`,
		primary: `${baseClasses} primary`,
		secondary: `${baseClasses} secondary`,
		danger: `${baseClasses} danger`,
		custom: ''
	} satisfies Record<Variant, string>;

	// used "variant as Variant" to keep the svelte compiler from bitching
	const combinedClasses = `${variantClasses[variant as Variant]} ${className}`;
</script>

<button class={combinedClasses} {...rest}>
	{@render children()}
</button>
