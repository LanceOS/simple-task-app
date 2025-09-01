


import { HttpError, ResponseHandler } from '$lib/server/helpers/ResponseHandler.helper';
import { GetUser } from '$lib/server/helpers/UserCheck.helper';
import { taskService } from '$lib/server/services/Tasker.serverutil';
import type { RequestHandler, RequestEvent } from './$types';

export const DELETE: RequestHandler = (async ({ request }: RequestEvent) => {
    try {
        const body = await request.json();

        const user = await GetUser(request);

        if(!user) {
            throw new HttpError("User must be signed in to delete task!", 403)
        }

        await taskService.deleteTask(body)
        


        return ResponseHandler.jsonResponse("Successfully deleted task!", 200)
    }
    catch(error: any) {
        if(error instanceof HttpError) {
            return ResponseHandler.jsonResponse(error.message, error.status)
        }

        return ResponseHandler.jsonResponse("Failed to delete task", 500)
    }
});