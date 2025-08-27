<script lang="ts">
	import Nav from '$lib/client/components/nav/Nav.svelte';
	import Toast from '$lib/client/components/toaster/Toast.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<Toast />
<!-- <Nav /> -->
{@render children()}
