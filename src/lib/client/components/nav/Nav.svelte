<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { authClient } from '$lib/auth-client';
	import { Button, NavigationMenu } from 'bits-ui';

	const session = authClient.useSession();
	const route = page.url.pathname;

	const signOut = () => {
		authClient.signOut();
		goto('/');
	};
</script>

{#if route !== '/onboarding'}
	<NavigationMenu.Root
		orientation="vertical"
		class="fixed w-full p-4"
	>
		<NavigationMenu.List class="flex items-center justify-end gap-8 max-w-7xl mx-auto">
				<NavigationMenu.Item>
					<NavigationMenu.Link class="underline-offset-4 duration-200 underline hover:underline-offset-8 font-bold text-lg">
						<a href="/" aria-label="Navigate Home">Home</a>
					</NavigationMenu.Link>
				</NavigationMenu.Item>

				<NavigationMenu.Item>
					<NavigationMenu.Link class="underline-offset-4 duration-200 underline hover:underline-offset-8 font-bold text-lg">
						<a href="/groups" aria-label="Navigate to Groups">Groups</a>
					</NavigationMenu.Link>
				</NavigationMenu.Item>

			<NavigationMenu.Item>
				<NavigationMenu.Link class="bg-white">
					{#if $session?.data?.user}
						<Button.Root
							type="button"
							aria-label="Sign Out"
							class="cursor-pointer rounded-full bg-blue-500 py-2 text-white font-bold"
							onclick={signOut}>Sign Out</Button.Root
						>
					{:else}
						<Button.Root
							href="/signin"
							aria-label="Sign In"
							class="btn primary rounded-lg shadow-md">Sign In</Button.Root
						>
					{/if}
				</NavigationMenu.Link>
			</NavigationMenu.Item>
		</NavigationMenu.List>
	</NavigationMenu.Root>
{/if}
