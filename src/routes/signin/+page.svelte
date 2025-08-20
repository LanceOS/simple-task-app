<script lang="ts">
	import { goto } from '$app/navigation';
	import { authClient } from '$lib/auth-client';
	import { Toaster } from '$lib/client/components/toaster/Toaster';
	import Icon from '@iconify/svelte';

	let email: string = $state('');
	let code: string = $state('');

	let otpSent: boolean = $state(false);

	const sendEmailOTP = async () => {
		if (!email.includes('@')) {
			Toaster.ejectToast({
				message: 'Must be a valid email!',
				type: 'error'
			});
            return;
		}

		try {
			authClient.emailOtp.sendVerificationOtp({
				email: email,
				type: 'sign-in'
			});

			otpSent = true;
		} catch (error) {
			Toaster.ejectToast({
				message: 'Failed to send sign in code!',
				type: 'error'
			});
		}
	};

	const confirmCode = () => {
		try {
			authClient.signIn.emailOtp({
				email: email,
				otp: code
			});

            Toaster.ejectToast({
                message: "Signed In!",
                type: "success"
            })
            goto("/")
		} catch (error) {
			Toaster.ejectToast({
				message: 'Failed to sign in with provided code!',
				type: 'error'
			});
		}
	};
</script>

<main class="relative mx-auto flex h-screen max-w-5xl items-center justify-center px-4">
	{#if otpSent}
		<div class="absolute mx-auto my-auto border-2 bg-white h-72 w-72 p-12 space-y-4">
            <div>
                <p>Enter Code:</p>
                <input type="text" name="otpCode" id="otpCode" class="border" bind:value={code} >
            </div>
            <button type="button" class="border px-4 py-2" onclick={confirmCode}>Confirm</button>
        </div>
	{/if}
	<form class="h-fit w-fit space-y-8 rounded-md border p-8">
		<h1 class="text-3xl sm:text-5xl">Sign In</h1>
		<div>
			<label for="email">Email:</label>
			<input
				type="text"
				name="email"
				id="email"
				aria-label="Please enter your email"
				class="border"
				bind:value={email}
			/>
		</div>
		<button
			type="button"
			aria-label="Confirm Sign In"
			onclick={sendEmailOTP}
			class="flex cursor-pointer items-center gap-2 rounded-md border px-4 py-2"
		>
			<Icon icon="ic:baseline-email" />
			Confirm
		</button>
	</form>
</main>
