import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { GetUser } from "$lib/server/helpers/UserCheck.helper";



export const load: PageServerLoad = ({ params, request }) => {
    try {
        const groupId = params.group;

        const user = GetUser(request)

    }catch(err: any){
        return error(500, err.message)
    }
}