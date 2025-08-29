<script lang="ts">
	import { goto } from '$app/navigation';
	import { Toaster } from '$lib/client/components/toaster/Toaster';
	import Button from '$lib/client/components/ui/Button.svelte';
	import Input from '$lib/client/components/ui/Input.svelte';
	import OtpInput from '$lib/client/components/ui/OtpInput.svelte';
	import { SignInService } from '$lib/client/services/SigninService.clientutil';
	import Icon from '@iconify/svelte';

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

			signInState = 'confirming-code';
			setTimeout(() => {
				Toaster.ejectToast({
					message: 'Signed In!',
					type: 'success'
				});
				goto('/');
			}, 1500);
		} catch (error) {
			Toaster.ejectToast({
				message: 'Failed to sign in with provided code!',
				type: 'error'
			});
		}
	};
</script>

<main class="flex">
	<div
		class="bg-primary hidden h-screen w-full flex-col items-center justify-center gap-4 text-center md:flex"
	>
		<h1 class="text-6xl">Welcome to<br />Greater Task</h1>
		<p class="text-2xl">The easy to use collaboration tool for everyone!</p>
		<Icon icon="simple-icons:task" class="text-7xl" />
	</div>
	<div class="flex h-screen w-full items-center justify-center">
		{#if signInState === 'otp-sent'}
			<form class="w-3/4 lg:w-1/2 space-y-8 p-6">
				<h1 class="w-full text-center text-2xl sm:text-5xl">Enter Code:</h1>
				<OtpInput bind:input={code} confirmFn={confirmCode} />
				<Button
					variant="primary"
					type="button"
					aria-label="Confirm Sign In"
					onclick={confirmCode}
					placeholder="example@gmail.com"
					class="w-full justify-center text-lg"
				>
					<Icon icon="ri:lock-password-fill" />
					Confirm
				</Button>
			</form>
		{:else if signInState === 'idle'}
			<form class="w-3/4 lg:w-1/2 space-y-8 p-6">
				<h1 class="w-full text-center text-2xl sm:text-5xl">Sign In</h1>
				<Input bind:input={email} title="Email:" type={"email"}/>
				<Button
					variant="primary"
					type="button"
					aria-label="Confirm Sign In"
					onclick={sendEmailOTP}
					placeholder="example@gmail.com"
					class="w-full justify-center text-lg"
				>
					<Icon icon="ic:baseline-email" />
					Confirm
				</Button>
			</form>
		{:else if signInState === 'confirming-code'}
			<h1 class="text-5xl">Signing In...</h1>
		{/if}
	</div>
</main>
