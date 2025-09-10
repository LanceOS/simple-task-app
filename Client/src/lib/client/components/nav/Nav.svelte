<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { authClient } from '$lib/auth-client';
	import { i18n } from '$lib/stores/Translation.store';
	import Icon from '@iconify/svelte';

	const session = authClient.useSession();
	const route = page.url.pathname;

	const signOut = () => {
		authClient.signOut();
		goto('/');
	};
</script>

{#if route !== '/onboarding'}
	<nav class="fixed z-10 w-full p-4">
		<ul class="mx-auto flex max-w-7xl items-center justify-end gap-4">
			<li>
				<a
					href="/"
					aria-label="Navigate Home"
					class="rounded-md p-2 text-base font-medium transition-colors duration-200 hover:bg-[var(--color-base-300)]"
				>
					{$i18n.t("navigation.home")}
				</a>
			</li>

			<li>
				<a
					href="/groups"
					aria-label="Navigate to Groups"
					class="rounded-md px-3 py-2 text-base font-medium transition-colors duration-200 hover:bg-[var(--color-base-300)]"
				>
					{$i18n.t("navigation.groups")}
				</a>
			</li>
			<li>
				<a
					href="/languages"
					aria-label="Navigate to Languages"
					class="rounded-md px-3 py-2 text-base font-medium transition-colors duration-200 hover:bg-[var(--color-base-300)]"
				>
					{$i18n.t("navigation.languages")}
				</a>
			</li>
			<li class="">
				{#if $session?.data?.user}
					<button type="button" aria-label="Sign Out" onclick={signOut} class="btn btn-primary"
						>{$i18n.t("navigation.signout")}</button
					>
				{:else}
					<button
						type="button"
						aria-label="Sign In"
						onclick={() => goto('/signin')}
						class="btn btn-primary">{$i18n.t("navigation.signin")}</button
					>
				{/if}
			</li>

			<li class="flex items-center">
				<label class="swap swap-rotate">
					<!-- this hidden checkbox controls the state -->
					<input type="checkbox" class="theme-controller" value="dark" aria-label="Swap Theme" />

					<Icon icon="noto:full-moon" class="swap-off fill-current text-3xl" />

					<!-- moon icon -->
					<Icon icon="noto:new-moon" class="swap-on fill-current text-3xl" />
				</label>
			</li>
		</ul>
	</nav>
{/if}
