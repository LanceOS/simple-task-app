import { ResponseHandler } from '$lib/server/helpers/ResponseHandler.helper'
import { GetUser } from '$lib/server/helpers/UserCheck.helper.js';
import { InviteManager } from '$lib/server/utils/InviteManager.serverutil.js';



export const POST = async ({ request }) => {
    try {
        const body = await request.json();

        const user = GetUser(request);

        if(!user) {
            return ResponseHandler.jsonResponse("User must be signed in to invite another member!", 401)
        }

        const createCode = await InviteManager.inviteUserToGroup(body);

    }
    catch(error: any) {
        return ResponseHandler.jsonResponse(error.message, 500)
    }
}