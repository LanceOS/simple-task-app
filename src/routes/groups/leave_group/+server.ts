import { HttpError, ResponseHandler } from '$lib/server/helpers/ResponseHandler.helper';
import { GetUser } from '$lib/server/helpers/UserCheck.helper';
import { groupService } from '$lib/server/services/Group.serverutil';
import type { RequestEvent, RequestHandler } from '../$types';

export const DELETE: RequestHandler = async ({ request }: RequestEvent) => {
    try {
        const body = await request.json();

        const user = await GetUser(request);

        if (!user) {
            throw new HttpError("User must be signed in to leave group!", 401);
        }

        await groupService.removeGroupMember(body, user.id)

        return ResponseHandler.jsonResponse("Successfully left groups!", 200)
    } catch (error: any) {
        if (error instanceof HttpError) {
            return ResponseHandler.jsonResponse(error.message, error.status);
        }
        return ResponseHandler.jsonResponse(error.message, 500);
    }
};
