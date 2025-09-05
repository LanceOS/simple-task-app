<script lang="ts">
	import { toastStore } from './Toaster';
</script>

{#if $toastStore.visible}
	<div
		class={`fixed top-4 left-4 z-50 flex h-fit w-fit flex-col rounded-lg px-4 py-2 shadow-md duration-200
		${$toastStore.type === 'info' && 'bg-info'}
		${$toastStore.type === 'error' && 'bg-error'}
		${$toastStore.type === 'success' && 'bg-success'}`}
	>
		<span>{$toastStore.message}</span>
	</div>
{/if}
