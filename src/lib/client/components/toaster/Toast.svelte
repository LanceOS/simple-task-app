<script lang="ts">
	import { toastStore } from './Toaster';
</script>

{#if $toastStore.visible}
	<div class="fixed top-4 left-4 z-10 w-fit h-fit py-w px-4 border flex flex-col">
		<span class="text-lg font-bold">{$toastStore.type.toUpperCase()}</span>
		<span>{$toastStore.message}</span>
    </div>
{/if}
