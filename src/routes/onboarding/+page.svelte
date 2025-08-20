<script lang="ts">
	import { Onboarding } from '$lib/client/utils/Onboarding.clientutil';

	let newName: string = $state('');
</script>

<main class="flex h-screen items-center justify-center">
	<form class="space-y-4 rounded-md border p-4">
		<div class="space-y-2">
			<h1 class="text-xl">Your profile have no name!</h1>
			<p>Please enter your name to continue.</p>
		</div>
		<div class="flex flex-col gap-2">
			<label for="name">Name:</label>
			<input type="text" name="name" id="name" class="border" bind:value={newName}/>
		</div>
		<button
			type="button"
			class="cursor-pointer rounded-md border px-4 py-2"
			onclick={async () => await Onboarding.setName(newName)}>Confirm Name</button
		>
	</form>
</main>
