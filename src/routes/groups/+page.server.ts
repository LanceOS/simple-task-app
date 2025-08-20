import { error } from '@sveltejs/kit';
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
            return error(401, "User must be signed in!")
        };

        const joinedGroups = await GroupManager.getJoinedGroups(user.id);
        const ownedGroups = await GroupManager.getUserOwnedGroups(user.id);

        return {
            ownedGroups,
            joinedGroups
        }
    }
    catch(err: any) {
        return error(500, "Failed to get task data")
    }
};