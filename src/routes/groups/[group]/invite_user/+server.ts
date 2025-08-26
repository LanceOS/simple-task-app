import { PRIVATE_EMAIL } from '$env/static/private';
import { ResponseHandler } from '$lib/server/helpers/ResponseHandler.helper';
import { GetUser } from '$lib/server/helpers/UserCheck.helper.js';
import { GroupManager } from '$lib/server/utils/GroupManager.serverutil.js';
import { InviteManager } from '$lib/server/utils/InviteManager.serverutil.js';
import { Journalist } from '$lib/server/utils/Journalist.serverutil.js';
import { mailerStrategy } from '$lib/server/utils/MailMan.js';
import { UserServant } from '$lib/server/utils/UserServant.serverutil.js';

export const POST = async ({ request }) => {
	try {
		const body = await request.json();

		if (!body.email || !body.groupId) {
			return ResponseHandler.jsonResponse({ message: 'Missing required data!' }, 400);
		}

		const invitingUser = await GetUser(request);
		if (!invitingUser) {
			return ResponseHandler.jsonResponse({ message: 'User must be signed in to invite another member!'}, 401);
		}

		const userExists = await UserServant.findUserByEmail(body.email);
		if (userExists) {
			const isInvitedUserMember = await GroupManager.isUserMember(body.groupId, userExists.id);
			if (isInvitedUserMember) {
				return ResponseHandler.jsonResponse({ message: 'This user is already a member!'}, 400);
			}
		}

		const createCode = await InviteManager.inviteUserToGroup(body.groupId, body.email);

		const options = {
			from: PRIVATE_EMAIL,
			to: [body.email],
			subject: 'You have been invited to a group!',
			html: `<p>You have been invited to a group on GreaterTask! Your invite code is: ${createCode}</p>`
		};

		await mailerStrategy.send(options)
		

		await Journalist.write({
			action: 'Group Invite',
			description: 'A user has invited another user to their group.',
			metadata: {
				inviting_user: invitingUser.email,
				receiving_user: body.email,
				group: body.groupId
			}
		});

		return ResponseHandler.jsonResponse({ message: 'Successfully invited user to your group!'}, 200);
	} catch (error: any) {
		return ResponseHandler.jsonResponse(error.message, 500);
	}
};
