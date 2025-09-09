


import { HttpError, ResponseHandler } from '$lib/server/helpers/ResponseHandler.helper';
import { GetUser } from '$lib/server/helpers/UserCheck.helper';
import { journalService } from '$lib/server/services/Journalist.serverutil';
import { taskService } from '$lib/server/services/Tasker.serverutil';
import type { RequestHandler, RequestEvent } from './$types';

export const DELETE: RequestHandler = (async (event: RequestEvent) => {
    try {
        const { request } = event;
        const body = await request.json();

        const user = await GetUser(request);

        const clientIpAddress = event.getClientAddress()

        if(!user) {
            throw new HttpError("User must be signed in to delete task!", 401)
        }

        await taskService.deleteTask(body.taskId)

        await journalService.writeJournal({
            action: "Deleted task",
            description: "User deleted a task from their group.",
            metadata: {
                parentGroupId: body.groupId,
                taskId: body.taskId,
                userId: user.id,
                deletedFromAddress: clientIpAddress
            }
        })

        return ResponseHandler.json("Successfully deleted task!s", 200)
    }
    catch(error: any) {
        if(error instanceof HttpError) {
            return ResponseHandler.json(error.message, error.status)
        }

        return ResponseHandler.json("Failed to delete task", 500)
    }
});