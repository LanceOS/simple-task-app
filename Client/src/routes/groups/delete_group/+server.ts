import { HttpError, ResponseHandler } from '$lib/server/helpers/ResponseHandler.helper';
import { GetUser } from '$lib/server/helpers/UserCheck.helper';
import { rabbitMQClient } from '$lib/server/providers/RabbitSender';
import { groupService } from '$lib/server/services/Group.serverutil';
import { journalService } from '$lib/server/services/Journalist.serverutil';
import type { RequestEvent, RequestHandler } from './$types';

export const DELETE: RequestHandler = async ({ request }: RequestEvent) => {
	
	try {
		const body = await request.json();
		
		const user = await GetUser(request);
	
		if (!user) {
			throw new HttpError('User must be signed in to delete group!', 401);
		}

		await groupService.deleteGroup(body, user.id);

		await journalService.writeJournal({
			action: 'Deleted Group',
			description: 'A group has been deleted from the database.',
			metadata: {
				deletedGroups: body,
				deletedByUserId: user.id
			}
		});

		await rabbitMQClient.send({ groupIds: body})

		return ResponseHandler.json('Successfully deleted groups!', 200);
	} catch (error: any) {
		if (error instanceof HttpError) {
			return ResponseHandler.json(error.message, error.status);
		}
		return ResponseHandler.json(error.message, 500);
	}
};
