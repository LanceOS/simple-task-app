import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { GetUser } from "$lib/server/helpers/UserCheck.helper";
import { TaskManager } from "$lib/server/utils/TaskManager.serverutil";
import { GroupManager } from "$lib/server/utils/GroupManager.serverutil";



export const load: PageServerLoad = async ({ params, request }) => {
    try {
        const groupId = params.group;

        const user = GetUser(request);

        if(!user) {
            throw redirect(308, "/signin")
        }

        const tasks = await TaskManager.getTasks(groupId);
        const groupMembers = await GroupManager.getGroupMembers(groupId);

        return {
            tasks,
            groupMembers
        }

    }catch(err: any){
        return error(500, err.message)
    }
}