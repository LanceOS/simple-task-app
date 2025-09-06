import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { GetUser } from '$lib/server/helpers/UserCheck.helper';
import { groupService } from '$lib/server/services/Group.serverutil';

export const load: PageServerLoad = async ({ request }) => {
    const user = await GetUser(request);

    if (!user) {
        throw redirect(308, '/signin');
    }
    try {
        const ownedGroups = await groupService.getUserOwnedGroups(user.id);
        const joinedGroups = await groupService.getJoinedGroups(user.id);

        return {
            ownedGroups,
            joinedGroups
        };
    } catch (err: any) {
        return error(500, 'Failed to get task data');
    }
};
