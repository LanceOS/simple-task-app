import { writable, type Writable } from 'svelte/store';

type TranslationValue = string | { [key: string]: TranslationValue };
type TranslationMap = { [key: string]: TranslationValue };

const translations: { [key: string]: TranslationMap } = {};

interface I18nStore {
	lang: string;
	t: (key: string) => string;
}

export const i18n: Writable<I18nStore> = writable({
	lang: 'en',
	t: (key) => key
});

const lookup = (messages: TranslationMap, key: string): string => {
	const keys = key.split('.');
	let value: any = messages;

	for (const k of keys) {
		if (typeof value === 'object' && value !== null && k in value) {
			value = value[k];
		} else {
			return key;
		}
	}
	return typeof value === 'string' ? value : key;
};

export const setLanguage = async (lang: string) => {
	if (translations[lang]) {
		updateStore(lang, translations[lang]);
		return;
	}

	try {
		const json = await import(`$lib/i18n/${lang}.json`);
		translations[lang] = json.default as TranslationMap;
		updateStore(lang, translations[lang]);
	} catch (error) {
		console.error(`Could not load language file: ${lang}.json`, error);
	}
};

const updateStore = (lang: string, messages: TranslationMap) => {
	i18n.set({
		lang: lang,
		t: (key) => lookup(messages, key)
	});
};

setLanguage('en');