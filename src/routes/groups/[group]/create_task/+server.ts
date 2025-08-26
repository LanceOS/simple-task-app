import { ResponseHandler } from '$lib/server/helpers/ResponseHandler.helper'
import { GetUser } from '$lib/server/helpers/UserCheck.helper.js';
import { TaskManager } from '$lib/server/services/Tasker.serverutil.js';


export const POST = async ({ request }) => {
    try {
        const body = await request.json();

        const user = GetUser(request)

        if(!user) {
            return ResponseHandler.jsonResponse("User must be signed in!", 401)
        }

        const [response] = await TaskManager.createTask(body);

        return ResponseHandler.jsonResponse(response, 200)
    }
    catch(error: any) {
        return ResponseHandler.jsonResponse(error.message, 500)
    }
}