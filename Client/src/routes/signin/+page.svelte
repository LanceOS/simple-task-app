<script lang="ts">
	import { goto } from '$app/navigation';
	import { Toaster } from '$lib/client/components/toaster/Toaster';
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
			Toaster.ejectToast({
				message: 'OTP sent! Check your inbox.',
				type: 'success'
			});
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

	const confirmCode = async () => {
		loading = true;
		try {
			signInState = 'confirming-code';
			await SignInService.confirmCode(email, code);

			signInState = 'signed-in';
			Toaster.ejectToast({
				message: 'Signed In!',
				type: 'success'
			});
			setTimeout(() => goto('/'), 1000);
		} catch (error) {
			signInState = 'error';
			Toaster.ejectToast({
				message: 'Failed to sign in with provided code!',
				type: 'error'
			});
		} finally {
			loading = false;
		}
	};
</script>

<main class="flex">
	<!-- Left panel -->
	<div
		class="bg-primary hidden h-screen w-full flex-col items-center justify-center gap-4 text-center text-base-100 md:flex"
	>
		<h1 class="text-6xl">Welcome to<br />Greater Task</h1>
		<p class="text-2xl">The easy to use collaboration tool for everyone!</p>
		<Icon icon="unjs:fs-memo" class="text-7xl" />
	</div>

	<!-- Right panel -->
	<div class="flex h-screen w-full items-center justify-center">
		{#if signInState === 'idle'}
			<form class="w-3/4 lg:w-1/2 space-y-8 p-6">
				<h1 class="w-full text-center text-2xl sm:text-5xl">Sign In</h1>
				<Input bind:input={email} title="Email" type="email" />
				<button
					type="button"
					aria-label="Send OTP"
					onclick={sendEmailOTP}
					class="btn btn-primary w-full"
					disabled={loading}
				>
					{#if loading}
						<Icon icon="svg-spinners:eclipse" />
					{:else}
						<Icon icon="material-symbols:mail" />
					{/if}
					Send Code
				</button>
			</form>

		{:else if signInState === 'sending-otp'}
			<div class="flex items-center gap-4">
				<h1 class="text-5xl">Sending Code…</h1>
				<Icon icon="svg-spinners:eclipse" class="text-5xl" />
			</div>

		{:else if signInState === 'otp-sent'}
			<form class="w-3/4 lg:w-1/2 space-y-8 p-6">
				<h1 class="w-full text-center text-2xl sm:text-5xl">Enter Code:</h1>
				<Input title="Code" bind:input={code} />
				<button
					type="button"
					aria-label="Confirm Sign In"
					onclick={confirmCode}
					class="btn btn-primary w-full"
					disabled={loading}
				>
					{#if loading}
						<Icon icon="svg-spinners:eclipse" />
					{:else}
						<Icon icon="material-symbols:lock" />
					{/if}
					Confirm
				</button>
			</form>

		{:else if signInState === 'confirming-code'}
			<div class="flex items-center gap-4">
				<h1 class="text-5xl">Signing In…</h1>
				<Icon icon="svg-spinners:eclipse" class="text-5xl" />
			</div>

		{:else if signInState === 'signed-in'}
			<div class="flex flex-col items-center gap-4 text-center">
				<h1 class="text-5xl">Welcome Back!</h1>
				<Icon icon="mdi:check-circle" class="text-green-500 text-7xl" />
			</div>

		{:else if signInState === 'error'}
			<div class="flex flex-col items-center gap-6 text-center">
				<Icon icon="mdi:alert-circle" class="text-red-500 text-7xl" />
				<h1 class="text-4xl">Something went wrong</h1>
				<button
					class="btn btn-primary"
					onclick={() => (signInState = 'idle')}
				>
					Try Again
				</button>
			</div>
		{/if}
	</div>
</main>
