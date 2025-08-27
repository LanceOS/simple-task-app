import { ResponseHandler } from '$lib/server/helpers/ResponseHandler.helper'
import { GetUser } from '$lib/server/helpers/UserCheck.helper.js'
import { taskService } from '$lib/server/services/Tasker.serverutil.js';



export const POST = async ({ request }) => {
    try {
        const body = await request.json()

        const user = GetUser(request);

        if(!user) {
            return ResponseHandler.jsonResponse("User must be signed in to appoint tasks!", 401)
        }

        const newAssignee = taskService.assignUserToTask(body.taskId, body.userId);

        return ResponseHandler.jsonResponse(newAssignee, 200)
    }
    catch(error: any) {
        return ResponseHandler.jsonResponse(error.message, 500)
    }
}