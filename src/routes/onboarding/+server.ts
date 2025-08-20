import { auth } from '$lib/auth';
import { ResponseHandler } from '$lib/server/helpers/ResponseHandler.helper';
import { UserServant } from '$lib/server/utils/UserServant.serverutil.js';


export const POST = async ({ request }) => {
    try {
        const body = await request.json();

        console.log(body)

        const session = await auth.api.getSession({
            headers: request.headers
        })

        if(!session?.user) {
            return ResponseHandler.jsonResponse("User must be signed in to onboard!", 401)
        }

        if(!body) {
            return ResponseHandler.jsonResponse("Missing required data!", 400)
        }

        const response = await UserServant.setUsername(session.user.id, body)

        console.log(response)

        return ResponseHandler.jsonResponse(response, 200)
    }
    catch(error) {
        return ResponseHandler.jsonResponse(error, 500)
    }
}