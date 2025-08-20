<script lang="ts">
	import { page } from '$app/state';
	import { authClient } from '$lib/auth-client';

	const session = authClient.useSession();
	const route = page.url.pathname;
	const signOut = () => {
		authClient.signOut();
	};
</script>

{#if route !== '/onboarding'}
	<header>
		<nav>
			{#if route !== '/signin'}
				{#if $session?.data?.user}
					<button
						type="button"
						onclick={signOut}
						class="rounded-md border px-4 py-2"
						aria-label="Sign Out">Sign Out</button
					>
				{:else}
					<a href="/signin" class="rounded-md border px-4 py-2" aria-label="Sign In">Sign In</a>
				{/if}
			{/if}

			<div class="space-x-4">
				<a href="/" aria-label="Home Page" class="underline">Home</a>
				<a href="/groups" aria-label="Task Groups" class="underline">Task Groups</a>
				{#if $session?.data?.user}
					<a href={`/profile/${$session?.data?.user.id}`} aria-label="Profile" class="underline">Profile</a>
				{/if}
			</div>
		</nav>
	</header>
{/if}
