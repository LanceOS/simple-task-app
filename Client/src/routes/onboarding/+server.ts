import { auth } from '$lib/auth';
import { HttpError, ResponseHandler } from '$lib/server/helpers/ResponseHandler.helper';
import { GetUser } from '$lib/server/helpers/UserCheck.helper.js';
import { journalService } from '$lib/server/services/Journalist.serverutil.js';
import { UserServant } from '$lib/server/services/User.serverutil.js';
import type { RequestEvent, RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }: RequestEvent) => {
	try {
		const body = await request.json();


		const user = await GetUser(request)

		if (!user) {
			return ResponseHandler.json('User must be signed in to onboard!', 401);
		}

		if (!body) {
			return ResponseHandler.json('Missing required data!', 400);
		}

		await UserServant.setUsername(user.id, body);
		
		await journalService.writeJournal({
			action: "Assigned Name",
			description: "User has associated a name to their account.",
			metadata: {
				assignedName: body,
				userId: user.id
			}
		})

		return ResponseHandler.json("Name successfully assigned!", 200);
	} catch (error: any) {
		if (error instanceof HttpError) {
			return ResponseHandler.json(error.message, error.status);
		}
		return ResponseHandler.json(error.message, 500);
	}
};
