import { ResponseHandler } from '$lib/server/helpers/ResponseHandler.helper';
import { GetUser } from '$lib/server/helpers/UserCheck.helper.js';
import { groupService } from '$lib/server/services/Group.serverutil.js';

export const POST = async ({ request }) => {
	try {
		const body = await request.json();

		const user = await GetUser(request);

        if(!user) {
            return ResponseHandler.jsonResponse({ message: "User must be signed in!" }, 401)
        }
		const response = await groupService.createNewGroup(body, user.id);

        return ResponseHandler.jsonResponse({ message: `Successfully created new group!: ${response}` }, 200)
	} catch (error: any) {
		return ResponseHandler.jsonResponse(500, error.message);
	}
};
