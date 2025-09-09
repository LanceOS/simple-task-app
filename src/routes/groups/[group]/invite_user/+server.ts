import { PRIVATE_EMAIL } from '$env/static/private';
import { HttpError, ResponseHandler } from '$lib/server/helpers/ResponseHandler.helper';
import { GetUser } from '$lib/server/helpers/UserCheck.helper.js';
import { groupService } from '$lib/server/services/Group.serverutil.js';
import { inviteService } from '$lib/server/services/Inviter.serverutil.js';
import { journalService } from '$lib/server/services/Journalist.serverutil.js';
import { mailerStrategy } from '$lib/server/services/MailMan.js';
import { UserServant } from '$lib/server/services/User.serverutil.js';

export const POST = async ({ request }) => {
	try {
		const body = await request.json();

		if (!body.email || !body.groupId) {
			return ResponseHandler.json('Missing required data!', 400);
		}

		const invitingUser = await GetUser(request);

		if (!invitingUser) {
			return ResponseHandler.json('User must be signed in to invite another member!', 401);
		}
		const userExists = await UserServant.findUserByEmail(body.email);
		if (userExists?.id) {
			const isInvitedUserMember = await groupService.isMember(body.groupId, userExists.id);
			if (isInvitedUserMember) {
				return ResponseHandler.json('This user is already a member!', 400);
			}
		}

		const createCode = await inviteService.sendInviteCode(body.groupId, body.email);

		const options = {
			from: PRIVATE_EMAIL,
			to: [body.email],
			subject: 'You have been invited to a group!',
			html: `<p>You have been invited to a group on GreaterTask! Your invite code is: ${createCode}</p>`
		};

		await mailerStrategy.send(options);

		await journalService.writeJournal({
			action: 'Group Invite',
			description: 'A user has invited another user to their group.',
			metadata: {
				inviting_user: invitingUser.email,
				receiving_user: body.email,
				group: body.groupId
			}
		});

		return ResponseHandler.json('Successfully invited user to your group!', 200);
	} catch (error: any) {
		if (error instanceof HttpError) {
			console.log(error.message, error.status);
			return ResponseHandler.json(error.message, error.status);
		}

		return ResponseHandler.json('Failed to join group!', 500);
	}
};
