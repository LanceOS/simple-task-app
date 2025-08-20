<script lang="ts">
	import { page } from '$app/state';
	import { authClient } from '$lib/auth-client';

	const session = authClient.useSession();
    const route = page.url.pathname;
	const signOut = () => {
		authClient.signOut();
	};
</script>

<header>
	<nav>
		{#if route !== '/signin'}
			{#if $session?.data?.user}
				<button type="button" onclick={signOut} class="rounded-md border px-4 py-2" aria-label="Sign Out">Sign Out</button
				>
			{:else}
				<a href="/signin" class="rounded-md border px-4 py-2" aria-label="Sign In">Sign In</a>
			{/if}
		{/if}

        <div>
            <a href="/taskgroup" aria-label="Task Groups">Task Groups</a>
        </div>
	</nav>
</header>
