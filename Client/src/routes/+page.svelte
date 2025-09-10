<script lang="ts">
	import { goto } from '$app/navigation';
	import { authClient } from '$lib/auth-client';
	import { i18n } from '$lib/stores/Translation.store';
	import Icon from '@iconify/svelte';

	const session = authClient.useSession();

	const getStarted = () => {
		if (!$session?.data?.user) {
			goto('/signin');
		} else {
			goto('/groups');
		}
	};
</script>

<main class="bg-base-100 flex min-h-screen flex-col">
	<section class="flex min-h-screen items-center justify-center bg-gradient-to-br px-4 py-24">
		<div class="flex max-w-2xl flex-col items-center text-center">
			<h1 class="text-content mb-6 text-5xl font-extrabold sm:text-6xl">
				{$i18n.t('home.hero.title')}
			</h1>
			<p class="mb-8 text-xl leading-relaxed sm:text-2xl">
				{$i18n.t('home.hero.subtitle')}
			</p>

			<button type="button" class="btn btn-primary btn-xl" onclick={getStarted}>
				{$i18n.t('home.hero.getStarted')}
			</button>
		</div>
	</section>

	<section class="bg-base-200 px-4 py-20">
		<div class="mx-auto max-w-6xl text-center">
			<h2 class="mb-6 text-3xl font-bold sm:text-4xl">{$i18n.t('home.howItWorks.title')}</h2>
			<p class="mx-auto mb-16 max-w-3xl text-lg leading-relaxed">
				{$i18n.t('home.howItWorks.description')}
			</p>

			<div class="grid gap-8 md:grid-cols-3">
				<div
					class="bg-base-100 rounded-2xl p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
				>
					<Icon icon="unjs:unbuild" class="mb-2 w-full text-5xl" />
					<h3 class="text-content mb-4 text-xl font-bold">
						{$i18n.t('home.howItWorks.steps.step1.title')}
					</h3>
					<p class="leading-relaxed">
						{$i18n.t('home.howItWorks.steps.step1.description')}
					</p>
				</div>

				<div
					class="bg-base-100 rounded-2xl p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
				>
					<Icon icon="unjs:jimp-compact" class="mb-2 w-full text-5xl" />
					<h3 class="text-content mb-4 text-xl font-bold">
						{$i18n.t('home.howItWorks.steps.step2.title')}
					</h3>
					<p class="leading-relaxed">
						{$i18n.t('home.howItWorks.steps.step2.description')}
					</p>
				</div>

				<div
					class="bg-base-100 rounded-2xl p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
				>
					<Icon icon="twemoji:handshake" class="mb-2 w-full text-5xl" />
					<h3 class="text-content mb-4 text-xl font-bold">
						{$i18n.t('home.howItWorks.steps.step3.title')}
					</h3>
					<p class="leading-relaxed">
						{$i18n.t('home.howItWorks.steps.step3.description')}
					</p>
				</div>
			</div>
		</div>
	</section>

	<section class="bg-base-100 px-4 py-20">
		<div class="mx-auto max-w-6xl">
			<div class="mb-16 text-center">
				<h2 class="text-content mb-6 text-3xl font-bold sm:text-4xl">
					{$i18n.t('home.whyChoose.title')}
				</h2>
				<p class="mx-auto max-w-2xl text-lg">
					{$i18n.t('home.whyChoose.description')}
				</p>
			</div>

			<div class="grid gap-8 md:grid-cols-2">
				<div class="flex items-start gap-4 p-6">
					<Icon icon="unjs:db0" class="bg-info h-12 w-12 flex-shrink-0 rounded-lg p-2 text-5xl" />
					<div>
						<h3 class="text-content mb-2 text-xl font-bold">{$i18n.t('home.whyChoose.features.simpleAndFast.title')}</h3>
						<p class="">
							{$i18n.t('home.whyChoose.features.simpleAndFast.description')}
						</p>
					</div>
				</div>

				<div class="flex items-start gap-4 p-6">
					<Icon
						icon="unjs:unstorage"
						class="bg-error h-12 w-12 flex-shrink-0 rounded-lg p-2 text-5xl"
					/>
					<div>
						<h3 class="text-content mb-2 text-xl font-bold">{$i18n.t('home.whyChoose.features.privacyFirst.title')}</h3>
						<p class="">{$i18n.t('home.whyChoose.features.privacyFirst.description')}</p>
					</div>
				</div>

				<div class="flex items-start gap-4 p-6">
					<Icon
						icon="noto:mobile-phone"
						class="bg-warning h-12 w-12 flex-shrink-0 rounded-lg p-2 text-5xl"
					/>
					<div>
						<h3 class="text-content mb-2 text-xl font-bold">{$i18n.t('home.whyChoose.features.worksEverywhere.title')}</h3>
						<p class="">{$i18n.t('home.whyChoose.features.worksEverywhere.description')}</p>
					</div>
				</div>

				<div class="flex items-start gap-4 p-6">
					<Icon icon="unjs:h3" class="bg-success h-12 w-12 flex-shrink-0 rounded-lg p-2 text-5xl" />
					<div>
						<h3 class="text-content mb-2 text-xl font-bold">{$i18n.t('home.whyChoose.features.realtimeUpdates.title')}</h3>
						<p class="">{$i18n.t('home.whyChoose.features.realtimeUpdates.description')}</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="from-base-200 to-base-300 bg-gradient-to-r px-4 py-20">
		<div class="mx-auto max-w-4xl text-center">
			<h2 class="text-content mb-6 text-3xl font-bold sm:text-4xl">{$i18n.t('home.callToAction.title')}</h2>
			<p class="mx-auto mb-8 max-w-2xl text-lg">
				{$i18n.t('home.callToAction.description')}
			</p>

			<button type="button" class="btn btn-lg btn-primary" onclick={getStarted}>
				{$i18n.t('home.callToAction.button')}
			</button>
		</div>
	</section>
</main>
