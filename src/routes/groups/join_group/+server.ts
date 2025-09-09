import { HttpError, ResponseHandler } from '$lib/server/helpers/ResponseHandler.helper';
import { GetUser } from '$lib/server/helpers/UserCheck.helper.js';
import { groupService } from '$lib/server/services/Group.serverutil.js';
import { inviteService } from '$lib/server/services/Inviter.serverutil.js';
import { journalService } from '$lib/server/services/Journalist.serverutil';
import type { RequestEvent } from '../$types';

export const POST = async ({ request }: RequestEvent) => {
	try {
		const body = await request.json();

		const user = await GetUser(request);

		if (!user) {
			return ResponseHandler.json('User must be signed in to join group!', 401);
		}

		const isCodeValid = await inviteService.getValidCode(user.email, body);

		await groupService.addGroupMember({
			userId: user.id,
			parentGroupId: isCodeValid.parentGroupId
		});

		await journalService.writeJournal({
			action: "Joined Group",
			description: "A user has because a new member of a group.",
			metadata: {
				joinedGroupId: isCodeValid.parentGroupId,
				joiningUserId: user.id
			}
		})

		return ResponseHandler.json(isCodeValid.parentGroupId, 200);
	} catch (error: any) {
		if (error instanceof HttpError) {
			return ResponseHandler.json(error.message, error.status);
		}

        return ResponseHandler.json("Failed to join group!", 500)
	}
};
