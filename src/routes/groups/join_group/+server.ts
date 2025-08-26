import { ResponseHandler } from '$lib/server/helpers/ResponseHandler.helper'



export const POST = async ({ request }) => {
    try {
        const body = await request.json();

        
    }
    catch(error: any) {
        return ResponseHandler.jsonResponse("Failed to join group!", 500)
    }
}