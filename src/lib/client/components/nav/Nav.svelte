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
    <nav class="fixed w-full bg-white p-4 sm:bg-transparent z-10">
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

            <li class="bg-white">
                {#if $session?.data?.user}
                    <Button type="button" aria-label="Sign Out" onclick={signOut}
                        >Sign Out</Button
                    >
                {:else}
                    <Button
                        type="button"
                        aria-label="Sign In"
                        onclick={() => goto('/signin')}
                        class="primary shadown-md active:transition-y-[1px] rounded-lg px-4 py-2 duration-200 hover:scale-[0.98]"
                        >Sign In</Button
                    >
                {/if}
            </li>

            <li class="flex items-center">
                <Button aria-label="Toggle dark mode" variant="custom" class="cursor-pointer">
                    <Icon icon="line-md:light-dark" class="text-2xl" />
                </Button>
            </li>
        </ul>
    </nav>
{/if}
