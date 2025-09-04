<script lang="ts">
    import { goto } from '$app/navigation';
    import { page } from '$app/state';
    import { authClient } from '$lib/auth-client';
    import Button from '../ui/Button.svelte';
    import Icon from '@iconify/svelte';

    const session = authClient.useSession();
    const route = page.url.pathname;

    const signOut = () => {
        authClient.signOut();
        goto('/');
    };
</script>

{#if route !== '/onboarding'}
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
{/if}
