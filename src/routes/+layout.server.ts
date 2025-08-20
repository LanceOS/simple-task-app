import { redirect } from '@sveltejs/kit';
import { auth } from '$lib/auth.js';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ request, url }) => {
	const session = await auth.api.getSession({
		headers: request.headers
	});

	if (session?.user && !session.user && url.pathname !== '/onboarding') {
		throw redirect(302, '/onboarding');
	}

	return {
		session
	};
};
