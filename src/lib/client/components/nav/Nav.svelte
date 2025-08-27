<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { authClient } from '$lib/auth-client';

	const session = authClient.useSession();
	const route = page.url.pathname;

	const signOut = () => {
		authClient.signOut();
		goto("/")
	};
</script>

{#if route !== '/onboarding'}
	<header class="bg-white shadow-sm sticky w-full top-0 z-50">
		<nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
			<!-- Left: Logo -->
			<div class="flex items-center space-x-2">
				<a href="/" class="text-xl font-bold text-indigo-600 hover:text-indigo-700 transition">
					Greater Task
				</a>
			</div>

			<div class="hidden md:flex space-x-8">
				<a
					href="/"
					class="text-gray-700 hover:text-indigo-600 font-medium transition"
					aria-label="Home Page"
				>
					Home
				</a>
				<a
					href="/groups"
					class="text-gray-700 hover:text-indigo-600 font-medium transition"
					aria-label="Task Groups"
				>
					Task Groups
				</a>
			</div>

			<div>
				{#if route !== '/signin'}
					{#if $session?.data?.user}
						<button
							type="button"
							onclick={signOut}
							class="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 font-medium border border-gray-300 hover:bg-gray-200 transition"
							aria-label="Sign Out"
						>
							Sign Out
						</button>
					{:else}
						<a
							href="/signin"
							class="px-4 py-2 rounded-xl bg-indigo-600 text-white font-medium shadow hover:bg-indigo-700 transition"
							aria-label="Sign In"
						>
							Sign In
						</a>
					{/if}
				{/if}
			</div>
		</nav>
	</header>
{/if}
