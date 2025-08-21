import { error } from "console";
import type { PageServerLoad } from "./$types";
import { GetUser } from "$lib/server/helpers/UserCheck.helper";
import { redirect } from "@sveltejs/kit";
import { TaskManager } from "$lib/server/utils/TaskManager.serverutil";



export const load: PageServerLoad = async ({ params, request }) => {
    try {
        const taskId = params.task
        
        const user = GetUser(request)
        
        if(!user) {
            throw redirect(308, "/signin")
        }

        const task = await TaskManager.getSingleTask(taskId)

        return {
            task
        }
    }
    catch(err: any) {
        return error(500, err.message)
    }
}