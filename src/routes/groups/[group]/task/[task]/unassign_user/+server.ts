


import { HttpError, ResponseHandler } from '$lib/server/helpers/ResponseHandler.helper';
import { GetUser } from '$lib/server/helpers/UserCheck.helper';
import { journalService } from '$lib/server/services/Journalist.serverutil';
import { taskService } from '$lib/server/services/Tasker.serverutil';
import type { RequestHandler, RequestEvent } from './$types';

export const DELETE: RequestHandler = (async ({ request }: RequestEvent) => {
    try {
        const body = await request.json()

        const user = await GetUser(request);

        if(!user) {
            throw new HttpError("User must be signed in to unassign member from task!", 401);
        }

        await taskService.unassignUserFromTask(body.taskId, body.memberId);

        await journalService.writeJournal({
            action: "Removed Member",
            description: "A member has been removed from a task.",
            metadata: {
                parentGroupId: body.groupId,
                taskId: body.taskId,
                memberId: body.memberId
            }
        })

        return ResponseHandler.jsonResponse("Successfully unassigned user!", 200)
    }
    catch(error: any) {
        if(error instanceof HttpError) {
            return ResponseHandler.jsonResponse(error.message, error.status)
        }

        return ResponseHandler.jsonResponse("Failed to unassign member!", 500)
    }
});