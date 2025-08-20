import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	try {
        const userId = params.user;

        if(!userId) {
            return error(400, "Failed to get user info");
        };

        
    }
    catch(err: any) {
        return error(500, "Failed to get profile info")
    }
};
