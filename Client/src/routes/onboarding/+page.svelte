<script lang="ts">
	import { goto } from "$app/navigation";
	import { Toaster } from "$lib/client/components/toaster/Toaster";
	import Button from "$lib/client/components/ui/Button.svelte";
	import Input from "$lib/client/components/ui/Input.svelte";
	import { Onboarding } from "$lib/client/services/Onboarding.clientutil";
	import { i18n } from "$lib/stores/Translation.store";


	let newName: string = $state('');

	const setName = async () => {
		try {
			await Onboarding.setName(newName)
			Toaster.ejectToast({
				message: "Successfully set name!",
				type: "success"
			})
			goto("/")
		}
		catch(error: any) {
			Toaster.ejectToast({
				message: error.message,
				type: "error"
			})
		}
	}
</script>

<main class="flex h-screen items-center px-4 justify-center">
	<form class="space-y-4 rounded-md">
		<div class="space-y-2 text-center">
			<h1 class="text-3xl">{$i18n.t("onboarding.heading")}</h1>
			<p>{$i18n.t("onboarding.message")}</p>
		</div>
		<Input title={$i18n.t("onboarding.input.title")} type="text" bind:input={newName}/>
		<Button variant="primary" onclick={setName} class="w-full justify-center">
			{$i18n.t("onboarding.confirmButton")}
		</Button>
	</form>
</main>
