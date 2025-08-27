import { HttpError, ResponseHandler } from '$lib/server/helpers/ResponseHandler.helper';
import { GetUser } from '$lib/server/helpers/UserCheck.helper.js';
import { groupService } from '$lib/server/services/Group.serverutil.js';
import { inviteService } from '$lib/server/services/Inviter.serverutil.js';

export const POST = async ({ request }) => {
	try {
		const body = await request.json();

		const user = await GetUser(request);

		if (!user) {
			return ResponseHandler.jsonResponse('User must be signed in to join group!', 403);
		}

		const isCodeValid = await inviteService.getValidCode(user.email, body);

		await groupService.addGroupMember({
			userId: user.id,
			parentGroupId: isCodeValid.parentGroupId
		});

		return ResponseHandler.jsonResponse(isCodeValid.parentGroupId, 200);
	} catch (error: any) {
		if (error instanceof HttpError) {
			return ResponseHandler.jsonResponse(error.message, error.status);
		}

        return ResponseHandler.jsonResponse("Failed to join group!", 500)
	}
};
