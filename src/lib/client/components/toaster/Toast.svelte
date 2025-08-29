<script lang="ts">
	import { toastStore } from './Toaster';
</script>

{#if $toastStore.visible}
	<div
		class={`fixed top-4 left-4 z-10 flex h-fit w-fit flex-col rounded-lg px-4 py-2 shadow-md duration-200
		${$toastStore.type === 'info' && 'info'}
		${$toastStore.type === 'error' && 'error'}
		${$toastStore.type === 'success' && 'success'}`}
	>
		<span class="text-lg font-bold">{$toastStore.type.toUpperCase()}</span>
		<span>{$toastStore.message}</span>
	</div>
{/if}
