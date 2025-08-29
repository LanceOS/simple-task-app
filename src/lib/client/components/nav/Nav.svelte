<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { authClient } from '$lib/auth-client';
	import { Label, NavigationMenu, Switch, Toggle } from 'bits-ui';
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
	<NavigationMenu.Root orientation="vertical" class="fixed w-full bg-white p-4 sm:bg-transparent z-10">
		<NavigationMenu.List class="mx-auto flex max-w-7xl items-center justify-end gap-4">
			<NavigationMenu.Item>
				<NavigationMenu.Link
					class="rounded-md p-2 text-base font-medium transition-colors duration-200 hover:bg-[var(--color-base-300)]"
				>
					<a href="/" aria-label="Navigate Home">Home</a>
				</NavigationMenu.Link>
			</NavigationMenu.Item>

			<NavigationMenu.Item>
				<NavigationMenu.Link
					class="rounded-md px-3 py-2 text-base font-medium transition-colors duration-200 hover:bg-[var(--color-base-300)]"
				>
					<a href="/groups" aria-label="Navigate to Groups">Groups</a>
				</NavigationMenu.Link>
			</NavigationMenu.Item>

			<NavigationMenu.Item>
				<NavigationMenu.Link class="bg-white">
					{#if $session?.data?.user}
						<Button variant="primary" type="button" aria-label="Sign Out" onclick={signOut}
							>Sign Out</Button
						>
					{:else}
						<Button
							variant="primary"
							type="button"
							aria-label="Sign In"
							onclick={() => goto('/signin')}
							class="primary shadown-md active:transition-y-[1px] rounded-lg px-4 py-2 duration-200 hover:scale-[0.98]"
							>Sign In</Button
						>
					{/if}
				</NavigationMenu.Link>
			</NavigationMenu.Item>

			<NavigationMenu.Item class="flex items-center">
				<Toggle.Root class="cursor-pointer">
					<Icon icon="line-md:light-dark" class="p-0 text-3xl" />
				</Toggle.Root>
			</NavigationMenu.Item>
		</NavigationMenu.List>
	</NavigationMenu.Root>
{/if}
