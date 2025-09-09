import { HttpError, ResponseHandler } from '$lib/server/helpers/ResponseHandler.helper';
import { GetUser } from '$lib/server/helpers/UserCheck.helper';
import { rabbitMQClient } from '$lib/server/providers/RabbitSender';
import { groupService } from '$lib/server/services/Group.serverutil';
import type { RequestEvent, RequestHandler } from './$types';

export const DELETE: RequestHandler = async ({ request }: RequestEvent) => {
	
	try {
		const body = await request.json();
		
		const user = await GetUser(request);
	
		if (!user) {
			throw new HttpError('User must be signed in to delete group!', 401);
		}

		await groupService.deleteGroup(body, user.id);

		await rabbitMQClient.send({ tableName: "taskGroup", rowId: body})

		return ResponseHandler.json('Successfully deleted groups!', 200);
	} catch (error: any) {
		if (error instanceof HttpError) {
			return ResponseHandler.json(error.message, error.status);
		}
		return ResponseHandler.json(error.message, 500);
	}
};
