<script lang="ts">
	import { goto } from '$app/navigation';
	import { authClient } from '$lib/auth-client';
	import { Toaster } from '$lib/client/components/toaster/Toaster';
	import Input from '$lib/client/components/ui/Input.svelte';
	import { SignInService } from '$lib/client/services/SigninService.clientutil';
	import Icon from '@iconify/svelte';
	import { Button } from 'bits-ui';

	let email: string = $state('');
	let code: string = $state('');

	let signInState: SignInState = $state('idle');

	type SignInState =
		| 'idle'
		| 'sending-otp'
		| 'otp-sent'
		| 'confirming-code'
		| 'signed-in'
		| 'error';

	const sendEmailOTP = async () => {
		if (!email.includes('@')) {
			Toaster.ejectToast({
				message: 'Must be a valid email!',
				type: 'error'
			});
			return;
		}

		try {
			signInState = 'sending-otp';
			await SignInService.sendEmailOTP(email);

			signInState = 'otp-sent';
		} catch (error) {
			signInState = 'error';
			Toaster.ejectToast({
				message: 'Failed to send sign in code!',
				type: 'error'
			});
		}
	};

	const confirmCode = () => {
		try {
			SignInService.confirmCode(email, code);

			Toaster.ejectToast({
				message: 'Signed In!',
				type: 'success'
			});
			goto('/');
		} catch (error) {
			Toaster.ejectToast({
				message: 'Failed to sign in with provided code!',
				type: 'error'
			});
		}
	};
</script>

<main class="flex">
	<div class="bg-neutral flex h-screen w-full flex-col items-center justify-center gap-4 text-center">
		<h1 class="text-6xl">Welcome to<br />Greater Task</h1>
		<p class="text-2xl">The easy to use collaboration tool for everyone!</p>
		<Icon icon="simple-icons:task" class="text-7xl" />
	</div>
	{#if signInState === 'otp-sent'}
		<div class="bg-neutral absolute flex h-screen w-screen items-center justify-center opacity-50">
			<form class="card">
				<div>
					<p>Enter Code:</p>
					<input type="text" name="otpCode" id="otpCode" class="border" bind:value={code} />
				</div>
				<button type="button" class="border px-4 py-2" onclick={confirmCode}>Confirm</button>
			</form>
		</div>
	{/if}
	<div class="flex h-screen w-full items-center justify-center">
		<form>
			<h1 class="text-3xl sm:text-5xl">Sign In</h1>
			<Input bind:input={email} title="Email:" />
			<Button.Root
				type="button"
				aria-label="Confirm Sign In"
				onclick={sendEmailOTP}
				class="flex neutral cursor-pointer active:translate-y-[1px] items-center gap-2 rounded-md border px-4 py-2 font-bold duration-200 hover:scale-[0.98]"
			>
				<Icon icon="ic:baseline-email" />
				Confirm
			</Button.Root>
		</form>
	</div>
</main>
