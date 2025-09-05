<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { authClient } from '$lib/auth-client';
	import Icon from '@iconify/svelte';

	const session = authClient.useSession();
	const route = page.url.pathname;

	const signOut = () => {
		authClient.signOut();
		goto('/');
	};
</script>

{#if route !== '/onboarding'}
<<<<<<< HEAD
    <nav class="relative w-full bg-primary px-2 h-[40px] z-10">
        <ul class="mx-auto flex items-center justify-end gap-4 h-full">
            <li>
                <a
                    href="/"
                    aria-label="Navigate Home"
                    class="p-2 font-medium duration-300 hover:underline underline-offset-4"
                >
                    Home
                </a>
            </li>

            <li>
                <a
                    href="/groups"
                    aria-label="Navigate to Groups"
                    class="px-3 py-2 font-medium duration-300 hover:underline underline-offset-4"
                >
                    Groups
                </a>
            </li>

            <li class="bg-white">
                {#if $session?.data?.user}
                    <button type="button" aria-label="Sign Out" onclick={signOut} class="cursor-pointer font-bold hover:underline underline-offset-4 bg-primary"
                        >Sign Out</button
                    >
                {:else}
                    <Button
                        type="button"
                        aria-label="Sign In"
                        onclick={() => goto('/signin')}
                        variant="neutral"
                        >Sign In</Button
                    >
                {/if}
            </li>

            <li class="flex items-center">
                <button aria-label="Toggle dark mode" class="cursor-pointer font-bold hover:underline underline-offset-4 bg-primary">
                    <Icon icon="gg:dark-mode" class="text-2xl" />
                </button>
            </li>
        </ul>
    </nav>
=======
	<nav class="fixed z-10 w-full p-4">
		<ul class="mx-auto flex max-w-7xl items-center justify-end gap-4">
			<li>
				<a
					href="/"
					aria-label="Navigate Home"
					class="rounded-md p-2 text-base font-medium transition-colors duration-200 hover:bg-[var(--color-base-300)]"
				>
					Home
				</a>
			</li>

			<li>
				<a
					href="/groups"
					aria-label="Navigate to Groups"
					class="rounded-md px-3 py-2 text-base font-medium transition-colors duration-200 hover:bg-[var(--color-base-300)]"
				>
					Groups
				</a>
			</li>

			<li class="">
				{#if $session?.data?.user}
					<button type="button" aria-label="Sign Out" onclick={signOut} class="btn btn-primary"
						>Sign Out</button
					>
				{:else}
					<button
						type="button"
						aria-label="Sign In"
						onclick={() => goto('/signin')}
						class="btn btn-primary">Sign In</button
					>
				{/if}
			</li>

			<li class="flex items-center">
				<label class="swap swap-rotate">
					<!-- this hidden checkbox controls the state -->
					<input type="checkbox" class="theme-controller" value="dark" aria-label="Swap Theme"/>

					<Icon icon="noto:full-moon" class="swap-off text-3xl fill-current"/>

					<!-- moon icon -->
					<Icon icon="noto:new-moon" class="swap-on text-3xl fill-current"/>
				</label>
			</li>
		</ul>
	</nav>
>>>>>>> defca4a (added daisyui, replaced buttons removed button component, added winston-loki)
{/if}
