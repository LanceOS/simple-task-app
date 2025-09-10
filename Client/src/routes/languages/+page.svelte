<script lang="ts">
	import { i18n, setLanguage } from '$lib/stores/Translation.store';

	const languages = [
		{
			code: 'en',
			lang: 'english'
		},
		{
			code: 'es',
			lang: 'spanish'
		}
	];
</script>

<main class="mx-auto flex h-screen max-w-7xl flex-col justify-center gap-8 px-4 text-center">
	<h1 class="text-3xl">{$i18n.t('languages.title')}</h1>

	{#each languages as lang}
		<ul>
			<li>
				<button
					type="button"
					class="btn btn-accent btn-lg"
					onclick={() => setLanguage(lang.code)}>{$i18n.t(`languages.${lang.lang}`)}</button
				>
			</li>
		</ul>
	{/each}
</main>
