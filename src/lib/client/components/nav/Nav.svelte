<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { authClient } from '$lib/auth-client';
	import { NavigationMenu } from 'bits-ui';
	import Button from '../ui/Button.svelte';

	const session = authClient.useSession();
	const route = page.url.pathname;

	const signOut = () => {
		authClient.signOut();
		goto('/');
	};
</script>

{#if route !== '/onboarding'}
	<NavigationMenu.Root orientation="vertical" class="fixed w-full p-4">
		<NavigationMenu.List class="mx-auto flex max-w-7xl items-center justify-end gap-8">
			<NavigationMenu.Item>
				<NavigationMenu.Link
					class="text-lg font-bold underline underline-offset-4 duration-200 hover:underline-offset-8"
				>
					<a href="/" aria-label="Navigate Home">Home</a>
				</NavigationMenu.Link>
			</NavigationMenu.Item>

			<NavigationMenu.Item>
				<NavigationMenu.Link
					class="text-lg font-bold underline underline-offset-4 duration-200 hover:underline-offset-8"
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
							onclick={() => goto("/signin")}
							class="primary shadown-md rounded-lg px-4 py-2 duration-200 hover:scale-[0.98] active:transition-y-[1px]"
							>Sign In</Button>
					{/if}
				</NavigationMenu.Link>
			</NavigationMenu.Item>
		</NavigationMenu.List>
	</NavigationMenu.Root>
{/if}
