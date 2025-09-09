import { HttpError, ResponseHandler } from '$lib/server/helpers/ResponseHandler.helper';
import { GetUser } from '$lib/server/helpers/UserCheck.helper.js';
import { groupService } from '$lib/server/services/Group.serverutil.js';
import { journalService } from '$lib/server/services/Journalist.serverutil.js';

export const POST = async ({ request }) => {
	try {
		const body = await request.json();

		const user = await GetUser(request);

        if(!user) {
            return ResponseHandler.json("User must be signed in!", 401)
        }
		const response = await groupService.createNewGroup(body, user.id);

		await journalService.writeJournal({
			action: "Created New Group",
			description: "A new group has been created in the database.",
			metadata: {
				groupName: body.name,
				groupId: response,
				createdByUserId: user.id
			}
		})

        return ResponseHandler.json(response, 200);
	} catch (error: any) {
		if (error instanceof HttpError) {
			return ResponseHandler.json(error.message, error.status);
		}
		return ResponseHandler.json(error.message, 500);	}
};
