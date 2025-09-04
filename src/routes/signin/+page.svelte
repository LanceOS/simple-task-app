<script lang="ts">
	import { goto } from '$app/navigation';
	import { Toaster } from '$lib/client/components/toaster/Toaster';
	import Button from '$lib/client/components/ui/Button.svelte';
	import Input from '$lib/client/components/ui/Input.svelte';
	import { SignInService } from '$lib/client/services/SigninService.clientutil';
	import Icon from '@iconify/svelte';

	let email: string = $state('');
	let code: string = $state('');

	let signInState: SignInState = $state('idle');

	let loading: boolean = $state(false);

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

		loading = true;

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
		} finally {
			loading = false;
		}
	};

	const confirmCode = () => {
		loading = true;
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
		} finally {
			loading = false;
		}
	};
</script>

<main class="flex h-screen items-center justify-center px-4">
	{#if signInState === 'otp-sent'}
		<form class="max-w-4xl w-full space-y-8 p-6">
			<h1 class="w-full text-center text-2xl sm:text-5xl">Enter Code:</h1>
			<Input title="" bind:input={code} />
			<Button
				variant="primary"
				type="button"
				aria-label="Confirm Sign In"
				onclick={confirmCode}
				placeholder="example@gmail.com"
				class="w-full justify-center text-lg"
			>
				<Icon icon="material-symbols:lock" />
				Confirm
			</Button>
		</form>
	{:else if signInState === 'idle'}
		<form class="max-w-xl w-full space-y-8 p-6">
			<h1 class="w-full text-center text-2xl sm:text-5xl">Sign In</h1>
			<Input bind:input={email} title="Email" type={'email'} />
			<Button
				variant="primary"
				type="button"
				aria-label="Confirm Sign In"
				onclick={sendEmailOTP}
				placeholder="example@gmail.com"
				class="w-full justify-center text-lg"
			>
				<Icon icon="material-symbols:mail" />
				Confirm
			</Button>
		</form>
	{:else if signInState === 'confirming-code'}
		<div class="flex items-center gap-4">
			<h1 class="text-5xl">Signing In</h1>
			<Icon icon="svg-spinners:eclipse" class="text-5xl" />
		</div>
	{/if}
</main>
