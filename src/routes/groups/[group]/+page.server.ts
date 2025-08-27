import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { GetUser } from "$lib/server/helpers/UserCheck.helper";
import { groupService } from "$lib/server/services/Group.serverutil";
import { taskService } from "$lib/server/services/Tasker.serverutil";



export const load: PageServerLoad = async ({ params, request }) => {
    const user = GetUser(request);

    if(!user) {
        throw redirect(308, "/signin")
    }


    try {
        const groupId = params.group;

        const tasks = await taskService.getAllTasks(groupId)
        const groupMembers = await groupService.getAllMembers(groupId);

        return {
            tasks,
            groupMembers
        }

    }catch(err: any){
        return error(500, err.message)
    }
}