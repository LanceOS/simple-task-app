import { ResponseHandler } from '$lib/server/helpers/ResponseHandler.helper';
import { GetUser } from '$lib/server/helpers/UserCheck.helper.js';
import { journalService } from '$lib/server/services/Journalist.serverutil.js';
import { taskService } from '$lib/server/services/Tasker.serverutil.js';
import type { RequestEvent, RequestHandler } from './$types';

export const POST: RequestHandler = async (event: RequestEvent) => {
	try {
		const { request } = event;
		const body = await request.json();
		const user = await GetUser(request);

		const clientIpAddress = event.getClientAddress()
		
		if (!user) {
			return ResponseHandler.json('User must be signed in!', 401);
		}

		const response = await taskService.createTask(body);

		await journalService.writeJournal({
			action: 'Created task',
			description: 'A new task has been created in database.',
			metadata: {
				taskName: body.name,
				groupId: body.groupId,
				createdByUserId: user.id,
				createdFromAddress: clientIpAddress
			}
		});

		return ResponseHandler.json(response, 200);
	} catch (error: any) {
		return ResponseHandler.json(error.message, 500);
	}
};
