import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { GroupManager } from '$lib/server/utils/GroupManager.serverutil';
import { GetUser } from '$lib/server/helpers/UserCheck.helper';

export const load: PageServerLoad = async ({ request }) => {
	const user = await GetUser(request);

	if (!user) {
		throw redirect(308, '/signin');
	}
	try {
		const ownedGroups = await GroupManager.getUserOwnedGroups(user.id);
		const joinedGroups = await GroupManager.getJoinedGroups(user.id);

		return {
			ownedGroups,
			joinedGroups
		};
	} catch (err: any) {
		return error(500, 'Failed to get task data');
	}
};
