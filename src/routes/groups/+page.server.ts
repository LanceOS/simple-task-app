import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { auth } from '$lib/auth';
import { GroupManager } from '$lib/server/utils/GroupManager.serverutil';

export const load: PageServerLoad = async ({ request }) => {
    try {
        const session = await auth.api.getSession({
            headers: request.headers
        });

        const user = session?.user;


        if(!user) {
            throw redirect(308, "/signin")
        };

        const ownedGroups = await GroupManager.getUserOwnedGroups(user.id);
        const joinedGroups = await GroupManager.getJoinedGroups(user.id);

        return {
            ownedGroups,
            joinedGroups
        }
    }
    catch(err: any) {
        return error(500, "Failed to get task data")
    }
};