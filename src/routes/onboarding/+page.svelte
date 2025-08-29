<script lang="ts">
	import Button from "$lib/client/components/ui/Button.svelte";
	import Input from "$lib/client/components/ui/Input.svelte";
	import { Onboarding } from "$lib/client/services/Onboarding.clientutil";


	let newName: string = $state('');

	const setName = async () => {
		await Onboarding.setName(newName)
	}
</script>

<main class="flex h-screen items-center px-4 justify-center">
	<form class="space-y-4 rounded-md">
		<div class="space-y-2 text-center">
			<h1 class="text-3xl">Your user have no name!</h1>
			<p>Please enter your name to continue.</p>
		</div>
		<Input title="Name" type="text" bind:input={newName}/>
		<Button variant="primary" onclick={setName} class="w-full justify-center">
			Confirm
		</Button>
	</form>
</main>
